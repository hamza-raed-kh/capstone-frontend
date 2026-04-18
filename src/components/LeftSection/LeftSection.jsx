import Account from "../Account/Account"
import Navigation from "../Navigation/Navigation"
import SideSection from "../../layouts/SideSection/SideSection"
import { useDispatch } from "react-redux"
import { toggleLeftSidebar } from "../../features/layout/layoutSlice"
import styles from "./LeftSection.module.css"
import Icon from "../Icon/Icon"

function LeftSection({ preset }) {
    const dispatch = useDispatch();

    return (
        <SideSection footer={<Account />}>
            <div className={styles.menuSection}>
                <div className={styles.menuHeader}>
                    <div onClick={() => dispatch(toggleLeftSidebar())} style={{ cursor: 'pointer', display: 'flex' }}>
                        <Icon size={24} icon="garden:menu-fill-16" />
                    </div>
                    <h1 className={styles.menuTitle}>Sanfoor Arena</h1>
                </div>
                <Navigation preset={preset} />
            </div>
        </SideSection>
    )
}

export default LeftSection
