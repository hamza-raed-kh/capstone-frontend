import { useState, useEffect } from 'react';
import cardStyles from '../EventCard/EventCard.module.css';
import Icon from '../../ui/Icon/Icon';
import { Button } from '../../inputs/Button/Button';
import CategoryTag from '../../ui/CategoryTag/CategoryTag';

const AdminEventCard = ({ banner_url, info, details, onClick, hideBanner }) => {
    const [imgError, setImgError] = useState(false)
    useEffect(() => { setImgError(false) }, [banner_url])
    const showPlaceholder = !banner_url || imgError

    const handleButtonClick = (handler) => (e) => {
        e.stopPropagation();
        handler();
    };

    return (
        <div className={cardStyles.eventcard} onClick={onClick.view}>
            {!hideBanner && (showPlaceholder ? (
                <div className={`${cardStyles.eventcardBanner} ${cardStyles.eventcardBannerPlaceholder}`}>
                    <span className={cardStyles.eventcardBannerText}>{info?.title || "Event"}</span>
                </div>
            ) : (
                <img className={cardStyles.eventcardBanner} src={banner_url} alt="" onError={() => setImgError(true)} />
            ))}
            <div className={cardStyles.eventcardInfo}>
                <p className={cardStyles.eventcardInfoTitle}>{info.title}</p>
                <p className={cardStyles.eventcardInfoDescription}>{info.description}</p>
            </div>
            <div className={cardStyles.eventcardDetails}>
                <div className={cardStyles.eventcardDetailsFirst}>
                    <div className={cardStyles.eventcardDetailsPrize}>
                        <div className={cardStyles.eventcardDetailsPrizeIcon}>
                            <Icon icon={"solar:cup-star-bold"} size={14} />
                        </div>
                        <span className={cardStyles.eventcardDetailsPrizeText}>{details.prize}</span>
                    </div>
                    <div className={cardStyles.eventcardDetailsParticipants}>
                        <div className={cardStyles.eventcardDetailsParticipantsIcon}>
                            <Icon icon={"ic:round-people"} size={14} />
                        </div>
                        <span className={cardStyles.eventcardDetailsParticipantsText}>{details.participants_now}/{details.participants_max}</span>
                    </div>
                </div>
                <div className={cardStyles.eventcardDetailsDates}>
                    <div className={cardStyles.eventcardDetailsDatesIcon}>
                        <Icon icon={"fluent:calendar-24-filled"} size={14} />
                    </div>
                    <span className={cardStyles.eventcardDetailsDatesText}>{details.date_start} - {details.date_end}</span>
                </div>
                <div className={cardStyles.eventcardDetailsLocation}>
                    <div className={cardStyles.eventcardDetailsLocationIcon}>
                        <Icon icon={"mingcute:location-fill"} size={14} />
                    </div>
                    <span className={cardStyles.eventcardDetailsLocationText}>
                        {details.virtual ? "Virtual" : details.location}
                    </span>
                </div>
                <div className={cardStyles.eventcardDetailsCategories}>
                    {details.categories.map((_, i) => <CategoryTag key={i} text={_} />)}
                </div>
            </div>
            <div className={cardStyles.eventcardButtons}>
                <div className={cardStyles.eventcardButtonsReject}>
                    <Button variant={"red-secondary"} children={"Reject"} onClick={handleButtonClick(onClick.reject)} />
                </div>
                <div className={cardStyles.eventcardButtonsApprove}>
                    <Button variant={"secondary"} children={"Approve"} onClick={handleButtonClick(onClick.approve)} />
                </div>
                <div className={cardStyles.eventcardButtonsView}>
                    <Button variant={"primary"} children={"View"} onClick={handleButtonClick(onClick.view)} />
                </div>
            </div>
        </div>
    );
}

export default AdminEventCard;
