import styles from './SearchBar.module.css'
import Icon from '../Icon/Icon';

/**
 * A searchbar component with different visual styles.
 * This component supports various `variants` that apply different CSS classes
 * to the searchbar, allowing for a consistent look and feel across the application.
 *
 * @param {object} props - The properties for the searchbar.
 * @param {'search' | 'placeholder'} [props.variant='search'] - The visual variant of the searchbar.
 * @param {React.ReactNode} props.children - The content to be displayed inside the searchbar.
 * @param {Function} props.onClick - The function to be called when the searchbar icon is clicked.
 * @returns {JSX.Element} The rendered searchbar element.
 */
function SearchBar({ variant = 'search', children, onClick }) {
  function searchBarContent() {
    switch (variant) {
      case 'search':
        return (
          <>
            <span className={styles.searchText}>Search the arena...</span>
            <div className={styles.searchIcon}>
              <Icon />
            </div>
          </>
        );
      case 'placeholder':
        return (
          <>
            <span className={styles.placeholderText}>{children}</span>
          </>
        );
    }
  }

  return (
    <div className={styles.searchbarContainer}>
      <div className={styles.searchbarRightIcon}>
        <Icon size={32} icon="ci:hamburger-md" />
      </div>
      <div className={styles.searchbarCenter}>
        {searchBarContent()}
      </div>
      <div className={styles.searchbarLeftIcon}>
        <Icon size={32} icon='solar:inbox-bold' />
      </div>
    </div>
  );
}

export default SearchBar