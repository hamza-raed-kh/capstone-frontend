import React, { useState } from 'react';
import SelectInput from './SelectInput';

export default {
  title: 'Components/Inputs/SelectInput',
  component: SelectInput,
  parameters: {
    layout: 'padded',
  },
};

export const Default = () => {
  const [value, setValue] = useState('');
  
  return (
    <div style={{ width: '400px', maxWidth: '100%' }}>
      <SelectInput 
        label="Role" 
        placeholder="Select your role"
        value={value}
        onChange={setValue}
        options={[
          { label: 'Administrator', value: 'admin' },
          { label: 'Moderator', value: 'mod' },
          { label: 'Standard User', value: 'user' }
        ]} 
      />
    </div>
  );
};

export const Filter = () => {
  const [value, setValue] = useState('');
  
  return (
    <SelectInput 
      variant="filter"
      label="Status" 
      placeholder="All"
      value={value}
      onChange={setValue}
      options={[
        { label: 'Active', value: 'active' },
        { label: 'Pending', value: 'pending' },
        { label: 'Closed', value: 'closed' }
      ]} 
    />
  );
};

export const ReadOnly = () => (
  <div style={{ width: '400px', maxWidth: '100%' }}>
    <SelectInput 
      label="Role" 
      value="admin"
      readOnly
      options={[
        { label: 'Administrator', value: 'admin' },
        { label: 'Moderator', value: 'mod' },
        { label: 'Standard User', value: 'user' }
      ]} 
    />
  </div>
);

export const ReadOnlyFilter = () => (
  <SelectInput 
    variant="filter"
    label="Status" 
    value="active"
    readOnly
    options={[
      { label: 'Active', value: 'active' },
      { label: 'Pending', value: 'pending' },
      { label: 'Closed', value: 'closed' }
    ]} 
  />
);
