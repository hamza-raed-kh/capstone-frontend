import SecurityPage from "./SecurityPage";

/**
 * Storybook configuration for the `securitypage` component.
 * This file defines the stories for the `securitypage` component, which are used to
 * visualize and test the component in isolation. Each story represents a different
 * state or variation of the component.
 *
 * @type {import('@storybook/react').Meta}
 */
export default {
    title: "Pages/SecurityPage",
    component: SecurityPage,
}

/**
 * The only variant of the `SecurityPage` component.
 *
 * @type {import('@storybook/react').StoryObj}
 */
export const Example = {
  args: {
    
  },
};
