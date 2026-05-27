import { useParams } from "react-router-dom"
import { useEffect, useRef } from "react"
import ChatMessage from "../../../components/data/ChatMessage/ChatMessage"
import SectionHeader from "../../../components/ui/SectionHeader/SectionHeader"
import ChatInput from "../../../components/inputs/ChatInput/ChatInput"
import { useGetMeQuery } from "../../../features/api/authApi"
import { useGetChannelsQuery, useGetMessagesQuery, useSendMessageMutation } from "../../../features/api/chatApi"
import { useGetEventQuery } from "../../../features/api/eventApi"
import styles from "./ChannelPage.module.css"

function ChannelPage() {
    const { eventId, channelId } = useParams()
    const listRef = useRef(null)

    const { data: me } = useGetMeQuery()
    const { data: channelsData } = useGetChannelsQuery({ event: eventId })
    const { data: event } = useGetEventQuery(Number(eventId))
    const { data: messagesData, isLoading } = useGetMessagesQuery({ channel: channelId }, { pollingInterval: 5000 })
    const [sendMessage] = useSendMessageMutation()

    const channels = channelsData?.results || []
    const channel = channels.find((c) => String(c.id) === channelId)
    const messages = messagesData?.results || []
    const isOrganizer = me?.id === event?.organizer
    const isAnnouncement = channel?.type === "announcement"
    const canSend = !isAnnouncement || isOrganizer

    useEffect(() => {
        if (listRef.current) {
            listRef.current.scrollTop = listRef.current.scrollHeight
        }
    }, [messages])

    const handleSend = async (text) => {
        if (!text) return
        try {
            await sendMessage({ channel: channelId, content: text }).unwrap()
        } catch (err) {
            console.error("Send failed:", err?.data || err?.status || err)
        }
    }

    const channelName = channel ? channel.name.charAt(0).toUpperCase() + channel.name.slice(1) : "Chat"

    const CHANNEL_ICONS = {
        announcements: "fluent:megaphone-24-filled",
        general: "tabler:hash",
        public: "tabler:hash",
        support: "material-symbols:lock",
        discussion: "material-symbols:lock",
    }
    const channelIcon = CHANNEL_ICONS[channel?.name] || "tabler:hash"

    if (isLoading) return <div className={styles.pageContainer}><div className={styles.bodyContainer}><p>Loading messages...</p></div></div>

    return (
        <div className={styles.pageContainer}>
            <div className={styles.bodyContainer}>
                <div className={styles.bodyHeader}>
                    <SectionHeader icon={channelIcon} title={channelName} category={channel?.type === "announcement" ? "Official" : "Event"} />
                </div>
                <div className={styles.bodyMessageContainer} ref={listRef}>
                    <div className={styles.bodyMessageList}>
                        {messages.length === 0 && (
                            <p className={styles.emptyText}>No messages yet. Start the conversation!</p>
                        )}
                        {messages.map((msg, i) => {
                            const prevUser = i > 0 ? messages[i - 1].user : null
                            const sameUser = prevUser  === msg.user
                            const displayName = `${msg.user_first_name} ${msg.user_last_name}`.trim() || `User #${msg.user.id}`
                            const avatar = `https://i.pravatar.cc/150?u=${msg.user.id}`
                            return (
                                <div className={styles.bodyMessage} key={msg.id}>
                                    <ChatMessage
                                        variant={sameUser ? "brief" : "default"}
                                        avatar={avatar}
                                        username={displayName}
                                        userId={msg.user}
                                        timestamp={new Date(msg.created_at)}
                                        body={msg.content}
                                    />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            <div className={styles.pageWriteSection}>
                <ChatInput onSend={canSend ? handleSend : undefined} readOnly={!canSend} placeholder={isAnnouncement && !canSend ? "Only organizers can send messages" : "Send a message..."} />
            </div>
        </div>
    )
}

export default ChannelPage
