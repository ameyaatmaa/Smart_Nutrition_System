// Calculate BMI (Body Mass Index)
export const calculateBMI = (weight, height) => {
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);
  return Math.round(bmi * 10) / 10;
};

// Get BMI category
export const getBMICategory = (bmi) => {
  if (bmi < 18.5) return { category: 'Underweight', color: 'text-blue-400' };
  if (bmi < 25) return { category: 'Normal weight', color: 'text-green-400' };
  if (bmi < 30) return { category: 'Overweight', color: 'text-yellow-400' };
  return { category: 'Obese', color: 'text-red-400' };
};

// Calculate BMR (Basal Metabolic Rate) using Mifflin-St Jeor Equation
export const calculateBMR = (weight, height, age, gender) => {
  let bmr;
  if (gender === 'male') {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }
  return Math.round(bmr);
};

// Activity level multipliers
const activityMultipliers = {
  sedentary: 1.2,      // Little or no exercise
  lightly: 1.375,      // Light exercise/sports 1-3 days/week
  moderate: 1.55,      // Moderate exercise/sports 3-5 days/week
  active: 1.725,       // Hard exercise/sports 6-7 days a week
  very: 1.9,           // Very hard exercise/sports & physical job
};

// Calculate TDEE (Total Daily Energy Expenditure)
export const calculateTDEE = (bmr, activityLevel) => {
  const multiplier = activityMultipliers[activityLevel] || activityMultipliers.moderate;
  return Math.round(bmr * multiplier);
};

// Calculate macronutrient distribution
export const calculateMacros = (tdee, goal = 'maintain') => {
  let proteinRatio, fatRatio, carbRatio;
  
  switch (goal) {
    case 'lose':
      proteinRatio = 0.35; // 35% protein
      fatRatio = 0.30;     // 30% fat
      carbRatio = 0.35;    // 35% carbs
      break;
    case 'gain':
      proteinRatio = 0.25; // 25% protein
      fatRatio = 0.20;     // 20% fat
      carbRatio = 0.55;    // 55% carbs
      break;
    default: // maintain
      proteinRatio = 0.30; // 30% protein
      fatRatio = 0.25;     // 25% fat
      carbRatio = 0.45;    // 45% carbs
  }

  const protein = Math.round((tdee * proteinRatio) / 4); // 4 calories per gram
  const fat = Math.round((tdee * fatRatio) / 9);         // 9 calories per gram
  const carbs = Math.round((tdee * carbRatio) / 4);      // 4 calories per gram

  return {
    protein,
    fat,
    carbs,
    total: protein + fat + carbs,
  };
};

// Get activity level description
export const getActivityDescription = (level) => {
  const descriptions = {
    sedentary: 'Little or no exercise',
    lightly: 'Light exercise/sports 1-3 days/week',
    moderate: 'Moderate exercise/sports 3-5 days/week',
    active: 'Hard exercise/sports 6-7 days/week',
    very: 'Very hard exercise/sports & physical job',
  };
  return descriptions[level] || descriptions.moderate;
};

// Calculate ideal weight range
export const calculateIdealWeight = (height, gender) => {
  const heightInMeters = height / 100;
  const bmiMin = 18.5;
  const bmiMax = 24.9;
  
  const minWeight = Math.round(bmiMin * heightInMeters * heightInMeters);
  const maxWeight = Math.round(bmiMax * heightInMeters * heightInMeters);
  
  return { min: minWeight, max: maxWeight };
}; 