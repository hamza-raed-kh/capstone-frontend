import React, { useState } from 'react';
import FilterPill from '../FilterPill/FilterPill';

/**
 * FilterRow coordinates abstract FilterPills.
 * Used primarily in the main section's header.
 */
const FilterRow = () => {
  const [topics, setTopics] = useState([]);
  const [status, setStatus] = useState('');
  const [virtual, setVirtual] = useState(false);
  const [beforeDate, setBeforeDate] = useState();
  const [afterDate, setAfterDate] = useState();

  return (
    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
      <FilterPill
        type="multi-select"
        label="Topics"
        value={topics}
        onChange={setTopics}
        options={[
          { label: 'Technology', value: 'tech' },
          { label: 'Science', value: 'science' },
          { label: 'Art', value: 'art' },
        ]}
      />
      <FilterPill
        type="date"
        label="After"
        value={afterDate}
        onChange={setAfterDate}
        disabled={beforeDate ? { after: beforeDate } : undefined}
        highlightRange={{ from: afterDate, to: beforeDate }}
      />
      <FilterPill
        type="date"
        label="Before"
        value={beforeDate}
        onChange={setBeforeDate}
        disabled={afterDate ? { before: afterDate } : undefined}
        highlightRange={{ from: afterDate, to: beforeDate }}
      />
      <FilterPill
        type="checkbox"
        label="Virtual"
        checked={virtual}
        onChange={setVirtual}
      />
      <FilterPill
        type="dropdown"
        label="Status"
        value={status}
        onChange={setStatus}
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
