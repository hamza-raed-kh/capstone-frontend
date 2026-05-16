import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { setLeftMinimized, setRightMinimized } from "../../features/layout/layoutSlice"
import LeftSection from "../../components/layout/LeftSection/LeftSection"
import RightSection from "../../components/layout/RightSection/RightSection"
import styles from "./SectionedLayout.module.css"

function SectionedLayout({ children, preset, community_links }) {
    const dispatch = useDispatch();
    const { leftMinimized, rightMinimized } = useSelector(state => state.layout);

    useEffect(() => {
        // 1024px is a sensible breakpoint where 3 columns start getting cramped
        const mql = window.matchMedia('(max-width: 1024px)');
        
        const handleResize = (e) => {
            if (e.matches) {
                dispatch(setLeftMinimized(true));
                dispatch(setRightMinimized(true));
            } else {
                dispatch(setLeftMinimized(false));
                dispatch(setRightMinimized(false));
            }
        };

        // Initialize state based on current window size on mount
        if (mql.matches) {
            dispatch(setLeftMinimized(true));
            dispatch(setRightMinimized(true));
        }

        // Listen for window resize crossing the breakpoint
        mql.addEventListener('change', handleResize);
        return () => mql.removeEventListener('change', handleResize);
    }, [dispatch]);

    return <div className={styles.sectionedLayoutContainer}>
        <div className={`${styles.sectionedLayoutSideSection} ${leftMinimized ? styles.minimizedLeft : ''}`}>
            <LeftSection preset={preset} community_links={community_links}/>
        </div>
        <div className={styles.sectionedLayoutMainSection}>
            {children}
        </div>
        <div className={`${styles.sectionedLayoutSideSection} ${rightMinimized ? styles.minimizedRight : ''}`}>
            <RightSection />
        </div>
    </div>
}

export default SectionedLayout
