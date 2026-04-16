import React from 'react';
import ExplorePage from './ExplorePage';

export default {
  title: 'Pages/ExplorePage',
  component: ExplorePage,
  parameters: {
    layout: 'fullscreen',
  },
};

const Template = (args) => <ExplorePage {...args} />;

export const Default = Template.bind({});
Default.args = {};
