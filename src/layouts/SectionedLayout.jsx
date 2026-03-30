import ExplorePage from "../pages/ExplorePage"
import LeftSection from "./LeftSection"
import RightSection from "./RightSection"
import "./SectionedLayout.css"

function SectionedLayout(){
    
    return <div className="sectioned-layout-container">
        <div className="sectioned-layout-side-section">
            <LeftSection/>
        </div>
        <div className="sectioned-layout-main-section">
            <ExplorePage/>
        </div>
        <div className="sectioned-layout-side-section">
            <RightSection/>
        </div>
    </div>
}

export default SectionedLayout
