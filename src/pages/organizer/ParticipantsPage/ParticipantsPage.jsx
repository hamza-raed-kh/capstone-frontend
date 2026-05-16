import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useDispatch } from "react-redux"
import FilterRow from "../../../components/data/FilterRow/FilterRow"
import Results from "../../../components/data/Results/Results"
import SearchBar from "../../../components/ui/SearchBar/SearchBar"
import SectionedLayout from "../../../layouts/SectionedLayout/SectionedLayout"
import { setCurrentCompetition, clearCurrentCompetition } from "../../../features/competition/competitionSlice"
import styles from './ParticipantsPage.module.css'

function ParticipantsPage() {
    const { id } = useParams()
    const dispatch = useDispatch()
    useEffect(() => {
        if (id) dispatch(setCurrentCompetition(Number(id)))
        return () => dispatch(clearCurrentCompetition())
    }, [id, dispatch])
    let single_userrecord = {
            variant: "invited",
            avatar: "https://imgs.search.brave.com/Nu92Ba-Z_C_AJh8giZUFnICO6fmpksx3f_IwdQ58Srk/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/c3RvY2t2YXVsdC5u/ZXQvZGF0YS8yMDE1/LzA5LzA2LzE3Nzk1/OC90aHVtYjE2Lmpw/Zw",
            username: "Simon",
    }

    let userrecords = [
        single_userrecord,
        single_userrecord,
        single_userrecord,
        single_userrecord,
    ]
    
    let userlists =[
        {icon: '', title: 'Invited', category: '', userrecords: userrecords.map(obj => ({
                ...obj,
                variant: "invited",
            }))
        },
        {icon: '', title: 'Applied', category: '', userrecords: userrecords.map(obj => ({
                ...obj,
                variant: "applied",
            }))
        },
        {icon: '', title: 'Participants/Teams', category: '', userrecords: userrecords.map(obj => ({
                ...obj,
                variant: "participant",
            }))
        },
        {icon: '', title: 'Disqualified', category: '', userrecords: userrecords.map(obj => ({
                ...obj,
                variant: "disqualified",
            }))
        },
    ]

    return (
        <SectionedLayout preset="organizer">
            <div className={styles.pageContainer}>
                <div className={styles.pageSearchSection}>
                    <SearchBar />
                </div>
                <div className={styles.pageFiltersSection}>
                    <FilterRow />
                </div>
                <div className={styles.pageResultsSection}>
                    <Results variant={'userlists'} sections={userlists}/>
                </div>
            </div>
        </SectionedLayout>
    )
}

export default ParticipantsPage
