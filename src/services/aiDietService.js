const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

class AIDietService {
  async generateDietPlan(userData) {
    try {
      const response = await fetch(`${API_BASE_URL}/generate-diet-plan`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          age: userData.age,
          weight_kg: userData.weight,
          height_cm: userData.height,
          blood_pressure: userData.bloodPressure || 120,
          blood_sugar_level: userData.bloodSugar || 100,
          nutrition_quality: userData.nutritionQuality || 7
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error generating diet plan:', error);
      throw error;
    }
  }

  async calculateBMI(weight, height) {
    try {
      const response = await fetch(`${API_BASE_URL}/calculate-bmi`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          weight_kg: weight,
          height_cm: height
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error calculating BMI:', error);
      throw error;
    }
  }

  async checkFoodCompatibility(userData, foodName) {
    try {
      const response = await fetch(`${API_BASE_URL}/food-compatibility`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: {
            age: userData.age,
            weight_kg: userData.weight,
            height_cm: userData.height,
            blood_pressure: userData.bloodPressure || 120,
            blood_sugar_level: userData.bloodSugar || 100,
            nutrition_quality: userData.nutritionQuality || 7
          },
          food_name: foodName
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error checking food compatibility:', error);
      throw error;
    }
  }

  async checkHealth() {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error checking API health:', error);
      throw error;
    }
  }
}

export default new AIDietService();