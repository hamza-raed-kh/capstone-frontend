import style from './SearchBar.module.css'
import Icon from '../Icon/Icon';
import { useState } from 'react';

/**
 * A searchbar component with different visual styles.
 * This component supports various `variants` that apply different CSS classes
 * to the searchbar, allowing for a consistent look and feel across the application.
 *
 * @param {object} props - The properties for the searchbar.
 * @param {'search' | 'placeholder'} [props.variant='search'] - The visual variant of the searchbar.
 * @param {string} props.children - The string to be displayed inside the bar's 'placeholder' variant.
 * @param {Function} props.onClick - The function to be called when the searchbar icon is clicked.
 * @returns {JSX.Element} The rendered searchbar element.
 */
function SearchBar({ variant = 'search', children, onClick }){
    let [search, setSearch] = useState("");

    let handleSearchChange = (e) => {
        setSearch(e.target.value);
    }

    let handleSubmit = (e) => {
        e.preventDefault();
        alert(`Searching for: '${search}'\nIntegration from backend coming soon!`);
        //Body could use onClick?
    }

    function searchBarSegment(){
        switch(variant){
            case 'search':
                return (
                    <form className={`${style.searchbarCenter}`} onSubmit={handleSubmit}>
                        <input className={`${style.searchbarSearchText}`} type="text" placeholder="Search the arena..." value={search} onChange={handleSearchChange}/>
                        <button className={`${style.searchbarSearchIcon}`} type="submit">
                            <Icon icon={'icon-park-outline:search'}  size={24}/>
                        </button>
                    </form>
                );
            case 'placeholder':
                return (
                    <div className={`${style.searchbarCenter}`}>
                        <span className={`${style.searchbarPlaceholderText}`}>{children}</span>
                    </div>
                );
        }
    }

    return (
        <div className={`${style.searchbarContainer}`}>
            <div className={`${style.searchbarRightIcon}`}>
                <Icon icon={'garden:menu-fill-16'} size={32}/>
            </div>
            {searchBarSegment()}
            <div className={`${style.searchbarLeftIcon}`}>
                <Icon icon={'solar:inbox-bold'} size={32}/>
            </div>
        </div>
    );
}

export default SearchBar
