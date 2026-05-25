import { useNavigate } from "react-router-dom"
import { format } from "date-fns"
import Results from "../../../components/data/Results/Results"
import AdminLayout from "../../../layouts/AdminLayout/AdminLayout"
import { useGetEditRequestsQuery, useApproveEditRequestMutation, useRejectEditRequestMutation } from "../../../features/api/editRequestApi"

function mapEditRequestToAdminCard(req, navigate, handleApprove, handleReject) {
    const banner_url = ""
    const info = {
        title: req.title || `Edit Request #${req.id}`,
        description: req.description || "No description.",
    }
    const details = {
        prize: "—",
        participants_now: "?",
        participants_max: "—",
        date_start: req.start_date ? format(req.start_date, "MMM d") : "TBA",
        date_end: req.end_date ? format(req.end_date, "MMM d") : "TBA",
        virtual: !req.location,
        location: req.location || "—",
        categories: [],
    }
    const onClick = {
        view: () => navigate(`/admin/edit-requests/${req.id}/`),
        approve: () => handleApprove(req.id),
        reject: () => handleReject(req.id),
    }
    return { variant: 'admin', banner_url, info, details, onClick }
}

function mapEditRequestToMainCard(req, navigate) {
    const banner_url = ""
    const info = {
        title: req.title || `Edit Request #${req.id}`,
        description: req.description || "No description.",
    }
    const details = {
        prize: "—",
        participants_now: "?",
        participants_max: "—",
        date_start: req.start_date ? format(req.start_date, "MMM d") : "TBA",
        date_end: req.end_date ? format(req.end_date, "MMM d") : "TBA",
        virtual: !req.location,
        location: req.location || "—",
        categories: [],
    }
    return {
        variant: 'main',
        banner_url,
        info,
        details,
        button: { variant: "primary", children: "View" },
        onClick: { view: () => navigate(`/admin/edit-requests/${req.id}/`) },
    }
}

function ChangeRequestPage() {
    const navigate = useNavigate()
    const [approveEditRequest] = useApproveEditRequestMutation()
    const [rejectEditRequest] = useRejectEditRequestMutation()
    const { data: pendingData } = useGetEditRequestsQuery({ request_status: "pending" })
    const { data: historyData } = useGetEditRequestsQuery({ request_status__in: "approved,rejected" })

    const handleApprove = async (id) => {
        try {
            await approveEditRequest(id).unwrap()
        } catch (err) {
            console.error("Approve failed:", err?.data || err?.status || err)
        }
    }

    const handleReject = async (id) => {
        try {
            await rejectEditRequest(id).unwrap()
        } catch (err) {
            console.error("Reject failed:", err?.data || err?.status || err)
        }
    }

    const pendingResults = pendingData?.results || []
    const historyResults = historyData?.results || []

    const admin_eventcards = pendingResults.map(r => mapEditRequestToAdminCard(r, navigate, handleApprove, handleReject))
    const history_eventcards = historyResults.map(r => mapEditRequestToMainCard(r, navigate))

    const cardgroups = []
    if (admin_eventcards.length) {
        cardgroups.push({ icon: 'mage:edit-pen-fill', title: 'Change Requests', category: '', eventcards: admin_eventcards })
    }
    if (history_eventcards.length) {
        cardgroups.push({ icon: 'material-symbols:history-rounded', title: 'History', category: '', eventcards: history_eventcards })
    }

    return (
        <AdminLayout pageName="Change Requests">
            <Results variant={'cardgroups'} sections={cardgroups}/>
        </AdminLayout>
    )
}

export default ChangeRequestPage
