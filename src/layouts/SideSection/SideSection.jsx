import styles from './SideSection.module.css'

function SideSection({ children, footer }) {
    return (
        <div className={styles.sectionContainer}>
            <div className={styles.sectionMain}>
                {children}
            </div>
            {footer && (
                <div className={styles.sectionFooter}>
                    {footer}
                </div>
            )}
        </div>
    );
}

export default SideSection;
