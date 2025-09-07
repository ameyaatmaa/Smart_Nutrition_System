from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
import json
from diet_plan import calculate_bmi, calculate_compatibility_score, generate_diet_plan

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

# Load your datasets once when the server starts
try:
    user_df = pd.read_csv("cleaned_user_data.csv")
    food_df = pd.read_csv("cleaned_food_data.csv")
    print("Datasets loaded successfully")
except FileNotFoundError as e:
    print(f"Error loading datasets: {e}")
    user_df = None
    food_df = None

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy", "message": "AI Diet API is running"})

@app.route('/api/generate-diet-plan', methods=['POST'])
def generate_diet_plan_api():
    try:
        # Get user data from the request
        user_data = request.json
        
        # Validate required fields
        required_fields = ['age', 'weight_kg', 'height_cm', 'blood_pressure', 'blood_sugar_level', 'nutrition_quality']
        for field in required_fields:
            if field not in user_data:
                return jsonify({"error": f"Missing required field: {field}"}), 400
        
        # Create user profile as pandas Series
        user_profile = pd.Series({
            'age': float(user_data['age']),
            'weight_kg': float(user_data['weight_kg']),
            'height_cm': float(user_data['height_cm']),
            'blood_pressure': float(user_data['blood_pressure']),
            'blood_sugar_level': float(user_data['blood_sugar_level']),
            'nutrition_quality': float(user_data['nutrition_quality'])
        })
        
        # Calculate BMI
        bmi = calculate_bmi(user_profile['weight_kg'], user_profile['height_cm'])
        
        # Generate diet plan using your AI model
        diet_plan = generate_diet_plan(user_profile, food_df, num_recommendations=3)
        
        # Convert the diet plan to a format suitable for JSON response
        formatted_diet_plan = {}
        for meal, recommendations in diet_plan.items():
            formatted_diet_plan[meal] = {
                'foods': recommendations[['food_name', 'energy_kcal', 'compatibility_score']].to_dict('records'),
                'total_calories': int(recommendations['energy_kcal'].sum()),
                'avg_compatibility': float(recommendations['compatibility_score'].mean())
            }
        
        # Calculate total daily calories
        total_daily_calories = sum([meal_data['total_calories'] for meal_data in formatted_diet_plan.values()])
        
        response = {
            "user_profile": {
                "bmi": round(bmi, 2),
                "bmi_category": get_bmi_category(bmi),
                "age": user_profile['age'],
                "weight_kg": user_profile['weight_kg'],
                "height_cm": user_profile['height_cm'],
                "blood_pressure": user_profile['blood_pressure'],
                "blood_sugar_level": user_profile['blood_sugar_level'],
                "nutrition_quality": user_profile['nutrition_quality']
            },
            "diet_plan": formatted_diet_plan,
            "daily_summary": {
                "total_calories": total_daily_calories,
                "meals_count": len(formatted_diet_plan),
                "generated_at": pd.Timestamp.now().isoformat()
            },
            "health_recommendations": generate_health_recommendations(user_profile, bmi)
        }
        
        return jsonify(response)
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

def get_bmi_category(bmi):
    """Get BMI category based on BMI value"""
    if bmi < 18.5:
        return "Underweight"
    elif 18.5 <= bmi < 25:
        return "Normal weight"
    elif 25 <= bmi < 30:
        return "Overweight"
    else:
        return "Obese"

def generate_health_recommendations(user_profile, bmi):
    """Generate health recommendations based on user profile"""
    recommendations = []
    
    if bmi > 25:
        recommendations.append({
            "type": "weight_management",
            "title": "Weight Management",
            "message": "Consider reducing portion sizes and increasing physical activity",
            "priority": "high"
        })
    
    if user_profile['blood_sugar_level'] > 110:
        recommendations.append({
            "type": "blood_sugar",
            "title": "Blood Sugar Control",
            "message": "Limit sugary foods and opt for complex carbohydrates",
            "priority": "high"
        })
    
    if user_profile['blood_pressure'] > 120:
        recommendations.append({
            "type": "blood_pressure",
            "title": "Blood Pressure Management",
            "message": "Reduce sodium intake and choose low-fat options",
            "priority": "medium"
        })
    
    if user_profile['nutrition_quality'] < 7:
        recommendations.append({
            "type": "nutrition_quality",
            "title": "Improve Diet Quality",
            "message": "Increase intake of fruits, vegetables, and whole grains",
            "priority": "medium"
        })
    
    return recommendations

@app.route('/api/calculate-bmi', methods=['POST'])
def calculate_bmi_api():
    try:
        data = request.json
        weight_kg = float(data['weight_kg'])
        height_cm = float(data['height_cm'])
        
        bmi = calculate_bmi(weight_kg, height_cm)
        category = get_bmi_category(bmi)
        
        return jsonify({
            "bmi": round(bmi, 2),
            "category": category,
            "weight_kg": weight_kg,
            "height_cm": height_cm
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/api/food-compatibility', methods=['POST'])
def food_compatibility_api():
    try:
        data = request.json
        user_data = data['user']
        food_name = data['food_name']
        
        # Create user profile
        user_profile = pd.Series({
            'age': float(user_data['age']),
            'weight_kg': float(user_data['weight_kg']),
            'height_cm': float(user_data['height_cm']),
            'blood_pressure': float(user_data['blood_pressure']),
            'blood_sugar_level': float(user_data['blood_sugar_level']),
            'nutrition_quality': float(user_data['nutrition_quality'])
        })
        
        # Find the food in the database
        food_row = food_df[food_df['food_name'].str.contains(food_name, case=False, na=False)]
        
        if food_row.empty:
            return jsonify({"error": "Food not found"}), 404
        
        # Calculate compatibility for the first matching food
        food_item = food_row.iloc[0]
        compatibility_score = calculate_compatibility_score(user_profile, food_item)
        
        return jsonify({
            "food_name": food_item['food_name'],
            "compatibility_score": round(compatibility_score, 2),
            "energy_kcal": food_item.get('energy_kcal', 0),
            "recommendation": "Highly recommended" if compatibility_score > 80 else 
                           "Moderately recommended" if compatibility_score > 60 else 
                           "Not recommended"
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)