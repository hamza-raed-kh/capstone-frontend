import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleLeftSidebar, toggleRightSidebar } from '../../../features/layout/layoutSlice';
import { setSearch } from '../../../features/filters/filtersSlice';
import Icon from '../Icon/Icon';
import styles from './SearchBar.module.css'

const SearchBar = ({ variant = 'search', children }) => {
  const searchFromStore = useSelector((state) => state.filters.search);
  const [localSearch, setLocalSearch] = useState(searchFromStore || "");
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (localSearch !== searchFromStore) {
        dispatch(setSearch(localSearch));
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [localSearch, searchFromStore, dispatch]);

  const handleSearchChange = (e) => {
    setLocalSearch(e.target.value);
  }

  const searchBarSegment = () => {
    switch (variant) {
      case 'search':
        return (
          <div className={`${styles.searchbarCenter}`}>
            <input className={`${styles.searchbarSearchText}`} type="text" placeholder="Search the arena..." value={localSearch} onChange={handleSearchChange} />
            <span className={`${styles.searchbarSearchIcon}`}>
              <Icon icon={'icon-park-outline:search'} size={24} />
            </span>
          </div>
        );
      case 'placeholder':
        return (
          <div className={`${styles.searchbarCenter}`}>
            <span className={`${styles.searchbarPlaceholderText}`}>{children}</span>
          </div>
        );
    }
  }

  return (
    <div className={`${styles.searchbarContainer}`}>
      <div
        className={`${styles.searchbarRightIcon}`}
        onClick={() => dispatch(toggleLeftSidebar())}
        style={{ cursor: 'pointer' }}
      >
        <Icon icon={'garden:menu-fill-16'} size={32} />
      </div>
      {searchBarSegment()}
      <div
        className={`${styles.searchbarLeftIcon}`}
        onClick={() => dispatch(toggleRightSidebar())}
        style={{ cursor: 'pointer' }}
      >
        <Icon icon={'solar:inbox-bold'} size={32} />
      </div>
    </div>
  );
}

export default SearchBar
