import React from 'react';

const Badge = ({ children, colorClass }) => {
  return (
    <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${colorClass}`}>
      {children}
    </span>
  );
};

export default Badge;