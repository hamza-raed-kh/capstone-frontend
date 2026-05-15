import TextInput from '../TextInput/TextInput';
import styles from './TextField.module.css'

const TextField = ({ label, pass_label = true, type = 'text', color, value, onChange, readOnly}) => {
    return (
        <div className={`${styles.row} ${readOnly ? styles.readOnly : ''}`}>
            <label
                className={styles.rowLabel}
                style={{color: color || 'var(--color-text)'}}
                htmlFor={label}
            >
                {label}
            </label>
            {/* <input className={`${styles.fieldText}`} type={type} id={label} name={label} value={value} onChange={onChange} readOnly={readOnly}/> */}
            <TextInput
                label={pass_label? label : ''}
                inlineLabel
                type={type}
                value={value}
                onChange={onChange}
                readOnly={readOnly}
            />
        </div>
    );
}

export default TextField