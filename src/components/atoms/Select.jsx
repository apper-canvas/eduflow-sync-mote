import React from 'react';

const Select = ({ value, onChange, options, className = '', required = false }) => {
  const baseClasses = "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none";

  return (
    <select
      value={value}
      onChange={onChange}
      className={`${baseClasses} ${className}`}
      required={required}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;