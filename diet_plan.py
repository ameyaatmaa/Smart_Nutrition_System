import pandas as pd
import numpy as np
import random

def calculate_bmi(weight_kg, height_cm):
    """Calculates Body Mass Index (BMI) from weight and height."""
    # Convert height from cm to meters for the BMI formula
    height_m = height_cm / 100
    bmi = weight_kg / (height_m ** 2)
    return bmi

def calculate_compatibility_score(user, food):
    """
    Calculates a compatibility score between a user and a food item.
    A higher score indicates a better recommendation.

    The score is based on a content-based filtering approach, penalizing
    unhealthy foods based on the user's specific health conditions.

    Args:
        user (pd.Series): A single row of user data from the user DataFrame.
        food (pd.Series): A single row of food data from the food DataFrame.

    Returns:
        float: A compatibility score between 0 and 100.
    """
    # Start with a perfect base score of 100
    score = 100.0

    # --- Feature Penalties based on User's Health Profile ---

    # 1. Blood Sugar Level
    # A fasting blood sugar level of <100 mg/dL is normal. >125 is diabetic.
    # We will penalize sugary foods for users with a blood sugar level > 110.
    if user['blood_sugar_level'] > 110:
        sugar_penalty = food['freesugar_g'] * 1.5
        score -= sugar_penalty

    # 2. Blood Pressure
    # A blood pressure > 120 is considered elevated.
    # We will penalize foods high in fat and sodium for users with high blood pressure.
    if user['blood_pressure'] > 120:
        fat_penalty = food['fat_g'] * 1.0
        sodium_penalty = food['sodium_mg'] * 0.05
        score -= (fat_penalty + sodium_penalty)

    # 3. Body Mass Index (BMI)
    # A BMI > 25 is considered overweight.
    # We will penalize high-calorie foods for overweight users.
    bmi = calculate_bmi(user['weight_kg'], user['height_cm'])
    if bmi > 25:
        calorie_penalty = food['energy_kcal'] * 0.1
        score -= calorie_penalty

    # 4. Overall Nutrition Quality (Bonus)
    # The 'nutrition_quality' feature from the user data is a great indicator
    # of a healthy lifestyle. We can use it as a bonus.
    # Note: This is an example, and you might need to adjust the logic
    # depending on how this feature was originally created.
    nutrition_bonus = user['nutrition_quality'] * 1.0
    score += nutrition_bonus

    # Ensure the score is within a meaningful range (e.g., 0 to 100)
    score = max(0, min(100, score))

    return score

def generate_diet_plan(user, food_df, num_recommendations=3):
    """
    Generates a diet plan (Breakfast, Lunch, Dinner, Snack) for a given user.
    This version ensures no duplicate recommendations and makes lunch "heavier".

    Args:
        user (pd.Series): The user's profile.
        food_df (pd.DataFrame): The DataFrame of food items.
        num_recommendations (int): Number of food items to recommend per meal.

    Returns:
        dict: A dictionary containing the diet plan.
    """
    # Calculate compatibility scores for all food items for the given user
    food_df['compatibility_score'] = food_df.apply(
        lambda row: calculate_compatibility_score(user, row), axis=1
    )

    # Sort the food items by compatibility score in descending order
    sorted_food_df = food_df.sort_values(by='compatibility_score', ascending=False)
    
    # Define the meals we want to recommend for
    meal_types = ['Breakfast', 'Lunch', 'Snack', 'Dinner']
    
    recommended_foods = {}
    already_recommended_food_names = []

    # Simple, rule-based categorization to find potential foods for each meal
    meal_keywords = {
        'Breakfast': ['poha', 'oats', 'idli', 'dosa', 'paratha', 'sandwich', 'eggs'],
        'Lunch': ['roti', 'rice', 'dal', 'paneer', 'chicken', 'fish', 'sabzi', 'curry'],
        'Snack': ['fruit', 'nuts', 'samosa', 'pakoda', 'biscuit', 'yogurt', 'smoothie'],
        'Dinner': ['roti', 'rice', 'dal', 'paneer', 'chicken', 'fish', 'sabzi', 'curry', 'soup']
    }

    # Iterate through each meal type and get the top recommendations
    for meal in meal_types:
        # Filter for foods that contain any of the meal-specific keywords
        # and haven't been recommended yet
        filtered_foods = sorted_food_df[
            sorted_food_df['food_name'].str.contains('|'.join(meal_keywords.get(meal, [])), case=False, na=False)
        ]
        
        # Remove foods that have already been recommended for a previous meal
        filtered_foods = filtered_foods[~filtered_foods['food_name'].isin(already_recommended_food_names)]

        # --- HEAVIER LUNCH LOGIC ---
        # Sort lunch recommendations by both score and calorie count to make them "heavier"
        if meal == 'Lunch':
            filtered_foods = filtered_foods.sort_values(
                by=['compatibility_score', 'energy_kcal'], 
                ascending=[False, False]
            )

        # Get the top N foods for this specific meal
        top_foods = filtered_foods.head(num_recommendations)
        
        # If there are not enough foods, fall back to the top-scoring foods overall
        if len(top_foods) < num_recommendations:
            top_foods = sorted_food_df[~sorted_food_df['food_name'].isin(already_recommended_food_names)].head(num_recommendations)

        # Add the recommended foods to the dictionary
        recommended_foods[meal] = top_foods[['food_name', 'energy_kcal', 'compatibility_score']]
        
        # Add the names of the recommended foods to our tracking list
        already_recommended_food_names.extend(top_foods['food_name'].tolist())

    return recommended_foods

# --- Main script to generate and print the diet plan ---
if __name__ == '__main__':
    # Load the cleaned datasets
    try:
        user_df = pd.read_csv("cleaned_user_data.csv")
        food_df = pd.read_csv("cleaned_food_data.csv")
    except FileNotFoundError as e:
        print(f"Error: {e}. Please ensure you have the 'cleaned_user_data.csv' and 'cleaned_food_data.csv' files in the same directory.")
        exit()

    # --- Get user input ---
    print("Please enter your health metrics:")
    try:
        age = float(input("Age: "))
        weight_kg = float(input("Weight in kg: "))
        height_cm = float(input("Height in cm: "))
        blood_pressure = float(input("Blood Pressure (systolic, e.g., 120): "))
        blood_sugar_level = float(input("Blood Sugar Level (mg/dL): "))
        # For simplicity, we'll ask for a made-up metric. Explain its purpose to the user.
        nutrition_quality = float(input("On a scale of 1-10, how healthy do you eat? (1 is poor, 10 is excellent): "))

        # Create a pandas Series from the user input.
        # This allows the existing functions to work without modification.
        user_profile = pd.Series({
            'age': age,
            'weight_kg': weight_kg,
            'height_cm': height_cm,
            'blood_pressure': blood_pressure,
            'blood_sugar_level': blood_sugar_level,
            'nutrition_quality': nutrition_quality
        })
        
    except ValueError:
        print("Invalid input. Please enter numeric values for all metrics.")
        exit()

    print("\n--- Your Health Profile ---")
    print(user_profile.to_markdown())
    print("-" * 30)

    # Generate the diet plan for the user
    diet_plan = generate_diet_plan(user_profile, food_df)

    print("--- Personalized Diet Plan ---")
    for meal, recommendations in diet_plan.items():
        print(f"\n*{meal} Recommendations:*")
        print(recommendations.to_markdown(index=False, numalign="left", stralign="left"))