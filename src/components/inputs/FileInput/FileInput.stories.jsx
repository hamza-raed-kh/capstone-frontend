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

export const ReadOnly = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '400px' }}>
    <FileInput label="Document (read-only)" variant="dropzone" readOnly />
    <FileInput label="File (read-only)" variant="pill" readOnly />
  </div>
);
