import React, { useRef } from 'react';
import Icon from '../../Icon/Icon';
import styles from './NumberInput.module.css';

const NumberInput = ({ label, placeholder, inlineLabel = false, value, onChange, min = 1, max, step = 1, ...props }) => {
  const inputRef = useRef(null);

  const handleStep = (direction, e) => {
    e.preventDefault();
    if (!inputRef.current) return;
    
    if (direction === 'up') {
      inputRef.current.stepUp();
    } else {
      inputRef.current.stepDown();
    }
    
    // Manually trigger the onChange event since stepUp/stepDown don't fire React's onChange
    if (onChange) {
      const event = new Event('change', { bubbles: true });
      inputRef.current.dispatchEvent(event);
      // We pass a synthetic-like object as fallback if dispatchEvent behaves unexpectedly in React 19
      onChange({ target: inputRef.current });
    }
  };

  return (
    <div className={styles.container}>
      {label && !inlineLabel && <label className={styles.label} htmlFor={label}>{label}</label>}
      <div className={styles.inputWrapper}>
        <input 
          ref={inputRef}
          type="number"
          id={label} 
          className={styles.input} 
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          min={min}
          max={max}
          step={step}
          {...props}
        />
        <div className={styles.spinnerControls}>
          <button 
            type="button" 
            className={styles.spinButton} 
            onClick={(e) => handleStep('up', e)}
            tabIndex="-1"
          >
            <Icon icon="mdi:chevron-up" size={16} />
          </button>
          <button 
            type="button" 
            className={styles.spinButton} 
            onClick={(e) => handleStep('down', e)}
            tabIndex="-1"
          >
            <Icon icon="mdi:chevron-down" size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NumberInput;
