import CardGroup from "./CardGroup";

/**
 * Storybook configuration for the `cardgroup` component.
 * This file defines the stories for the `cardgroup` component, which are used to
 * visualize and test the component in isolation. Each story represents a different
 * state or variation of the component.
 *
 * @type {import('@storybook/react').Meta}
 */
export default {
    title: "Components/CardGroup",
    component: CardGroup,
}

/**
 * The closable variant of the `CardGroup` component.
 *
 * @type {import('@storybook/react').StoryObj}
 */
export const Closeable = {
  args: {
    variant: 'closeable',
    title: 'Group',
    text: "General",
    eventcards: [
        {
            banner_url: "https://img.freepik.com/premium-photo/abstract-rainbow-colorful-bright-feather-closeup-up-macro-view-background-plumage-texture-withlet -dew-drops_753134-644.jpg?w=2000",
            info: {title: "Web3 Hackathon", description: "Create decentralized applications using blockchain technology and smart  contracts. Build innovative DeFi, NFT, or DAO solutions that"},
            details: {prize: "Prize", participants_now: "Now", participants_max: "Max", date_start: "Start", date_end: "End", virtual: true, location: "Location", categories: ["Crypto", "AI"]},
            button: {variant: "primary", children: "Apply"},
            onClick: {view: function(){}}
        },
        {
            banner_url: "https://img.freepik.com/premium-photo/abstract-rainbow-colorful-bright-feather-closeup-up-macro-view-background-plumage-texture-withlet -dew-drops_753134-644.jpg?w=2000",
            info: {title: "Web3 Hackathon", description: "Create decentralized applications using blockchain technology and smart  contracts. Build innovative DeFi, NFT, or DAO solutions that"},
            details: {prize: "Prize", participants_now: "Now", participants_max: "Max", date_start: "Start", date_end: "End", virtual: true, location: "Location", categories: ["Crypto", "AI"]},
            button: {variant: "primary", children: "Apply"},
            onClick: {view: function(){}}
        },
        {
            banner_url: "https://img.freepik.com/premium-photo/abstract-rainbow-colorful-bright-feather-closeup-up-macro-view-background-plumage-texture-withlet -dew-drops_753134-644.jpg?w=2000",
            info: {title: "Web3 Hackathon", description: "Create decentralized applications using blockchain technology and smart  contracts. Build innovative DeFi, NFT, or DAO solutions that"},
            details: {prize: "Prize", participants_now: "Now", participants_max: "Max", date_start: "Start", date_end: "End", virtual: true, location: "Location", categories: ["Crypto", "AI"]},
            button: {variant: "primary", children: "Apply"},
            onClick: {view: function(){}}
        },
    ],
  },
};

/**
 * The open variant of the `CardGroup` component.
 *
 * @type {import('@storybook/react').StoryObj}
 */
export const Open = {
  args: {
    variant: 'open',
    title: 'Group',
    text: "General",
    eventcards: [
        {
            banner_url: "https://img.freepik.com/premium-photo/abstract-rainbow-colorful-bright-feather-closeup-up-macro-view-background-plumage-texture-withlet -dew-drops_753134-644.jpg?w=2000",
            info: {title: "Web3 Hackathon", description: "Create decentralized applications using blockchain technology and smart  contracts. Build innovative DeFi, NFT, or DAO solutions that"},
            details: {prize: "Prize", participants_now: "Now", participants_max: "Max", date_start: "Start", date_end: "End", virtual: true, location: "Location", categories: ["Crypto", "AI"]},
            button: {variant: "primary", children: "Apply"},
            onClick: {view: function(){}}
        },
        {
            banner_url: "https://img.freepik.com/premium-photo/abstract-rainbow-colorful-bright-feather-closeup-up-macro-view-background-plumage-texture-withlet -dew-drops_753134-644.jpg?w=2000",
            info: {title: "Web3 Hackathon", description: "Create decentralized applications using blockchain technology and smart  contracts. Build innovative DeFi, NFT, or DAO solutions that"},
            details: {prize: "Prize", participants_now: "Now", participants_max: "Max", date_start: "Start", date_end: "End", virtual: true, location: "Location", categories: ["Crypto", "AI"]},
            button: {variant: "primary", children: "Apply"},
            onClick: {view: function(){}}
        },
        {
            banner_url: "https://img.freepik.com/premium-photo/abstract-rainbow-colorful-bright-feather-closeup-up-macro-view-background-plumage-texture-withlet -dew-drops_753134-644.jpg?w=2000",
            info: {title: "Web3 Hackathon", description: "Create decentralized applications using blockchain technology and smart  contracts. Build innovative DeFi, NFT, or DAO solutions that"},
            details: {prize: "Prize", participants_now: "Now", participants_max: "Max", date_start: "Start", date_end: "End", virtual: true, location: "Location", categories: ["Crypto", "AI"]},
            button: {variant: "primary", children: "Apply"},
            onClick: {view: function(){}}
        },
    ],
  },
};