// AI Nutrition Suggestions with Indian Diet Options

const indianFoods = {
  breakfast: [
    { name: "Idli", calories: 39, protein: 2.5, carbs: 7.5, fat: 0.2 },
    { name: "Dosa", calories: 133, protein: 3.1, carbs: 25.8, fat: 1.2 },
    { name: "Poha", calories: 76, protein: 2.1, carbs: 15.2, fat: 0.3 },
    { name: "Paratha", calories: 264, protein: 6.8, carbs: 42.1, fat: 7.2 },
    { name: "Bread Omelette", calories: 156, protein: 8.9, carbs: 12.3, fat: 8.1 }
  ],
  lunch: [
    { name: "Dal Chawal", calories: 245, protein: 8.9, carbs: 45.2, fat: 2.1 },
    { name: "Roti Sabzi", calories: 189, protein: 6.8, carbs: 32.5, fat: 4.2 },
    { name: "Biryani", calories: 456, protein: 12.8, carbs: 78.9, fat: 8.5 },
    { name: "Rajma Chawal", calories: 298, protein: 11.2, carbs: 52.3, fat: 3.8 },
    { name: "Sambar Rice", calories: 234, protein: 7.8, carbs: 43.1, fat: 2.9 }
  ],
  dinner: [
    { name: "Chapati Dal", calories: 189, protein: 7.2, carbs: 32.1, fat: 3.5 },
    { name: "Rasam Rice", calories: 167, protein: 5.8, carbs: 31.2, fat: 1.8 },
    { name: "Pulao", calories: 298, protein: 8.9, carbs: 56.7, fat: 4.2 },
    { name: "Mixed Vegetable Curry", calories: 145, protein: 4.2, carbs: 23.8, fat: 3.1 },
    { name: "Dosa with Chutney", calories: 198, protein: 5.2, carbs: 35.6, fat: 2.8 }
  ],
  snacks: [
    { name: "Fruits", calories: 52, protein: 0.8, carbs: 12.5, fat: 0.2 },
    { name: "Nuts (Mixed)", calories: 607, protein: 20.8, carbs: 19.8, fat: 54.1 },
    { name: "Roasted Chana", calories: 364, protein: 21.2, carbs: 61.2, fat: 6.1 },
    { name: "Makhana", calories: 347, protein: 9.7, carbs: 77.2, fat: 0.1 }
  ]
};

export const generateNutritionSuggestions = (userData, goal = 'maintain') => {
  const { tdee, bmi } = userData;
  
  // Calculate calorie distribution
  let targetCalories = tdee;
  if (goal === 'lose') targetCalories = tdee - 500;
  if (goal === 'gain') targetCalories = tdee + 300;
  
  const mealPlan = {
    breakfast: {
      calories: Math.round(targetCalories * 0.25),
      foods: selectFoods(indianFoods.breakfast, Math.round(targetCalories * 0.25), bmi),
      tips: [
        "Start with protein-rich foods like eggs or dal",
        "Include whole grains for sustained energy",
        "Add fruits for vitamins and fiber"
      ]
    },
    lunch: {
      calories: Math.round(targetCalories * 0.35),
      foods: selectFoods(indianFoods.lunch, Math.round(targetCalories * 0.35), bmi),
      tips: [
        "Include a good source of protein (dal, paneer, chicken)",
        "Add plenty of vegetables for fiber",
        "Use whole grains like brown rice or whole wheat roti"
      ]
    },
    dinner: {
      calories: Math.round(targetCalories * 0.30),
      foods: selectFoods(indianFoods.dinner, Math.round(targetCalories * 0.30), bmi),
      tips: [
        "Keep dinner light and early (before 8 PM)",
        "Include easily digestible foods",
        "Avoid heavy fried foods"
      ]
    },
    snacks: {
      calories: Math.round(targetCalories * 0.10),
      foods: selectFoods(indianFoods.snacks, Math.round(targetCalories * 0.10), bmi),
      tips: [
        "Choose healthy snacks like fruits, nuts, or roasted chana",
        "Avoid processed snacks and fried foods",
        "Stay hydrated with water or herbal teas"
      ]
    }
  };

  const recommendations = generateRecommendations(userData, goal);
  const healthTips = generateHealthTips(userData, bmi);

  return { mealPlan, recommendations, healthTips, targetCalories };
};

