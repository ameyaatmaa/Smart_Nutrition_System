import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheckCircle, FiXCircle, FiInfo, FiAlertTriangle, FiX } from 'react-icons/fi';

const Toast = ({ 
  message, 
  type = 'info', 
  isVisible, 
  onClose, 
  duration = 5000 
}) => {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  const icons = {
    success: <FiCheckCircle className="text-green-400" size={20} />,
    error: <FiXCircle className="text-red-400" size={20} />,
    warning: <FiAlertTriangle className="text-yellow-400" size={20} />,
    info: <FiInfo className="text-blue-400" size={20} />,
  };

  const colors = {
    success: 'border-green-500/20 bg-green-500/10',
    error: 'border-red-500/20 bg-red-500/10',
    warning: 'border-yellow-500/20 bg-yellow-500/10',
    info: 'border-blue-500/20 bg-blue-500/10',
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className={`fixed top-4 right-4 z-50 max-w-sm w-full ${colors[type]} border rounded-lg p-4 shadow-lg backdrop-blur-md`}
        >
          <div className="flex items-start space-x-3">
            {icons[type]}
            <div className="flex-1">
              <p className="text-white text-sm font-medium">{message}</p>
            </div>
            <button
              onClick={onClose}
              className="text-white/60 hover:text-white transition-colors"
            >
              <FiX size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast; 