import Copyright from '../../ui/Copyright/Copyright'
import Inbox from '../../data/Inbox/Inbox'
import SideSection from "../../../layouts/SideSection/SideSection"

function RightSection() {
    return (
        <SideSection footer={<Copyright />}>
            <Inbox />
        </SideSection>
    );
}

export default RightSection
