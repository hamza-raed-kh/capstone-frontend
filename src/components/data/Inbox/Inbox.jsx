import { formatDistanceToNow } from "date-fns"
import styles from './Inbox.module.css'
import Icon from '@/components/ui/Icon/Icon'
import Notification from '../Notification/Notification'
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { toggleRightSidebar } from "../../../features/layout/layoutSlice"
import { useGetNotificationsQuery } from "../../../features/api/notificationApi"

function Inbox() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { data: notifData, isLoading } = useGetNotificationsQuery()

    const notifs = notifData?.results || []

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
            {notifs.map((notif) => (
                <Notification
                    key={notif.id}
                    date={formatDistanceToNow(new Date(notif.created_at), { addSuffix: true })}
                    onClick={notif.link ? () => navigate(notif.link) : undefined}
                >
                    {notif.content}
                </Notification>
            ))}
        </div>
    </div>
}

export default Inbox
