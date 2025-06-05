import React from 'react';

const Heading = ({ children, level = 1, className = '' }) => {
  const Tag = `h${level}`;
  const baseClasses = 'text-gray-900';
  let sizeClasses = '';

  switch (level) {
    case 1:
      sizeClasses = 'text-3xl font-bold';
      break;
    case 2:
      sizeClasses = 'text-2xl font-bold';
      break;
    case 3:
      sizeClasses = 'text-lg font-semibold';
      break;
    case 4:
      sizeClasses = 'text-base font-medium';
      break;
    case 5:
      sizeClasses = 'text-sm font-medium';
      break;
    case 6:
      sizeClasses = 'text-xs font-medium';
      break;
    default:
      sizeClasses = 'text-lg font-semibold';
  }

  return (
    <Tag className={`${baseClasses} ${sizeClasses} ${className}`}>
      {children}
    </Tag>
  );
};

export default Heading;