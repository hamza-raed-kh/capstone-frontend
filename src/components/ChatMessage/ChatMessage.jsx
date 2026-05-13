import { useNavigate } from 'react-router-dom';
import styles from './ChatMessage.module.css'

/**
 * A chatmessage component with different visual styles.
 * This component supports various `variants` that apply different CSS classes
 * to the chatmessage, allowing for a consistent look and feel across the application.
 *
 * @param {object} props - The properties for the chatmessage.
 * @param {'default' | 'brief'} props.variant - The name of the message sender.
 * @param {string} props.username - The name of the message sender.
 * @param {string} props.avatar - The path to the sender's avatar.
 * @param {string} props.timestamp - The timestamp of when the message was sent.
 * @param {string} props.body - The text content of the message.
 * @returns {JSX.Element} The rendered chatmessage element.
 */
const ChatMessage = ({ variant = 'default', avatar, username, timestamp, body }) => {
  const navigate = useNavigate();

  const redirectProfile = () => {
    navigate('/profile');
  }

    const timeSent = () => {
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        // timestamp.setDate(timestamp.getDate() - 1);

        let now = new Date();
        let days_ago = (now - timestamp) / (1000 * 60 * 60 * 24);
        let year = timestamp.getFullYear();
        let month = timestamp.getMonth();
        let date = timestamp.getDate();
        let day = timestamp.getDay();
        let hours = timestamp.getHours();
        let minutes = timestamp.getMinutes();

        let daySent = () => {
            if (days_ago < 7) {
                return day !== now.getDay()? days[day]: 'Today';
            }
            return `${date}/${month}/${year}`;
        };

        return `${daySent()} at ${hours}:${minutes}`;
    }

    return (
        <div className={`${styles.messageContainer} ${variant == 'brief'? '' : styles.topMessage}`}>
            <div className={`${styles.messageAvatarContainer}`}>
                {variant === 'default'? <img className={`${styles.messageAvatar}`} src={avatar} alt={'Name'} onClick={redirectProfile}/> : ''}
            </div>
            <div className={`${styles.messageBlock}`}>
                {variant === 'default'?
                (<div className={`${styles.messageHeader}`}>
                    <span className={`${styles.messageUsername}`} onClick={redirectProfile}>{username}</span>
                    <span className={`${styles.messageTimeStamp}`}>{timeSent()}</span>
                </div>) : ''}
                <p className={`${styles.messageBody}`}>{body}</p>
            </div>
        </div>
    );
}

export default ChatMessage
