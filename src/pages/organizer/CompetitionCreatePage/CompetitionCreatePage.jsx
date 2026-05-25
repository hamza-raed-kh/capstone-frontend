import SearchBar from "../../../components/ui/SearchBar/SearchBar"
import CompetitionForm from "../../../components/forms/CompetitionForm/CompetitionForm"
import styles from "./CompetitionCreatePage.module.css"

function CompetitionCreatePage() {
    return (
        <div className={styles.pageWrap}>
            <div className={styles.pageSearchSection}>
                <SearchBar variant="placeholder">Create Competition</SearchBar>
            </div>
            <CompetitionForm isEdit={false} />
        </div>
    )
}

export default CompetitionCreatePage
