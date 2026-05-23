import { useNavigate } from "react-router-dom"
import { format } from "date-fns"
import Results from "../../../components/data/Results/Results"
import AdminLayout from "../../../layouts/AdminLayout/AdminLayout"
import { useGetEventsQuery, useUpdateEventMutation } from "../../../features/api/eventApi"

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
        view: () => navigate(`/admin/draft-submissions/${event.id}/`),
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

const HISTORY_LIMIT = 5

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
    const historyResults = (historyData?.results || []).slice(0, HISTORY_LIMIT)

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
        <AdminLayout pageName="Draft Submissions">
            <Results variant={'cardgroups'} sections={cardgroups}/>
        </AdminLayout>
    )
}

export default DraftSubmissionPage
