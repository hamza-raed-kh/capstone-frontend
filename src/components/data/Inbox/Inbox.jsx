import styles from './Inbox.module.css'
import Icon from '@/components/ui/Icon/Icon'
import Notification from '../Notification/Notification'
import { useDispatch } from "react-redux"
import { toggleRightSidebar } from "../../../features/layout/layoutSlice"

function Inbox() {
    const dispatch = useDispatch();

    const notifs = [
        {
            date: "Today",
            children: "test",
        },
        {
            date: "Today",
            children: "test",
        },
        {
            date: "Today",
            children: "testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest",
            onReject: () => {},
        },
        {
            date: "Today",
            children: "test",
            onAccept: () => {},
        },
        {
            date: "Today",
            children: "test",
            onAccept: () => {},
            onReject: () => {}
        },
        {
            date: "Today",
            children: "test",
            onAccept: () => {},
            onReject: () => {}
        },
        {
            date: "Today",
            children: "test",
            onAccept: () => {},
            onReject: () => {}
        },
        {
            date: "Today",
            children: "test",
            onAccept: () => {},
            onReject: () => {}
        },
    ]

    return <div className={styles.inboxContainer}>
        <div className={styles.inboxHeader}>
            <div onClick={() => dispatch(toggleRightSidebar())} style={{ cursor: 'pointer', display: 'flex' }}>
                <Icon size={24} icon="solar:inbox-bold" />
            </div>
            <h1 className={styles.inboxTitle}>Inbox</h1>
        </div>
        <div className={styles.inboxList}>
            {notifs.map((notif, index) => (
                <Notification key={index} {...notif} />
            ))}
        </div>
    </div>
}

export default Inbox