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
