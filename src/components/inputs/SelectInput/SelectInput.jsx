import React from 'react';
import * as Select from '@radix-ui/react-select';
import Icon from '../../Icon/Icon';
import styles from './SelectInput.module.css';

const SelectInput = ({ label, placeholder = "Select...", options = [], value, onChange, variant = "form", ...props }) => {
  const isFilter = variant === 'filter';

  return (
    <div className={isFilter ? styles.filterContainer : styles.container}>
      {!isFilter && label && <label className={styles.label}>{label}</label>}
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
    </div>
  );
};

export default SelectInput;
