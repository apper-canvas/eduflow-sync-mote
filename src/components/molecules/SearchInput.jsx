import React from 'react';
import Input from '../atoms/Input';

const SearchInput = ({ searchTerm, onSearchChange, placeholder = 'Search...' }) => {
  return (
    <Input
      type="text"
      placeholder={placeholder}
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
      icon="Search"
    />
  );
};

export default SearchInput;