import React from 'react';
import Icon from '@/components/ui/Icon/Icon';
import { Button } from '../../inputs/Button/Button';
import styles from './Notification.module.css';

/**
 * Renders an inbox notification card.
 *
 * @param {Object} props
 * @param {string} props.date - The date or time string to display.
 * @param {React.ReactNode} props.children - The main content of the notification.
 * @param {Function} [props.onAccept] - Optional callback for an Accept action.
 * @param {Function} [props.onReject] - Optional callback for a Reject action.
 */

const Notification = ({ date, children, onClick, onAccept, onReject }) => {
  return (
    <div className={`${styles.notificationCard} ${onClick ? styles.clickable : ""}`} onClick={onClick}>
      {/* Row 1: Icon and Date */}
      <div className={styles.header}>
        <Icon icon="ph:bell-fill" className={styles.bellIcon} />
        <span className={styles.date}>{date}</span>
      </div>

      {/* Row 2: Content */}
      <div className={styles.content}>
        {children}
      </div>

      {/* Row 3: Actions (Optional) */}
      {(onAccept || onReject) && (
        <div className={styles.actions}>
          {onReject && (
            <Button variant="red-secondary" onClick={onReject}>
              Reject
            </Button>
          )}
          {onAccept && (
            <Button variant="primary" onClick={onAccept}>
              Accept
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default Notification;
