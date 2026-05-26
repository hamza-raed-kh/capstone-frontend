import AccountBox from '../AccountBox/AccountBox'
import Navigation from '../Navigation/Navigation'
import SideSection from "../../../layouts/SideSection/SideSection"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toggleLeftSidebar } from "../../../features/layout/layoutSlice"
import { logOut } from "../../../features/user/userThunks"
import { useGetMeQuery } from "../../../features/api/authApi"
import { Button } from '../../inputs/Button/Button'
import styles from './LeftSection.module.css'
import Icon from '../../ui/Icon/Icon'
import logoSvg from '../../../assets/Logo.svg'

function LeftSection({ preset, community_links, backLink }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data: userData } = useGetMeQuery();

    const handleLogout = () => {
        const isAdmin = userData?.is_staff;
        dispatch(logOut());
        navigate(isAdmin ? '/admin/login' : '/login');
    };

    return (
        <SideSection footer={<AccountBox />}>
            <div className={styles.menuSection}>
                <div className={styles.menuHeader}>
                    <div className={styles.logoContainer} onClick={() => navigate('/explore')}>
                        <div className={styles.logoMenuBtn} onClick={(e) => { e.stopPropagation(); dispatch(toggleLeftSidebar()) }}>
                            <Icon size={20} icon="garden:menu-fill-16" />
                        </div>
                        <img src={logoSvg} alt="Nizal" className={styles.logoImage} />
                    </div>
                </div>
                <Navigation preset={preset} community_links={community_links} backLink={backLink}/>
                {preset === "account" && (
                    <div className={styles.logoutSection}>
                        <Button variant="red-secondary" onClick={handleLogout} className={styles.logoutButton}>
                            Log Out
                        </Button>
                    </div>
                )}
            </div>
        </SideSection>
    )
}

export default LeftSection
