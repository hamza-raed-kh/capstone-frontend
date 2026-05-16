import React, { useState } from 'react';
import Modal from './Modal';
import { Button } from '../../inputs/Button/Button';
import TextInput from '../../inputs/TextInput/TextInput';
import FileInput from '../../inputs/FileInput/FileInput';

export default {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
};

export const Default = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Button variant="primary" onClick={() => setIsOpen(true)}>
        Open Edit Profile
      </Button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Edit Profile">
        <p style={{ marginBottom: '24px' }}>
          Make changes to your profile here. Click save when you're done.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <Button variant="secondary" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => setIsOpen(false)}>
            Save Changes
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export const FormExample = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Button variant="primary" onClick={() => setIsOpen(true)}>
        Edit Profile (Form)
      </Button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Edit Your Profile">
        <form style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginTop: '16px' }} onSubmit={(e) => { e.preventDefault(); setIsOpen(false); }}>
          
          <TextInput 
            label="Name" 
            placeholder="Hamza Khattab" 
          />
          
          <FileInput 
            label="Profile Picture" 
            accept="image/*"
          />

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
            <Button variant="secondary" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => setIsOpen(false)}>
              Save
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
