import { useState, useRef, useEffect } from "react"
import { useParams, useNavigate, useLocation } from "react-router-dom"
import { useDispatch } from "react-redux"
import { addToast } from "../../../features/toast/toastSlice"
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
import { useGetEventQuery } from "../../../features/api/eventApi"
import { useGetMeQuery, useGetUserQuery } from "../../../features/api/authApi"
import { useGetTeamsQuery, useCreateTeamMutation, useUpdateTeamMutation, useDeleteTeamMutation, useSubmitTeamMutation, useWithdrawTeamMutation, useInviteToTeamMutation, useGetTeamParticipantsQuery, useGetTeamInvitationsQuery, useDeleteTeamParticipantMutation, useDeleteTeamInvitationMutation } from "../../../features/api/teamApi"
import { useGetChannelsQuery, useGetMessagesQuery } from "../../../features/api/chatApi"
import { useGetFaqQuestionsQuery } from "../../../features/api/faqApi"
import { useGetTopicsQuery } from "../../../features/api/topicApi"
import { useGetEventTypesQuery } from "../../../features/api/eventApi"
import { useGetEditRequestsQuery, useDeleteEditRequestMutation } from "../../../features/api/editRequestApi"
import { setCurrentCompetition, clearCurrentCompetition } from "../../../features/competition/competitionSlice"
import styles from './CompetitionDetailPage.module.css'

