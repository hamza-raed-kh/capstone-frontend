import ChatInput from "./ChatInput";

/**
 * Storybook configuration for the `chatinput` component.
 * This file defines the stories for the `chatinput` component, which are used to
 * visualize and test the component in isolation.
 *
 * @type {import('@storybook/react').Meta}
 */
export default {
    title: "Components/ChatInput",
    component: ChatInput,
}

/**
 * The only variant of the `ChatInput` component.
 *
 * @type {import('@storybook/react').StoryObj}
 */
export const Basic = {
  args: {
    variant: "search",
    children: "Button",
  },
};
