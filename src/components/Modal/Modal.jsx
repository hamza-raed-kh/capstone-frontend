import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import Icon from '../Icon/Icon';
import styles from './Modal.module.css';

/**
 * A reusable Modal component powered by Radix UI Dialog.
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether the modal is currently open
 * @param {Function} props.onClose - Function to call when closing the modal
 * @param {string} props.title - The title of the modal
 * @param {React.ReactNode} props.children - The content to render inside the modal
 */
const Modal = ({ isOpen, onClose, title, children }) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content className={styles.content} aria-describedby={undefined}>
          <div className={styles.header}>
            <Dialog.Title className={styles.title}>{title}</Dialog.Title>
            <Dialog.Close asChild>
              <button className={styles.closeButton} aria-label="Close">
                <Icon icon="mdi:close" size={24} />
              </button>
            </Dialog.Close>
          </div>
          <div className={styles.body}>
            {children}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;
