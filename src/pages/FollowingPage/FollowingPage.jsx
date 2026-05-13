import FilterRow from "../../components/FilterRow/FilterRow"
import Results from "../../components/Results/Results"
import SearchBar from "../../components/SearchBar/SearchBar"
import SectionedLayout from "../../layouts/SectionedLayout/SectionedLayout"
import styles from './FollowingPage.module.css'

function FollowingPage() {
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
        {icon: '', title: 'Followed', category: '', userrecords: userrecords.map(obj => ({
                ...obj,
                variant: "followed",
            }))
        },
        {icon: '', title: 'Banned', category: '', userrecords: userrecords.map(obj => ({
                ...obj,
                variant: "banned",
            }))
        },
    ]

    return (
        <SectionedLayout preset="account">
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

export default FollowingPage
