import { useSelector } from "react-redux"
import SearchBar from "../../components/SearchBar/SearchBar"
import SectionedLayout from "../../layouts/SectionedLayout/SectionedLayout"
import CompetitionForm from "../../components/CompetitionForm/CompetitionForm"
import { selectCompetition } from "../../features/competition/competitionSlice"
import styles from "./CompetitionEditPage.module.css"

function CompetitionEditPage() {
    const comp = useSelector(selectCompetition);

    let comp_name = "Web3 Hackathon";

    return (
        <SectionedLayout preset="organizer">
            <div className={styles.pageWrap}>
                <div className={styles.pageSearchSection}>
                    <SearchBar variant="placeholder">{comp?.title || ""}</SearchBar>
                </div>
                <CompetitionForm initialData={comp} isEdit />
            </div>
        </SectionedLayout>
    )
}

export default CompetitionEditPage
