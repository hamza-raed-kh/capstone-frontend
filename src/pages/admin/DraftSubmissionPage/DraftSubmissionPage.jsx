import { useNavigate } from "react-router-dom"
import { format } from "date-fns"
import FilterRow from "../../../components/data/FilterRow/FilterRow"
import Results from "../../../components/data/Results/Results"
import SearchBar from "../../../components/ui/SearchBar/SearchBar"
import SectionedLayout from "../../../layouts/SectionedLayout/SectionedLayout"
import { useGetEventsQuery, useUpdateEventMutation } from "../../../features/api/eventApi"
import styles from './DraftSubmissionPage.module.css'

function mapEventToAdminCard(event, navigate, handleApprove, handleReject) {
    const banner_url = event.banner || "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80"
    const info = {
        title: event.title,
        description: event.description || "No description provided.",
    }
    const details = {
        prize: event.reward || "No prize",
        participants_now: "?",
        participants_max: event.capacity ?? "No limit",
        date_start: event.start_date ? format(event.start_date, "MMM d") : "TBA",
        date_end: event.end_date ? format(event.end_date, "MMM d") : "TBA",
        virtual: !event.location,
        location: event.location || "Virtual",
        categories: [],
    }
    const onClick = {
        view: () => navigate(`/admin/competition/${event.id}/review`),
        approve: () => handleApprove(event.id),
        reject: () => handleReject(event.id),
    }
    return { variant: 'admin', banner_url, info, details, onClick }
}

function mapEventToMainCard(event, navigate) {
    const banner_url = event.banner || "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80"
    const info = {
        title: event.title,
        description: event.description || "No description provided.",
    }
    const details = {
        prize: event.reward || "No prize",
        participants_now: "?",
        participants_max: event.capacity ?? "No limit",
        date_start: event.start_date ? format(event.start_date, "MMM d") : "TBA",
        date_end: event.end_date ? format(event.end_date, "MMM d") : "TBA",
        virtual: !event.location,
        location: event.location || "Virtual",
        categories: [],
    }
    return {
        variant: 'main',
        banner_url,
        info,
        details,
        button: { variant: "primary", children: "View" },
        onClick: { view: () => navigate(`/competition/${event.id}`) },
    }
}

function DraftSubmissionPage() {
    const navigate = useNavigate()
    const [updateEvent] = useUpdateEventMutation()
    const { data: pendingData } = useGetEventsQuery({ status: "pending" })
    const { data: historyData } = useGetEventsQuery({ status__in: "open,closed,draft" })

    const handleApprove = async (id) => {
        try {
            await updateEvent({ id, status: "open" }).unwrap()
        } catch (err) {
            console.error("Approve failed:", err?.data || err?.status || err)
        }
    }

    const handleReject = async (id) => {
        try {
            await updateEvent({ id, status: "draft" }).unwrap()
        } catch (err) {
            console.error("Reject failed:", err?.data || err?.status || err)
        }
    }

    const pendingResults = pendingData?.results || []
    const historyResults = historyData?.results || []

    const admin_eventcards = pendingResults.map(e => mapEventToAdminCard(e, navigate, handleApprove, handleReject))
    const history_eventcards = historyResults.map(e => mapEventToMainCard(e, navigate))

    const cardgroups = []
    if (admin_eventcards.length) {
        cardgroups.push({ icon: 'fluent:calendar-24-filled', title: 'Draft Submissions', category: '', eventcards: admin_eventcards })
    }
    if (history_eventcards.length) {
        cardgroups.push({ icon: 'material-symbols:history-rounded', title: 'History', category: '', eventcards: history_eventcards })
    }

    return (
        <SectionedLayout preset="admin">
            <div className={styles.pageContainer}>
                <div className={styles.pageSearchSection}>
                    <SearchBar />
                </div>
                <div className={styles.pageFiltersSection}>
                    <FilterRow />
                </div>
                <div className={styles.pageResultsSection}>
                    <Results variant={'cardgroups'} sections={cardgroups}/>
                </div>
            </div>
        </SectionedLayout>
    )
}

export default DraftSubmissionPage
