import React, { useCallback } from 'react';
// import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiArrowRight, FiPlay, FiStar, FiUsers, FiTrendingUp } from 'react-icons/fi';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import Button from '../components/Button';

const Home = ({ showToast }) => {
  const navigate = useNavigate();

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    // console.log(container);
  }, []);

  const features = [
    {
      icon: <FiStar className="text-premium-gold" size={32} />,
      title: 'AI-Powered Intelligence',
      description: 'Advanced machine learning algorithms analyze your unique profile to deliver personalized nutrition recommendations that adapt to your progress.'
    },
    {
      icon: <FiUsers className="text-premium-emerald" size={32} />,
      title: 'Expert Nutritionists',
      description: 'Access to world-class certified nutritionists and health professionals for personalized guidance and support.'
    },
    {
      icon: <FiTrendingUp className="text-premium-diamond" size={32} />,
      title: 'Advanced Analytics',
      description: 'Comprehensive progress tracking with detailed insights, trends, and predictive health analytics.'
    }
  ];

  return (
    <div className="relative min-h-screen">
      {/* Animated Background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          background: {
            color: {
              value: "transparent",
            },
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: "#a855f7",
            },
            links: {
              color: "#a855f7",
              distance: 150,
              enable: true,
              opacity: 0.3,
              width: 1,
            },
            collisions: {
              enable: true,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 1,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 5 },
            },
          },
          detectRetina: true,
        }}
      />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <div className="relative">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="absolute -top-20 -left-20 w-40 h-40 bg-premium-gold/20 rounded-full blur-3xl"
              />
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="absolute -top-10 -right-20 w-32 h-32 bg-premium-emerald/20 rounded-full blur-3xl"
              />
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="absolute -bottom-20 left-1/4 w-36 h-36 bg-premium-diamond/20 rounded-full blur-3xl"
              />
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight">
              <span className="gradient-text">NUTRITION</span>
              <br />
              <span className="text-white/90 font-light">INTELLIGENCE</span>
            </h1>
            
            <div className="max-w-4xl mx-auto">
              <p className="text-2xl md:text-3xl text-white/80 mb-8 leading-relaxed font-light">
                Experience the future of personalized nutrition with our 
                <span className="gradient-text font-semibold"> AI-powered platform</span> that transforms your health journey.
              </p>
              
              <div className="flex flex-wrap justify-center gap-6 mb-8">
                <div className="premium-glass px-6 py-3 rounded-full">
                  <span className="text-premium-gold font-semibold">AI-Powered</span>
                </div>
                <div className="premium-glass px-6 py-3 rounded-full">
                  <span className="text-premium-emerald font-semibold">Personalized</span>
                </div>
                <div className="premium-glass px-6 py-3 rounded-full">
                  <span className="text-premium-diamond font-semibold">Science-Backed</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <Button
              size="lg"
              onClick={() => navigate('/signup')}
              className="group"
            >
              Get Started Free
              <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => showToast('Demo coming soon!', 'info')}
              className="group"
            >
              <FiPlay className="mr-2" />
              Watch Demo
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white/50 text-sm"
          >
            <p>Trusted by 10,000+ users worldwide</p>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-black mb-8">
              Why Choose <span className="gradient-text">NUTRITION INTELLIGENCE</span>?
            </h2>
            <p className="text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed font-light">
              Experience the pinnacle of nutrition technology with our 
              <span className="gradient-text font-semibold"> cutting-edge AI platform</span> that revolutionizes your health journey.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: index * 0.3 }}
                viewport={{ once: true }}
                className="premium-glass rounded-2xl p-10 text-center group hover:scale-105 transition-all duration-500"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-premium-gold/20 to-premium-emerald/20 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-500">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-6 text-white">
                  {feature.title}
                </h3>
                <p className="text-white/80 leading-relaxed text-lg">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="premium-glass rounded-3xl p-16 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-premium-gold/10 via-premium-emerald/10 to-premium-diamond/10" />
            <div className="relative z-10">
              <h2 className="text-5xl md:text-6xl font-black mb-8">
                Ready to Experience <span className="gradient-text">NUTRITION INTELLIGENCE</span>?
              </h2>
              <p className="text-2xl text-white/80 mb-12 leading-relaxed font-light">
                Join the elite community of health enthusiasts who have transformed their lives 
                with our <span className="gradient-text font-semibold">revolutionary AI platform</span>.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Button
                  size="lg"
                  onClick={() => navigate('/signup')}
                  className="group text-xl px-12 py-6"
                >
                  Begin Your Transformation
                  <FiArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" />
                </Button>
                <div className="text-white/60 text-lg">
                  <span className="text-premium-gold font-bold">10,000+</span> Success Stories
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home; 