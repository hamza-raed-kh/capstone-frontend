import React from 'react';
import TextInput from './TextInput';

export default {
  title: 'Components/Inputs/TextInput',
  component: TextInput,
  parameters: {
    layout: 'padded',
  },
};

export const Default = () => (
  <div style={{ width: '400px', maxWidth: '100%' }}>
    <TextInput label="First Name" placeholder="Enter your first name" />
  </div>
);

export const ReadOnly = () => (
  <div style={{ width: '400px', maxWidth: '100%' }}>
    <TextInput label="First Name" value="Hamza" readOnly />
  </div>
);
