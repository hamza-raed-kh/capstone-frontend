import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useDispatch } from "react-redux"

import Results from "../../../components/data/Results/Results"
import SearchBar from "../../../components/ui/SearchBar/SearchBar"
import Modal from "../../../components/ui/Modal/Modal"

import { Button } from "../../../components/inputs/Button/Button"
import { setCurrentCompetition, clearCurrentCompetition } from "../../../features/competition/competitionSlice"
import { useGetEventQuery, useInviteToEventMutation } from "../../../features/api/eventApi"
import { useGetInvitationsQuery } from "../../../features/api/invitationApi"
import { 
    useGetTeamsQuery, useApproveTeamMutation, useRejectTeamMutation,
    useUpdateTeamParticipantMutation, useGetApplicationPreviewQuery
} from "../../../features/api/teamApi"
import { addToast } from "../../../features/toast/toastSlice"
import styles from './ParticipantsPage.module.css'
import UserRecord from "../../../components/data/UserRecord/UserRecord"

function TeamPreview({ teamId }) {
    const { data: answers, isLoading } = useGetApplicationPreviewQuery(teamId, { skip: !teamId });
    
    if (isLoading) return <div>Loading preview...</div>;
    if (!answers || answers.length === 0) return <div>No application answers.</div>;
    
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {answers.map((a, i) => (
                <div key={i} className={styles.answerCard}>
                    <p className={styles.answerQuestion}>{a.question}</p>
                    <p className={styles.answerText}>{a.answer}</p>
                </div>
            ))}
        </div>
    );
}

