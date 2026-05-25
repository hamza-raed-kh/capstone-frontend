import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setCurrentCompetition, clearCurrentCompetition } from "../../../features/competition/competitionSlice"
import SearchBar from "../../../components/ui/SearchBar/SearchBar"
import CompetitionForm from "../../../components/forms/CompetitionForm/CompetitionForm"
import { useGetEventQuery } from "../../../features/api/eventApi"
import { useGetEditRequestsQuery } from "../../../features/api/editRequestApi"
import styles from "./CompetitionEditPage.module.css"

function CompetitionEditPage() {
    const { id } = useParams()
    const dispatch = useDispatch()
    
    useEffect(() => {
        if (id) dispatch(setCurrentCompetition(Number(id)))
        return () => dispatch(clearCurrentCompetition())
    }, [id, dispatch])

    const { data: comp, isLoading } = useGetEventQuery(Number(id))
    const { data: editRequestsData, isLoading: isEditReqLoading } = useGetEditRequestsQuery(
        { event: Number(id), request_status: "pending" },
        { skip: !id || comp?.status !== "open" }
    )

    if (isLoading || isEditReqLoading) return <div>Loading...</div>
    if (!comp) return <div>Competition not found.</div>

    if (comp.status === "open" && editRequestsData?.results?.length > 0) {
        return (
            <div className={styles.pageWrap}>
                <div className={styles.pageSearchSection}>
                    <SearchBar variant="placeholder">Edit Competition</SearchBar>
                </div>
                <div style={{ padding: "24px" }}>
                    <p>You cannot edit this competition because there is already a pending edit request under review by the admins.</p>
                    <p>Please wait for it to be reviewed, or cancel it from the Preview page.</p>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.pageWrap}>
            <div className={styles.pageSearchSection}>
                <SearchBar variant="placeholder">Edit Competition</SearchBar>
            </div>
            <CompetitionForm isEdit={true} initialData={comp} />
        </div>
    )
}

export default CompetitionEditPage
