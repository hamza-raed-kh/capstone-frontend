import React, { useRef } from 'react';
import styles from './TextArea.module.css';

const TextArea = ({ label, placeholder, value, onChange, rows = 4, inlineLabel = false, ...props }) => {
  const textareaRef = useRef(null);
  const resolvedPlaceholder = inlineLabel ? label : placeholder;

  const handlePointerDown = (e) => {
    e.preventDefault();
    const startY = e.clientY;
    const startHeight = textareaRef.current.getBoundingClientRect().height;

    const handlePointerMove = (moveEvent) => {
      // Calculate new height, restrict to a sensible minimum to prevent collapsing completely
      const newHeight = Math.max(80, startHeight + (moveEvent.clientY - startY));
      textareaRef.current.style.height = `${newHeight}px`;
    };

    const handlePointerUp = () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
  };

  return (
    <div className={styles.container}>
      {label && !inlineLabel && <label className={styles.label} htmlFor={label}>{label}</label>}
      <div className={styles.textareaWrapper}>
        <textarea
          ref={textareaRef}
          id={label} 
          className={styles.textarea} 
          placeholder={resolvedPlaceholder}
          value={value}
          onChange={onChange}
          rows={rows}
          {...props}
        />
        <div 
          className={styles.customResizer}
          onPointerDown={handlePointerDown}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
            <path fill="currentColor" d="M22 22H20V20H22V22ZM22 18H20V16H22V18ZM18 22H16V20H18V22ZM18 18H16V16H18V18ZM14 22H12V20H14V22Z"/>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default TextArea;
