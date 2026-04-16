import Copyright from "../Copyright/Copyright"
import Inbox from "../Inbox/Inbox"
import SideSection from "../../layouts/SideSection/SideSection"

function RightSection() {
    return (
        <SideSection footer={<Copyright />}>
            <Inbox />
        </SideSection>
    );
}

export default RightSection
