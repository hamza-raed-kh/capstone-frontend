import FAQ from "./FAQ";

/**
 * Storybook configuration for the `SearchBar` component.
 * This file defines the stories for the `SearchBar` component, which are used to
 * visualize and test the component in isolation. Each story represents a different
 * state or variation of the component.
 *
 * @type {import('@storybook/react').Meta}
 */
export default {
    title: "Components/FAQ",
    component: FAQ,
}

/**
 * The search variant of the `FAQ` component.
 *
 * @type {import('@storybook/react').StoryObj}
 */
export const Main = {
  args: {
    question: "What is this?",
    answer: "An FAQ Component.",
  },
};
