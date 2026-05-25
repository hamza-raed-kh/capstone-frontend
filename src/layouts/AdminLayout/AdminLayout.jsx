import SectionedLayout from "../SectionedLayout/SectionedLayout"
import SearchBar from "@/components/ui/SearchBar/SearchBar"
import styles from "./AdminLayout.module.css"

function AdminLayout({ pageName, children }) {
    return (
        <SectionedLayout preset="admin">
            <div className={styles.pageContainer}>
                <div className={styles.pageSearchSection}>
                    <SearchBar variant="placeholder">Admin - {pageName}</SearchBar>
                </div>
                <div className={styles.pageResultsSection}>
                    {children}
                </div>
            </div>
        </SectionedLayout>
    )
}

export default AdminLayout
