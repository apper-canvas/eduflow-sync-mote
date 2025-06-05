import React from 'react';
import ApperIcon from '../ApperIcon';

const Avatar = ({ initials, icon, size = 'medium', bgColor = 'bg-gradient-to-br from-primary to-primary-light', textColor = 'text-white' }) => {
  const sizeClasses = {
    small: 'w-8 h-8 text-sm',
    medium: 'w-10 h-10 text-base',
    large: 'w-16 h-16 text-xl',
  };

  return (
    <div className={`${sizeClasses[size]} ${bgColor} rounded-full flex items-center justify-center`}>
      {icon ? (
        <ApperIcon name={icon} className={`${size === 'small' ? 'w-4 h-4' : size === 'medium' ? 'w-6 h-6' : 'w-10 h-10'} ${textColor}`} />
      ) : (
        <span className={`font-medium ${textColor}`}>{initials}</span>
      )}
    </div>
  );
};

export default Avatar;