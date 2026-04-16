import SearchBar from "./SearchBar";

/**
 * Storybook configuration for the `searchbar` component.
 * This file defines the stories for the `searchbar` component, which are used to
 * visualize and test the component in isolation. Each story represents a different
 * state or variation of the component.
 *
 * @type {import('@storybook/react').Meta}
 */
export default {
    title: "Components/SearchBar",
    component: SearchBar,
}

/**
 * The search variant of the `SearchBar` component.
 *
 * @type {import('@storybook/react').StoryObj}
 */
export const Search = {
  args: {
    variant: "search",
    children: "Button",
  },
};

/**
 * The placeholder variant of the `SearchBar` component.
 *
 * @type {import('@storybook/react').StoryObj}
 */
export const Placeholder = {
  args: {
    variant: "placeholder",
    children: "Placeholder",
  },
};
