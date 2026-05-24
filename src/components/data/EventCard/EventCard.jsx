import styles from './EventCard.module.css'
import Icon from '../../ui/Icon/Icon';
import { Button } from '../../inputs/Button/Button';
import CategoryTag from '../../ui/CategoryTag/CategoryTag';

/**
 * An eventcard component with different visual styles.
 * This component supports various `variants` that apply different CSS classes
 * to the eventcard, allowing for a consistent look and feel across the application.
 *
 * @param {object} props - The properties for the eventcard.
 * @param {'main' | 'clean'} [props.variant='main'] - The visual variant of the eventcard.
 * @param {string} props.banner_url - The url of the event banner to be displayed at the top of the eventcard.
 * @param {object} props.info - The title & description to be displayed inside the eventcard.
 * @param {object} props.details - The details to be displayed inside the eventcard.
 * @param {object} props.button - The props to be passed to the button at the bottom of the eventcard.
 * @param {Object} props.onClick - The function to be called when the eventcard is clicked.
 * @returns {JSX.Element} The rendered eventcard element.
 */
const EventCard = ({ variant = 'main', banner_url, info, details, button, onClick }) => {
    const renderButtons = () => {
        switch(variant) {
            case 'main':
                return (
                    <Button variant={button.variant} children={button.children} onClick={onClick !== undefined && "view" in onClick ? onClick.view : null} />
                );
            
            case 'clean':
                return(<></>);
            
        }
    }

    if (variant === 'create') {
        return (
            <div className={styles.eventcardCreate} onClick={onClick.view}>
                <div className={styles.eventcardCreateContent}>
                    <Button variant="secondary" onClick={onClick.view}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                            <Icon icon="mdi:plus" size={20} /> Create New
                        </span>
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className={`${styles.eventcard}`} onClick={onClick.view}>
            <img className={`${styles.eventcardBanner}`} src={banner_url} alt="" />
            <div className={`${styles.eventcardInfo}`}>
                <p className={`${styles.eventcardInfoTitle}`}>{info.title}</p>
                <p className={`${styles.eventcardInfoDescription}`}>{info.description}</p>
            </div>
            <div className={`${styles.eventcardDetails}`}>
                <div className={`${styles.eventcardDetailsFirst}`}>
                    <div className={`${styles.eventcardDetailsPrize}`}>
                        <div className={`${styles.eventcardDetailsPrizeIcon}`}>
                            <Icon icon={"solar:cup-star-bold"} size={14} />
                        </div>
                        <span className={`${styles.eventcardDetailsPrizeText}`}>{details.prize}</span>
                    </div>
                    <div className={`${styles.eventcardDetailsParticipants}`}>
                        <div className={`${styles.eventcardDetailsParticipantsIcon}`}>
                            <Icon icon={"ic:round-people"} size={14} />
                        </div>
                        <span className={`${styles.eventcardDetailsParticipantsText}`}>{details.participants_now}/{details.participants_max}</span>
                    </div>
                </div>
                <div className={`${styles.eventcardDetailsDates}`}>
                    <div className={`${styles.eventcardDetailsDatesIcon}`}>
                        <Icon icon={"fluent:calendar-24-filled"} size={14} />
                    </div>
                    <span className={`${styles.eventcardDetailsDatesText}`}>{details.date_start} - {details.date_end}</span>
                </div>
                <div className={`${styles.eventcardDetailsLocation}`}>
                    <div className={`${styles.eventcardDetailsLocationIcon}`}>
                        <Icon icon={"mingcute:location-fill"} size={14} />
                    </div>
                    <span className={`${styles.eventcardDetailsLocationText}`}>
                        {details.virtual ? "Virtual" : details.location}
                    </span>
                </div>
                <div className={`${styles.eventcardDetailsCategories}`}>
                    {details.categories.map((_, i) => <CategoryTag key={i} text={_} />)}
                </div>
            </div>
            <div className={`${styles.eventcardButtons}`}>
                {renderButtons()}
            </div>
        </div>
    );
}

export default EventCard