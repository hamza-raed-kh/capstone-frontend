import Icon from '../Icon/Icon';
import style from './SectionHeader.module.css'

/**
 * A sectionheader component with different visual styles.
 * This component supports various `variants` that apply different CSS classes
 * to the sectionheader, allowing for a consistent look and feel across the application.
 *
 * @param {object} props - The properties for the sectionheader.
 * @param {'main' | 'red'} [props.variant = 'main'] - The visual variant of the section header.
 * @param {string} props.icon - The string name of the section's icon (e.g., 'mdi:home').
 * @param {string} props.text - The string name of section to be displayed inside the header.
 * @param {string} props.category - The category name to be displayed after the section's name.
 * @returns {JSX.Element} The rendered sectionheader element.
 */
const SectionHeader = ({variant="main", icon, text, category}) => {
    return (
        <div className={`${style.sectionHeader} ${style[variant]}`}>
            {icon? <div className={`${style.sectionHeaderIcon}`}>
                <Icon icon={icon} size={32}/>
            </div>: <></>}
            <span className={`${style.sectionHeaderName}`}>
                {text}
            </span>
            {category? <>
                <span className={`${style.sectionHeaderCategory}`}>&gt;</span>
                <span className={`${style.sectionHeaderCategory}`}>{category}</span>
            </> : <></>}
        </div>
    );
}

export default SectionHeader