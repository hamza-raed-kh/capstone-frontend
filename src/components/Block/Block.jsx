import styles from './Block.module.css'

function Block({ text, children }) {
    return (
        <div className={styles.block}>
            {text}
            {children}
        </div>
    )
}

export default Block