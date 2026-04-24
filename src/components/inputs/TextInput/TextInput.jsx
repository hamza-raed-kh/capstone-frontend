import styles from './TextInput.module.css';

const TextInput = ({ label, placeholder, value, onChange, type = "text", ...props }) => {
  return (
    <div className={styles.container}>
      {label && <label className={styles.label} htmlFor={label}>{label}</label>}
      <input 
        type={type} 
        id={label} 
        className={styles.input} 
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...props}
      />
    </div>
  );
};

export default TextInput;
