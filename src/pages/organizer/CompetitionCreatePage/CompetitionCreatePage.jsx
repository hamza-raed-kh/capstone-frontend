import SearchBar from "../../../components/ui/SearchBar/SearchBar"
import SectionedLayout from "../../../layouts/SectionedLayout/SectionedLayout"
import CompetitionForm from "../../../components/forms/CompetitionForm/CompetitionForm"
import styles from "./CompetitionCreatePage.module.css"

function CompetitionCreatePage() {
    return (
        <SectionedLayout preset="organizer">
            <div className={styles.pageWrap}>
                <div className={styles.pageSearchSection}>
                    <SearchBar />
                </div>
                <CompetitionForm isEdit={false} />
            </div>
        </SectionedLayout>
    )
}

export default CompetitionCreatePage
