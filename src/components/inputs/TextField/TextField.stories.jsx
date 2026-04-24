import TextField from "./TextField";

/**
 * Storybook configuration for the `textfield` component.
 * This file defines the stories for the `textfield` component, which are used to
 * visualize and test the component in isolation. Each story represents a different
 * state or variation of the component.
 *
 * @type {import('@storybook/react').Meta}
 */
export default {
    title: "Components/Inputs/TextField",
    component: TextField,
}

/**
 * The text variant of the `TextField` component.
 *
 * @type {import('@storybook/react').StoryObj}
 */
export const Text = {
  args: {
    label: "name",
  },
};

/**
 * The password variant of the `TextField` component.
 *
 * @type {import('@storybook/react').StoryObj}
 */
export const Password = {
  args: {
    label: "Secret",
    type: "password",
  },
};
