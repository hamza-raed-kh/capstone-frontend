import { useParams, useNavigate } from "react-router-dom"
import { format } from "date-fns"
import AdminLayout from "../../../layouts/AdminLayout/AdminLayout"
import { Button } from "../../../components/inputs/Button/Button"
import Icon from "../../../components/ui/Icon/Icon"
import { useGetEditRequestQuery, useApproveEditRequestMutation, useRejectEditRequestMutation } from "../../../features/api/editRequestApi"
import detailStyles from "../../competition/CompetitionDetailPage/CompetitionDetailPage.module.css"
import adminStyles from "./AdminEditRequestReviewPage.module.css"

function AdminEditRequestReviewPage() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { data: req, isLoading } = useGetEditRequestQuery(Number(id))
    const [approveEditRequest, { isLoading: isApproving }] = useApproveEditRequestMutation()
    const [rejectEditRequest, { isLoading: isRejecting }] = useRejectEditRequestMutation()

    const isPending = req?.request_status === "pending"
    const isMutating = isApproving || isRejecting

    const handleApprove = async () => {
        try {
            await approveEditRequest(req.id).unwrap()
            navigate('/admin/edit-requests')
        } catch (err) {
            console.error("Approve failed:", err?.data || err?.status || err)
        }
    }

    const handleReject = async () => {
        try {
            await rejectEditRequest(req.id).unwrap()
            navigate('/admin/edit-requests')
        } catch (err) {
            console.error("Reject failed:", err?.data || err?.status || err)
        }
    }

    if (isLoading) return <AdminLayout pageName="Edit Request Review"><div>Loading...</div></AdminLayout>
    if (!req) return <AdminLayout pageName="Edit Request Review"><div>Edit request not found.</div></AdminLayout>

    return (
        <AdminLayout pageName="Edit Request Review">
            <div className={detailStyles.contentContainer}>
                <div className={detailStyles.pageBody}>
                    <div className={detailStyles.bannerContainer} style={{ background: 'var(--gradient-main)' }}>
                        <div className={detailStyles.bannerOverlay}>
                            <div className={detailStyles.bannerTopRight}>
                                <span className={detailStyles.publicityPill}>
                                    Edit Request #{req.id}
                                </span>
                            </div>
                            <div className={detailStyles.bannerBottomRow}>
                                <div className={detailStyles.bannerBottomLeft}>
                                    <img
                                        className={detailStyles.hostAvatar}
                                        src={`https://i.pravatar.cc/150?u=req-${req.id}`}
                                        alt="Requestor"
                                    />
                                    <div className={detailStyles.bannerTitleGroup}>
                                        <span className={detailStyles.bannerTitle}>{req.title || `Edit Request #${req.id}`}</span>
                                        <span className={detailStyles.bannerHost}>
                                            by User #{req.requested_by} · {req.created_at ? format(req.created_at, "MMM d, yyyy") : ""} · Event #{req.event}
                                        </span>
                                    </div>
                                </div>
                                <div className={detailStyles.bannerBottomRight}>
                                    <span className={`${adminStyles.statusBadge} ${adminStyles[req.request_status]}`}>
                                        {req.request_status}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={detailStyles.detailsContainer}>
                        <span className={detailStyles.typePill}>
                            {req.event_type ? `Event Type #${req.event_type}` : "Edit Request"}
                        </span>
                        <div className={detailStyles.detailsGrid}>
                            <div className={detailStyles.detailsColumn}>
                                <div className={detailStyles.detailRow}>
                                    <Icon icon="mdi:trophy" size={20} color="var(--color-prize)" />
                                    <span className={detailStyles.goldText}>—</span>
                                </div>
                                <div className={detailStyles.detailRow}>
                                    <Icon icon="mdi:calendar" size={20} />
                                    <span>
                                        {req.start_date
                                            ? `${format(req.start_date, "MMM d, yyyy")}${req.end_date ? ` - ${format(req.end_date, "MMM d, yyyy")}` : ""}`
                                            : req.end_date
                                                ? `Until ${format(req.end_date, "MMM d, yyyy")}`
                                                : "Dates TBA"}
                                    </span>
                                </div>
                                <div className={detailStyles.detailRow}>
                                    <Icon icon="mdi:map-marker" size={20} />
                                    <span>{req.location || "Virtual"}</span>
                                </div>
                            </div>
                            <div className={detailStyles.detailsColumn}>
                                <div className={detailStyles.detailRow}>
                                    <Icon icon="mdi:people" size={20} />
                                    <span>—</span>
                                </div>
                                <div className={detailStyles.detailRow}>
                                    <Icon icon="mdi:account-group" size={20} />
                                    <span>—</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={detailStyles.descriptionContainer}>
                        <h2 className={detailStyles.descriptionHeading}>Proposed Description</h2>
                        <p className={detailStyles.descriptionText}>
                            {req.description || "No description provided."}
                        </p>
                    </div>

                    {isPending && (
                        <div className={adminStyles.reviewActions}>
                            <div className={adminStyles.reviewActionsRight}>
                                <Button
                                    variant="red-secondary"
                                    className={adminStyles.reviewBtn}
                                    onClick={handleReject}
                                    disabled={isMutating}
                                >
                                    Reject
                                </Button>
                                <Button
                                    variant="primary"
                                    className={adminStyles.reviewBtn}
                                    onClick={handleApprove}
                                    disabled={isMutating}
                                >
                                    Approve
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    )
}

export default AdminEditRequestReviewPage
