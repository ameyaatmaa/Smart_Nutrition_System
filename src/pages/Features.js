import React from 'react';
import { motion } from 'framer-motion';
import { 
  FiCpu, FiBarChart2, FiCalendar, FiTarget, FiUsers, FiShield,
  FiSmartphone, FiDatabase, FiTrendingUp, FiAward, FiZap, FiHeart
} from 'react-icons/fi';
import Card from '../components/Card';

const Features = () => {
  const features = [
    {
      icon: <FiCpu className="text-accent-purple" size={24} />,
      title: 'AI-Powered Recommendations',
      description: 'Advanced machine learning algorithms analyze your data to provide personalized nutrition suggestions.',
      category: 'AI Technology'
    },
    {
      icon: <FiBarChart2 className="text-accent-pink" size={24} />,
      title: 'Comprehensive Analytics',
      description: 'Track your progress with detailed charts, graphs, and insights about your nutrition journey.',
      category: 'Analytics'
    },
    {
      icon: <FiCalendar className="text-accent-cyan" size={24} />,
      title: 'Meal Planning',
      description: 'Get customized meal plans that fit your schedule, preferences, and nutritional needs.',
      category: 'Planning'
    },
    {
      icon: <FiTarget className="text-accent-emerald" size={24} />,
      title: 'Goal Setting',
      description: 'Set and track personalized health and nutrition goals with milestone celebrations.',
      category: 'Goals'
    },
    {
      icon: <FiUsers className="text-accent-purple" size={24} />,
      title: 'Expert Support',
      description: 'Access to certified nutritionists and health professionals for personalized guidance.',
      category: 'Support'
    },
    {
      icon: <FiShield className="text-accent-pink" size={24} />,
      title: 'Data Security',
      description: 'Your health data is protected with enterprise-grade security and privacy measures.',
      category: 'Security'
    },
    {
      icon: <FiSmartphone className="text-accent-cyan" size={24} />,
      title: 'Mobile App',
      description: 'Access your nutrition plan anywhere with our responsive mobile application.',
      category: 'Accessibility'
    },
    {
      icon: <FiDatabase className="text-accent-emerald" size={24} />,
      title: 'Food Database',
      description: 'Comprehensive database of foods with detailed nutritional information and barcode scanning.',
      category: 'Data'
    },
    {
      icon: <FiTrendingUp className="text-accent-purple" size={24} />,
      title: 'Progress Tracking',
      description: 'Monitor your health metrics, weight changes, and nutrition adherence over time.',
      category: 'Tracking'
    },
    {
      icon: <FiAward className="text-accent-pink" size={24} />,
      title: 'Achievement System',
      description: 'Stay motivated with badges, rewards, and achievements for reaching your goals.',
      category: 'Motivation'
    },
    {
      icon: <FiZap className="text-accent-cyan" size={24} />,
      title: 'Real-time Updates',
      description: 'Get instant updates and notifications about your nutrition plan and progress.',
      category: 'Real-time'
    },
    {
      icon: <FiHeart className="text-accent-emerald" size={24} />,
      title: 'Health Monitoring',
      description: 'Track vital health metrics and receive alerts for important health indicators.',
      category: 'Health'
    }
  ];

  // const categories = [...new Set(features.map(f => f.category))];

  return (
    <div className="min-h-screen bg-dark-950 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-white mb-6">
            Platform <span className="gradient-text">Features</span>
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Discover the powerful tools and features that make Smart Nutrition the ultimate 
            platform for achieving your health and nutrition goals.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
              >
                <Card>
                  <div className="w-12 h-12 bg-dark-800 rounded-full flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <div className="text-xs text-accent-purple font-semibold mb-2">
                    {feature.category}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-white/70">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <Card>
            <h2 className="text-3xl font-bold text-white mb-6">Ready to Get Started?</h2>
            <p className="text-lg text-white/70 mb-8">
              Join thousands of users who have already transformed their health with Smart Nutrition.
            </p>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold gradient-text mb-2">50+</div>
                <p className="text-white/70">Features Available</p>
              </div>
              <div>
                <div className="text-3xl font-bold gradient-text mb-2">24/7</div>
                <p className="text-white/70">AI Support</p>
              </div>
              <div>
                <div className="text-3xl font-bold gradient-text mb-2">99.9%</div>
                <p className="text-white/70">Uptime</p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Features; 