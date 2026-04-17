import styles from './TextField.module.css'

const TextField = ({label, type = 'text', value, handler}) => {
    return (
        <div className={`${styles.formField}`}>
            <label for={label} className={`${styles.fieldLabel}`}>
                {label}
            </label>
            <input className={`${styles.fieldText}`} type={type} id={label} name={label} value={value} onChange={handler}/>
        </div>
    );
}

export default TextField