import Icon from '../Icon/Icon';
import styles from './SectionHeader.module.css'

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
 * @param {Function} [props.onIconClick] - Optional click handler for the icon.
 * @returns {JSX.Element} The rendered sectionheader element.
 */
const SectionHeader = ({variant="main", icon, text, category, onIconClick}) => {
    return (
        <div className={`${styles.sectionHeader} ${styles[variant]}`}>
            {icon? <div 
                className={`${styles.sectionHeaderIcon}`} 
                onClick={onIconClick}
                style={onIconClick ? { cursor: 'pointer' } : {}}
            >
                <Icon icon={icon} size={32}/>
            </div>: <></>}
            <span className={`${styles.sectionHeaderName}`}>
                {text}
            </span>
            {category? <>
                <span className={`${styles.sectionHeaderCategory}`}>&gt;</span>
                <span className={`${styles.sectionHeaderCategory}`}>{category}</span>
            </> : <></>}
        </div>
    );
}

export default SectionHeader