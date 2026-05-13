import TextInput from '../TextInput/TextInput';
import styles from './TextField.module.css'

const TextField = ({label, type = 'text', value, handler, readOnly}) => {
    return (
        <div className={`${styles.formField} ${readOnly ? styles.readOnly : ''}`}>
            <label className={styles.rowLabel} htmlFor={label}>{label}</label>
            {/* <input className={`${styles.fieldText}`} type={type} id={label} name={label} value={value} onChange={handler} readOnly={readOnly}/> */}
            <TextInput label={label} inlineLabel type={type} value={value} onChange={onChange} readOnly={readOnly} />
        </div>
    );
}

export default TextField