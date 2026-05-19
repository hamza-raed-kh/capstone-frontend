import SearchBar from "../../components/SearchBar/SearchBar"
import SectionedLayout from "../../layouts/SectionedLayout/SectionedLayout"
import CompetitionForm from "../../components/CompetitionForm/CompetitionForm"
import styles from "./CompetitionCreatePage.module.css"

function CompetitionCreatePage() {
    let comp_name = "Web3 Hackathon";

    return (
        <SectionedLayout preset="organizer">
            <div className={styles.pageWrap}>
                <div className={styles.pageSearchSection}>
                    <SearchBar variant="placeholder">{comp_name}</SearchBar>
                </div>
                <CompetitionForm isEdit={false} />
            </div>
        </SectionedLayout>
    )
}

export default CompetitionCreatePage
