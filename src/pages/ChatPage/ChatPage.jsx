import ChatMessage from '../../components/ChatMessage/ChatMessage';
import SearchBar from '../../components/SearchBar/SearchBar';
import SectionHeader from '../../components/SectionHeader/SectionHeader'
import SectionedLayout from '../../layouts/SectionedLayout/SectionedLayout'
import TextInput from '../../components/inputs/TextInput/TextInput'
import styles from './ChatPage.module.css'
import ChatInput from '../../components/inputs/ChatInput/ChatInput';

/**
 * An ChatPage component with a single visual style.
 *
 * @param {object} props - The properties for the ChatPage.
 * @param {string} props.comp_name - The of the competition that the ChatMessage questions are about.
 * @param {Array<{question: string, answer: string}>} props.messages - The list of question & answer dictionaries to be used in the page's ChatMessage questions.
 * @returns {JSX.Element} The rendered ChatPage element.
 */
const ChatPage = ({ comp_name, channel_icon, channel, category, messages }) => {
    comp_name = comp_name || 'Web3 Hackathon Community'
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
        <SectionedLayout preset="community">
            <div className={styles.pageContainer}>
                <div className={styles.pageSearchSection}>
                    <SearchBar variant="placeholder">{comp_name}</SearchBar>
                </div>
                <div className={`${styles.bodyContainer}`}>
                    <div className={`${styles.bodyHeader}`}>
                        <SectionHeader icon={channel_icon} title={channel} category={category}/>
                    </div>
                    <div className={styles.bodyMessageContainer}>
                        <div className={styles.bodyMessageList}>
                            {messages.map((_,i) =>
                                <div className={`${styles.bodyMessage}`}>
                                    <ChatMessage 
                                        key={i} 
                                        variant={i == 0 || _.username != messages[i-1].username? 'default' : 'brief'} 
                                        avatar={_.avatar} 
                                        username={_.username} 
                                        timestamp={_.timestamp} 
                                        body={_.body}
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
        </SectionedLayout>
    );
}

export default ChatPage