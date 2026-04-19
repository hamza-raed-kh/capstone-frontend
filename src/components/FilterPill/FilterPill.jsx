import React from 'react';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as Popover from '@radix-ui/react-popover';
import Icon from '../Icon/Icon';
import SelectInput from '../inputs/SelectInput/SelectInput';
import DateInput from '../inputs/DateInput/DateInput';
import styles from './FilterPill.module.css';

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
      <SelectInput
        variant="filter"
        label={label}
        options={options}
        value={value}
        onChange={onChange}
      />
    );
  }

  if (type === 'date') {
    return (
      <DateInput
        variant="filter"
        label={label}
        value={value}
        onChange={onChange}
        disabled={disabled}
        modifiers={highlightRange?.from && highlightRange?.to ? {
          rangeMiddle: highlightRange,
          rangeStart: [highlightRange.from],
          rangeEnd: [highlightRange.to]
        } : undefined}
        modifiersClassNames={{
          rangeMiddle: 'rangeMiddle',
          rangeStart: 'rangeStart',
          rangeEnd: 'rangeEnd'
        }}
      />
    );
  }

  return null;
};

export default FilterPill;
