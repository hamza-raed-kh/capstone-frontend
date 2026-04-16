import LeftSection from "../../components/LeftSection/LeftSection"
import RightSection from "../../components/RightSection/RightSection"
import styles from "./SectionedLayout.module.css"

function SectionedLayout({ children, leftType = 'navbar', leftLinks = [] }) {

    return <div className={styles.sectionedLayoutContainer}>
        <div className={styles.sectionedLayoutSideSection}>
            <LeftSection type={leftType} links={leftLinks} />
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
