import UserRecord from "./UserRecord";

/**
 * Storybook configuration for the `userrecord` component.
 * This file defines the stories for the `userrecord` component, which are used to
 * visualize and test the component in isolation. Each story represents a different
 * state or variation of the component.
 *
 * @type {import('@storybook/react').Meta}
 */
export default {
    title: "Components/UserRecord",
    component: UserRecord,
}

/**
 * The only variant of the `UserRecord` component.
 *
 * @type {import('@storybook/react').StoryObj}
 */
export const Default = {
  args: {
    variant: "invited",
    username: "Simon",
  },
};
