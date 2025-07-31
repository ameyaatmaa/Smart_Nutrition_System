import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiEdit3, FiSave, FiX, FiActivity, FiTarget, FiTrendingUp } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';
import { calculateBMI, getBMICategory, calculateBMR, calculateTDEE, calculateMacros } from '../utils/nutritionCalculations';
import { generateNutritionSuggestions } from '../utils/nutritionSuggestions';
import Card from '../components/Card';
import Button from '../components/Button';
import InputField from '../components/InputField';

const Dashboard = ({ showToast }) => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [loading, setLoading] = useState(false);

  const bmi = calculateBMI(user.weight, user.height);
  const bmiCategory = getBMICategory(bmi);
  const bmr = calculateBMR(user.weight, user.height, user.age, user.gender);
  const tdee = calculateTDEE(bmr, user.activityLevel);
  const macros = calculateMacros(tdee, 'maintain');
  
  // Generate AI nutrition suggestions
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
    });
  }, [user]);

  const handleSave = async () => {
    setLoading(true);
    try {
      await updateUser(editData);
      setIsEditing(false);
      showToast('Profile updated successfully!', 'success');
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
                  <h3 className="text-lg font-semibold text-white mb-2">Activity Level</h3>
                  <div className="space-y-2 text-white/70">
                    <p className="capitalize">{user.activityLevel}</p>
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

        {/* AI Nutrition Suggestions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <h2 className="text-4xl font-black text-white mb-8">
            <span className="gradient-text">AI-Powered</span> Nutrition Intelligence
          </h2>
          
          {/* Meal Plan */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card>
              <h3 className="text-xl font-semibold text-white mb-4">Your Daily Meal Plan</h3>
              <div className="space-y-4">
                {Object.entries(nutritionData.mealPlan).map(([meal, data]) => (
                  <div key={meal} className="p-4 bg-dark-800 rounded-lg">
                    <h4 className="text-lg font-medium text-white capitalize mb-2">{meal}</h4>
                    <p className="text-accent-purple font-semibold mb-2">{data.calories} calories</p>
                    <div className="space-y-1">
                      {data.foods.map((food, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span className="text-white/70">{food.name}</span>
                          <span className="text-white">{food.calories} cal</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 pt-3 border-t border-dark-600">
                      <p className="text-xs text-accent-cyan font-medium">Tips:</p>
                      <ul className="text-xs text-white/60 mt-1">
                        {data.tips.map((tip, index) => (
                          <li key={index}>• {tip}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Recommendations */}
            <Card>
              <h3 className="text-xl font-semibold text-white mb-4">Personalized Recommendations</h3>
              <div className="space-y-4">
                {nutritionData.recommendations.map((rec, index) => (
                  <div key={index} className="p-4 bg-dark-800 rounded-lg">
                    <h4 className="text-lg font-medium text-white mb-2">{rec.title}</h4>
                    <ul className="space-y-1">
                      {rec.suggestions.map((suggestion, idx) => (
                        <li key={idx} className="text-sm text-white/70 flex items-start">
                          <span className="text-accent-purple mr-2">•</span>
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Health Tips */}
          <Card>
            <h3 className="text-xl font-semibold text-white mb-4">Health Tips</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {nutritionData.healthTips.map((tip, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <span className="text-accent-emerald text-sm mt-1">✓</span>
                  <span className="text-white/70 text-sm">{tip}</span>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard; 