import { useState, useRef, useEffect } from "react"
import { useParams, useNavigate, useLocation } from "react-router-dom"
import { useDispatch } from "react-redux"
import { format } from "date-fns"
import * as Dialog from "@radix-ui/react-dialog"
import SearchBar from "../../../components/ui/SearchBar/SearchBar"
import SectionedLayout from "../../../layouts/SectionedLayout/SectionedLayout"
import { Button } from "../../../components/inputs/Button/Button"
import Icon from "../../../components/ui/Icon/Icon"
import Modal from "../../../components/ui/Modal/Modal"
import CategoryTag from "../../../components/ui/CategoryTag/CategoryTag"
import TextInput from "../../../components/inputs/TextInput/TextInput"
import FileInput from "../../../components/inputs/FileInput/FileInput"
import NumberInput from "../../../components/inputs/NumberInput/NumberInput"
import CheckboxInput, { CheckboxGroup } from "../../../components/inputs/CheckboxInput/CheckboxInput"
import { useGetEventQuery, useUpdateEventMutation } from "../../../features/api/eventApi"
import { useGetMeQuery } from "../../../features/api/authApi"
import { useGetChannelsQuery, useGetMessagesQuery } from "../../../features/api/chatApi"
import { useGetFaqQuestionsQuery } from "../../../features/api/faqApi"
import { setCurrentCompetition, clearCurrentCompetition } from "../../../features/competition/competitionSlice"
import styles from './CompetitionDetailPage.module.css'

