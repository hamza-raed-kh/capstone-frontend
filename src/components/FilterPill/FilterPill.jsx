import React from 'react';
import * as Select from '@radix-ui/react-select';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as Popover from '@radix-ui/react-popover';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import Icon from '../Icon/Icon';
import styles from './FilterPill.module.css';
import 'react-day-picker/style.css'; 

/**
 * An abstract filter pill component relying on Radix UI primitives for Shadcn-like popovers and animations.
 *
 * @param {Object} props
 * @param {'dropdown' | 'date' | 'checkbox' | 'multi-select'} props.type - The variant of the pill.
 * @param {string} props.label - The label for the filter (e.g. "Status", "Before").
 * @param {Array<{label: string, value: string}>} [props.options] - Options for dropdown type.
 * @param {any} [props.value] - Current state value (string for dropdown, Date for date).
 * @param {boolean} [props.checked] - Current state for checkbox type.
 * @param {Function} props.onChange - State mutator.
 * @param {any} [props.disabled] - Disabled matchers for date picker.
 * @param {Object} [props.highlightRange] - Range object {from, to} to visually select.
 */
const FilterPill = ({ type, label, options = [], value, onChange, checked, disabled, highlightRange }) => {
  if (type === 'checkbox') {
    return (
      <div className={styles.pillContainer}>
        <Checkbox.Root
          className={styles.checkboxRoot}
          checked={checked}
          onCheckedChange={onChange}
          id={`filter-${label}`}
        >
          <Checkbox.Indicator className={styles.checkboxIndicator}>
            <Icon icon="mdi:check" size={14} />
          </Checkbox.Indicator>
        </Checkbox.Root>
        <label className={styles.pillLabel} htmlFor={`filter-${label}`}>
          {label}
        </label>
      </div>
    );
  }

  if (type === 'multi-select') {
    const selectedCount = value?.length || 0;
    const displayLabel = selectedCount > 0 ? `${label} (${selectedCount})` : label;

    return (
      <Popover.Root>
        <Popover.Trigger className={styles.pillTrigger}>
          <span className={styles.labelSpan}>{displayLabel}</span>
          <Icon icon="mdi:chevron-down" size={18} className={styles.triggerIcon} />
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content className={`${styles.popoverContent} ${styles.dropdownContent}`} sideOffset={8}>
            <div className={styles.multiSelectList}>
              {options.map((opt) => {
                const isChecked = value?.includes(opt.value);
                const toggleOption = () => {
                  const newValue = isChecked
                    ? value.filter((v) => v !== opt.value)
                    : [...(value || []), opt.value];
                  onChange(newValue);
                };

                return (
                  <label key={opt.value} className={styles.multiSelectItem}>
                    <Checkbox.Root
                      className={styles.checkboxRoot}
                      checked={isChecked}
                      onCheckedChange={toggleOption}
                    >
                      <Checkbox.Indicator className={styles.checkboxIndicator}>
                        <Icon icon="mdi:check" size={14} />
                      </Checkbox.Indicator>
                    </Checkbox.Root>
                    <span className={styles.multiSelectItemText}>{opt.label}</span>
                  </label>
                );
              })}
            </div>
            <Popover.Arrow className={styles.popoverArrow} />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    );
  }

  if (type === 'dropdown') {
    return (
      <Select.Root value={value} onValueChange={onChange}>
        <Select.Trigger className={styles.pillTrigger}>
          <span className={styles.labelSpan}>{label}</span>
          <span className={styles.divider}></span>
          <Select.Value placeholder="Select..." />
          <Select.Icon className={styles.triggerIcon}>
            <Icon icon="mdi:chevron-down" size={18} />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content className={`${styles.popoverContent} ${styles.dropdownContent}`} position="popper" sideOffset={8}>
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
    );
  }

  if (type === 'date') {
    return (
      <Popover.Root>
        <Popover.Trigger className={styles.pillTrigger}>
          <span className={styles.labelSpan}>{label}</span>
          <span className={styles.divider}></span>
          <span className={styles.valueSpan}>
            {value ? format(value, 'MMM d, yyyy') : 'Pick a date'}
          </span>
          <Icon icon="mdi:calendar" size={18} className={styles.staticIcon} />
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content className={styles.popoverContent} sideOffset={8}>
            <DayPicker 
              mode="single" 
              selected={value} 
              onSelect={onChange} 
              disabled={disabled} 
              modifiers={highlightRange?.from && highlightRange?.to ? { 
                rangeMiddle: highlightRange,
                rangeStart: [highlightRange.from],
                rangeEnd: [highlightRange.to]
              } : undefined}
              modifiersClassNames={{ 
                rangeMiddle: styles.rangeMiddle,
                rangeStart: styles.rangeStart,
                rangeEnd: styles.rangeEnd
              }}
            />
            <Popover.Arrow className={styles.popoverArrow} />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    );
  }

  return null;
};

export default FilterPill;
