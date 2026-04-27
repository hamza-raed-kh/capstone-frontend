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
            avatar: "https://search.beastfly.win/image_proxy?url=https%3A%2F%2Fimgs.search.brave.com%2FhnQ7lLSxa7xnk1DpWsDAFdSYVQLnjb7yvJoewqqY0A4%2Frs%3Afit%3A500%3A0%3A1%3A0%2Fg%3Ace%2FaHR0cHM6Ly9zaG9w%2FLnJveWFsYXJhYmlh%2FbnMuY29tL2Nkbi9z%2FaG9wL2ZpbGVzL2dh%2FemFsLWFsLXNoYXFh%2FYi0wMS5qcGc_dj0x%2FNzExMTQ0NTIyJndp%2FZHRoPTE5NDY&h=71e621cb5ee255464f3a58550b8e7e77233f06862f8af1687ec1973cda9fd8c4",
            timestamp: new Date(),
            body: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Lorem ipsum dolor sit amet consectetur adipiscing elit. Lorem ipsum dolor sit amet consectetur adipiscing elit.",
        },
        {
            variant: "default",
            username: "Hamza Kh",
            avatar: "https://search.beastfly.win/image_proxy?url=https%3A%2F%2Fimgs.search.brave.com%2FhnQ7lLSxa7xnk1DpWsDAFdSYVQLnjb7yvJoewqqY0A4%2Frs%3Afit%3A500%3A0%3A1%3A0%2Fg%3Ace%2FaHR0cHM6Ly9zaG9w%2FLnJveWFsYXJhYmlh%2FbnMuY29tL2Nkbi9z%2FaG9wL2ZpbGVzL2dh%2FemFsLWFsLXNoYXFh%2FYi0wMS5qcGc_dj0x%2FNzExMTQ0NTIyJndp%2FZHRoPTE5NDY&h=71e621cb5ee255464f3a58550b8e7e77233f06862f8af1687ec1973cda9fd8c4",
            timestamp: new Date(),
            body: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Lorem ipsum dolor sit amet consectetur adipiscing elit. Lorem ipsum dolor sit amet consectetur adipiscing elit.",
        },
        {
            variant: "default",
            username: "Amr Mh",
            avatar: "https://search.beastfly.win/image_proxy?url=https%3A%2F%2Fimgs.search.brave.com%2FhnQ7lLSxa7xnk1DpWsDAFdSYVQLnjb7yvJoewqqY0A4%2Frs%3Afit%3A500%3A0%3A1%3A0%2Fg%3Ace%2FaHR0cHM6Ly9zaG9w%2FLnJveWFsYXJhYmlh%2FbnMuY29tL2Nkbi9z%2FaG9wL2ZpbGVzL2dh%2FemFsLWFsLXNoYXFh%2FYi0wMS5qcGc_dj0x%2FNzExMTQ0NTIyJndp%2FZHRoPTE5NDY&h=71e621cb5ee255464f3a58550b8e7e77233f06862f8af1687ec1973cda9fd8c4",
            timestamp: new Date(),
            body: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Lorem ipsum dolor sit amet consectetur adipiscing elit. Lorem ipsum dolor sit amet consectetur adipiscing elit.",
        },
        {
            variant: "default",
            username: "Amr Mh",
            avatar: "https://search.beastfly.win/image_proxy?url=https%3A%2F%2Fimgs.search.brave.com%2FhnQ7lLSxa7xnk1DpWsDAFdSYVQLnjb7yvJoewqqY0A4%2Frs%3Afit%3A500%3A0%3A1%3A0%2Fg%3Ace%2FaHR0cHM6Ly9zaG9w%2FLnJveWFsYXJhYmlh%2FbnMuY29tL2Nkbi9z%2FaG9wL2ZpbGVzL2dh%2FemFsLWFsLXNoYXFh%2FYi0wMS5qcGc_dj0x%2FNzExMTQ0NTIyJndp%2FZHRoPTE5NDY&h=71e621cb5ee255464f3a58550b8e7e77233f06862f8af1687ec1973cda9fd8c4",
            timestamp: new Date(),
            body: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Lorem ipsum dolor sit amet consectetur adipiscing elit. Lorem ipsum dolor sit amet consectetur adipiscing elit.",
        },
        {
            variant: "default",
            username: "Hamza Kh",
            avatar: "https://search.beastfly.win/image_proxy?url=https%3A%2F%2Fimgs.search.brave.com%2FhnQ7lLSxa7xnk1DpWsDAFdSYVQLnjb7yvJoewqqY0A4%2Frs%3Afit%3A500%3A0%3A1%3A0%2Fg%3Ace%2FaHR0cHM6Ly9zaG9w%2FLnJveWFsYXJhYmlh%2FbnMuY29tL2Nkbi9z%2FaG9wL2ZpbGVzL2dh%2FemFsLWFsLXNoYXFh%2FYi0wMS5qcGc_dj0x%2FNzExMTQ0NTIyJndp%2FZHRoPTE5NDY&h=71e621cb5ee255464f3a58550b8e7e77233f06862f8af1687ec1973cda9fd8c4",
            timestamp: new Date(),
            body: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Lorem ipsum dolor sit amet consectetur adipiscing elit. Lorem ipsum dolor sit amet consectetur adipiscing elit.",
        },
        {
            variant: "default",
            username: "Hamza Kh",
            avatar: "https://search.beastfly.win/image_proxy?url=https%3A%2F%2Fimgs.search.brave.com%2FhnQ7lLSxa7xnk1DpWsDAFdSYVQLnjb7yvJoewqqY0A4%2Frs%3Afit%3A500%3A0%3A1%3A0%2Fg%3Ace%2FaHR0cHM6Ly9zaG9w%2FLnJveWFsYXJhYmlh%2FbnMuY29tL2Nkbi9z%2FaG9wL2ZpbGVzL2dh%2FemFsLWFsLXNoYXFh%2FYi0wMS5qcGc_dj0x%2FNzExMTQ0NTIyJndp%2FZHRoPTE5NDY&h=71e621cb5ee255464f3a58550b8e7e77233f06862f8af1687ec1973cda9fd8c4",
            timestamp: new Date(),
            body: "Lorem ipsum dolor sit amet consectetur adipiscing elit.",
        },
        {
            variant: "brief",
            username: "Hamza Kh",
            avatar: "https://search.beastfly.win/image_proxy?url=https%3A%2F%2Fimgs.search.brave.com%2FhnQ7lLSxa7xnk1DpWsDAFdSYVQLnjb7yvJoewqqY0A4%2Frs%3Afit%3A500%3A0%3A1%3A0%2Fg%3Ace%2FaHR0cHM6Ly9zaG9w%2FLnJveWFsYXJhYmlh%2FbnMuY29tL2Nkbi9z%2FaG9wL2ZpbGVzL2dh%2FemFsLWFsLXNoYXFh%2FYi0wMS5qcGc_dj0x%2FNzExMTQ0NTIyJndp%2FZHRoPTE5NDY&h=71e621cb5ee255464f3a58550b8e7e77233f06862f8af1687ec1973cda9fd8c4",
            timestamp: new Date(),
            body: "Lorem ipsum dolor sit amet consectetur adipiscing elit.",
        },
        {
            variant: "default",
            username: "Amr Mh",
            avatar: "https://search.beastfly.win/image_proxy?url=https%3A%2F%2Fimgs.search.brave.com%2FhnQ7lLSxa7xnk1DpWsDAFdSYVQLnjb7yvJoewqqY0A4%2Frs%3Afit%3A500%3A0%3A1%3A0%2Fg%3Ace%2FaHR0cHM6Ly9zaG9w%2FLnJveWFsYXJhYmlh%2FbnMuY29tL2Nkbi9z%2FaG9wL2ZpbGVzL2dh%2FemFsLWFsLXNoYXFh%2FYi0wMS5qcGc_dj0x%2FNzExMTQ0NTIyJndp%2FZHRoPTE5NDY&h=71e621cb5ee255464f3a58550b8e7e77233f06862f8af1687ec1973cda9fd8c4",
            timestamp: new Date(),
            body: "Lorem ipsum dolor sit amet consectetur adipiscing elit.",
        },
        {
            variant: "default",
            username: "Hamza Kh",
            avatar: "https://search.beastfly.win/image_proxy?url=https%3A%2F%2Fimgs.search.brave.com%2FhnQ7lLSxa7xnk1DpWsDAFdSYVQLnjb7yvJoewqqY0A4%2Frs%3Afit%3A500%3A0%3A1%3A0%2Fg%3Ace%2FaHR0cHM6Ly9zaG9w%2FLnJveWFsYXJhYmlh%2FbnMuY29tL2Nkbi9z%2FaG9wL2ZpbGVzL2dh%2FemFsLWFsLXNoYXFh%2FYi0wMS5qcGc_dj0x%2FNzExMTQ0NTIyJndp%2FZHRoPTE5NDY&h=71e621cb5ee255464f3a58550b8e7e77233f06862f8af1687ec1973cda9fd8c4",
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