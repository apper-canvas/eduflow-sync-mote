import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '../ApperIcon';

const Button = ({
  children,
  onClick,
  icon,
  variant = 'primary', // primary, secondary, accent, text, outline, danger
  size = 'medium', // small, medium, large
  className = '',
  disabled = false,
  type = 'button',
  whileHover = { scale: 1.05 },
  whileTap = { scale: 0.95 }
}) => {
  const baseClasses = 'flex items-center justify-center transition-all duration-200 rounded-lg';
  let variantClasses = '';
  let sizeClasses = '';

  switch (variant) {
    case 'primary':
      variantClasses = 'bg-primary text-white hover:bg-primary-dark shadow-soft';
      break;
    case 'secondary':
      variantClasses = 'bg-secondary text-white hover:bg-secondary-dark';
      break;
    case 'accent':
      variantClasses = 'bg-accent text-white hover:bg-yellow-600';
      break;
    case 'text':
      variantClasses = 'text-gray-500 hover:text-gray-700 hover:bg-gray-100';
      break;
    case 'outline':
      variantClasses = 'text-gray-700 border border-gray-300 hover:bg-gray-50';
      break;
    case 'danger':
      variantClasses = 'text-red-700 border border-red-300 hover:bg-red-50';
      break;
    default:
      break;
  }

  switch (size) {
    case 'small':
      sizeClasses = 'px-3 py-1 text-sm space-x-1';
      break;
    case 'medium':
      sizeClasses = 'px-4 py-2 text-base space-x-2';
      break;
    case 'large':
      sizeClasses = 'px-6 py-3 text-lg space-x-3';
      break;
    default:
      break;
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      whileHover={whileHover}
      whileTap={whileTap}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {icon && <ApperIcon name={icon} className={`w-4 h-4 ${children ? '' : ''}`} />}
      {children}
    </motion.button>
  );
};

export default Button;