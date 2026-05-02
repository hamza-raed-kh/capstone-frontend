import { useState } from 'react'
import EventCard from '../EventCard/EventCard'
import SectionHeader from '../SectionHeader/SectionHeader'
import styles from './CardGroup.module.css'

/**
 * A cardgroup component with different visual styles.
 * This component supports various `variants` that apply different CSS classes
 * to the cardgroup, allowing for a consistent look and feel across the application.
 *
 * @param {object} props - The properties for the cardgroup.
 * @param {"open" | "closeable"?} [props.variant = "open"] - The visual variant of the card group.
 * @param {string?} props.icon - The string name of the section's icon (e.g., 'mdi:home').
 * @param {string?} props.title - The string name of section to be displayed inside the header.
 * @param {string?} props.category - The category name to be desplayed after the section header's name.
 * @param {Array<Object>} props.eventcards - The list of card objects that need to be rendered.
 * @returns {JSX.Element} The rendered cardgroup element.
 */
const CardGroup = ({variant = "closeable", icon, title, category, eventcards}) => {
    let [open, setOpen] = useState(true)

    const handleToggleOpen = (e) => {
        setOpen(!open);
    }

    return (
        <div className={`${styles.cardGroup}`}>
            {icon || title || category?
                (<SectionHeader
                    icon={icon}
                    title={title}
                    category={category}
                    opened={variant === 'closeable'? {open, handleToggleOpen} : null}
                />):
                (<></>)
            }
            <div className={`${styles.cards}`}>
                {open?
                    eventcards.map((_,i) => 
                        <EventCard
                            key={i}
                            variant={_.variant}
                            banner_url={_.banner_url}
                            info={_.info}
                            details={_.details}
                            button={_.button}
                            onClick={_.onClick}
                        />
                    ) :
                    (<></>)
                }
            </div>
        </div>
    );
}

export default CardGroup