import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiGithub } from 'react-icons/fi';
import { initializeGoogleAuth, renderGoogleSignInButton } from '../utils/googleAuth';
import { useAuth } from '../contexts/AuthContext';
import InputField from '../components/InputField';
import Button from '../components/Button';

const Login = ({ showToast }) => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    try {
      const result = await login(formData.email, formData.password);
      if (result.success) {
        showToast('Login successful!', 'success');
        navigate('/dashboard');
      } else {
        showToast(result.error || 'Login failed', 'error');
      }
    } catch (error) {
      showToast('An error occurred during login', 'error');
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

  // Initialize Google OAuth on component mount
  useEffect(() => {
    initializeGoogleAuth().then(() => {
      renderGoogleSignInButton('google-signin-button');
    }).catch(error => {
      console.error('Google OAuth initialization failed:', error);
    });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
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
              <span className="text-white font-bold text-xl">SN</span>
            </motion.div>
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-white/70">Sign in to your Smart Nutrition account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
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

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-dark-600 text-accent-purple focus:ring-accent-purple bg-dark-800"
                />
                <span className="ml-2 text-sm text-white/70">Remember me</span>
              </label>
              <Link
                to="/forgot-password"
                className="text-sm text-accent-purple hover:text-accent-pink transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full"
              loading={loading}
            >
              Sign In
            </Button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-dark-600"></div>
            <span className="px-4 text-white/50 text-sm">or</span>
            <div className="flex-1 border-t border-dark-600"></div>
          </div>

          {/* Social Login */}
          <div id="google-signin-button" className="w-full mb-4 flex justify-center"></div>

          {/* Sign Up Link */}
          <div className="text-center mt-6">
            <span className="text-white/70">Don't have an account? </span>
            <Link
              to="/signup"
              className="text-accent-purple hover:text-accent-pink transition-colors font-medium"
            >
              Sign up
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login; 