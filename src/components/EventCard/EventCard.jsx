import style from './EventCard.module.css'
import Icon from '../Icon/Icon';
import { Button } from '../Button/Button';
import CategoryTag from '../CategoryTag/CategoryTag';

/**
 * An eventcard component with different visual styles.
 * This component supports various `variants` that apply different CSS classes
 * to the eventcard, allowing for a consistent look and feel across the application.
 *
 * @param {object} props - The properties for the eventcard.
 * @param {'main' | 'admin'} [props.variant='search'] - The visual variant of the eventcard.
 * @param {string} props.banner_url - The url of the event banner to be displayed at the top of the eventcard.
 * @param {object} props.info - The title & description to be displayed inside the eventcard.
 * @param {object} props.details - The details to be displayed inside the eventcard.
 * @param {object} props.button - The props to be passed to the button at the bottom of the eventcard.
 * @param {Object} props.onClick - The function to be called when the eventcard is clicked.
 * @returns {JSX.Element} The rendered eventcard element.
 */
function EventCard({ variant = 'main', banner_url, info, details, button, onClick }){
    // banner_url = "https://img.freepik.com/premium-photo/abstract-rainbow-colorful-bright-feather-closeup-up-macro-view-background-plumage-texture-withlet -dew-drops_753134-644.jpg?w=2000"
    // info = {title: "Web3 Hackathon", description: "Create decentralized applications using blockchain technology and smart  contracts. Build innovative DeFi, NFT, or DAO solutions that"}
    // details = {prize: "Prize", participants_now: "Now", participants_max: "Max", date_start: "Start", date_end: "End", virtual: true, location: "Location", categories: ["Crypto"]}
    // button = {variant: "primary", children: "Apply"}

    function renderButtons(){
        if (variant === 'main')
            return (
                <Button variant={button.variant} children={button.children} onClick={ onClick !== undefined && "view" in onClick ? onClick.view : null }/>
            );
        else if (variant === 'admin')
            return (
                <>
                    <div className={`${style.eventcardButtonsReject}`}>
                        <Button variant={"red-secondary"} children={"Reject"} onClick={onClick.reject}/>
                    </div>
                    <div className={`${style.eventcardButtonsApprove}`}>
                        <Button variant={"secondary"} children={"Approve"} onClick={onClick.approve}/>
                    </div>
                    <div className={`${style.eventcardButtonsView}`}>
                        <Button variant={"primary"} children={"View"} onClick={onClick.view}/>
                    </div>
                </>
            );
    }

    return (
        <div className={`${style.eventcard}`} onClick={ onClick.view }>
            <img className={`${style.eventcardBanner}`} src={banner_url} alt="" />
            <div className={`${style.eventcardInfo}`}>
                <p className={`${style.eventcardInfoTitle}`}>{info.title}</p>
                <p className={`${style.eventcardInfoDescription}`}>{info.description}</p>
            </div>
            <div className={`${style.eventcardDetails}`}>
                <div className={`${style.eventcardDetailsFirst}`}>
                    <div className={`${style.eventcardDetailsPrize}`}>
                        <div className={`${style.eventcardDetailsPrizeIcon}`}>
                            <Icon icon={"solar:cup-star-bold"} size={14}/>
                        </div>
                        <span className={`${style.eventcardDetailsPrizeText}`}>{details.prize}</span>
                    </div>
                    <div className={`${style.eventcardDetailsParticipants}`}>
                        <div className={`${style.eventcardDetailsParticipantsIcon}`}>
                            <Icon icon={"ic:round-people"} size={14}/>
                        </div>
                        <span className={`${style.eventcardDetailsParticipantsText}`}>{details.participants_now}/{details.participants_max}</span>
                    </div>
                </div>
                <div className={`${style.eventcardDetailsDates}`}>
                    <div className={`${style.eventcardDetailsDatesIcon}`}>
                        <Icon icon={"fluent:calendar-24-filled"} size={14}/>
                    </div>
                    <span className={`${style.eventcardDetailsDatesText}`}>{details.date_start} - {details.date_end}</span>
                </div>
                <div className={`${style.eventcardDetailsLocation}`}>
                    <div className={`${style.eventcardDetailsLocationIcon}`}>
                        <Icon icon={"mingcute:location-fill"} size={14}/>
                    </div>
                    <span className={`${style.eventcardDetailsLocationText}`}>
                        {details.virtual? "Virtual" : details.location}
                    </span>
                </div>
                <div className={`${style.eventcardDetailsCategories}`}>
                    {Array.from(details.categories, (_,i) => <CategoryTag key={i} text={_}/>)}
                </div>
            </div>
            <div className={`${style.eventcardButtons}`}>
                { renderButtons() }
            </div>
        </div>
    );
}

export default EventCard