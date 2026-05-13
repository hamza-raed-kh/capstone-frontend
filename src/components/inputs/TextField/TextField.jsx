import TextInput from '../TextInput/TextInput';
import styles from './TextField.module.css'

const TextField = ({ label, pass_label = true, type = 'text', color, value, onChange }) => {
    return (
        <div className={styles.row}>
            <label className={styles.rowLabel} style={{color: color || 'var(--color-text)'}} htmlFor={label}>{label}</label>
            <TextInput
                label={pass_label? label : ''}
                inlineLabel
                type={type}
                value={value}
                onChange={onChange}
            />
        </div>
    );
}

export default TextField