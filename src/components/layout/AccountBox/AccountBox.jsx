import { useNavigate } from "react-router-dom"
import Icon from '@/components/ui/Icon/Icon'
import { useGetMeQuery } from "../../../features/api/authApi"
import styles from './AccountBox.module.css'

function AccountBox() {
    const navigate = useNavigate()
    const { data: user } = useGetMeQuery()

    const name = user ? `${user.first_name} ${user.last_name}`.trim() || "User" : "Loading..."
    const avatar = user ? `https://i.pravatar.cc/150?u=${user.id}` : ""

    return <div className={styles.container}>
        <img className={styles.accountAvatar} src={avatar} alt={name} />
        <p className={styles.accountName}>{name}</p>
        <div className={styles.arrowWrapper} onClick={() => navigate('/account/profile')}>
            <Icon size={24} icon="iconamoon:arrow-right-2-bold" />
        </div>
    </div>
}

export default AccountBox
