import styles from './TextField.module.css'

const TextField = ({label, type = 'text', value, handler, readOnly}) => {
    return (
        <div className={`${styles.formField} ${readOnly ? styles.readOnly : ''}`}>
            <label for={label} className={`${styles.fieldLabel}`}>
                {label}
            </label>
            <input className={`${styles.fieldText}`} type={type} id={label} name={label} value={value} onChange={handler} readOnly={readOnly}/>
        </div>
    );
}

export default TextField