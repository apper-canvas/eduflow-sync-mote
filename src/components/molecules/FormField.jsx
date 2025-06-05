import React from 'react';
import Label from '../atoms/Label';
import Input from '../atoms/Input';
import Select from '../atoms/Select';

const FormField = ({ label, type, value, onChange, options, className, required, rows, icon }) => {
  return (
    <div className={className}>
      <Label>{label}</Label>
      {type === 'select' ? (
        <Select value={value} onChange={onChange} options={options} required={required} />
      ) : (
        <Input type={type} value={value} onChange={onChange} required={required} rows={rows} icon={icon} />
      )}
    </div>
  );
};

export default FormField;