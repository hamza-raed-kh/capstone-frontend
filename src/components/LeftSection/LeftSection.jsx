import Account from "../Account/Account"
import Navigation from "../Navigation/Navigation"
import SideSection from "../../layouts/SideSection/SideSection"
import Block from "../Block/Block"

function LeftSection({ preset }) {
    return (
        <SideSection footer={<Account />}>
            <Block>
                <Navigation preset={preset} />
            </Block>
        </SideSection>
    )
}

export default LeftSection
