import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { format } from "date-fns"
import SearchBar from "../../components/SearchBar/SearchBar"
import SectionedLayout from "../../layouts/SectionedLayout/SectionedLayout"
import { Button } from "../../components/inputs/Button/Button"
import Icon from "../../components/Icon/Icon"
import CategoryTag from "../../components/CategoryTag/CategoryTag"
import { selectCompetition } from "../../features/competition/competitionSlice"
import styles from "../CompetitionDetailPage/CompetitionDetailPage.module.css"
import adminStyles from "./AdminCompetitionReviewPage.module.css"

function AdminCompetitionReviewPage() {
    const navigate = useNavigate()
    const comp = useSelector(selectCompetition)

    return (
        <SectionedLayout preset="home">
            <div className={styles.pageContainer}>
                <div className={styles.pageSearchSection}>
                    <SearchBar />
                </div>
                <div className={styles.contentContainer}>
                    <div className={styles.pageBody}>
                        <div className={styles.bannerContainer} style={{ backgroundImage: `url(${comp.banner})` }}>
                            <div className={styles.bannerOverlay}>
                                <div className={styles.bannerTopRight}>
                                    <span className={styles.publicityPill}>{comp.publicity}</span>
                                </div>
                                <div className={styles.bannerBottomRow}>
                                    <div className={styles.bannerBottomLeft}>
                                        <img
                                            className={styles.hostAvatar}
                                            src={comp.host.avatar}
                                            alt={comp.host.name}
                                        />
                                        <div className={styles.bannerTitleGroup}>
                                            <span className={styles.bannerTitle}>{comp.title}</span>
                                            <span className={styles.bannerHost}>by {comp.host.name}</span>
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
                            <span className={styles.typePill}>{comp.type}</span>
                            <div className={styles.detailsGrid}>
                                <div className={styles.detailsColumn}>
                                    <div className={styles.detailRow}>
                                        <Icon icon="mdi:trophy" size={20} color="var(--color-prize)" />
                                        <span className={styles.goldText}>{comp.reward}</span>
                                    </div>
                                    <div className={styles.detailRow}>
                                        <Icon icon="mdi:calendar" size={20} />
                                        <span>{format(comp.startDate, "MMM d, yyyy")} - {format(comp.endDate, "MMM d, yyyy")}</span>
                                    </div>
                                    <div className={styles.detailRow}>
                                        <Icon icon="mdi:map-marker" size={20} />
                                        <span>{comp.location || "Virtual"}</span>
                                    </div>
                                    <div className={styles.detailRow}>
                                        {comp.tags.map((tag) => (
                                            <CategoryTag key={tag} text={tag} />
                                        ))}
                                    </div>
                                </div>
                                <div className={styles.detailsColumn}>
                                    <div className={styles.detailRow}>
                                        <Icon icon="mdi:people" size={20} />
                                        <span>{comp.currentParticipants}/{comp.maxParticipants}</span>
                                    </div>
                                    <div className={styles.detailRow}>
                                        <Icon icon="mdi:account-group" size={20} />
                                        <span>{comp.teamSpec.min}-{comp.teamSpec.max} Members</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.descriptionContainer}>
                            <h2 className={styles.descriptionHeading}>About this competition</h2>
                            <p className={styles.descriptionText}>
                                {comp.description}
                            </p>
                            <p className={styles.descriptionText}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </p>
                            <p className={styles.descriptionText}>
                                Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi.
                            </p>
                        </div>
                        <div className={adminStyles.reviewActions}>
                            <div className={adminStyles.reviewActionsRight}>
                                <Button variant="red-secondary" className={adminStyles.reviewBtn} onClick={() => navigate('/admin/edit-requests')}>Reject</Button>
                                <Button variant="primary" className={adminStyles.reviewBtn} onClick={() => navigate('/admin/edit-requests')}>Approve</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SectionedLayout>
    )
}

export default AdminCompetitionReviewPage
