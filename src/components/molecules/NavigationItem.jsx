import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ApperIcon from '../ApperIcon';

const NavigationItem = ({ item, activeSection, sidebarCollapsed, onClick }) => {
  return (
    <motion.button
      onClick={() => item.active && onClick(item.id)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`w-full flex items-center p-3 rounded-xl transition-all duration-200 ${
        activeSection === item.id && item.active
          ? 'bg-primary text-white shadow-soft'
          : item.active
          ? 'text-gray-700 hover:bg-gray-100'
          : 'text-gray-400 cursor-not-allowed'
      }`}
    >
      <ApperIcon name={item.icon} className="w-5 h-5" />
      <AnimatePresence>
        {!sidebarCollapsed && (
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="ml-3 font-medium"
          >
            {item.label}
          </motion.span>
        )}
      </AnimatePresence>
      {!item.active && !sidebarCollapsed && (
        <div className="ml-auto">
          <div className="w-2 h-2 bg-accent rounded-full"></div>
        </div>
      )}
    </motion.button>
  );
};

export default NavigationItem;