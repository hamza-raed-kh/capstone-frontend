import React, { useRef, useState } from 'react';
import Icon from '../../Icon/Icon';
import styles from './FileInput.module.css';

const FileInput = ({ label, onChange, accept, variant = "dropzone", ...props }) => {
  const inputRef = useRef(null);
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
    } else {
      setFileName('');
    }
    if (onChange) onChange(e);
  };

  const isPill = variant === 'pill';

  return (
    <div className={styles.container}>
      {label && <label className={styles.label}>{label}</label>}

      <div
        className={isPill ? styles.pillButton : styles.dropzone}
        onClick={() => inputRef.current?.click()}
      >
        {isPill ? (
          <>
            <span className={styles.pillText}>
              {fileName ? fileName : 'Upload File'}
            </span>
            <Icon icon="mdi:upload" size={18} className={styles.pillIcon} />
          </>
        ) : (
          <>
            <div className={styles.iconWrapper}>
              <Icon icon="mdi:cloud-upload" size={32} />
            </div>
            <div className={styles.textWrapper}>
              <span className={styles.primaryText}>
                {fileName ? fileName : 'Click to upload a file'}
              </span>
              {!fileName && <span className={styles.secondaryText}>or drag and drop</span>}
            </div>
          </>
        )}
      </div>

      <input
        type="file"
        className={styles.hiddenInput}
        ref={inputRef}
        onChange={handleFileChange}
        accept={accept}
        {...props}
      />
    </div>
  );
};

export default FileInput;
