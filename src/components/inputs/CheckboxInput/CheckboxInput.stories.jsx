import React, { useState } from 'react';
import { CheckboxInput, CheckboxGroup } from './CheckboxInput';

export default {
  title: 'Components/Inputs/Checkbox',
  component: CheckboxInput,
  tags: ['autodocs'],
};

export const Standalone = {
  args: {
    label: 'Accept Terms and Conditions',
    checked: true,
  },
};

export const Group = () => {
  const [selected, setSelected] = useState(['apple']);
  
  return (
    <CheckboxGroup 
      label="Select Fruits (Max 2)" 
      value={selected} 
      onChange={setSelected}
      direction="row"
      maxSelection={2}
    >
      <CheckboxInput label="Apple" value="apple" />
      <CheckboxInput label="Banana" value="banana" />
      <CheckboxInput label="Cherry" value="cherry" />
      <CheckboxInput label="Date" value="date" />
    </CheckboxGroup>
  );
};
