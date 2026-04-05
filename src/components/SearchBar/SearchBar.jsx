import './SearchBar.css'
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
function SearchBar({ variant = 'search', children, onClick }){
    function searchBarContent(){
        switch(variant){
            case 'search':
                return (
                    <>
                        <span className="searchbar-search-text">Search the arena...</span>
                        <div className="searchbar-search-icon">
                            <Icon/>
                        </div>
                    </>
                );
            case 'placeholder':
                return (
                    <>
                        <span className="searchbar-placeholder-text">{children}</span>
                    </>
                );
        }
    }

    return (
        <div className="searchbar-container">
            <div className="searchbar-right-icon">
                <Icon/>
            </div>
            <div className="searchbar-center">
                {searchBarContent()}
            </div>
            <div className="searchbar-left-icon">
                <Icon/>
            </div>
        </div>
    );
}

export default SearchBar