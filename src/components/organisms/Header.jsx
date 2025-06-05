import React from 'react';
import ApperIcon from '../ApperIcon';
import Heading from '../atoms/Heading';
import Loader from '../atoms/Loader';
import SearchInput from '../molecules/SearchInput';
import Button from '../atoms/Button';
import Avatar from '../atoms/Avatar';

const Header = ({ activeSection, loading, onSearch }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 h-16 flex items-center justify-between px-6">
      <div className="flex items-center space-x-4">
        <Heading level={2} className="capitalize">{activeSection}</Heading>
        {loading && <Loader />}
      </div>
      
      <div className="flex items-center space-x-4">
        <SearchInput onSearchChange={onSearch} />
        
        <Button variant="text" icon="Bell" className="relative p-2">
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full"></div>
        </Button>
        
        <div className="flex items-center space-x-3">
          <Avatar size="small" />
          <span className="text-sm font-medium text-gray-700">Admin User</span>
        </div>
      </div>
    </header>
  );
};

export default Header;