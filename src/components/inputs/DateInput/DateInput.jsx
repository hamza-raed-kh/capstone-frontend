import React, { useState } from 'react';
import * as Popover from '@radix-ui/react-popover';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import Icon from '../../ui/Icon/Icon';
import styles from './DateInput.module.css';

const DateInput = ({ label, placeholder = "Pick a date", value, onChange, disabled, variant = "form", inlineLabel = false, readOnly = false, ...props }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isFilter = variant === 'filter';
  const resolvedPlaceholder = inlineLabel ? label : placeholder;

  return (
    <div className={`${isFilter ? styles.filterContainer : styles.container} ${readOnly ? styles.readOnly : ''}`}>
      {!isFilter && label && !inlineLabel && <label className={styles.label}>{label}</label>}
      {readOnly ? (
        <div className={isFilter ? styles.filterTrigger : styles.trigger}>
          {isFilter && (
            <>
              <span className={styles.labelSpan}>{label}</span>
              <span className={styles.divider}></span>
            </>
          )}
          <span className={value ? styles.valueText : styles.placeholderText}>
            {value ? format(value, 'MMM d, yyyy') : resolvedPlaceholder}
          </span>
        </div>
      ) : (
      <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
        <Popover.Trigger className={isFilter ? styles.filterTrigger : styles.trigger}>
          {isFilter && (
            <>
              <span className={styles.labelSpan}>{label}</span>
              <span className={styles.divider}></span>
            </>
          )}
          <span className={value ? styles.valueText : styles.placeholderText}>
            {value ? format(value, 'MMM d, yyyy') : resolvedPlaceholder}
          </span>
          <Icon icon="mdi:calendar" size={isFilter ? 18 : 20} className={styles.icon} />
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content className={styles.popoverContent} sideOffset={8}>
            <DayPicker
              mode="single"
              selected={value}
              defaultMonth={value || new Date()}
              onSelect={(date) => {
                if (onChange) onChange(date);
                setIsOpen(false);
              }}
              captionLayout="dropdown"
              startMonth={new Date(1900, 0)}
              disabled={disabled}
              {...props}
            />
            <Popover.Arrow className={styles.popoverArrow} />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
      )}
    </div>
  );
};

export default DateInput;
