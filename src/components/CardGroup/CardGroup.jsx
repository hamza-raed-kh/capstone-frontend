import EventCard from '../EventCard/EventCard'
import SectionHeader from '../SectionHeader/SectionHeader'
import style from './CardGroup.module.css'

/**
 * A cardgroup component with a single visual style.
 *
 * @param {object} props - The properties for the cardgroup.
 * @param {string} props.icon - The string name of the section's icon (e.g., 'mdi:home').
 * @param {string} props.text - The string name of section to be displayed inside the header.
 * @param {string} props.category - The category name to be desplayed after the section header's name.
 * @param {Array<Object>} props.eventcards - The category name to be desplayed after the section header's name.
 * @returns {JSX.Element} The rendered cardgroup element.
 */
function CardSection({icon, text, category, eventcards}){
    return (
        <div className={`${style.cardGroup}`}>
            <SectionHeader icon={icon} text={text} category={category}/>
            <div className={`${style.cards}`}>
                {Array.from(eventcards, (_,i) => <EventCard key={i} banner_url={_.banner_url} info={_.info} details={_.details} button={_.button}/>)}
            </div>
        </div>
    );
}

export default CardSection