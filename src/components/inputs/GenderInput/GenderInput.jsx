import React from 'react';
import * as RadioGroup from '@radix-ui/react-radio-group';
import styles from './GenderInput.module.css';

const GenderInput = ({ label, value, onChange, className, inlineLabel = false, ...props }) => {
  return (
    <div className={`${styles.container} ${inlineLabel ? styles.inlineContainer : ''} ${className || ''}`}>
      {label && <span className={styles.label}>{label}</span>}
      <RadioGroup.Root 
        className={`${styles.buttonsWrapper} ${inlineLabel ? styles.inlineButtons : ''}`}
        value={value}
        onValueChange={onChange}
        {...props}
      >
        <RadioGroup.Item 
          value="male" 
          id="gender-male" 
          className={styles.button}
          data-value="male"
        >
          Male
        </RadioGroup.Item>
        
        <span className={styles.orText}>or</span>
        
        <RadioGroup.Item 
          value="female" 
          id="gender-female" 
          className={styles.button}
          data-value="female"
        >
          Female
        </RadioGroup.Item>
      </RadioGroup.Root>
    </div>
  );
};

export default GenderInput;
