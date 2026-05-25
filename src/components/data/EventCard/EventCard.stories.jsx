import EventCard from './EventCard';

/**
 * Storybook configuration for the `eventcard` component.
 * This file defines the stories for the `eventcard` component, which are used to
 * visualize and test the component in isolation. Each story represents a different
 * state or variation of the component.
 *
 * @type {import('@storybook/react').Meta}
 */
export default {
    title: "Components/EventCard",
    component: EventCard,
}

/**
 * The main variant of the `EventCard` component.
 *
 * @type {import('@storybook/react').StoryObj}
 */
export const Main = {
  args: {
    variant: 'main',
    banner_url: "https://img.freepik.com/premium-photo/abstract-rainbow-colorful-bright-feather-closeup-up-macro-view-background-plumage-texture-withlet -dew-drops_753134-644.jpg?w=2000",
    info: {title: "Web3 Hackathon", description: "Create decentralized applications using blockchain technology and smart  contracts. Build innovative DeFi, NFT, or DAO solutions that"},
    details: {prize: "Prize", participants_now: "Now", participants_max: "Max", date_start: "Start", date_end: "End", virtual: true, location: "Location", categories: ["Crypto", "AI"]},
    button: {variant: "primary", children: "Apply"},
    onClick: {view: function(){}, buttonLink: function(){}},
  },
};

/**
 * The admin variant of the `EventCard` component.
 *
 * @type {import('@storybook/react').StoryObj}
 */
export const Admin = {
  args: {
    variant: 'admin',
    banner_url: "https://img.freepik.com/premium-photo/abstract-rainbow-colorful-bright-feather-closeup-up-macro-view-background-plumage-texture-withlet -dew-drops_753134-644.jpg?w=2000",
    info: {title: "Web3 Hackathon", description: "Create decentralized applications using blockchain technology and smart  contracts. Build innovative DeFi, NFT, or DAO solutions that"},
    details: {prize: "Prize", participants_now: "Now", participants_max: "Max", date_start: "Start", date_end: "End", virtual: true, location: "Location", categories: ["Crypto", "AI"]},
    button: {variant: "primary", children: "Apply"},
    onClick: {view: function(){}, approve: function(){}, reject: function(){}},
  },
};