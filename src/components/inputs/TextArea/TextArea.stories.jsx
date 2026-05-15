import React, { useState } from 'react';
import TextArea from './TextArea';

export default {
  title: 'Components/Inputs/TextArea',
  component: TextArea,
  tags: ['autodocs'],
};

export const Default = {
  args: {
    label: 'Description',
    placeholder: 'Enter a detailed description...',
  },
};

export const WithValue = {
  render: (args) => {
    const [val, setVal] = useState('This is an example of feedback content inside a textarea.');
    return <TextArea {...args} value={val} onChange={(e) => setVal(e.target.value)} />;
  },
  args: {
    label: 'Feedback',
  },
};

export const ReadOnly = {
  args: {
    label: 'Feedback',
    value: 'This is read-only feedback content that cannot be edited.',
    readOnly: true,
  },
};
