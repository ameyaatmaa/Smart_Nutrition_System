import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const InputField = ({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  required = false,
  className = '',
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const inputType = type === 'password' && showPassword ? 'text' : type;
  const hasValue = value && value.length > 0;

  return (
    <div className={`relative ${className}`}>
      <motion.div
        className={`relative ${error ? 'animate-shake' : ''}`}
        animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
        transition={{ duration: 0.3 }}
      >
        <input
          type={inputType}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`w-full px-4 py-3 bg-dark-800 border rounded-lg text-white 
                     placeholder-transparent focus:outline-none focus:ring-2 
                     transition-all duration-300 ${
                       error 
                         ? 'border-red-500 focus:ring-red-500' 
                         : 'border-dark-600 focus:ring-accent-purple focus:border-transparent'
                     }`}
          placeholder={placeholder}
          required={required}
          {...props}
        />
        
        <label
          className={`absolute left-4 transition-all duration-300 pointer-events-none ${
            isFocused || hasValue
              ? '-top-2 left-3 text-xs bg-dark-950 px-2 text-accent-purple'
              : 'top-3 text-dark-400'
          }`}
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>

        {type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-dark-400 hover:text-white transition-colors"
          >
            {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
          </button>
        )}
      </motion.div>

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-500 text-sm mt-1 ml-1"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};

export default InputField; 