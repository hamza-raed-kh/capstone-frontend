import SectionHeader from "./SectionHeader";

/**
 * Storybook configuration for the `sectionheader` component.
 * This file defines the stories for the `sectionheader` component, which are used to
 * visualize and test the component in isolation. Each story represents a different
 * state or variation of the component.
 *
 * @type {import('@storybook/react').Meta}
 */
export default {
    title: "Components/SectionHeader",
    component: SectionHeader,
}

/**
 * The red variant of the `SectionHeader` component.
 *
 * @type {import('@storybook/react').StoryObj}
 */
export const Danger = {
  args: {
    variant: "red",
    title: "Section",
  },
};

/**
 * The with-icon & with-category variant of the `SectionHeader` component.
 *
 * @type {import('@storybook/react').StoryObj}
 */
export const IconCategory = {
  args: {
    icon: "tdesign:icon-filled",
    title: "Section",
    category: "category",
  },
};

/**
 * The without-icon & with-category variant of the `SectionHeader` component.
 *
 * @type {import('@storybook/react').StoryObj}
 */
export const IconlessCategory = {
  args: {
    icon: "",
    title: "Section",
    category: "category",
  },
};

/**
 * The with-icon & without-category variant of the `SectionHeader` component.
 *
 * @type {import('@storybook/react').StoryObj}
 */
export const IconCategoryless = {
  args: {
    icon: "tdesign:icon-filled",
    title: "Button",
    category: "",
  },
};

/**
 * The without-icon & without-category variant of the `SectionHeader` component.
 *
 * @type {import('@storybook/react').StoryObj}
 */
export const IconlessCategoryless = {
  args: {
    icon: "",
    title: "Placeholder",
    category: "",
  },
};
