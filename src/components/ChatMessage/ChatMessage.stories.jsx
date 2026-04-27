import ChatMessage from "./ChatMessage";

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
    avatar: "https://search.beastfly.win/image_proxy?url=https%3A%2F%2Fimgs.search.brave.com%2FhnQ7lLSxa7xnk1DpWsDAFdSYVQLnjb7yvJoewqqY0A4%2Frs%3Afit%3A500%3A0%3A1%3A0%2Fg%3Ace%2FaHR0cHM6Ly9zaG9w%2FLnJveWFsYXJhYmlh%2FbnMuY29tL2Nkbi9z%2FaG9wL2ZpbGVzL2dh%2FemFsLWFsLXNoYXFh%2FYi0wMS5qcGc_dj0x%2FNzExMTQ0NTIyJndp%2FZHRoPTE5NDY&h=71e621cb5ee255464f3a58550b8e7e77233f06862f8af1687ec1973cda9fd8c4",
    timestamp: new Date(),
    body: "Lorem ipsum dolor sit amet consectetur adipiscing elit.",
  },
};
