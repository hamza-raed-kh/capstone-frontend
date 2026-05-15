import React, { useState } from 'react';
import DateInput from './DateInput';

export default {
  title: 'Components/Inputs/DateInput',
  component: DateInput,
  parameters: {
    layout: 'padded',
  },
};

export const Default = () => {
  const [date, setDate] = useState();
  
  return (
    <div style={{ width: '400px', maxWidth: '100%' }}>
      <DateInput 
        label="Date of Birth" 
        value={date}
        onChange={setDate}
      />
    </div>
  );
};

export const Filter = () => {
  const [date, setDate] = useState();
  
  return (
    <DateInput 
      variant="filter"
      label="Created After" 
      value={date}
      onChange={setDate}
    />
  );
};

export const ReadOnly = () => (
  <div style={{ width: '400px', maxWidth: '100%' }}>
    <DateInput 
      label="Date of Birth" 
      value={new Date(2000, 0, 15)}
      readOnly
    />
  </div>
);

export const ReadOnlyFilter = () => (
  <DateInput 
    variant="filter"
    label="Created After" 
    value={new Date(2025, 5, 1)}
    readOnly
  />
);
