import React, { useState } from 'react';
import Icon from '../../Icon/Icon';
import styles from './PasswordInput.module.css';

const PasswordInput = ({ label, placeholder, value, onChange, inlineLabel = false, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);
  const resolvedPlaceholder = inlineLabel ? label : placeholder;

  return (
    <div className={styles.container}>
      {label && !inlineLabel && <label className={styles.label}>{label}</label>}
      <div className={styles.inputWrapper}>
        <input
          type={showPassword ? "text" : "password"}
          className={styles.input}
          placeholder={resolvedPlaceholder}
          value={value}
          onChange={onChange}
          {...props}
        />
        <button
          type="button"
          className={styles.toggleButton}
          onClick={() => setShowPassword(!showPassword)}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          <Icon icon={showPassword ? "mdi:eye-off" : "mdi:eye"} size={20} />
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;
