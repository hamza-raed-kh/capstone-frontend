import { formatDistanceToNow } from "date-fns"
import styles from './Inbox.module.css'
import Icon from '@/components/ui/Icon/Icon'
import Notification from '../Notification/Notification'
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { toggleRightSidebar } from "../../../features/layout/layoutSlice"
import { useGetNotificationsQuery } from "../../../features/api/notificationApi"
import { useGetMeQuery } from "../../../features/api/authApi"
import { useGetTeamInvitationsQuery, useAcceptTeamInviteMutation, useRejectTeamInviteMutation } from "../../../features/api/teamApi"

function Inbox() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { data: notifData, isLoading } = useGetNotificationsQuery()
    const { data: me } = useGetMeQuery()
    const { data: invitationsData } = useGetTeamInvitationsQuery(
        { user: me?.id },
        { skip: !me?.id },
    )
    const invitations = invitationsData?.results || []
    const [acceptInvite] = useAcceptTeamInviteMutation()
    const [rejectInvite] = useRejectTeamInviteMutation()

    const notifs = notifData?.results || []

    const pendingInviteIds = new Set(
        invitations.filter((inv) => inv.status === "pending").map((inv) => inv.id)
    )

    const parseInviteId = (link) => {
        if (!link) return null
        const url = new URL(link, window.location.origin)
        const id = url.searchParams.get("invite")
        return id ? Number(id) : null
    }

    const handleAccept = async (notif) => {
        const invitationId = parseInviteId(notif.link)
        if (!invitationId) return
        try {
            await acceptInvite(invitationId)
        } catch {}
    }

    const handleReject = async (notif) => {
        const invitationId = parseInviteId(notif.link)
        if (!invitationId) return
        try {
            await rejectInvite(invitationId)
        } catch {}
    }

    return <div className={styles.inboxContainer}>
        <div className={styles.inboxHeader}>
            <div onClick={() => dispatch(toggleRightSidebar())} style={{ cursor: 'pointer', display: 'flex' }}>
                <Icon size={24} icon="solar:inbox-bold" />
            </div>
            <h1 className={styles.inboxTitle}>Inbox</h1>
        </div>
        <div className={styles.inboxList}>
            {isLoading && <p className={styles.emptyText}>Loading...</p>}
            {!isLoading && notifs.length === 0 && <p className={styles.emptyText}>No notifications yet.</p>}
            {notifs.map((notif) => {
                const isTeamInvite = notif.type === "team_invite"
                const inviteId = parseInviteId(notif.link)
                const showButtons = isTeamInvite && inviteId !== null && pendingInviteIds.has(inviteId)
                const cleanLink = notif.link?.split("?")[0]
                return (
                    <Notification
                        key={notif.id}
                        date={formatDistanceToNow(new Date(notif.created_at), { addSuffix: true })}
                        onClick={cleanLink ? () => navigate(cleanLink) : undefined}
                        onAccept={showButtons ? () => handleAccept(notif) : undefined}
                        onReject={showButtons ? () => handleReject(notif) : undefined}
                    >
                        {notif.content}
                    </Notification>
                )
            })}
        </div>
    </div>
}

export default Inbox
