import { Outlet } from "react-router-dom"
import SectionedLayout from "../SectionedLayout/SectionedLayout"
import SearchBar from "../../components/ui/SearchBar/SearchBar"
import styles from "./AccountCenterLayout.module.css"

function AccountCenterLayout() {
    return (
        <SectionedLayout preset="account">
            <div className={styles.pageContainer}>
                <div className={styles.pageSearchSection}>
                    <SearchBar variant="placeholder">Account Center</SearchBar>
                </div>
                <Outlet />
            </div>
        </SectionedLayout>
    )
}

export default AccountCenterLayout
