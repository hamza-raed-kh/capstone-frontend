import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectToasts, removeToast } from '../../features/toast/toastSlice';
import Icon from '../Icon/Icon';
import styles from './Toast.module.css';

const ToastItem = ({ id, message, type, duration }) => {
  const dispatch = useDispatch();
  const [isClosing, setIsClosing] = React.useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsClosing(true);
    }, duration);
    return () => clearTimeout(timer);
  }, [id, duration]);

  const handleRemove = () => {
    setIsClosing(true);
  };

  const onAnimationEnd = (e) => {
    // Only remove if the exit animation finished
    if (isClosing && e.animationName.includes('fadeOut')) {
      dispatch(removeToast(id));
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success': return 'mdi:check-circle';
      case 'error': return 'mdi:alert-circle';
      case 'info': return 'mdi:information';
      default: return 'mdi:bell';
    }
  };

  return (
    <div 
      className={`${styles.toast} ${styles[type]} ${isClosing ? styles.closing : ''}`} 
      role="alert"
      onAnimationEnd={onAnimationEnd}
    >
      <div className={styles.iconWrapper}>
        <Icon icon={getIcon()} size={20} />
      </div>
      <div className={styles.message}>{message}</div>
      <button 
        className={styles.closeButton} 
        onClick={handleRemove}
        aria-label="Close"
      >
        <Icon icon="mdi:close" size={16} />
      </button>
      {!isClosing && <div className={styles.progress} style={{ animationDuration: `${duration}ms` }} />}
    </div>
  );
};

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
