import React, { useState } from 'react';
import GenderInput from './GenderInput';

export default {
  title: 'Components/Inputs/GenderInput',
  component: GenderInput,
  tags: ['autodocs'],
};

export const Default = {
  render: (args) => {
    const [value, setValue] = useState('');
    return <GenderInput {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Gender',
  },
};

export const MaleSelected = {
  render: (args) => {
    const [value, setValue] = useState('male');
    return <GenderInput {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Gender',
  },
};

export const FemaleSelected = {
  render: (args) => {
    const [value, setValue] = useState('female');
    return <GenderInput {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Gender',
  },
};

export const ReadOnly = {
  render: (args) => <GenderInput {...args} />,
  args: {
    label: 'Gender',
    value: 'male',
    readOnly: true,
  },
};
