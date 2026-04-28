import React from 'react';
import { useSelector } from 'react-redux';
import { selectToasts } from '../../features/toast/toastSlice';
import ToastItem from './ToastItem';
import styles from './Toast.module.css';

/**
 * Global Toast Container
 * Listens to the toast slice and renders active notifications.
 */
const ToastContainer = () => {
  const toasts = useSelector(selectToasts);

  return (
    <div className={styles.container}>
      {toasts.map((toast) => (
        <ToastItem key={toast.id} {...toast} />
      ))}
    </div>
  );
};

export default ToastContainer;

