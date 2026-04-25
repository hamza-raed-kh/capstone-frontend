import React, { createContext, useContext, useState, useEffect } from 'react';
import * as Checkbox from '@radix-ui/react-checkbox';
import Icon from '../../Icon/Icon';
import styles from './CheckboxInput.module.css';

const CheckboxGroupContext = createContext(null);

export const CheckboxGroup = ({ 
  children, 
  label, 
  value = [], 
  onChange, 
  direction = 'column', 
  maxSelection,
  className,
  ...props 
}) => {
  const [internalValue, setInternalValue] = useState(value);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const handleItemCheck = (itemValue, isChecked) => {
    let newValue;
    if (isChecked) {
      if (maxSelection && internalValue.length >= maxSelection) {
        return; 
      }
      newValue = [...internalValue, itemValue];
    } else {
      newValue = internalValue.filter(v => v !== itemValue);
    }
    
    setInternalValue(newValue);
    if (onChange) onChange(newValue);
  };

  const contextValue = {
    selectedValues: internalValue,
    onItemCheck: handleItemCheck,
    maxReached: maxSelection ? internalValue.length >= maxSelection : false
  };

  return (
    <CheckboxGroupContext.Provider value={contextValue}>
      <div className={className} {...props}>
        {label && <div className={styles.groupLabel}>{label}</div>}
        <div className={styles.groupContainer} data-direction={direction}>
          {children}
        </div>
      </div>
    </CheckboxGroupContext.Provider>
  );
};

export const CheckboxInput = ({ label, value, checked, onChange, disabled, ...props }) => {
  const groupContext = useContext(CheckboxGroupContext);
  
  if (groupContext) {
    const isChecked = groupContext.selectedValues.includes(value);
    const isDisabled = disabled || (groupContext.maxReached && !isChecked);
    
    return (
      <label className={styles.itemContainer}>
        <Checkbox.Root
          className={styles.checkboxRoot}
          checked={isChecked}
          onCheckedChange={(c) => groupContext.onItemCheck(value, c)}
          disabled={isDisabled}
          id={`checkbox-${value}`}
          {...props}
        >
          <Checkbox.Indicator className={styles.checkboxIndicator}>
            <Icon icon="mdi:check" size={14} />
          </Checkbox.Indicator>
        </Checkbox.Root>
        {label && (
          <span className={styles.itemLabel} data-disabled={isDisabled ? '' : undefined}>
            {label}
          </span>
        )}
      </label>
    );
  }

  return (
    <label className={styles.itemContainer}>
      <Checkbox.Root
        className={styles.checkboxRoot}
        checked={checked}
        onCheckedChange={onChange}
        disabled={disabled}
        id={`checkbox-${label}`}
        {...props}
      >
        <Checkbox.Indicator className={styles.checkboxIndicator}>
          <Icon icon="mdi:check" size={14} />
        </Checkbox.Indicator>
      </Checkbox.Root>
      {label && (
        <span className={styles.itemLabel} data-disabled={disabled ? '' : undefined}>
          {label}
        </span>
      )}
    </label>
  );
};

export default CheckboxInput;
