import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import Navigation from './Navigation';

export default {
  title: 'Components/Navigation',
  component: Navigation,
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/explore']}>
        {/* We wrap it in a container representing the left sidebar width */}
        <div style={{ width: '250px', background: 'var(--color-bg-accent)', padding: '1rem', minHeight: '100vh' }}>
          <Story />
        </div>
      </MemoryRouter >
    ),
  ],
};

const sampleLinks = [
  { to: '/', label: 'Home', icon: 'mdi:home' },
  { to: '/explore', label: 'Explore (Active)', icon: 'mdi:compass' },
  { to: '/messages', label: 'Messages', icon: 'mdi:message' },
  { to: '/settings', label: 'Settings', icon: 'mdi:cog', disabled: true },
];

export const Default = {
  args: {
    links: sampleLinks,
  },
};

export const Empty = {
  args: {
    links: [],
  },
};