const selectFoods = (foodList, targetCalories, bmi) => {
  let selectedFoods = [];
  let currentCalories = 0;
  
  let filteredFoods = foodList;
  if (bmi > 25) {
    filteredFoods = foodList.filter(food => food.calories < 200);
  } else if (bmi < 18.5) {
    filteredFoods = foodList.filter(food => food.calories > 150);
  }
  
  while (currentCalories < targetCalories && selectedFoods.length < 3) {
    const availableFoods = filteredFoods.filter(food => 
      !selectedFoods.find(selected => selected.name === food.name)
    );
    
    if (availableFoods.length === 0) break;
    
    const randomFood = availableFoods[Math.floor(Math.random() * availableFoods.length)];
    selectedFoods.push(randomFood);
    currentCalories += randomFood.calories;
  }
  
  return selectedFoods;
};

const generateRecommendations = (userData, goal) => {
  const { bmi, age, activityLevel } = userData;
  const recommendations = [];
  
  if (bmi > 25) {
    recommendations.push({
      type: 'weight_loss',
      title: 'Weight Management',
      suggestions: [
        'Focus on portion control and mindful eating',
        'Include more vegetables and fruits in your diet',
        'Choose whole grains over refined grains',
        'Limit fried foods and sweets',
        'Stay active with at least 30 minutes of exercise daily'
      ]
    });
  } else if (bmi < 18.5) {
    recommendations.push({
      type: 'weight_gain',
      title: 'Healthy Weight Gain',
      suggestions: [
        'Increase calorie intake with healthy foods',
        'Include protein-rich foods like dal, paneer, eggs',
        'Add healthy fats like nuts, ghee, and avocados',
        'Eat frequent meals throughout the day',
        'Include strength training exercises'
      ]
    });
  }
  
  if (activityLevel === 'sedentary') {
    recommendations.push({
      type: 'activity',
      title: 'Increase Physical Activity',
      suggestions: [
        'Start with 15-20 minutes of walking daily',
        'Try yoga or simple stretching exercises',
        'Take stairs instead of elevators',
        'Consider joining a gym or fitness class'
      ]
    });
  }
  
  return recommendations;
};

const generateHealthTips = (userData, bmi) => {
  const tips = [
    "Drink at least 8-10 glasses of water daily",
    "Include seasonal fruits and vegetables in your diet",
    "Practice mindful eating - eat slowly and enjoy your food",
    "Limit salt intake to less than 5g per day",
    "Include traditional Indian spices like turmeric, ginger, and garlic",
    "Avoid eating late at night",
    "Include fermented foods like curd for gut health"
  ];
  
  if (bmi > 25) {
    tips.push("Focus on portion control and avoid overeating");
    tips.push("Include more fiber-rich foods to feel full longer");
  } else if (bmi < 18.5) {
    tips.push("Eat nutrient-dense foods to gain healthy weight");
    tips.push("Include healthy snacks between meals");
  }
  
  return tips;
};

// Get food recommendations by category
export const getFoodRecommendations = (category, userData) => {
  const { bmi, goal } = userData;
  
  let foods = indianFoods[category] || [];
  
  // Filter based on user's health goals
  if (goal === 'lose' || bmi > 25) {
    foods = foods.filter(food => food.calories < 200);
  } else if (goal === 'gain' || bmi < 18.5) {
    foods = foods.filter(food => food.calories > 150);
  }
  
  return foods;
};

// Calculate nutrition score for foods
export const calculateNutritionScore = (food, userData) => {
  const { bmi, goal } = userData;
  let score = 0;
  
  // Protein score
  if (food.protein > 5) score += 2;
  else if (food.protein > 2) score += 1;
  
  // Fiber score (estimated)
  if (food.name.includes('vegetable') || food.name.includes('fruit')) score += 2;
  if (food.name.includes('whole') || food.name.includes('brown')) score += 1;
  
  // Calorie appropriateness
  if (goal === 'lose' && food.calories < 200) score += 2;
  else if (goal === 'gain' && food.calories > 150) score += 2;
  else if (goal === 'maintain') score += 1;
  
  return score;
}; 