import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Icon from '@/components/ui/Icon/Icon'
import { useGetMeQuery } from "../../../features/api/authApi"
import { getMediaUrl } from "../../../utils/media"
import styles from './AccountBox.module.css'

function AccountBox() {
    const navigate = useNavigate()
    const { data: user } = useGetMeQuery()
    const [imgError, setImgError] = useState(false)

    const name = user ? `${user.first_name} ${user.last_name}`.trim() || "User" : "Loading..."
    const hasAvatar = user?.profile_picture && !imgError

    return <div className={styles.container}>
        {hasAvatar ? (
            <img className={styles.accountAvatar} src={getMediaUrl(user.profile_picture)} alt={name} onError={() => setImgError(true)} />
        ) : (
            <div className={`${styles.accountAvatar} ${styles.avatarPlaceholder}`}>
                <Icon icon="mdi:account-circle" size={32} />
            </div>
        )}
        <p className={styles.accountName}>{name}</p>
        <div className={styles.arrowWrapper} onClick={() => navigate('/account/profile')}>
            <Icon size={24} icon="iconamoon:arrow-right-2-bold" />
        </div>
    </div>
}

export default AccountBox
