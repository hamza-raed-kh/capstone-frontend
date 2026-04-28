import React, { useState } from 'react';
import { RadioInput, RadioGroup } from './RadioInput';

export default {
  title: 'Components/Inputs/Radio',
  component: RadioInput,
  tags: ['autodocs'],
};

export const Group = () => {
  const [selected, setSelected] = useState('apple');
  
  return (
    <RadioGroup 
      label="Select your favorite fruit" 
      value={selected} 
      onChange={setSelected}
      direction="column"
    >
      <RadioInput label="Apple" value="apple" />
      <RadioInput label="Banana" value="banana" />
      <RadioInput label="Cherry" value="cherry" />
      <RadioInput label="Date" value="date" disabled />
    </RadioGroup>
  );
};

export const RowDirection = () => {
  return (
    <RadioGroup 
      label="Gender" 
      defaultValue="female"
      direction="row"
    >
      <RadioInput label="Male" value="male" />
      <RadioInput label="Female" value="female" />
      <RadioInput label="Other" value="other" />
    </RadioGroup>
  );
};
