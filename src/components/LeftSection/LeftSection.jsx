import Account from "../Account/Account"
import Navigation from "../Navigation/Navigation"
import SideSection from "../../layouts/SideSection/SideSection"
import Block from "../Block/Block"

function LeftSection({ type = 'navbar', links = [] }) {
    return (
        <SideSection footer={<Account />}>
            <Block>
                {type === 'community' ? (
                    <div className="placeholder" style={{ opacity: 0.5 }}>Community Features Soon</div>
                ) : (
                    <Navigation links={links} />
                )}
            </Block>
        </SideSection>
    )
}

export default LeftSection
