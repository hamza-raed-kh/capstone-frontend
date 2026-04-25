import styles from './TextInput.module.css';

const TextInput = ({ label, placeholder, value, onChange, type = "text", inlineLabel = false, ...props }) => {
  const resolvedPlaceholder = inlineLabel ? label : placeholder;

  return (
    <div className={styles.container}>
      {label && !inlineLabel && <label className={styles.label} htmlFor={label}>{label}</label>}
      <input 
        type={type} 
        id={label} 
        className={styles.input} 
        placeholder={resolvedPlaceholder}
        value={value}
        onChange={onChange}
        {...props}
      />
    </div>
  );
};

export default TextInput;