function ParticipantsPage() {
    const { id } = useParams()
    const dispatch = useDispatch()
    
    useEffect(() => {
        if (id) dispatch(setCurrentCompetition(Number(id)))
        return () => dispatch(clearCurrentCompetition())
    }, [id, dispatch])

    const { data: comp } = useGetEventQuery(Number(id), { skip: !id })
    const { data: invitationsData } = useGetInvitationsQuery({ event: id }, { skip: !id })
    const { data: teamsData } = useGetTeamsQuery({ event: id }, { skip: !id })
    const [inviteToEvent] = useInviteToEventMutation()
    const [approveTeam] = useApproveTeamMutation()
    const [rejectTeam] = useRejectTeamMutation()
    const [updateParticipant] = useUpdateTeamParticipantMutation()

    const [selectedTeam, setSelectedTeam] = useState(null)

    const handleInvite = async (username) => {
        try {
            await inviteToEvent({ id, username }).unwrap()
            dispatch(addToast({ message: `Invited ${username}`, type: "success" }))
        } catch {
            dispatch(addToast({ message: `Failed to invite ${username}`, type: "error" }))
        }
    }

    const handleApprove = async (teamId) => {
        try {
            await approveTeam(teamId).unwrap()
            dispatch(addToast({ message: "Team approved", type: "success" }))
            setSelectedTeam(null)
        } catch {
            dispatch(addToast({ message: "Failed to approve team", type: "error" }))
        }
    }

    const handleReject = async (teamId) => {
        try {
            await rejectTeam(teamId).unwrap()
            dispatch(addToast({ message: "Team rejected", type: "success" }))
            setSelectedTeam(null)
        } catch {
            dispatch(addToast({ message: "Failed to reject team", type: "error" }))
        }
    }

    const handleDisqualify = async (participantId) => {
        try {
            await updateParticipant({ id: participantId, status: "rejected" }).unwrap()
            dispatch(addToast({ message: "Participant disqualified", type: "success" }))
        } catch {
            dispatch(addToast({ message: "Failed to disqualify", type: "error" }))
        }
    }

    const handleReturn = async (participantId) => {
        try {
            await updateParticipant({ id: participantId, status: "accepted" }).unwrap()
            dispatch(addToast({ message: "Participant returned", type: "success" }))
        } catch {
            dispatch(addToast({ message: "Failed to return", type: "error" }))
        }
    }

    let comp_name = comp?.title || "Competition"

    const invitations = (invitationsData?.results || [])
        .filter(inv => inv.status === 'pending')
        .map(inv => ({
            userId: inv.user,
            username: inv.user_detail?.username || inv.user_detail?.email || `User ${inv.user}`,
            avatar: inv.user_detail?.avatar || null,
            variant: "invited",
        }))

    const pendingTeams = (teamsData?.results || [])
        .filter(t => t.status === 'pending')
        .map(t => ({
            userId: t.id,
            username: t.name,
            avatar: t.picture,
            variant: "applied",
            onClick: () => setSelectedTeam(t),
            onApprove: () => handleApprove(t.id),
            onReject: () => handleReject(t.id),
        }))

    const acceptedTeams = (teamsData?.results || [])
        .filter(t => t.status === 'accepted')
        .map(t => ({
            userId: t.id,
            username: t.name,
            avatar: t.picture,
            variant: "participant",
            onClick: () => setSelectedTeam(t),
            onDisqualify: () => setSelectedTeam(t),
        }))

    let disqualifiedParticipants = [];
    (teamsData?.results || []).forEach(t => {
        t.participants.forEach(p => {
            if (p.status === 'rejected') {
                disqualifiedParticipants.push({
                    userId: p.user,
                    username: `${p.user_detail?.username || p.user_detail?.email || 'User'} (${t.name})`,
                    avatar: p.user_detail?.avatar || null,
                    variant: "disqualified",
                    onReturn: () => handleReturn(p.id)
                });
            }
        });
    });

    let userlists = []
    if (comp?.visibility === "private") {
        userlists.push({
            icon: '', title: 'Invited', category: '', userrecords: invitations, onInvite: handleInvite
        })
    }
    userlists.push(
        { icon: '', title: 'Applied', category: '', userrecords: pendingTeams },
        { icon: '', title: 'Participants/Teams', category: '', userrecords: acceptedTeams },
        { icon: '', title: 'Disqualified', category: '', userrecords: disqualifiedParticipants }
    )

    return (
        <div className={styles.pageContainer}>
            <div className={styles.pageSearchSection}>
                <SearchBar variant="placeholder">{comp_name}</SearchBar>
            </div>
            <div className={styles.pageResultsSection}>
                <Results variant={'userlists'} sections={userlists}/>
            </div>
            
            <Modal isOpen={!!selectedTeam} onClose={() => setSelectedTeam(null)} title={selectedTeam?.name || "Team"}>
                {selectedTeam && (
                    <div className={styles.modalBody}>
                        <div>
                            <h3 style={{ margin: '0 0 8px 0' }}>Members</h3>
                            {selectedTeam.participants.map(p => (
                                <UserRecord 
                                    key={p.id}
                                    variant={p.status === 'rejected' ? 'disqualified' : 'participant'}
                                    username={p.user_detail?.username || p.user_detail?.email || `User ${p.user}`}
                                    avatar={p.user_detail?.avatar || null}
                                    userId={p.user}
                                    onDisqualify={() => handleDisqualify(p.id)}
                                    onReturn={() => handleReturn(p.id)}
                                />
                            ))}
                        </div>
                        {selectedTeam.status === 'pending' && (
                            <div>
                                <h3 style={{ margin: '0 0 8px 0' }}>Application Preview</h3>
                                <TeamPreview teamId={selectedTeam.id} />
                            </div>
                        )}
                        <div className={styles.actionRow}>
                            <div className={styles.actionLeft}>
                                <Button variant="secondary" onClick={() => setSelectedTeam(null)}>Close</Button>
                            </div>
                            {selectedTeam.status === 'pending' && (
                                <div className={styles.actionRight}>
                                    <Button variant="red-secondary" onClick={() => handleReject(selectedTeam.id)}>Reject</Button>
                                    <Button variant="green" onClick={() => handleApprove(selectedTeam.id)}>Approve</Button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    )
}

export default ParticipantsPage
