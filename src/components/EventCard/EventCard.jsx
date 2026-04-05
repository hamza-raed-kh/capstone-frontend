import './EventCard.css'
import Icon from '../Icon/Icon';
import { Button } from '../Button/Button';
import CategoryTag from '../CategoryTag/CategoryTag';

/**
 * An eventcard component with different visual styles.
 * This component supports various `variants` that apply different CSS classes
 * to the eventcard, allowing for a consistent look and feel across the application.
 *
 * @param {object} props - The properties for the eventcard.
 * @param {'search' | 'placeholder'} [props.variant='search'] - The visual variant of the eventcard.
 * @param {React.ReactNode} props.children - The content to be displayed inside the eventcard.
 * @param {Function} props.onClick - The function to be called when the eventcard is clicked.
 * @returns {JSX.Element} The rendered eventcard element.
 */
function EventCard({ banner_url, info, details, button, onClick }){
    // banner_url = "https://img.freepik.com/premium-photo/abstract-rainbow-colorful-bright-feather-closeup-up-macro-view-background-plumage-texture-withlet -dew-drops_753134-644.jpg?w=2000"
    // info = {title: "Web3 Hackathon", description: "Create decentralized applications using blockchain technology and smart  contracts. Build innovative DeFi, NFT, or DAO solutions that"}
    // details = {prize: "Prize", participants_now: "Now", participants_max: "Max", date_start: "Start", date_end: "End", location: "Location", categories: ["Crypto"]}
    // button = {variant: "primary", children: "Apply"}

    return (
        <div className="eventcard" onClick={onClick}>
            <img className="eventcard-banner" src={banner_url} alt="" />
            <div className="eventcard-info">
                <p className="eventcard-info-title">{info.title}</p>
                <p className="eventcard-info-description">{info.description}</p>
            </div>
            <div className="eventcard-details">
                <div className="eventcard-details-first">
                    <div className="eventcard-details-prize">
                        <div className="eventcard-details-prize-icon">
                            <Icon/>
                        </div>
                        <span className="eventcard-details-prize-text">{details.prize}</span>
                    </div>
                    <div className="eventcard-details-participants">
                        <div className="eventcard-details-participants-icon">
                            <Icon/>
                        </div>
                        <span className="eventcard-details-participants-text">{details.participants_now}/{details.participants_max}</span>
                    </div>
                </div>
                <div className="eventcard-details-dates">
                    <div className="eventcard-details-dates-icon">
                        <Icon/>
                    </div>
                    <span className="eventcard-details-dates-text">{details.date_start} - {details.date_end}</span>
                </div>
                <div className="eventcard-details-location">
                    <div className="eventcard-details-location-icon">
                        <Icon/>
                    </div>
                    <span className="eventcard-details-location-text">{details.location}</span>
                </div>
                <div className="eventcard-details-categories">
                    {Array.from(details.categories, (_,i) => <CategoryTag key={i} text={_}/>)}
                </div>
            </div>
            <div className="eventcard-buttons">
                <Button variant={button.variant} children={button.children} onClick={onClick}/>
            </div>
        </div>
    );
}

export default EventCard