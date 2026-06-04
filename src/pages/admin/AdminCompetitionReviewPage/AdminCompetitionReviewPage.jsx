import { useParams, useNavigate } from "react-router-dom"
import { format } from "date-fns"
import AdminLayout from "../../../layouts/AdminLayout/AdminLayout"
import { Button } from "../../../components/inputs/Button/Button"
import Icon from "../../../components/ui/Icon/Icon"
import CategoryTag from "../../../components/ui/CategoryTag/CategoryTag"
import { useGetEventQuery, useUpdateEventMutation } from "../../../features/api/eventApi"
import { getMediaUrl } from "../../../utils/media"
import styles from "../../competition/CompetitionDetailPage/CompetitionDetailPage.module.css"
import adminStyles from "./AdminCompetitionReviewPage.module.css"

function AdminCompetitionReviewPage() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { data: comp, isLoading } = useGetEventQuery(Number(id))
    const [updateEvent, { isLoading: isUpdating }] = useUpdateEventMutation()

    const handleApprove = async () => {
        try {
            await updateEvent({ id: comp.id, status: "open" }).unwrap()
            navigate('/manage/draft-submissions')
        } catch (err) {
            console.error("Approve failed:", err?.data || err?.status || err)
        }
    }

    const handleReject = async () => {
        try {
            await updateEvent({ id: comp.id, status: "draft" }).unwrap()
            navigate('/manage/draft-submissions')
        } catch (err) {
            console.error("Reject failed:", err?.data || err?.status || err)
        }
    }

    if (isLoading) return <AdminLayout pageName="Draft Review"><div className={styles.contentContainer}>Loading...</div></AdminLayout>
    if (!comp) return <AdminLayout pageName="Draft Review"><div className={styles.contentContainer}>Competition not found.</div></AdminLayout>

    return (
        <AdminLayout pageName="Draft Review">
            <div className={styles.contentContainer}>
                <div className={styles.pageBody}>
                    <div className={styles.bannerContainer} style={{ background: comp.banner ? `url(${getMediaUrl(comp.banner)}) center/cover no-repeat` : 'var(--gradient-main)' }}>
                        <div className={styles.bannerOverlay}>
                            <div className={styles.bannerTopRight}>
                                <span className={styles.publicityPill}>{comp.visibility}</span>
                            </div>
                            <div className={styles.bannerBottomRow}>
                                <div className={styles.bannerBottomLeft}>
                                    <img
                                        className={styles.hostAvatar}
                                        src={`https://i.pravatar.cc/150?u=${comp.organizer}`}
                                        alt="Organizer"
                                    />
                                    <div className={styles.bannerTitleGroup}>
                                        <span className={styles.bannerTitle}>{comp.title}</span>
                                        <span className={styles.bannerHost}>by Organizer #{comp.organizer}</span>
                                    </div>
                                </div>
                                <div className={styles.bannerBottomRight}>
                                    <div className={styles.buttonGroup}>
                                        <Button variant="disabled" className={styles.applyBtn}>
                                            Apply
                                        </Button>
                                        <button className={styles.messageBtn} disabled>
                                            <Icon icon="fluent:chat-32-filled" size={20} color="white" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.detailsContainer}>
                        <span className={styles.typePill}>{comp.event_type || "Competition"}</span>
                        <div className={styles.detailsGrid}>
                            <div className={styles.detailsColumn}>
                                <div className={styles.detailRow}>
                                    <Icon icon="mdi:trophy" size={20} color="var(--color-prize)" />
                                    <span className={styles.goldText}>{comp.reward}</span>
                                </div>
                                <div className={styles.detailRow}>
                                    <Icon icon="mdi:calendar" size={20} />
                                    <span>{comp.start_date ? `${format(comp.start_date, "MMM d, yyyy")} - ${comp.end_date ? format(comp.end_date, "MMM d, yyyy") : ""}` : "Dates TBA"}</span>
                                </div>
                                <div className={styles.detailRow}>
                                    <Icon icon="mdi:map-marker" size={20} />
                                    <span>{comp.location || "Virtual"}</span>
                                </div>
                                <div className={styles.detailRow}>
                                    {(comp.topics || []).map((tag) => (
                                        <CategoryTag key={tag} text={`Topic #${tag}`} />
                                    ))}
                                </div>
                            </div>
                            <div className={styles.detailsColumn}>
                                <div className={styles.detailRow}>
                                    <Icon icon="mdi:people" size={20} />
                                    <span>{comp.capacity ? `0/${comp.capacity}` : "No limit"}</span>
                                </div>
                                <div className={styles.detailRow}>
                                    <Icon icon="mdi:account-group" size={20} />
                                    <span>{comp.team_size_min || 1}-{comp.team_size_max || 1} Members</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.descriptionContainer}>
                        <h2 className={styles.descriptionHeading}>About this competition</h2>
                        <p className={styles.descriptionText}>{comp.description}</p>
                    </div>
                    {comp.status === "pending" && (
                        <div className={adminStyles.reviewActions}>
                            <div className={adminStyles.reviewActionsRight}>
                                <Button variant="red-secondary" className={adminStyles.reviewBtn} onClick={handleReject} disabled={isUpdating}>Reject</Button>
                                <Button variant="primary" className={adminStyles.reviewBtn} onClick={handleApprove} disabled={isUpdating}>Approve</Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    )
}

export default AdminCompetitionReviewPage
