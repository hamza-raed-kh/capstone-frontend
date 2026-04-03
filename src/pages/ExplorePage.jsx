import Filters from "../components/Filters"
import Results from "../components/Results"
import SearchBar from "../components/SearchBar/SearchBar"
import './ExplorePage.css'

function ExplorePage(){
    return <div className="page-container">
        <div className="page-search-section">
            <SearchBar/>
        </div>
        <div className="page-filters-section">
            <Filters/>
        </div>
        <div className="page-results-section">
            <Results/>
        </div>
    </div>
}

export default ExplorePage
