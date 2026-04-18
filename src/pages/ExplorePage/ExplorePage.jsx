import FilterRow from "../../components/FilterRow/FilterRow"
import Results from "../../components/Results/Results"
import SearchBar from "../../components/SearchBar/SearchBar"
import SectionedLayout from "../../layouts/SectionedLayout/SectionedLayout"
import styles from './ExplorePage.module.css'

function ExplorePage() {
    return (
        <SectionedLayout preset="home">
            <div className={styles.pageContainer}>
                <div className={styles.pageSearchSection}>
                    <SearchBar />
                </div>
                <div className={styles.pageFiltersSection}>
                    <FilterRow />
                </div>
                <div className={styles.pageResultsSection}>
                    <Results />
                </div>
            </div>
        </SectionedLayout>
    )
}

export default ExplorePage
