import ChatMessage from './ChatMessage';

/**
 * Storybook configuration for the `chatmessage` component.
 * This file defines the stories for the `chatmessage` component, which are used to
 * visualize and test the component in isolation.
 *
 * @type {import('@storybook/react').Meta}
 */
export default {
    title: "Components/ChatMessage",
    component: ChatMessage,
}

/**
 * The only variant of the `ChatMessage` component.
 *
 * @type {import('@storybook/react').StoryObj}
 */
export const Default = {
  args: {
    username: "Hamza Kh",
    avatar: "https://imgs.search.brave.com/Nu92Ba-Z_C_AJh8giZUFnICO6fmpksx3f_IwdQ58Srk/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/c3RvY2t2YXVsdC5u/ZXQvZGF0YS8yMDE1/LzA5LzA2LzE3Nzk1/OC90aHVtYjE2Lmpw/Zw",
    timestamp: new Date(),
    body: "Lorem ipsum dolor sit amet consectetur adipiscing elit.",
  },
};
