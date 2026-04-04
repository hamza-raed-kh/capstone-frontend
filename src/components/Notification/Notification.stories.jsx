import React from 'react';
import Notification from './Notification';

export default {
  title: 'Components/Notification',
  component: Notification,
  decorators: [
    (Story) => (
      <div style={{ padding: '1rem', background: 'var(--color-bg-accent)', minHeight: '100vh', width: '350px' }}>
        <Story />
      </div>
    ),
  ],
};

export const Default = {
  args: {
    date: '2 hours ago',
    children: 'You received a new message regarding your recent project application.',
  },
};

export const Actionable = {
  args: {
    date: 'Yesterday',
    children: 'Hamza has invited you to collaborate on Capstone Frontend.',
    onAccept: () => alert('Accepted!'),
    onReject: () => alert('Rejected!'),
  },
};

export const ActionableAcceptOnly = {
  args: {
    date: 'Last week',
    children: 'Your password was successfully reset. Acknowledge this alert.',
    onAccept: () => alert('Acknowledged!'),
  },
};
