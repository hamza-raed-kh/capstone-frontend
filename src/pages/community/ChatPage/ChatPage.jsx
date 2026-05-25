import ChatMessage from '../../../components/data/ChatMessage/ChatMessage';
import SectionHeader from '../../../components/ui/SectionHeader/SectionHeader'
import styles from './ChatPage.module.css'
import ChatInput from '../../../components/inputs/ChatInput/ChatInput';

const ChatPage = ({ channel_icon, channel, category, messages }) => {
    channel_icon = channel_icon || 'tabler:hash'
    channel = channel || 'General'
    category = category || 'Official'
    messages = messages || [
        {
            variant: "default",
            username: "Hamza Kh",
            avatar: "https://imgs.search.brave.com/Nu92Ba-Z_C_AJh8giZUFnICO6fmpksx3f_IwdQ58Srk/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/c3RvY2t2YXVsdC5u/ZXQvZGF0YS8yMDE1/LzA5LzA2LzE3Nzk1/OC90aHVtYjE2Lmpw/Zw",
            timestamp: new Date(),
            body: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Lorem ipsum dolor sit amet consectetur adipiscing elit. Lorem ipsum dolor sit amet consectetur adipiscing elit.",
        },
        {
            variant: "default",
            username: "Hamza Kh",
            avatar: "https://imgs.search.brave.com/Nu92Ba-Z_C_AJh8giZUFnICO6fmpksx3f_IwdQ58Srk/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/c3RvY2t2YXVsdC5u/ZXQvZGF0YS8yMDE1/LzA5LzA2LzE3Nzk1/OC90aHVtYjE2Lmpw/Zw",
            timestamp: new Date(),
            body: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Lorem ipsum dolor sit amet consectetur adipiscing elit. Lorem ipsum dolor sit amet consectetur adipiscing elit.",
        },
        {
            variant: "default",
            username: "Amr Mh",
            avatar: "https://imgs.search.brave.com/Nu92Ba-Z_C_AJh8giZUFnICO6fmpksx3f_IwdQ58Srk/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/c3RvY2t2YXVsdC5u/ZXQvZGF0YS8yMDE1/LzA5LzA2LzE3Nzk1/OC90aHVtYjE2Lmpw/Zw",
            timestamp: new Date(),
            body: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Lorem ipsum dolor sit amet consectetur adipiscing elit. Lorem ipsum dolor sit amet consectetur adipiscing elit.",
        },
        {
            variant: "default",
            username: "Amr Mh",
            avatar: "https://imgs.search.brave.com/Nu92Ba-Z_C_AJh8giZUFnICO6fmpksx3f_IwdQ58Srk/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/c3RvY2t2YXVsdC5u/ZXQvZGF0YS8yMDE1/LzA5LzA2LzE3Nzk1/OC90aHVtYjE2Lmpw/Zw",
            timestamp: new Date(),
            body: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Lorem ipsum dolor sit amet consectetur adipiscing elit. Lorem ipsum dolor sit amet consectetur adipiscing elit.",
        },
        {
            variant: "default",
            username: "Hamza Kh",
            avatar: "https://imgs.search.brave.com/Nu92Ba-Z_C_AJh8giZUFnICO6fmpksx3f_IwdQ58Srk/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/c3RvY2t2YXVsdC5u/ZXQvZGF0YS8yMDE1/LzA5LzA2LzE3Nzk1/OC90aHVtYjE2Lmpw/Zw",
            timestamp: new Date(),
            body: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Lorem ipsum dolor sit amet consectetur adipiscing elit. Lorem ipsum dolor sit amet consectetur adipiscing elit.",
        },
        {
            variant: "default",
            username: "Hamza Kh",
            avatar: "https://imgs.search.brave.com/Nu92Ba-Z_C_AJh8giZUFnICO6fmpksx3f_IwdQ58Srk/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/c3RvY2t2YXVsdC5u/ZXQvZGF0YS8yMDE1/LzA5LzA2LzE3Nzk1/OC90aHVtYjE2Lmpw/Zw",
            timestamp: new Date(),
            body: "Lorem ipsum dolor sit amet consectetur adipiscing elit.",
        },
        {
            variant: "brief",
            username: "Hamza Kh",
            avatar: "https://imgs.search.brave.com/Nu92Ba-Z_C_AJh8giZUFnICO6fmpksx3f_IwdQ58Srk/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/c3RvY2t2YXVsdC5u/ZXQvZGF0YS8yMDE1/LzA5LzA2LzE3Nzk1/OC90aHVtYjE2Lmpw/Zw",
            timestamp: new Date(),
            body: "Lorem ipsum dolor sit amet consectetur adipiscing elit.",
        },
        {
            variant: "default",
            username: "Amr Mh",
            avatar: "https://imgs.search.brave.com/Nu92Ba-Z_C_AJh8giZUFnICO6fmpksx3f_IwdQ58Srk/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/c3RvY2t2YXVsdC5u/ZXQvZGF0YS8yMDE1/LzA5LzA2LzE3Nzk1/OC90aHVtYjE2Lmpw/Zw",
            timestamp: new Date(),
            body: "Lorem ipsum dolor sit amet consectetur adipiscing elit.",
        },
        {
            variant: "default",
            username: "Hamza Kh",
            avatar: "https://imgs.search.brave.com/Nu92Ba-Z_C_AJh8giZUFnICO6fmpksx3f_IwdQ58Srk/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/c3RvY2t2YXVsdC5u/ZXQvZGF0YS8yMDE1/LzA5LzA2LzE3Nzk1/OC90aHVtYjE2Lmpw/Zw",
            timestamp: new Date(),
            body: "Lorem ipsum dolor sit amet consectetur adipiscing elit.",
        },
    ]

    return (
        <div className={styles.pageContainer}>
            <div className={styles.bodyContainer}>
                <div className={styles.bodyHeader}>
                    <SectionHeader icon={channel_icon} title={channel} category={category}/>
                </div>
                <div className={styles.bodyMessageContainer}>
                    <div className={styles.bodyMessageList}>
                        {messages.map((msg, i) =>
                            <div className={styles.bodyMessage} key={i}>
                                <ChatMessage
                                    variant={i == 0 || msg.username != messages[i-1].username ? 'default' : 'brief'}
                                    avatar={msg.avatar}
                                    username={msg.username}
                                    timestamp={msg.timestamp}
                                    body={msg.body}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className={styles.pageWriteSection}>
                <ChatInput/>
            </div>
        </div>
    );
}

export default ChatPage