import { useSelector } from "react-redux"
import SearchBar from "../../components/SearchBar/SearchBar"
import SectionedLayout from "../../layouts/SectionedLayout/SectionedLayout"
import CompetitionForm from "../../components/CompetitionForm/CompetitionForm"
import { selectCompetition } from "../../features/competition/competitionSlice"
import styles from "./CompetitionEditPage.module.css"

function CompetitionEditPage() {
    const comp = useSelector(selectCompetition)

    return (
        <SectionedLayout preset="home">
            <div className={styles.pageWrap}>
                <div className={styles.pageSearchSection}>
                    <SearchBar />
                </div>
                <CompetitionForm initialData={comp} isEdit />
            </div>
        </SectionedLayout>
    )
}

export default CompetitionEditPage
