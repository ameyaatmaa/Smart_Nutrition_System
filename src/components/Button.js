import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  onClick, 
  disabled = false, 
  className = '',
  type = 'button',
  loading = false,
  ...props 
}) => {
  const baseClasses = 'font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-950';
  
  const variants = {
    primary: 'bg-gradient-to-r from-accent-purple to-accent-pink text-white hover:scale-105 hover:shadow-lg hover:shadow-accent-purple/30 focus:ring-accent-purple',
    secondary: 'bg-dark-700 text-white border border-dark-600 hover:bg-dark-600 hover:border-dark-500 focus:ring-dark-500',
    outline: 'bg-transparent text-white border-2 border-accent-purple hover:bg-accent-purple/10 focus:ring-accent-purple',
    ghost: 'bg-transparent text-white hover:bg-white/10 focus:ring-white/20',
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };
  
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed hover:scale-100 hover:shadow-none' : '';
  
  return (
    <motion.button
      type={type}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${disabledClasses} ${className}`}
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={!disabled && !loading ? { scale: 1.05 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.95 } : {}}
      {...props}
    >
      {loading ? (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
          Loading...
        </div>
      ) : (
        children
      )}
    </motion.button>
  );
};

export default Button; 