import CopyRight from "../components/CopyRight"
import Inbox from "../components/Inbox"
import './SideSection.css'

function RightSection(){
    return <div className="section-container">
        <div className="section-main">
            <Inbox/>
        </div>
        <div className="section-footer">
            <CopyRight/>
        </div>
    </div>
}

export default RightSection