function CompetitionDetailPage() {
    const { id } = useParams()
    const location = useLocation();
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { data: comp, isLoading } = useGetEventQuery(Number(id))
    const { data: me } = useGetMeQuery()
    const [updateEvent] = useUpdateEventMutation()
    const isOrganizer = me?.id === comp?.organizer

    useEffect(() => {
        if (id) dispatch(setCurrentCompetition(Number(id)))
        return () => dispatch(clearCurrentCompetition())
    }, [id, dispatch]);

    useEffect(() => {
        if(location.state?.applicationModal === 'open'){
            setApplyOpen(true);
        }
    }, [location.state]);

    const isStaff = me?.is_staff
    const navPreset = isStaff ? "admin" : isOrganizer ? "organizer" : "home"

    const { data: channelsData } = useGetChannelsQuery(
        { event: Number(id), type: "announcement" },
        { skip: !id }
    )
    const announcementChannel = channelsData?.results?.[0]
    const { data: messagesData } = useGetMessagesQuery(
        { channel: announcementChannel?.id },
        { skip: !announcementChannel?.id }
    )
    const announcements = messagesData?.results || []
    const { data: faqData } = useGetFaqQuestionsQuery(
        { event: Number(id) },
        { skip: !id }
    )
    const faqQuestions = faqData?.results || []

    const [applyOpen, setApplyOpen] = useState(false)
    const [withdrawOpen, setWithdrawOpen] = useState(false)
    const [withdrawInput, setWithdrawInput] = useState("")
    const [deleteOpen, setDeleteOpen] = useState(false)
    const [deleteInput, setDeleteInput] = useState("")
    const [announcementsExpanded, setAnnouncementsExpanded] = useState(false)
    const [faqExpanded, setFaqExpanded] = useState(false)
    const announcementsRef = useRef(null)
    const faqRef = useRef(null)

    const [teamName, setTeamName] = useState("")
    const [questionText, setQuestionText] = useState("")
    const [questionCheckboxes, setQuestionCheckboxes] = useState([])
    const [questionNumber, setQuestionNumber] = useState(0)
    const [inviteInput, setInviteInput] = useState("")
    const members = [
        { name: "Ahmed", status: "accepted" },
        { name: "Sara", status: "pending" },
        { name: "John", status: "rejected" },
    ]

    const toggleAnnouncements = () => {
        const el = announcementsRef.current
        if (!el) return
        el.style.maxHeight = announcementsExpanded ? '140px' : el.scrollHeight + 'px'
        setAnnouncementsExpanded(!announcementsExpanded)
    }

    const toggleFaq = () => {
        const el = faqRef.current
        if (!el) return
        el.style.maxHeight = faqExpanded ? '140px' : el.scrollHeight + 'px'
        setFaqExpanded(!faqExpanded)
    }

    const statusBadge = () => {
        switch (comp.status) {
            case "draft": return <span className={styles.publicityPill}>Draft</span>
            case "pending": return <span className={styles.publicityPill}>Pending Review</span>
            case "open": return <span className={styles.publicityPill}>Live</span>
            case "closed": return <span className={styles.publicityPill}>Ended</span>
            default: return null
        }
    }

    const actionButton = () => {
        if (comp.status === "open" && !isOrganizer) {
            return { variant: "primary", text: "Apply", onClick: () => setApplyOpen(true) }
        }
        if (isOrganizer) {
            switch (comp.status) {
                case "draft": return { variant: "disabled", text: "Draft", onClick: null }
                case "pending": return { variant: "disabled", text: "Pending Review", onClick: null }
                case "open": return { variant: "disabled", text: "Live", onClick: null }
            }
        }
        return null
    }

    if (isLoading) return <SectionedLayout preset={navPreset}><div>Loading...</div></SectionedLayout>
    if (!comp) return <SectionedLayout preset={navPreset}><div>Competition not found.</div></SectionedLayout>

    if (!isStaff && !isOrganizer && comp.status !== "open") {
        navigate('/explore', { replace: true })
        return null
    }

    return (
        <SectionedLayout preset={navPreset}>
            <div className={styles.pageContainer}>
                <div className={styles.pageSearchSection}>
                    <SearchBar />
                </div>
                <div className={styles.contentContainer}>
                    <div className={styles.pageBody}>
                        <div className={styles.bannerContainer} style={{ background: comp.banner ? `url(${comp.banner}) center/cover no-repeat` : 'var(--gradient-main)' }}>
                            <div className={styles.bannerOverlay}>
                                <div className={styles.bannerTopRight}>
                                    {statusBadge()}
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
                                            {actionButton() && (
                                                <Button variant={actionButton().variant} className={styles.applyBtn} onClick={actionButton().onClick || undefined}>
                                                    {actionButton().text}
                                                </Button>
                                            )}
                                            <button className={styles.messageBtn} onClick={() => navigate('/community/general')}>
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
                            <p className={styles.descriptionText}>
                                {comp.description}
                            </p>
                        </div>
                        {announcements.length > 0 && (
                            <div className={styles.collapsibleSection}>
                                <div className={styles.sectionHeader}>
                                    <h2 className={styles.sectionHeading}>Announcements</h2>
                                    <button className={styles.expandBtn} onClick={toggleAnnouncements}>
                                        <Icon icon={announcementsExpanded ? "mdi:chevron-up" : "mdi:chevron-down"} size={20} />
                                    </button>
                                </div>
                                <div ref={announcementsRef} className={`${styles.collapsibleContent} ${announcementsExpanded ? styles.expanded : ''}`}>
                                    <div className={styles.announcementList}>
                                        {announcements.map((msg, i) => (
                                            <div key={i} className={styles.announcementItem}>
                                                <span className={styles.announcementDate}>{format(msg.created_at, "MMM d, yyyy")}</span>
                                                <p className={styles.announcementMessage}>{msg.content}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                        {faqQuestions.length > 0 && (
                            <div className={styles.collapsibleSection}>
                                <div className={styles.sectionHeader}>
                                    <h2 className={styles.sectionHeading}>FAQs</h2>
                                    <button className={styles.expandBtn} onClick={toggleFaq}>
                                        <Icon icon={faqExpanded ? "mdi:chevron-up" : "mdi:chevron-down"} size={20} />
                                    </button>
                                </div>
                                <div ref={faqRef} className={`${styles.collapsibleContent} ${faqExpanded ? styles.expanded : ''}`}>
                                    <div className={styles.faqList}>
                                        {faqQuestions.map((faq, i) => (
                                            <div key={i} className={styles.faqItem}>
                                                <p className={styles.faqQuestion}>{faq.question_text}</p>
                                                <p className={styles.faqAnswer}>{faq.answer_text}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                        {isOrganizer && comp.status === "open" ? (
                            <Button variant="red" className={styles.withdrawBtn} onClick={() => navigate(`/competitions/${comp.id}/edit`)}>Edit Competition</Button>
                        ) : isOrganizer && comp.status === "pending" ? (
                            <Button variant="red" className={styles.withdrawBtn} onClick={cancelSubmission}>Cancel Submission</Button>
                        ) : isOrganizer && comp.status === "draft" ? (
                            <Button variant="red" className={styles.withdrawBtn} onClick={() => navigate(`/competitions/${comp.id}/edit`)}>Edit Draft</Button>
                        ) : !isOrganizer && comp.status === "open" ? (
                            <Button variant="red" className={styles.withdrawBtn} onClick={() => setWithdrawOpen(true)}>Withdraw</Button>
                        ) : null}
                    </div>
                </div>
            </div>
            <Modal isOpen={applyOpen} onClose={() => setApplyOpen(false)} hideHeader>
                <div className={styles.applyModalContent}>
                    <div className={styles.applyHeader}>
                        <span className={styles.applyHeaderTitle}>Apply</span>
                        <Dialog.Close asChild>
                            <button className={styles.applyCloseBtn} aria-label="Close">
                                <Icon icon="mdi:close" size={24} />
                            </button>
                        </Dialog.Close>
                    </div>
                    <div className={styles.applyForm}>
                        <FileInput label="Team Picture" variant="avatar" />
                        <TextInput label="Team Name" value={teamName} onChange={e => setTeamName(e.target.value)} />
                        <div className={styles.formQuestion}>
                            <label className={styles.formQuestionLabel}>Why do you want to join?</label>
                            <TextInput placeholder="Your answer" value={questionText} onChange={e => setQuestionText(e.target.value)} />
                        </div>
                        <div className={styles.formQuestion}>
                            <label className={styles.formQuestionLabel}>Which skills do you bring?</label>
                            <CheckboxGroup value={questionCheckboxes} onChange={setQuestionCheckboxes}>
                                <CheckboxInput label="Design" value="design" />
                                <CheckboxInput label="Development" value="development" />
                                <CheckboxInput label="Marketing" value="marketing" />
                                <CheckboxInput label="Content" value="content" />
                            </CheckboxGroup>
                        </div>
                        <div className={styles.formQuestion}>
                            <label className={styles.formQuestionLabel}>Years of experience</label>
                            <NumberInput value={questionNumber} onChange={e => setQuestionNumber(Number(e.target.value))} />
                        </div>
                        <div className={styles.teamSection}>
                            <label className={styles.formQuestionLabel}>Team Members</label>
                            <div className={styles.inviteRow}>
                                <div className={styles.inviteInputWrap}>
                                    <TextInput placeholder="Enter email to invite" value={inviteInput} onChange={e => setInviteInput(e.target.value)} />
                                </div>
                                <Button variant="primary" className={styles.inviteBtn} onClick={() => setApplyOpen(false)}>Invite</Button>
                            </div>
                            <div className={styles.memberList}>
                                {members.map((m, i) => (
                                    <div key={i} className={styles.memberItem}>
                                        <span className={styles.memberName}>{m.name}</span>
                                        <span className={`${styles.memberStatus} ${styles[m.status]}`}>{m.status}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className={styles.applyActions}>
                        <div className={styles.applyActionsLeft}>
                            <Button variant="red-secondary" className={styles.applyActionBtn} onClick={() => setDeleteOpen(true)}>Delete Application</Button>
                        </div>
                        <div className={styles.applyActionsRight}>
                            <Button variant="red-secondary" className={styles.applyActionBtn} onClick={() => setApplyOpen(false)}>Discard</Button>
                            <Button variant="secondary" className={styles.applyActionBtn} onClick={() => setApplyOpen(false)}>Save</Button>
                            <Button variant="primary" className={styles.applyActionBtn} onClick={() => setApplyOpen(false)}>Submit</Button>
                        </div>
                    </div>
                </div>
            </Modal>
            <Modal isOpen={withdrawOpen} onClose={() => setWithdrawOpen(false)} hideHeader>
                <div className={styles.withdrawModalContent}>
                    <div className={styles.withdrawHeader}>
                        <span className={styles.withdrawHeaderTitle}>{isOrganizer ? "Cancel Competition" : "Withdraw"}</span>
                        <Dialog.Close asChild>
                            <button className={styles.withdrawCloseBtn} aria-label="Close">
                                <Icon icon="mdi:close" size={24} />
                            </button>
                        </Dialog.Close>
                    </div>
                    <p className={styles.withdrawText}>
                        <strong>Are you sure you want to {isOrganizer ? "cancel this competition" : "withdraw from this competition"}? (write &lsquo;yes&rsquo; in the text box below)</strong>
                    </p>
                    <TextInput placeholder="Yes" value={withdrawInput} onChange={e => setWithdrawInput(e.target.value)} />
                    <div className={styles.withdrawActions}>
                        <Button variant="primary" onClick={() => setWithdrawOpen(false)}>Cancel</Button>
                        <Button variant="red-secondary" onClick={() => { setWithdrawOpen(false); setWithdrawInput("") }}>Confirm</Button>
                    </div>
                </div>
            </Modal>
            <Modal isOpen={deleteOpen} onClose={() => setDeleteOpen(false)} hideHeader>
                <div className={styles.withdrawModalContent}>
                    <div className={styles.withdrawHeader}>
                        <span className={styles.withdrawHeaderTitle}>Delete</span>
                        <Dialog.Close asChild>
                            <button className={styles.withdrawCloseBtn} aria-label="Close">
                                <Icon icon="mdi:close" size={24} />
                            </button>
                        </Dialog.Close>
                    </div>
                    <p className={styles.withdrawText}>
                        <strong>Are you sure you want to delete this application? (write &lsquo;yes&rsquo; in the text box below)</strong>
                    </p>
                    <TextInput placeholder="Yes" value={deleteInput} onChange={e => setDeleteInput(e.target.value)} />
                    <div className={styles.withdrawActions}>
                        <Button variant="primary" onClick={() => setDeleteOpen(false)}>Cancel</Button>
                        <Button variant="red-secondary" onClick={() => { setDeleteOpen(false); setDeleteInput("") }}>Confirm</Button>
                    </div>
                </div>
            </Modal>
        </SectionedLayout>
    )
}

export default CompetitionDetailPage
