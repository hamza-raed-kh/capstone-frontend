import React from 'react';
import FilterRow from './FilterRow';

export default {
  title: 'Components/FilterRow',
  component: FilterRow,
  decorators: [
    (Story) => (
      <div style={{ padding: '2rem', background: 'var(--color-whitespace)', minHeight: '50vh' }}>
        <Story />
      </div>
    ),
  ],
};

export const Default = {};
