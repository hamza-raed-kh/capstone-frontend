import React, { useRef, useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import Icon from '../../ui/Icon/Icon';
import styles from './FileInput.module.css';

const FileInput = forwardRef(({ label, onChange, accept, variant = "dropzone", placeholder, previewUrl, readOnly = false, ...props }, ref) => {
  const inputRef = useRef(null);
  const [fileName, setFileName] = useState('');
  const [internalPreview, setInternalPreview] = useState(null);

  useImperativeHandle(ref, () => ({
    click: () => inputRef.current?.click(),
    get input() { return inputRef.current; }
  }));

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      if (variant === 'avatar' || variant === 'banner' || props.showPreview) {
        setInternalPreview(URL.createObjectURL(file));
      }
    } else {
      setFileName('');
      setInternalPreview(null);
    }
    if (onChange) onChange(e);
  };

  useEffect(() => {
    setInternalPreview(null);
  }, [previewUrl]);

  const isPill = variant === 'pill';
  const isAvatar = variant === 'avatar';
  const isBanner = variant === 'banner';
  const displayPlaceholder = placeholder || (isPill ? 'Upload File' : (isAvatar ? 'Upload photo' : (isBanner ? 'Upload banner' : 'Click to upload a file')));
  const currentPreview = previewUrl || internalPreview;

  const handleClick = () => {
    if (!readOnly) inputRef.current?.click();
  };

  const renderContent = () => {
    if (isAvatar) {
      return (
        <div className={styles.avatarWrapper} onClick={handleClick}>
          {currentPreview ? (
            <img src={currentPreview} alt="Avatar Preview" className={styles.avatarImage} />
          ) : (
            <div className={styles.avatarPlaceholder}>
              <Icon icon="mdi:account-circle" size={48} />
            </div>
          )}
          {!readOnly && (
          <div className={styles.avatarEditIcon}>
            <Icon icon="mdi:camera" size={16} />
          </div>
          )}
        </div>
      );
    }

    if (isBanner) {
      return (
        <div
          className={styles.banner}
          onClick={handleClick}
          style={currentPreview ? { backgroundImage: `url(${currentPreview})` } : {}}
        >
          <div className={`${styles.bannerUploadBtn} ${currentPreview ? styles.bannerUploadBtnOverlay : ''}`}>
            <Icon icon="mdi:upload" size={24} />
            <span>{displayPlaceholder}</span>
          </div>
        </div>
      );
    }

    return (
      <div
        className={isPill ? styles.pillButton : styles.dropzone}
        onClick={handleClick}
      >
        {isPill ? (
          <>
            <span className={styles.pillText}>
              {fileName ? fileName : displayPlaceholder}
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
                {fileName ? fileName : displayPlaceholder}
              </span>
              {!fileName && <span className={styles.secondaryText}>or drag and drop</span>}
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <div className={`${styles.container} ${readOnly ? styles.readOnly : ''}`}>
      {label && <label className={styles.label}>{label}</label>}
      {renderContent()}
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
});


FileInput.displayName = 'FileInput';

export default FileInput;
