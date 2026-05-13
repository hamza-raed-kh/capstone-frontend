import React, { useState } from 'react';
import NumberInput from './NumberInput';

export default {
  title: 'Components/Inputs/NumberInput',
  component: NumberInput,
  tags: ['autodocs'],
};

export const Default = {
  args: {
    label: 'Age',
    placeholder: 'Enter your age',
  },
};

export const WithValue = {
  render: (args) => {
    const [val, setVal] = useState(5);
    return <NumberInput {...args} value={val} onChange={(e) => setVal(e.target.value)} />;
  },
  args: {
    label: 'Quantity',
  },
};

export const ReadOnly = {
  args: {
    label: 'Quantity',
    value: 42,
    readOnly: true,
  },
};
