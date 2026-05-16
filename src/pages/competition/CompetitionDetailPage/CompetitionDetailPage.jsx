import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
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
import { selectCompetition } from "../../../features/competition/competitionSlice"
import styles from './CompetitionDetailPage.module.css'

function CompetitionDetailPage() {
    const navigate = useNavigate()
    const comp = useSelector(selectCompetition)
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

    return (
        <SectionedLayout preset="organizer">
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
                                            <Button variant="primary" className={styles.applyBtn} onClick={() => setApplyOpen(true)}>
                                                Apply
                                            </Button>
                                            <button className={styles.messageBtn} onClick={() => navigate('/community/general')}>
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
                        <div className={styles.collapsibleSection}>
                            <div className={styles.sectionHeader}>
                                <h2 className={styles.sectionHeading}>Announcements</h2>
                            </div>
                            <div ref={announcementsRef} className={`${styles.collapsibleContent} ${announcementsExpanded ? styles.expanded : ''}`}>
                                <div className={styles.collapsibleInner}>
                                    <div className={styles.announcementList}>
                                        {comp.announcements.map((ann, i) => (
                                            <div key={i} className={styles.announcementItem}>
                                                <span className={styles.announcementDate}>{format(ann.date, "MMM d, yyyy")}</span>
                                                <p className={styles.announcementMessage}>{ann.message}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            {comp.announcements.length > 1 && (
                                <button className={styles.expandBtn} onClick={toggleAnnouncements}>
                                    <Icon icon={announcementsExpanded ? "mdi:chevron-up" : "mdi:chevron-down"} size={24} />
                                </button>
                            )}
                        </div>
                        <div className={styles.collapsibleSection}>
                            <div className={styles.sectionHeader}>
                                <h2 className={styles.sectionHeading}>FAQ</h2>
                            </div>
                            <div ref={faqRef} className={`${styles.collapsibleContent} ${faqExpanded ? styles.expanded : ''}`}>
                                <div className={styles.collapsibleInner}>
                                    <div className={styles.faqList}>
                                        {comp.faq.map((item, i) => (
                                            <div key={i} className={styles.faqItem}>
                                                <h3 className={styles.faqQuestion}>{item.question}</h3>
                                                <p className={styles.faqAnswer}>{item.answer}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            {comp.faq.length > 1 && (
                                <button className={styles.expandBtn} onClick={toggleFaq}>
                                    <Icon icon={faqExpanded ? "mdi:chevron-up" : "mdi:chevron-down"} size={24} />
                                </button>
                            )}
                        </div>
                        <Button variant="red" className={styles.withdrawBtn} onClick={() => setWithdrawOpen(true)}>Withdraw</Button>
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
                        <span className={styles.withdrawHeaderTitle}>Withdraw</span>
                        <Dialog.Close asChild>
                            <button className={styles.withdrawCloseBtn} aria-label="Close">
                                <Icon icon="mdi:close" size={24} />
                            </button>
                        </Dialog.Close>
                    </div>
                    <p className={styles.withdrawText}>
                        <strong>Are you sure you want to withdraw from this competition? (write &lsquo;yes&rsquo; in the text box below)</strong>
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
