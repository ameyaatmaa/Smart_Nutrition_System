import React from 'react';
import { motion } from 'framer-motion';
import { FiUsers, FiTarget, FiShield, FiTrendingUp } from 'react-icons/fi';
import Card from '../components/Card';

const About = () => {
  const features = [
    {
      icon: <FiUsers className="text-accent-purple" size={24} />,
      title: 'Expert Team',
      description: 'Our team consists of certified nutritionists, dietitians, and health professionals with years of experience in personalized nutrition.'
    },
    {
      icon: <FiTarget className="text-accent-pink" size={24} />,
      title: 'Personalized Approach',
      description: 'Every recommendation is tailored to your unique profile, goals, and preferences using advanced AI algorithms.'
    },
    {
      icon: <FiShield className="text-accent-cyan" size={24} />,
      title: 'Science-Based',
      description: 'All our recommendations are backed by the latest scientific research and evidence-based nutrition guidelines.'
    },
    {
      icon: <FiTrendingUp className="text-accent-emerald" size={24} />,
      title: 'Continuous Improvement',
      description: 'We constantly update our platform with the latest nutrition research and user feedback to provide the best experience.'
    }
  ];

  return (
    <div className="min-h-screen bg-dark-950 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-white mb-6">
            About <span className="gradient-text">Smart Nutrition</span>
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            We're revolutionizing the way people approach nutrition by combining cutting-edge AI technology 
            with evidence-based nutrition science to deliver personalized health solutions.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <Card className="text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
            <p className="text-lg text-white/70 leading-relaxed">
              To empower individuals to achieve their health and nutrition goals through personalized, 
              science-backed recommendations that fit seamlessly into their lifestyle. We believe that 
              everyone deserves access to expert nutrition guidance that's both effective and sustainable.
            </p>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-12">Why Choose Us</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <Card>
                  <div className="w-12 h-12 bg-dark-800 rounded-full flex items-center justify-center mb-4">
                    {feature.icon}
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
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <Card>
            <h2 className="text-3xl font-bold text-white mb-6">Join Our Community</h2>
            <p className="text-lg text-white/70 mb-8">
              Start your journey towards better health today. Join thousands of users who have already 
              transformed their lives with Smart Nutrition.
            </p>
            <div className="text-4xl font-bold gradient-text mb-4">10,000+</div>
            <p className="text-white/70">Happy users worldwide</p>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default About; 