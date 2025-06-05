import React from 'react';
import ApperIcon from '../ApperIcon';

const Input = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  className = '',
  icon,
  rows,
  required = false
}) => {
  const baseClasses = "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none";
  const inputClasses = icon ? "pl-10" : "";

  if (type === 'textarea') {
    return (
      <textarea
        rows={rows}
        value={value}
        onChange={onChange}
        required={required}
        className={`${baseClasses} ${className}`}
        placeholder={placeholder}
      ></textarea>
    );
  }

  return (
    <div className="relative">
      {icon && (
        <ApperIcon name={icon} className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={`${baseClasses} ${inputClasses} ${className}`}
      />
    </div>
  );
};

export default Input;