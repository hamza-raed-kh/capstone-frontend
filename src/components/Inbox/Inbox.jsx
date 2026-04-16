import styles from "./Inbox.module.css"
import Icon from "../Icon/Icon"
import Notification from "../Notification/Notification"

function Inbox() {

    const notifs = [
        {
            date: "Today",
            children: "test",
            onAccept: true,
            onReject: true
        },
        {
            date: "Today",
            children: "test",
            onAccept: true,
            onReject: true
        },
        {
            date: "Today",
            children: "testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest",
            onAccept: true,
            onReject: true
        },
        {
            date: "Today",
            children: "test",
            onAccept: true,
            onReject: true
        },
        {
            date: "Today",
            children: "test",
            onAccept: true,
            onReject: true
        },
        {
            date: "Today",
            children: "test",
            onAccept: true,
            onReject: true
        },
        {
            date: "Today",
            children: "test",
            onAccept: true,
            onReject: true
        },
        {
            date: "Today",
            children: "test",
            onAccept: true,
            onReject: true
        },
    ]

    return <div className={styles.inboxContainer}>
        <div className={styles.inboxHeader}>
            <Icon size={24} icon="solar:inbox-bold" />
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