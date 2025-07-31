import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiLock, FiGithub } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';
import InputField from '../components/InputField';
import Button from '../components/Button';

const Signup = ({ showToast }) => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    age: '',
    weight: '',
    height: '',
    activityLevel: 'moderate',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const activityLevels = [
    { value: 'sedentary', label: 'Sedentary (Little or no exercise)' },
    { value: 'lightly', label: 'Lightly Active (Light exercise/sports 1-3 days/week)' },
    { value: 'moderate', label: 'Moderately Active (Moderate exercise/sports 3-5 days/week)' },
    { value: 'active', label: 'Very Active (Hard exercise/sports 6-7 days/week)' },
    { value: 'very', label: 'Extremely Active (Very hard exercise/sports & physical job)' },
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
    }

    if (!formData.age) {
      newErrors.age = 'Age is required';
    } else if (formData.age < 13 || formData.age > 120) {
      newErrors.age = 'Age must be between 13 and 120';
    }

    if (!formData.weight) {
      newErrors.weight = 'Weight is required';
    } else if (formData.weight < 30 || formData.weight > 300) {
      newErrors.weight = 'Weight must be between 30 and 300 kg';
    }

    if (!formData.height) {
      newErrors.height = 'Height is required';
    } else if (formData.height < 100 || formData.height > 250) {
      newErrors.height = 'Height must be between 100 and 250 cm';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    try {
      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        gender: formData.gender,
        age: parseInt(formData.age),
        weight: parseFloat(formData.weight),
        height: parseFloat(formData.height),
        activityLevel: formData.activityLevel,
      };

      const result = await signup(userData);
      if (result.success) {
        showToast('Account created successfully!', 'success');
        navigate('/dashboard');
      } else {
        showToast(result.error || 'Signup failed', 'error');
      }
    } catch (error) {
      showToast('An error occurred during signup', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-effect rounded-2xl p-8"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-16 h-16 bg-gradient-to-r from-accent-purple to-accent-pink rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <span className="text-white font-bold text-xl">IN</span>
            </motion.div>
            <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
            <p className="text-white/70">Join Smart Nutrition and start your health journey</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <InputField
                label="Full Name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                required
                icon={<FiUser className="text-dark-400" size={20} />}
              />

              <InputField
                label="Email Address"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                required
                icon={<FiMail className="text-dark-400" size={20} />}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <InputField
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                required
                icon={<FiLock className="text-dark-400" size={20} />}
              />

              <InputField
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
                required
                icon={<FiLock className="text-dark-400" size={20} />}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Gender <span className="text-red-500">*</span>
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent-purple focus:border-transparent"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {errors.gender && (
                  <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
                )}
              </div>

              <InputField
                label="Age (years)"
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                error={errors.age}
                required
                min="13"
                max="120"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <InputField
                label="Weight (kg)"
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                error={errors.weight}
                required
                min="30"
                max="300"
                step="0.1"
              />

              <InputField
                label="Height (cm)"
                type="number"
                name="height"
                value={formData.height}
                onChange={handleChange}
                error={errors.height}
                required
                min="100"
                max="250"
                step="0.1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Activity Level
              </label>
              <select
                name="activityLevel"
                value={formData.activityLevel}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent-purple focus:border-transparent"
              >
                {activityLevels.map((level) => (
                  <option key={level.value} value={level.value}>
                    {level.label}
                  </option>
                ))}
              </select>
            </div>

            <Button
              type="submit"
              className="w-full"
              loading={loading}
            >
              Create Account
            </Button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-dark-600"></div>
            <span className="px-4 text-white/50 text-sm">or</span>
            <div className="flex-1 border-t border-dark-600"></div>
          </div>

          {/* Social Signup */}
          <Button
            variant="outline"
            className="w-full mb-4"
            onClick={() => showToast('Google OAuth coming soon!', 'info')}
          >
            <FiGithub className="mr-2" />
            Continue with Google
          </Button>

          {/* Login Link */}
          <div className="text-center mt-6">
            <span className="text-white/70">Already have an account? </span>
            <Link
              to="/login"
              className="text-accent-purple hover:text-accent-pink transition-colors font-medium"
            >
              Sign in
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup; 