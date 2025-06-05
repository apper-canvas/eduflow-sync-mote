import React from 'react';

const Loader = ({ className = '' }) => {
  return (
    <div className={`flex items-center space-x-2 text-gray-500 ${className}`}>
      <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
      <span className="text-sm">Loading...</span>
    </div>
  );
};

export default Loader;