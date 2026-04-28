import Logo from '../../assets/Logo.svg';
import styles from './BoxLayout.module.css';

function BoxLayout({ children, image }) {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <img src={Logo} alt="Logo" className={styles.logo} />
      </header>
      <main className={styles.main}>
        <div className={`${styles.boxWrapper} ${image ? styles.withImage : ''}`}>
          {image && (
            <div className={styles.imageContainer}>
              <img src={image} alt="Layout Graphic" className={styles.image} />
            </div>
          )}
          <div className={styles.content}>
            {children}
          </div>
        </div>
      </main>
      <footer className={styles.footer}><p>© 2026 Nizal. All Rights Reserved.</p></footer>
    </div>
  )
}

export default BoxLayout;