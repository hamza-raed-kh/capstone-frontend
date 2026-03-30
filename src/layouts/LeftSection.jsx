import Account from "../components/Account"
import NavBar from "../components/NavBar"
import './SideSection.css'

function LeftSection(){
    return <div className="section-container">
        <div className="section-main">
            <NavBar/>
        </div>
        <div className="section-footer">
            <Account/>
        </div>
    </div>
}

export default LeftSection
