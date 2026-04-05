import SectionHeader from "./SectionHeader";

/**
 * Storybook configuration for the `SectionHeader` component.
 * This file defines the stories for the `SectionHeader` component, which are used to
 * visualize and test the component in isolation. Each story represents a different
 * state or variation of the component.
 *
 * @type {import('@storybook/react').Meta}
 */
export default {
    title: "Atoms/SectionHeader",
    component: SectionHeader,
}

/**
 * The icon with category variant of the `SectionHeader` component.
 *
 * @type {import('@storybook/react').StoryObj}
 */
export const IconCategory = {
  args: {
    icon: "1",
    text: "Section",
    category: "category",
  },
};

/**
 * The no icon with category variant of the `SectionHeader` component.
 *
 * @type {import('@storybook/react').StoryObj}
 */
export const IconlessCategory = {
  args: {
    icon: "",
    text: "Section",
    category: "category",
  },
};

/**
 * The icon with no category variant of the `SectionHeader` component.
 *
 * @type {import('@storybook/react').StoryObj}
 */
export const IconCategoryless = {
  args: {
    icon: "1",
    text: "Button",
    category: "",
  },
};

/**
 * The no icon with no category variant of the `SectionHeader` component.
 *
 * @type {import('@storybook/react').StoryObj}
 */
export const IconlessCategoryless = {
  args: {
    icon: "",
    text: "Placeholder",
    category: "",
  },
};
