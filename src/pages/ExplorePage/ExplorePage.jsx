import FilterRow from "../../components/FilterRow/FilterRow"
import Results from "../../components/Results/Results"
import SearchBar from "../../components/SearchBar/SearchBar"
import SectionedLayout from "../../layouts/SectionedLayout/SectionedLayout"
import styles from './ExplorePage.module.css'

function ExplorePage() {
    const navLinks = [
        { label: "Discover", to: "/explore", icon: "material-symbols:explore-rounded" },
        { label: "Following", to: "/following", icon: "ic:round-people" },
        { label: "My Events", to: "/events", icon: "ph:trophy-fill" },
        { label: "My Applications", to: "/applications", icon: "material-symbols:list-alt-outline" },
        { label: "History", to: "/history", icon: "material-symbols:history-rounded" },
    ];

    return (
        <SectionedLayout leftType="navbar" leftLinks={navLinks}>
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
