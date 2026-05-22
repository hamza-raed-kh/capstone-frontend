import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTopics, setStatus, setVirtual, setBeforeDate, setAfterDate } from '../../../features/filters/filtersSlice';
import { useGetTopicsQuery } from '../../../features/api/topicApi';
import FilterPill from '../FilterPill/FilterPill';
import styles from './FilterRow.module.css';

/**
 * FilterRow coordinates abstract FilterPills.
 * Used primarily in the main section's header.
 */
const FilterRow = () => {
  const dispatch = useDispatch();

  const topics = useSelector(state => state.filters.topics);
  const status = useSelector(state => state.filters.status);
  const virtual = useSelector(state => state.filters.virtual);
  const beforeDateStr = useSelector(state => state.filters.beforeDate);
  const afterDateStr = useSelector(state => state.filters.afterDate);

  const beforeDate = beforeDateStr ? new Date(beforeDateStr) : undefined;
  const afterDate = afterDateStr ? new Date(afterDateStr) : undefined;

  const { data: topicsData } = useGetTopicsQuery()
  const topicOptions = (topicsData?.results || topicsData || []).map((t) => ({
    label: t.name,
    value: String(t.id),
  }))

  const containerRef = useRef(null);
  const [fadeDir, setFadeDir] = useState('none');

  const handleScroll = () => {
    if (!containerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
    
    // Check if we are at the start or end, allowing a 1px threshold for fractional pixels
    const isAtStart = scrollLeft <= 0;
    const isAtEnd = Math.ceil(scrollLeft + clientWidth) >= scrollWidth - 1;

    if (isAtStart && isAtEnd) {
      setFadeDir('none');
    } else if (isAtStart) {
      setFadeDir('right');
    } else if (isAtEnd) {
      setFadeDir('left');
    } else {
      setFadeDir('both');
    }
  };

  // Run on mount and window resize to initialize correctly
  useEffect(() => {
    handleScroll();
    window.addEventListener('resize', handleScroll);
    return () => window.removeEventListener('resize', handleScroll);
  }, []);

  // Also need to check scroll if the children change (e.g. data loads)
  // We don't have dynamic children here, but good practice.
  
  return (
    <div 
      className={styles.container} 
      ref={containerRef}
      onScroll={handleScroll}
      data-fade={fadeDir}
    >
      <FilterPill
        type="multi-select"
        label="Topics"
        value={topics}
        onChange={(val) => dispatch(setTopics(val))}
        options={topicOptions}
      />
      <FilterPill
        type="date"
        label="After"
        value={afterDate}
        onChange={(date) => dispatch(setAfterDate(date ? date.toISOString() : null))}
        disabled={beforeDate ? { after: beforeDate } : undefined}
        highlightRange={{ from: afterDate, to: beforeDate }}
      />
      <FilterPill
        type="date"
        label="Before"
        value={beforeDate}
        onChange={(date) => dispatch(setBeforeDate(date ? date.toISOString() : null))}
        disabled={afterDate ? { before: afterDate } : undefined}
        highlightRange={{ from: afterDate, to: beforeDate }}
      />
      <FilterPill
        type="checkbox"
        label="Virtual"
        checked={virtual}
        onChange={(val) => dispatch(setVirtual(val))}
      />
      <FilterPill
        type="dropdown"
        label="Status"
        value={status}
        onChange={(val) => dispatch(setStatus(val))}
        options={[
          { label: 'Open', value: 'open' },
          { label: 'Closed', value: 'closed' },
          { label: 'Pending', value: 'pending' },
        ]}
      />
    </div>
  );
};

export default FilterRow;
