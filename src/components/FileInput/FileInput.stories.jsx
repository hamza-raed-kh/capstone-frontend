import React from 'react';
import FileInput from './FileInput';

export default {
  title: 'Components/Inputs/FileInput',
  component: FileInput,
  parameters: {
    layout: 'padded',
  },
};

export const Default = () => (
  <div style={{ width: '400px', maxWidth: '100%' }}>
    <FileInput label="Upload Document" />
  </div>
);

export const Pill = () => (
  <div style={{ width: '400px', maxWidth: '100%' }}>
    <FileInput label="Upload Document" variant="pill" />
  </div>
);
