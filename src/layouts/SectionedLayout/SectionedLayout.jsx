import LeftSection from "../../components/LeftSection/LeftSection"
import RightSection from "../../components/RightSection/RightSection"
import styles from "./SectionedLayout.module.css"

function SectionedLayout({ children, preset, community_links }) {

    return <div className={styles.sectionedLayoutContainer}>
        <div className={styles.sectionedLayoutSideSection}>
            <LeftSection preset={preset} community_links={community_links}/>
        </div>
        <div className={styles.sectionedLayoutMainSection}>
            {children}
        </div>
        <div className={styles.sectionedLayoutSideSection}>
            <RightSection />
        </div>
    </div>
}

export default SectionedLayout
