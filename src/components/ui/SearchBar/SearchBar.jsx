import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { toggleLeftSidebar, toggleRightSidebar } from '../../../features/layout/layoutSlice';
import { setSearch } from '../../../features/filters/filtersSlice';
import Icon from '../Icon/Icon';
import styles from './SearchBar.module.css'

const SearchBar = ({ variant = 'search', children }) => {
  const searchFromStore = useSelector((state) => state.filters.search);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isOnExplore = location.pathname === '/explore';
  const [localSearch, setLocalSearch] = useState(isOnExplore ? (searchFromStore || "") : "");

  useEffect(() => {
    if (!isOnExplore) return;
    const timer = setTimeout(() => {
      if (localSearch !== searchFromStore) {
        dispatch(setSearch(localSearch));
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [localSearch, searchFromStore, dispatch, isOnExplore]);

  useEffect(() => {
    if (location.pathname !== '/explore') {
      setLocalSearch('');
      dispatch(setSearch(''));
    }
  }, [location.pathname, dispatch]);

  const handleSubmit = () => {
    dispatch(setSearch(localSearch));
    navigate('/explore');
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  }

  const handleSearchChange = (e) => {
    setLocalSearch(e.target.value);
  }

  const searchBarSegment = () => {
    switch (variant) {
      case 'search':
        return (
          <div className={`${styles.searchbarCenter}`}>
            <input className={`${styles.searchbarSearchText}`} type="text" placeholder="Search the arena..." value={localSearch} onChange={handleSearchChange} onKeyDown={handleKeyDown} />
            <span className={`${styles.searchbarSearchIcon}`} onClick={handleSubmit} style={{ cursor: 'pointer' }}>
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
