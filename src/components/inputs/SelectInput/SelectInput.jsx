import React from 'react';
import * as Select from '@radix-ui/react-select';
import Icon from '../../Icon/Icon';
import styles from './SelectInput.module.css';

const SelectInput = ({ label, placeholder = "Select...", options = [], value, onChange, variant = "form", readOnly = false, ...props }) => {
  const isFilter = variant === 'filter';
  const selectedOption = options.find(o => o.value === value);

  return (
    <div className={`${isFilter ? styles.filterContainer : styles.container} ${readOnly ? styles.readOnly : ''}`}>
      {!isFilter && label && <label className={styles.label}>{label}</label>}
      {readOnly ? (
        <div className={isFilter ? styles.filterTrigger : styles.trigger}>
          {isFilter && (
            <>
              <span className={styles.labelSpan}>{label}</span>
              <span className={styles.divider}></span>
            </>
          )}
          <span className={value ? styles.valueText : styles.placeholderText}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>
      ) : (
      <Select.Root value={value} onValueChange={onChange} {...props}>
        <Select.Trigger className={isFilter ? styles.filterTrigger : styles.trigger}>
          {isFilter && (
            <>
              <span className={styles.labelSpan}>{label}</span>
              <span className={styles.divider}></span>
            </>
          )}
          <Select.Value placeholder={placeholder} />
          <Select.Icon className={styles.triggerIcon}>
            <Icon icon="mdi:chevron-down" size={isFilter ? 18 : 20} />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content className={styles.popoverContent} position="popper" sideOffset={8}>
            <Select.Viewport className={styles.selectViewport}>
              {options.map((opt) => (
                <Select.Item key={opt.value} value={opt.value} className={styles.selectItem}>
                  <Select.ItemText>{opt.label}</Select.ItemText>
                  <Select.ItemIndicator className={styles.selectItemIndicator}>
                    <Icon icon="mdi:check" size={16} />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
      )}
    </div>
  );
};

export default SelectInput;
