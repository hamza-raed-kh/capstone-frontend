import TextInput from '../TextInput/TextInput';
import styles from './TextField.module.css'

const TextField = ({label, type = 'text', value, onChange}) => {
    return (
        <div className={styles.row}>
            <label className={styles.rowLabel} htmlFor={label}>{label}</label>
            <TextInput label={label} inlineLabel type={type} value={value} onChange={onChange} />
        </div>
    );
}

export default TextField