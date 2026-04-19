import React, { useState } from 'react';
import PasswordInput from './PasswordInput';

export default {
  title: 'Components/Inputs/PasswordInput',
  component: PasswordInput,
  parameters: {
    layout: 'padded',
  },
};

export const Default = () => {
  const [password, setPassword] = useState('');

  return (
    <div style={{ width: '400px', maxWidth: '100%' }}>
      <PasswordInput 
        label="Password" 
        placeholder="Enter your password" 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
  );
};
