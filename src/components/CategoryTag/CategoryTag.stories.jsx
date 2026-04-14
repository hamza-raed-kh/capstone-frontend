import CategoryTag from "./CategoryTag";

/**
 * Storybook configuration for the `categorytag` component.
 * This file defines the stories for the `categorytag` component, which are used to
 * visualize and test the component in isolation. Each story represents a different
 * state or variation of the component.
 *
 * @type {import('@storybook/react').Meta}
 */
export default {
    title: "Atoms/CategoryTag",
    component: CategoryTag,
}

/**
 * The only variant of the `CategoryTag` component.
 *
 * @type {import('@storybook/react').StoryObj}
 */
export const Example = {
  args: {
    text: "Crypto",
  },
};