function CompetitionDetailPage() {
    const { id } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { data: comp, isLoading } = useGetEventQuery(Number(id))
    const { data: me } = useGetMeQuery()
    const isOrganizer = me?.id === comp?.organizer
    const { data: organizerUser } = useGetUserQuery(comp?.organizer, { skip: !comp?.organizer })
    const { data: teamsData } = useGetTeamsQuery({ event: Number(id) }, { skip: !id })
    const teams = teamsData?.results || []
    const acceptedTeams = teams.filter((t) => t.status === "accepted")
    const totalMembers = acceptedTeams.reduce((sum, t) => sum + (t.members_count || 0), 0)
    const { data: allTopics } = useGetTopicsQuery()
    const topicMap = Object.fromEntries((allTopics?.results || []).map((t) => [t.id, t.name]))
    const { data: allEventTypes } = useGetEventTypesQuery()
    const eventTypeMap = Object.fromEntries((allEventTypes?.results || []).map((t) => [t.id, t.name]))

    const { data: userTeamsData } = useGetTeamsQuery(
        { user_any_status: me?.id, event: Number(id) },
        { skip: !me?.id || !id },
    )
    const myTeam = userTeamsData?.results?.[0] || null

    const { data: participantsData } = useGetTeamParticipantsQuery(
        { team: myTeam?.id },
        { skip: !myTeam?.id },
    )
    const participants = participantsData?.results || []

    const [createTeam] = useCreateTeamMutation()
    const [updateTeam] = useUpdateTeamMutation()
    const [deleteTeam] = useDeleteTeamMutation()
    const [submitTeam] = useSubmitTeamMutation()
    const [inviteToTeam] = useInviteToTeamMutation()
    const [deleteTeamParticipant] = useDeleteTeamParticipantMutation()
    const [deleteTeamInvitation] = useDeleteTeamInvitationMutation()

    const { data: invitationsData } = useGetTeamInvitationsQuery(
        { team: myTeam?.id },
        { skip: !myTeam?.id },
    )
    const invitations = invitationsData?.results || []

    useEffect(() => {
        if (id) dispatch(setCurrentCompetition(Number(id)))
        return () => dispatch(clearCurrentCompetition())
    }, [id, dispatch])

    const isStaff = me?.is_staff
    const navPreset = isStaff ? "admin" : isOrganizer ? "organizer" : "home"

    const { data: channelsData } = useGetChannelsQuery(
        { event: Number(id), type: "announcement" },
        { skip: !id },
    )
    const announcementChannel = channelsData?.results?.[0]
    const { data: messagesData } = useGetMessagesQuery(
        { channel: announcementChannel?.id },
        { skip: !announcementChannel?.id },
    )
    const announcements = messagesData?.results || []
    const { data: faqData } = useGetFaqQuestionsQuery(
        { event: Number(id) },
        { skip: !id },
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
    const [teamPictureFile, setTeamPictureFile] = useState(null)
    const [teamPicturePreview, setTeamPicturePreview] = useState(myTeam?.picture || "")
    const [withdrawError, setWithdrawError] = useState("")
    const [inviteEmail, setInviteEmail] = useState("")
    const [inviteError, setInviteError] = useState("")
    const [submitError, setSubmitError] = useState("")
    const [withdrawTeam] = useWithdrawTeamMutation()

    const { data: editRequestsData } = useGetEditRequestsQuery(
        { event: Number(id), request_status: "pending" },
        { skip: !id || !isOrganizer || comp?.status !== "open" }
    )
    const pendingEditRequest = editRequestsData?.results?.[0]
    const [deleteEditRequest] = useDeleteEditRequestMutation()

    const handleCancelEditRequest = async () => {
        if (!pendingEditRequest) return
        try {
            await deleteEditRequest(pendingEditRequest.id).unwrap()
            dispatch(addToast({ message: "Edit request cancelled.", type: "success" }))
        } catch (err) {
            const detail = err?.data?.detail || "Failed to cancel edit request."
            dispatch(addToast({ message: detail, type: "error" }))
        }
    }

    useEffect(() => {
        if (myTeam) {
            setTeamName(myTeam.name || "")
            setTeamPicturePreview(myTeam.picture || "")
            setTeamPictureFile(null)
        }
    }, [myTeam])

    const isDraft = myTeam?.status === "draft"
    const isSubmitted = myTeam?.status === "pending" || myTeam?.status === "accepted" || myTeam?.status === "rejected"
    const maxSize = comp?.team_size_max || 1
    const acceptedCount = participants.filter((p) => p.status === "accepted").length
    const pendingInvites = invitations.filter((inv) => inv.status === "pending").length

    const myParticipant = participants.find((p) => p.user === me?.id)
    const isTeamLeader = myParticipant?.leader && myParticipant?.status === "accepted"

    const hasTeamForThisEvent = !!myTeam

    const canEdit = !hasTeamForThisEvent || (isTeamLeader && isDraft)

    const toggleAnnouncements = () => {
        const el = announcementsRef.current
        if (!el) return
        el.style.maxHeight = announcementsExpanded ? "140px" : el.scrollHeight + "px"
        setAnnouncementsExpanded(!announcementsExpanded)
    }

    const toggleFaq = () => {
        const el = faqRef.current
        if (!el) return
        el.style.maxHeight = faqExpanded ? "140px" : el.scrollHeight + "px"
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
            if (hasTeamForThisEvent) {
                return { variant: "secondary", text: "View Application", onClick: () => setApplyOpen(true) }
            }
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

    const handleSave = async () => {
        if (!teamName.trim()) return
        setSubmitError("")
        try {
            if (myTeam && isDraft) {
                if (teamPictureFile) {
                    const fd = new FormData()
                    fd.append("id", myTeam.id)
                    fd.append("name", teamName.trim())
                    fd.append("picture", teamPictureFile)
                    await updateTeam(fd)
                } else {
                    await updateTeam({ id: myTeam.id, name: teamName.trim() })
                }
            } else {
                if (teamPictureFile) {
                    const fd = new FormData()
                    fd.append("name", teamName.trim())
                    fd.append("event", Number(id))
                    fd.append("picture", teamPictureFile)
                    await createTeam(fd)
                } else {
                    await createTeam({ name: teamName.trim(), event: Number(id) })
                }
            }
            dispatch(addToast({ message: 'Application saved!', type: 'success' }))
        } catch (err) {
            const detail = err?.data?.detail || err?.error?.data?.detail || "Failed to save."
            setSubmitError(detail)
            dispatch(addToast({ message: detail, type: 'error' }))
        }
    }

    const handleSubmit = async () => {
        setSubmitError("")
        try {
            let teamId = myTeam?.id
            if (!teamId) {
                const created = await createTeam({ name: teamName.trim(), event: Number(id) }).unwrap()
                teamId = created.id
            }
            await submitTeam(teamId).unwrap()
            dispatch(addToast({ message: 'Application submitted for review!', type: 'success' }))
            setApplyOpen(false)
        } catch (err) {
            const detail = err?.data?.detail || err?.error?.data?.detail || "Failed to submit."
            if (detail) setSubmitError(detail)
            dispatch(addToast({ message: detail, type: 'error' }))
        }
    }

    const handleDelete = async () => {
        if (!myTeam) return
        try {
            await deleteTeam(myTeam.id)
            dispatch(addToast({ message: 'Application deleted.', type: 'success', duration: 2000 }))
            setDeleteOpen(false)
            setApplyOpen(false)
            setTeamName("")
            setTeamPictureFile(null)
            setTeamPicturePreview("")
        } catch (err) {
            const detail = err?.data?.detail || err?.error?.data?.detail || "Failed to delete application."
            dispatch(addToast({ message: detail, type: 'error' }))
        }
    }

    const handleWithdraw = async () => {
        if (!myTeam) return
        setWithdrawError("")
        try {
            await withdrawTeam(myTeam.id).unwrap()
            dispatch(addToast({ message: 'Application withdrawn.', type: 'success', duration: 2000 }))
            setWithdrawOpen(false)
            setWithdrawInput("")
        } catch (err) {
            const detail = err?.data?.detail || "Failed to withdraw."
            setWithdrawError(detail)
            dispatch(addToast({ message: detail, type: 'error' }))
        }
    }

    const handleInvite = async () => {
        if (!inviteEmail.trim() || !myTeam) return
        if (!isDraft) {
            setInviteError("Can only invite while the application is a draft.")
            return
        }
        if (acceptedCount + pendingInvites >= maxSize) {
            setInviteError(`Team is at full capacity (${maxSize}).`)
            return
        }
        setInviteError("")
        try {
            await inviteToTeam({ id: myTeam.id, email: inviteEmail.trim() }).unwrap()
            dispatch(addToast({ message: 'Invitation sent!', type: 'success' }))
            setInviteEmail("")
        } catch (err) {
            const detail = err?.data?.detail || "Failed to send invite."
            setInviteError(detail)
            dispatch(addToast({ message: detail, type: 'error' }))
        }
    }

    const handleLeaveTeam = async () => {
        if (!myParticipant) return
        try {
            await deleteTeamParticipant(myParticipant.id)
            dispatch(addToast({ message: 'You left the team.', type: 'success', duration: 2000 }))
            setApplyOpen(false)
        } catch (err) {
            const detail = err?.data?.detail || err?.error?.data?.detail || "Failed to leave team."
            dispatch(addToast({ message: detail, type: 'error' }))
        }
    }

    const location = useLocation()
    const isPreview = location.pathname.startsWith('/organizer')

    if (isLoading) return isPreview ? <div>Loading...</div> : <SectionedLayout preset={navPreset}><div>Loading...</div></SectionedLayout>
    if (!comp) return isPreview ? <div>Competition not found.</div> : <SectionedLayout preset={navPreset}><div>Competition not found.</div></SectionedLayout>

    if (!isStaff && !isOrganizer && comp.status !== "open") {
        navigate("/explore", { replace: true })
        return null
    }

    const content = (
        <>
            <div className={styles.pageContainer}>
                <div className={styles.pageSearchSection}>
                    <SearchBar />
                </div>
                <div className={styles.contentContainer}>
                    <div className={styles.pageBody}>
                        <div className={styles.bannerContainer} style={{ background: comp.banner ? `url(${comp.banner}) center/cover no-repeat` : "var(--gradient-main)" }}>
                            <div className={styles.bannerOverlay}>
                                <div className={styles.bannerTopRight}>
                                    {statusBadge()}
                                </div>
                                <div className={styles.bannerBottomRow}>
                                    <div className={styles.bannerBottomLeft}>
                                        {organizerUser?.profile_picture ? (
                                            <img className={styles.hostAvatar} src={organizerUser.profile_picture} alt={organizerUser.first_name} />
                                        ) : (
                                            <Icon icon="mdi:account-circle" size={48} className={styles.hostAvatar} />
                                        )}
                                        <div className={styles.bannerTitleGroup}>
                                            <span className={styles.bannerTitle}>{comp.title}</span>
                                            <span className={styles.bannerHost}>by {organizerUser ? `${organizerUser.first_name} ${organizerUser.last_name}` : "Organizer"}</span>
                                        </div>
                                    </div>
                                    <div className={styles.bannerBottomRight}>
                                        <div className={styles.buttonGroup}>
                                            {actionButton() && (
                                                <Button variant={actionButton().variant} className={styles.applyBtn} onClick={actionButton().onClick || undefined}>
                                                    {actionButton().text}
                                                </Button>
                                            )}
                                            <button className={styles.messageBtn} onClick={() => navigate(`/community/${id}`)}>
                                                <Icon icon="fluent:chat-32-filled" size={20} color="white" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.detailsContainer}>
                            <span className={styles.typePill}>{eventTypeMap[comp.event_type] || "Competition"}</span>
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
                                            <CategoryTag key={tag} text={topicMap[tag] || `Topic #${tag}`} />
                                        ))}
                                    </div>
                                </div>
                                <div className={styles.detailsColumn}>
                                    <div className={styles.detailRow}>
                                        <Icon icon="mdi:people" size={20} />
                                        <span>{comp.capacity ? `${totalMembers}/${comp.capacity}` : `${totalMembers} participant${totalMembers !== 1 ? "s" : ""}`}</span>
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
                        {announcements.length > 0 && (
                            <div className={styles.collapsibleSection}>
                                <div className={styles.sectionHeader}>
                                    <h2 className={styles.sectionHeading}>Announcements</h2>
                                    <button className={styles.expandBtn} onClick={toggleAnnouncements}>
                                        <Icon icon={announcementsExpanded ? "mdi:chevron-up" : "mdi:chevron-down"} size={20} />
                                    </button>
                                </div>
                                <div ref={announcementsRef} className={`${styles.collapsibleContent} ${announcementsExpanded ? styles.expanded : ""}`}>
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
                                <div ref={faqRef} className={`${styles.collapsibleContent} ${faqExpanded ? styles.expanded : ""}`}>
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
                        {isOrganizer && comp.status === "open" && pendingEditRequest ? (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', margin: '20px' }}>
                                <span style={{ color: 'var(--color-text)', fontWeight: 600 }}>Awaiting admin approval</span>
                                <Button variant="red-secondary" className={styles.withdrawBtn} style={{ margin: 0 }} onClick={handleCancelEditRequest}>Cancel Request</Button>
                            </div>
                        ) : isOrganizer && comp.status === "open" ? (
                            <Button variant="red" className={styles.withdrawBtn} onClick={() => navigate(`/organizer/${comp.id}/edit`)}>Edit Competition</Button>
                        ) : isOrganizer && comp.status === "pending" ? (
                            <Button variant="red" className={styles.withdrawBtn} onClick={() => {}}>Cancel Submission</Button>
                        ) : isOrganizer && comp.status === "draft" ? (
                            <Button variant="red" className={styles.withdrawBtn} onClick={() => navigate(`/organizer/${comp.id}/edit`)}>Edit Draft</Button>
                        ) : !isOrganizer && comp.status === "open" && isTeamLeader && (myTeam?.status === "pending" || myTeam?.status === "accepted") ? (
                            <Button variant="red" className={styles.withdrawBtn} onClick={() => setWithdrawOpen(true)}>Withdraw</Button>
                        ) : null}
                    </div>
                </div>
            </div>
            <Modal isOpen={applyOpen} onClose={() => setApplyOpen(false)} hideHeader>
                <div className={styles.applyModalContent}>
                    <div className={styles.applyHeader}>
                        <span className={styles.applyHeaderTitle}>{hasTeamForThisEvent ? "Your Application" : "Apply"}</span>
                        <Dialog.Close asChild>
                            <button className={styles.applyCloseBtn} aria-label="Close">
                                <Icon icon="mdi:close" size={24} />
                            </button>
                        </Dialog.Close>
                    </div>
                    <div className={styles.applyForm}>
                        <FileInput
                            label="Team Picture"
                            variant="avatar"
                            readOnly={!canEdit}
                            previewUrl={teamPicturePreview}
                            onChange={(e) => {
                                const file = e.target.files?.[0]
                                if (!file) return
                                setTeamPictureFile(file)
                                setTeamPicturePreview(URL.createObjectURL(file))
                            }}
                        />
                        <TextInput
                            label="Team Name"
                            value={teamName}
                            onChange={canEdit ? (e) => setTeamName(e.target.value) : undefined}
                            readOnly={!canEdit || isSubmitted}
                        />
                        {(myTeam?.status === "pending" || myTeam?.status === "accepted" || myTeam?.status === "rejected") && (
                            <p className={styles.submitStatusText}>
                                {myTeam?.status === "pending" && "Application submitted — awaiting organizer review."}
                                {myTeam?.status === "accepted" && "Application accepted by the organizer!"}
                                {myTeam?.status === "rejected" && "Application rejected by the organizer."}
                            </p>
                        )}
                        {submitError && <p className={styles.errorText}>{submitError}</p>}
                        {canEdit && hasTeamForThisEvent && (
                            <div className={styles.teamSection}>
                                <label className={styles.formQuestionLabel}>Team Members ({acceptedCount + pendingInvites}/{maxSize})</label>
                                <div className={styles.inviteRow}>
                                    <div className={styles.inviteInputWrap}>
                                        <TextInput
                                            placeholder="Enter email to invite"
                                            value={inviteEmail}
                                            onChange={(e) => setInviteEmail(e.target.value)}
                                        />
                                    </div>
                                    <Button variant="primary" className={styles.inviteBtn} onClick={handleInvite}>Invite</Button>
                                </div>
                                {inviteError && <p className={styles.errorText}>{inviteError}</p>}
                                <div className={styles.memberList}>
                                    {participants.map((p) => (
                                        <div key={p.id} className={styles.memberItem}>
                                            <span className={styles.memberName}>
                                                {p.user_detail ? `${p.user_detail.first_name} ${p.user_detail.last_name}` : `User #${p.user}`}
                                                {p.leader ? " (Leader)" : ""}
                                            </span>
                                            <div className={styles.memberRight}>
                                                <span className={`${styles.memberStatus} ${styles[p.status]}`}>{p.status}</span>
                                                {!p.leader && (
                                                    <button className={styles.removeMemberBtn} onClick={() => deleteTeamParticipant(p.id)}>
                                                        <Icon icon="mdi:close" size={14} />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                    {invitations.filter((inv) => inv.status === "pending").map((inv) => (
                                        <div key={`inv-${inv.id}`} className={styles.memberItem}>
                                            <span className={styles.memberName}>
                                                {inv.user_detail ? `${inv.user_detail.first_name} ${inv.user_detail.last_name}` : `User #${inv.user}`}
                                            </span>
                                            <div className={styles.memberRight}>
                                                <span className={`${styles.memberStatus} ${styles.pending}`}>pending</span>
                                                <button className={styles.removeMemberBtn} onClick={() => deleteTeamInvitation(inv.id)}>
                                                    <Icon icon="mdi:close" size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {!canEdit && hasTeamForThisEvent && (
                            <div className={styles.teamSection}>
                                <label className={styles.formQuestionLabel}>Team Members ({acceptedCount + pendingInvites}/{maxSize})</label>
                                <div className={styles.memberList}>
                                    {participants.map((p) => (
                                        <div key={p.id} className={styles.memberItem}>
                                            <span className={styles.memberName}>
                                                {p.user_detail ? `${p.user_detail.first_name} ${p.user_detail.last_name}` : `User #${p.user}`}
                                                {p.leader ? " (Leader)" : ""}
                                            </span>
                                            <span className={`${styles.memberStatus} ${styles[p.status]}`}>{p.status}</span>
                                        </div>
                                    ))}
                                    {invitations.filter((inv) => inv.status === "pending").map((inv) => (
                                        <div key={`inv-${inv.id}`} className={styles.memberItem}>
                                            <span className={styles.memberName}>
                                                {inv.user_detail ? `${inv.user_detail.first_name} ${inv.user_detail.last_name}` : `User #${inv.user}`}
                                            </span>
                                            <span className={`${styles.memberStatus} ${styles.pending}`}>pending</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    {canEdit && (
                        <div className={styles.applyActions}>
                            <div className={styles.applyActionsLeft}>
                                {hasTeamForThisEvent && (
                                    <Button variant="red-secondary" className={styles.applyActionBtn} onClick={() => setDeleteOpen(true)}>Delete Application</Button>
                                )}
                            </div>
                            <div className={styles.applyActionsRight}>
                                <Button variant="red-secondary" className={styles.applyActionBtn} onClick={() => setApplyOpen(false)}>Discard</Button>
                                <Button variant="secondary" className={styles.applyActionBtn} onClick={handleSave}>Save</Button>
                                <Button variant="primary" className={styles.applyActionBtn} onClick={handleSubmit}>Submit</Button>
                            </div>
                        </div>
                    )}
                    {!canEdit && (
                        <div className={styles.applyActions}>
                            <div className={styles.applyActionsLeft}>
                                {hasTeamForThisEvent && myParticipant && !myParticipant.leader && myTeam?.status !== "accepted" && (
                                    <Button variant="red-secondary" className={styles.applyActionBtn} onClick={handleLeaveTeam}>Leave Team</Button>
                                )}
                            </div>
                            <div className={styles.applyActionsRight}>
                                <Button variant="primary" className={styles.applyActionBtn} onClick={() => setApplyOpen(false)}>Close</Button>
                            </div>
                        </div>
                    )}
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
                    <TextInput placeholder="Yes" value={withdrawInput} onChange={(e) => setWithdrawInput(e.target.value)} />
                    {withdrawError && <p className={styles.errorText}>{withdrawError}</p>}
                    <div className={styles.withdrawActions}>
                        <Button variant="primary" onClick={() => setWithdrawOpen(false)}>Cancel</Button>
                        <Button variant="red-secondary" onClick={() => { if (withdrawInput.toLowerCase() === "yes") handleWithdraw(); }}>Confirm</Button>
                    </div>
                </div>
            </Modal>
            <Modal isOpen={deleteOpen} onClose={() => setDeleteOpen(false)} hideHeader>
                <div className={styles.withdrawModalContent}>
                    <div className={styles.withdrawHeader}>
                        <span className={styles.withdrawHeaderTitle}>Delete Application</span>
                        <Dialog.Close asChild>
                            <button className={styles.withdrawCloseBtn} aria-label="Close">
                                <Icon icon="mdi:close" size={24} />
                            </button>
                        </Dialog.Close>
                    </div>
                    <p className={styles.withdrawText}>
                        <strong>Are you sure you want to delete this application? (write &lsquo;yes&rsquo; in the text box below)</strong>
                    </p>
                    <TextInput placeholder="Yes" value={deleteInput} onChange={(e) => setDeleteInput(e.target.value)} />
                    <div className={styles.withdrawActions}>
                        <Button variant="primary" onClick={() => setDeleteOpen(false)}>Cancel</Button>
                        <Button variant="red-secondary" onClick={() => { if (deleteInput.toLowerCase() === "yes") handleDelete(); setDeleteOpen(false); setDeleteInput("") }}>Confirm</Button>
                    </div>
                </div>
            </Modal>
        </>
    )

    return isPreview ? content : <SectionedLayout preset={navPreset}>{content}</SectionedLayout>
}

export default CompetitionDetailPage
