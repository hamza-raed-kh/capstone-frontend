import { useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import SearchBar from "../../../components/ui/SearchBar/SearchBar"
import SectionedLayout from "../../../layouts/SectionedLayout/SectionedLayout"
import CompetitionForm from "../../../components/forms/CompetitionForm/CompetitionForm"
import { Button } from "../../../components/inputs/Button/Button"
import { useGetEventQuery } from "../../../features/api/eventApi"
import { setCurrentCompetition, clearCurrentCompetition } from "../../../features/competition/competitionSlice"
import styles from "./CompetitionEditPage.module.css"

function CompetitionEditPage() {
    const { id } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { data: comp, isLoading } = useGetEventQuery(Number(id))

    useEffect(() => {
        if (id) dispatch(setCurrentCompetition(Number(id)))
        return () => dispatch(clearCurrentCompetition())
    }, [id, dispatch])

    if (isLoading) return <div>Loading...</div>
    if (!comp) return <div>Competition not found.</div>

    if (comp.status === "pending") {
        return (
            <SectionedLayout preset="organizer">
                <div className={styles.pageWrap}>
                    <div className={styles.pageSearchSection}>
                        <SearchBar />
                    </div>
                    <div className={styles.restrictedMessage}>
                        <h2>Under Review</h2>
                        <p>This competition is currently under review. You cannot edit it until the review is complete.</p>
                        <Button variant="primary" onClick={() => navigate(`/competition/${comp.id}`)}>Back to Competition</Button>
                    </div>
                </div>
            </SectionedLayout>
        )
    }

    return (
        <SectionedLayout preset="organizer">
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
