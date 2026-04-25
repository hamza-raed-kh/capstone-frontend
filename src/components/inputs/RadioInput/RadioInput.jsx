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
  ...props 
}) => {
  return (
    <div className={className}>
      {label && <div className={styles.groupLabel}>{label}</div>}
      <RadioGroupPrimitive.Root
        className={styles.groupContainer}
        data-direction={direction}
        value={value}
        defaultValue={defaultValue}
        onValueChange={onChange}
        {...props}
      >
        {children}
      </RadioGroupPrimitive.Root>
    </div>
  );
};

export const RadioInput = ({ label, value, disabled, ...props }) => {
  return (
    <label className={styles.itemContainer}>
      <RadioGroupPrimitive.Item
        className={styles.radioRoot}
        value={value}
        disabled={disabled}
        id={`radio-${value}`}
        {...props}
      >
        <RadioGroupPrimitive.Indicator className={styles.radioIndicator} />
      </RadioGroupPrimitive.Item>
      {label && (
        <span className={styles.itemLabel} data-disabled={disabled ? '' : undefined}>
          {label}
        </span>
      )}
    </label>
  );
};

export default RadioInput;
