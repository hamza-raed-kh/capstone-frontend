import { useParams, Outlet } from "react-router-dom"
import SectionedLayout from "../SectionedLayout/SectionedLayout"
import SearchBar from "../../components/ui/SearchBar/SearchBar"
import { useGetChannelsQuery } from "../../features/api/chatApi"
import { useGetEventQuery } from "../../features/api/eventApi"
import styles from "./CommunityLayout.module.css"

const CHANNEL_ICONS = {
    announcements: "fluent:megaphone-24-filled",
    general: "tabler:hash",
    public: "tabler:hash",
    support: "material-symbols:lock",
    discussion: "material-symbols:lock",
}

function buildCommunityLinks(eventId, channels) {
    const official = [{ label: "FAQ", to: `/community/${eventId}/faq`, icon: "material-symbols:question-mark-rounded" }]
    const eventLinks = []
    const privateLinks = []

    for (const ch of channels) {
        if (ch.type === "announcement") {
            official.unshift({ label: "Announcements", to: `/community/${eventId}/${ch.id}`, icon: CHANNEL_ICONS.announcements })
        } else if (ch.team) {
            privateLinks.push({ label: ch.name.charAt(0).toUpperCase() + ch.name.slice(1), to: `/community/${eventId}/${ch.id}`, icon: CHANNEL_ICONS[ch.name] || "tabler:hash" })
        } else {
            eventLinks.push({ label: ch.name.charAt(0).toUpperCase() + ch.name.slice(1), to: `/community/${eventId}/${ch.id}`, icon: CHANNEL_ICONS[ch.name] || "tabler:hash" })
        }
    }

    const links = {}
    if (official.length) links.official = official
    if (eventLinks.length) links.event = eventLinks
    if (privateLinks.length) links.private = privateLinks
    return links
}

function CommunityLayout() {
    const { eventId } = useParams()
    const { data: channelsData } = useGetChannelsQuery({ event: eventId })
    const { data: event } = useGetEventQuery(Number(eventId))

    const channels = channelsData?.results || []
    const community_links = buildCommunityLinks(eventId, channels)

    return (
        <SectionedLayout preset="community" community_links={community_links}>
            <div className={styles.pageContainer}>
                <div className={styles.pageSearchSection}>
                    <SearchBar variant="placeholder">{event?.title || "Community"}</SearchBar>
                </div>
                <div className={styles.pageResultsSection}>
                    <Outlet context={{ eventId }} />
                </div>
            </div>
        </SectionedLayout>
    )
}

export default CommunityLayout
