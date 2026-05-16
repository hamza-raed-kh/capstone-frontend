import { useNavigate } from "react-router-dom"
import Icon from "../Icon/Icon"
import styles from "./AccountBox.module.css"

function AccountBox() {
    const navigate = useNavigate()
    const profile = {
        avatar: 'https://imgs.search.brave.com/Nu92Ba-Z_C_AJh8giZUFnICO6fmpksx3f_IwdQ58Srk/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/c3RvY2t2YXVsdC5u/ZXQvZGF0YS8yMDE1/LzA5LzA2LzE3Nzk1/OC90aHVtYjE2Lmpw/Zw',
        name: 'Hamza Khattab'
    }

    return <div className={styles.container} onClick={() => navigate('/account/profile')}>
        <img className={styles.accountAvatar} src={profile.avatar} alt={profile.name} />
        <p className={styles.accountName}>{profile.name}</p>
        <Icon size={28} icon="iconamoon:arrow-right-2-bold" className={styles.accountArrow} />
    </div>
}

export default AccountBox
