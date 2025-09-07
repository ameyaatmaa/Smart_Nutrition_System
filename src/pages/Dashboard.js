import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiEdit3, FiSave, FiX, FiActivity, FiTarget, FiTrendingUp, FiCpu, FiRefreshCw } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';
import { calculateBMI, getBMICategory, calculateBMR, calculateTDEE, calculateMacros } from '../utils/nutritionCalculations';
import { generateNutritionSuggestions } from '../utils/nutritionSuggestions';
import Card from '../components/Card';
import Button from '../components/Button';
import InputField from '../components/InputField';
// Import the AI service
import aiDietService from '../services/aiDietService';

const Dashboard = ({ showToast }) => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [loading, setLoading] = useState(false);
  
  // NEW STATE VARIABLES FOR AI INTEGRATION
  const [aiDietPlan, setAiDietPlan] = useState(null);
  const [loadingDietPlan, setLoadingDietPlan] = useState(false);

  const bmi = calculateBMI(user.weight, user.height);
  const bmiCategory = getBMICategory(bmi);
  const bmr = calculateBMR(user.weight, user.height, user.age, user.gender);
  const tdee = calculateTDEE(bmr, user.activityLevel);
  const macros = calculateMacros(tdee, 'maintain');
  
  // Generate AI nutrition suggestions (keep your existing logic)
  const nutritionData = generateNutritionSuggestions({
    ...user,
    bmi,
    tdee
  }, 'maintain');

  useEffect(() => {
    setEditData({
      name: user.name,
      age: user.age,
      weight: user.weight,
      height: user.height,
      activityLevel: user.activityLevel,
      // ADD NEW HEALTH FIELDS
      bloodPressure: user.bloodPressure || 120,
      bloodSugar: user.bloodSugar || 100,
      nutritionQuality: user.nutritionQuality || 7
    });
  }, [user]);

  // NEW FUNCTION TO GENERATE AI DIET PLAN
  const generateAIDietPlan = async () => {
    setLoadingDietPlan(true);
    try {
      const dietPlan = await aiDietService.generateDietPlan(user);
      setAiDietPlan(dietPlan);
      showToast('AI Diet Plan generated successfully!', 'success');
    } catch (error) {
      showToast('Failed to generate diet plan. Please try again.', 'error');
      console.error('Error generating diet plan:', error);
    } finally {
      setLoadingDietPlan(false);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await updateUser(editData);
      setIsEditing(false);
      showToast('Profile updated successfully!', 'success');
      // Clear AI diet plan to trigger regeneration with new data
      setAiDietPlan(null);
    } catch (error) {
      showToast('Failed to update profile', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditData({
      name: user.name,
      age: user.age,
      weight: user.weight,
      height: user.height,
      activityLevel: user.activityLevel,
      // Reset new fields too
      bloodPressure: user.bloodPressure || 120,
      bloodSugar: user.bloodSugar || 100,
      nutritionQuality: user.nutritionQuality || 7
    });
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-dark-950 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="premium-glass rounded-3xl p-8 mb-8">
            <h1 className="text-5xl font-black text-white mb-4">
              Welcome back, <span className="gradient-text">{user.name}</span>!
            </h1>
            <p className="text-2xl text-white/80 font-light">Your personalized nutrition intelligence dashboard</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Card>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-accent-purple to-accent-pink rounded-full flex items-center justify-center">
                  <FiUser className="text-white" size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Profile Information</h2>
                  <p className="text-white/70">Manage your personal details</p>
                </div>
              </div>
              <Button
                variant={isEditing ? "secondary" : "outline"}
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? <FiX className="mr-2" /> : <FiEdit3 className="mr-2" />}
                {isEditing ? 'Cancel' : 'Edit'}
              </Button>
            </div>

            {isEditing ? (
              <div className="grid md:grid-cols-2 gap-6">
                <InputField
                  label="Name"
                  name="name"
                  value={editData.name}
                  onChange={handleChange}
                />
                <InputField
                  label="Age (years)"
                  type="number"
                  name="age"
                  value={editData.age}
                  onChange={handleChange}
                />
                <InputField
                  label="Weight (kg)"
                  type="number"
                  name="weight"
                  value={editData.weight}
                  onChange={handleChange}
                />
                <InputField
                  label="Height (cm)"
                  type="number"
                  name="height"
                  value={editData.height}
                  onChange={handleChange}
                />
                {/* NEW INPUT FIELDS FOR AI INTEGRATION */}
                <InputField
                  label="Blood Pressure (systolic)"
                  type="number"
                  name="bloodPressure"
                  value={editData.bloodPressure}
                  onChange={handleChange}
                />
                <InputField
                  label="Blood Sugar Level (mg/dL)"
                  type="number"
                  name="bloodSugar"
                  value={editData.bloodSugar}
                  onChange={handleChange}
                />
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-white mb-2">
                    Nutrition Quality (1-10): {editData.nutritionQuality}
                  </label>
                  <input
                    type="range"
                    name="nutritionQuality"
                    min="1"
                    max="10"
                    value={editData.nutritionQuality}
                    onChange={handleChange}
                    className="w-full h-2 bg-dark-700 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-white/50 mt-1">
                    <span>Poor (1)</span>
                    <span>Excellent (10)</span>
                  </div>
                </div>
                <div className="md:col-span-2 flex space-x-4">
                  <Button onClick={handleSave} loading={loading} className="flex-1">
                    <FiSave className="mr-2" />
                    Save Changes
                  </Button>
                  <Button variant="outline" onClick={handleCancel} className="flex-1">
                    <FiX className="mr-2" />
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Personal Info</h3>
                  <div className="space-y-2 text-white/70">
                    <p><span className="text-white">Name:</span> {user.name}</p>
                    <p><span className="text-white">Age:</span> {user.age} years</p>
                    <p><span className="text-white">Gender:</span> {user.gender}</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Physical Stats</h3>
                  <div className="space-y-2 text-white/70">
                    <p><span className="text-white">Weight:</span> {user.weight} kg</p>
                    <p><span className="text-white">Height:</span> {user.height} cm</p>
                    <p><span className="text-white">BMI:</span> {bmi} ({bmiCategory.category})</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Health Metrics</h3>
                  <div className="space-y-2 text-white/70">
                    <p><span className="text-white">Blood Pressure:</span> {user.bloodPressure || 120} mmHg</p>
                    <p><span className="text-white">Blood Sugar:</span> {user.bloodSugar || 100} mg/dL</p>
                    <p><span className="text-white">Nutrition Quality:</span> {user.nutritionQuality || 7}/10</p>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Nutrition Metrics</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">BMI</h3>
                  <div className="text-2xl font-bold gradient-text">{bmi}</div>
                  <p className="text-sm text-white/60 mt-1">{bmiCategory.category}</p>
                </div>
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <FiTarget className="text-white" size={20} />
                </div>
              </div>
            </Card>
            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">BMR</h3>
                  <div className="text-2xl font-bold gradient-text">{bmr} kcal</div>
                  <p className="text-sm text-white/60 mt-1">Basal Metabolic Rate</p>
                </div>
                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                  <FiActivity className="text-white" size={20} />
                </div>
              </div>
            </Card>
            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">TDEE</h3>
                  <div className="text-2xl font-bold gradient-text">{tdee} kcal</div>
                  <p className="text-sm text-white/60 mt-1">Daily Energy Need</p>
                </div>
                <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                  <FiTrendingUp className="text-white" size={20} />
                </div>
              </div>
            </Card>
            <Card>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-white mb-4">Macros</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-white/70">Protein:</span>
                    <span className="text-white font-semibold">{macros.protein}g</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Carbs:</span>
                    <span className="text-white font-semibold">{macros.carbs}g</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Fat:</span>
                    <span className="text-white font-semibold">{macros.fat}g</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </motion.div>

        {/* REPLACED AI NUTRITION SUGGESTIONS SECTION WITH AI DIET PLAN */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <Card>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-accent-purple to-accent-pink rounded-full flex items-center justify-center">
                  <FiCpu className="text-white" size={24} />
                </div>
                <div>
                  <h2 className="text-4xl font-black text-white">
                    <span className="gradient-text">AI-Powered</span> Diet Plan
                  </h2>
                  <p className="text-white/70">Personalized recommendations based on your health profile</p>
                </div>
              </div>
              <Button
                onClick={generateAIDietPlan}
                loading={loadingDietPlan}
                className="bg-gradient-to-r from-accent-purple to-accent-pink"
              >
                <FiRefreshCw className={`mr-2 ${loadingDietPlan ? 'animate-spin' : ''}`} />
                {loadingDietPlan ? 'Generating...' : 'Generate Plan'}
              </Button>
            </div>

            {aiDietPlan ? (
              <div>
                {/* Daily Summary */}
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="p-4 bg-dark-800 rounded-lg">
                    <h3 className="text-white font-semibold mb-2">Total Calories</h3>
                    <p className="text-2xl font-bold gradient-text">{aiDietPlan.daily_summary.total_calories}</p>
                  </div>
                  <div className="p-4 bg-dark-800 rounded-lg">
                    <h3 className="text-white font-semibold mb-2">BMI Status</h3>
                    <p className="text-lg text-accent-emerald">{aiDietPlan.user_profile.bmi_category}</p>
                    <p className="text-sm text-white/60">BMI: {aiDietPlan.user_profile.bmi}</p>
                  </div>
                  <div className="p-4 bg-dark-800 rounded-lg">
                    <h3 className="text-white font-semibold mb-2">Meals Planned</h3>
                    <p className="text-2xl font-bold gradient-text">{aiDietPlan.daily_summary.meals_count}</p>
                  </div>
                </div>

                {/* Meal Plan */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  {Object.entries(aiDietPlan.diet_plan).map(([mealType, mealData]) => (
                    <div key={mealType} className="p-4 bg-dark-800 rounded-lg">
                      <h3 className="text-xl font-semibold text-white mb-3 capitalize">{mealType}</h3>
                      <p className="text-accent-purple font-semibold mb-3">{mealData.total_calories} calories</p>
                      
                      <div className="space-y-2 mb-4">
                        {mealData.foods.map((food, index) => (
                          <div key={index} className="flex justify-between items-center">
                            <span className="text-white/80">{food.food_name}</span>
                            <div className="text-right">
                              <span className="text-white text-sm">{food.energy_kcal} cal</span>
                              <div className={`text-xs ${
                                food.compatibility_score >= 80 ? 'text-green-400' : 
                                food.compatibility_score >= 60 ? 'text-yellow-400' : 'text-red-400'
                              }`}>
                                {food.compatibility_score.toFixed(1)}% match
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="pt-3 border-t border-dark-600">
                        <p className="text-xs text-accent-cyan">
                          Avg Compatibility: {mealData.avg_compatibility.toFixed(1)}%
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Health Recommendations */}
                {aiDietPlan.health_recommendations && aiDietPlan.health_recommendations.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Health Recommendations</h3>
                    <div className="space-y-3">
                      {aiDietPlan.health_recommendations.map((rec, index) => (
                        <div key={index} className={`p-4 rounded-lg border ${
                          rec.priority === 'high' ? 'bg-red-500/10 border-red-500/30' :
                          rec.priority === 'medium' ? 'bg-yellow-500/10 border-yellow-500/30' :
                          'bg-green-500/10 border-green-500/30'
                        }`}>
                          <h4 className="text-white font-semibold mb-1">{rec.title}</h4>
                          <p className="text-white/70 text-sm">{rec.message}</p>
                          <span className={`inline-block mt-2 px-2 py-1 rounded text-xs ${
                            rec.priority === 'high' ? 'bg-red-500/20 text-red-300' :
                            rec.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
                            'bg-green-500/20 text-green-300'
                          }`}>
                            {rec.priority} priority
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <FiCpu className="mx-auto text-white/50 mb-4" size={48} />
                <p className="text-white/70 mb-4">Generate a personalized diet plan based on your health profile</p>
                <Button
                  onClick={generateAIDietPlan}
                  loading={loadingDietPlan}
                  className="bg-gradient-to-r from-accent-purple to-accent-pink"
                >
                  <FiCpu className="mr-2" />
                  Generate AI Diet Plan
                </Button>
              </div>
            )}
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;