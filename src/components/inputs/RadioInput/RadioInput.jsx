import React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import styles from './RadioInput.module.css';

export const RadioGroup = ({ 
  children, 
  label, 
  value, 
  defaultValue,
  onChange, 
  direction = 'column', 
  className,
  readOnly = false,
  ...props 
}) => {
  return (
    <div className={`${className || ''} ${readOnly ? styles.readOnly : ''}`}>
      {label && <div className={styles.groupLabel}>{label}</div>}
      <RadioGroupPrimitive.Root
        className={styles.groupContainer}
        data-direction={direction}
        value={value}
        defaultValue={defaultValue}
        onValueChange={readOnly ? undefined : onChange}
        disabled={readOnly}
        {...props}
      >
        {children}
      </RadioGroupPrimitive.Root>
    </div>
  );
};

export const RadioInput = ({ label, value, disabled, readOnly = false, ...props }) => {
  return (
    <label className={`${styles.itemContainer} ${readOnly ? styles.readOnly : ''}`}>
      <RadioGroupPrimitive.Item
        className={styles.radioRoot}
        value={value}
        disabled={disabled || readOnly}
        id={`radio-${value}`}
        {...props}
      >
        <RadioGroupPrimitive.Indicator className={styles.radioIndicator} />
      </RadioGroupPrimitive.Item>
      {label && (
        <span className={styles.itemLabel} data-disabled={(disabled || readOnly) ? '' : undefined}>
          {label}
        </span>
      )}
    </label>
  );
};

export default RadioInput;
