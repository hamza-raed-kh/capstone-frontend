import React from 'react';
import { Icon as IconifyIcon } from '@iconify/react';
import styles from './Icon.module.css';

/**
 * A flexible wrapper around the Iconify component.
 * Allows using string icon names from the Iconify ecosystem
 * and provides a consistent way to style colors and sizes.
 *
 * @param {Object} props
 * @param {string} props.icon - The string name of the icon (e.g., 'mdi:home').
 * @param {string} [props.color] - Optional explicit color. Defaults to inherited standard color.
 * @param {number|string} [props.size=24] - Size of the icon.
 * @param {string} [props.className] - Additional classes.
 */
const Icon = ({ icon, color, size = 24, className = '', ...props }) => {
  return (
    <IconifyIcon
      icon={icon}
      width={size}
      height={size}
      className={`${styles.icon} ${className}`}
      style={{ color: color || 'inherit' }}
      {...props}
    />
  );
};

export default Icon;
