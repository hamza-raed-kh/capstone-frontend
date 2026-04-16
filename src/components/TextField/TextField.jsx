import style from './TextField.module.css'

const TextField = ({label, type = 'text', value, handler}) => {
    return (
        <div className={`${style.formField}`}>
            <label for={label} className={`${style.fieldLabel}`}>
                {label}
            </label>
            <input className={`${style.fieldText}`} type={type} id={label} name={label} value={value} onChange={handler}/>
        </div>
    );
}

export default TextField