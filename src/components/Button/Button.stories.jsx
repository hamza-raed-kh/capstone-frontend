import { Button } from "./Button";

/**
 * Storybook configuration for the `Button` component.
 * This file defines the stories for the `Button` component, which are used to
 * visualize and test the component in isolation. Each story represents a different
 * state or variation of the component.
 *
 * @type {import('@storybook/react').Meta}
 */
export default {
  title: "Atoms/Button",
  component: Button,
};

/**
 * The primary variant of the `Button` component.
 *
 * @type {import('@storybook/react').StoryObj}
 */
export const Primary = {
  args: {
    variant: "primary",
    children: "Button",
  },
};

/**
 * The secondary variant of the `Button` component.
 *
 * @type {import('@storybook/react').StoryObj}
 */
export const Secondary = {
  args: {
    variant: "secondary",
    children: "Button",
  },
};

/**
 * The disabled variant of the `Button` component.
 *
 * @type {import('@storybook/react').StoryObj}
 */
export const Disabled = {
  args: {
    variant: "disabled",
    children: "Button",
  },
};

/**
 * The green variant of the `Button` component.
 *
 * @type {import('@storybook/react').StoryObj}
 */
export const Green = {
  args: {
    variant: "green",
    children: "Button",
  },
};

/**
 * The secondary red variant of the `Button` component.
 *
 * @type {import('@storybook/react').StoryObj}
 */
export const SecondaryRed = {
  args: {
    variant: "red-secondary",
    children: "Button",
  },
};

/**
 * The red variant of the `Button` component.
 *
 * @type {import('@storybook/react').StoryObj}
 */
export const Red = {
  args: {
    variant: "red",
    children: "Button",
  },
};

/**
 * The bronze variant of the `Button` component.
 *
 * @type {import('@storybook/react').StoryObj}
 */
export const Bronze = {
  args: {
    variant: "bronze",
    children: "Button",
  },
};

/**
 * The golden variant of the `Button` component.
 *
 * @type {import('@storybook/react').StoryObj}
 */
export const Golden = {
  args: {
    variant: "golden",
    children: "Button",
  },
};

/**
 * The silver variant of the `Button` component.
 *
 * @type {import('@storybook/react').StoryObj}
 */
export const Silver = {
  args: {
    variant: "silver",
    children: "Button",
  },
};
