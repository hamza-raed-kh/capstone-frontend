import Results from './Results';

/**
 * Storybook configuration for the `results` component.
 * This file defines the stories for the `results` component, which are used to
 * visualize and test the component in isolation. Each story represents a different
 * state or variation of the component.
 *
 * @type {import('@storybook/react').Meta}
 */
export default {
    title: "Components/Results",
    component: Results,
}

/**
 * The cardgroups variant of the `Results` component.
 *
 * @type {import('@storybook/react').StoryObj}
 */
export const CardGroups = {
  args: {
    variant: 'cardgroups',
    sections: [
      {
        icon: '',
        title: 'section',
        category: '',
        eventcards: [
          {
            banner_url: "https://img.freepik.com/premium-photo/abstract-rainbow-colorful-bright-feather-closeup-up-macro-view-background-plumage-texture-withlet -dew-drops_753134-644.jpg?w=2000",
            info: {title: "Web3 Hackathon", description: "Create decentralized applications using blockchain technology and smart  contracts. Build innovative DeFi, NFT, or DAO solutions that"},
            details: {prize: "Prize", participants_now: "Now", participants_max: "Max", date_start: "Start", date_end: "End", virtual: true, location: "Location", categories: ["Crypto", "AI"]},
            button: {variant: "primary", children: "Apply"},
            onClick: {view: function(){}, buttonLink: function(){}},
          },
          {
            banner_url: "https://img.freepik.com/premium-photo/abstract-rainbow-colorful-bright-feather-closeup-up-macro-view-background-plumage-texture-withlet -dew-drops_753134-644.jpg?w=2000",
            info: {title: "Web3 Hackathon", description: "Create decentralized applications using blockchain technology and smart  contracts. Build innovative DeFi, NFT, or DAO solutions that"},
            details: {prize: "Prize", participants_now: "Now", participants_max: "Max", date_start: "Start", date_end: "End", virtual: true, location: "Location", categories: ["Crypto", "AI"]},
            button: {variant: "primary", children: "Apply"},
            onClick: {view: function(){}, buttonLink: function(){}},
          },
          {
            banner_url: "https://img.freepik.com/premium-photo/abstract-rainbow-colorful-bright-feather-closeup-up-macro-view-background-plumage-texture-withlet -dew-drops_753134-644.jpg?w=2000",
            info: {title: "Web3 Hackathon", description: "Create decentralized applications using blockchain technology and smart  contracts. Build innovative DeFi, NFT, or DAO solutions that"},
            details: {prize: "Prize", participants_now: "Now", participants_max: "Max", date_start: "Start", date_end: "End", virtual: true, location: "Location", categories: ["Crypto", "AI"]},
            button: {variant: "primary", children: "Apply"},
            onClick: {view: function(){}, buttonLink: function(){}},
          },
        ],
      },
      {
        icon: '',
        title: 'section',
        category: '',
        eventcards: [
          {
            banner_url: "https://img.freepik.com/premium-photo/abstract-rainbow-colorful-bright-feather-closeup-up-macro-view-background-plumage-texture-withlet -dew-drops_753134-644.jpg?w=2000",
            info: {title: "Web3 Hackathon", description: "Create decentralized applications using blockchain technology and smart  contracts. Build innovative DeFi, NFT, or DAO solutions that"},
            details: {prize: "Prize", participants_now: "Now", participants_max: "Max", date_start: "Start", date_end: "End", virtual: true, location: "Location", categories: ["Crypto", "AI"]},
            button: {variant: "primary", children: "Apply"},
            onClick: {view: function(){}, buttonLink: function(){}},
          },
          {
            banner_url: "https://img.freepik.com/premium-photo/abstract-rainbow-colorful-bright-feather-closeup-up-macro-view-background-plumage-texture-withlet -dew-drops_753134-644.jpg?w=2000",
            info: {title: "Web3 Hackathon", description: "Create decentralized applications using blockchain technology and smart  contracts. Build innovative DeFi, NFT, or DAO solutions that"},
            details: {prize: "Prize", participants_now: "Now", participants_max: "Max", date_start: "Start", date_end: "End", virtual: true, location: "Location", categories: ["Crypto", "AI"]},
            button: {variant: "primary", children: "Apply"},
            onClick: {view: function(){}, buttonLink: function(){}},
          },
          {
            banner_url: "https://img.freepik.com/premium-photo/abstract-rainbow-colorful-bright-feather-closeup-up-macro-view-background-plumage-texture-withlet -dew-drops_753134-644.jpg?w=2000",
            info: {title: "Web3 Hackathon", description: "Create decentralized applications using blockchain technology and smart  contracts. Build innovative DeFi, NFT, or DAO solutions that"},
            details: {prize: "Prize", participants_now: "Now", participants_max: "Max", date_start: "Start", date_end: "End", virtual: true, location: "Location", categories: ["Crypto", "AI"]},
            button: {variant: "primary", children: "Apply"},
            onClick: {view: function(){}, buttonLink: function(){}},
          },
        ],
      },
    ],
  },
};

/**
 * The userlists variant of the `Results` component.
 *
 * @type {import('@storybook/react').StoryObj}
 */
export const UserLists = {
  args: {
    variant: 'userlists',
    sections: [
      {
        icon: '',
        title: 'section',
        category: '',
        userrecords: [
          {
            variant: "banned",
            avatar: "https://imgs.search.brave.com/Nu92Ba-Z_C_AJh8giZUFnICO6fmpksx3f_IwdQ58Srk/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/c3RvY2t2YXVsdC5u/ZXQvZGF0YS8yMDE1/LzA5LzA2LzE3Nzk1/OC90aHVtYjE2Lmpw/Zw",
            username: "Simon",
          },
          {
            variant: "banned",
            avatar: "https://imgs.search.brave.com/Nu92Ba-Z_C_AJh8giZUFnICO6fmpksx3f_IwdQ58Srk/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/c3RvY2t2YXVsdC5u/ZXQvZGF0YS8yMDE1/LzA5LzA2LzE3Nzk1/OC90aHVtYjE2Lmpw/Zw",
            username: "Simon",
          },
          {
            variant: "banned",
            avatar: "https://imgs.search.brave.com/Nu92Ba-Z_C_AJh8giZUFnICO6fmpksx3f_IwdQ58Srk/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/c3RvY2t2YXVsdC5u/ZXQvZGF0YS8yMDE1/LzA5LzA2LzE3Nzk1/OC90aHVtYjE2Lmpw/Zw",
            username: "Simon",
          },
        ],
      },
      {
        icon: '',
        title: 'section',
        category: '',
        userrecords: [
          {
            variant: "banned",
            avatar: "https://imgs.search.brave.com/Nu92Ba-Z_C_AJh8giZUFnICO6fmpksx3f_IwdQ58Srk/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/c3RvY2t2YXVsdC5u/ZXQvZGF0YS8yMDE1/LzA5LzA2LzE3Nzk1/OC90aHVtYjE2Lmpw/Zw",
            username: "Simon",
          },
          {
            variant: "banned",
            avatar: "https://imgs.search.brave.com/Nu92Ba-Z_C_AJh8giZUFnICO6fmpksx3f_IwdQ58Srk/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/c3RvY2t2YXVsdC5u/ZXQvZGF0YS8yMDE1/LzA5LzA2LzE3Nzk1/OC90aHVtYjE2Lmpw/Zw",
            username: "Simon",
          },
          {
            variant: "banned",
            avatar: "https://imgs.search.brave.com/Nu92Ba-Z_C_AJh8giZUFnICO6fmpksx3f_IwdQ58Srk/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/c3RvY2t2YXVsdC5u/ZXQvZGF0YS8yMDE1/LzA5LzA2LzE3Nzk1/OC90aHVtYjE2Lmpw/Zw",
            username: "Simon",
          },
        ],
      },
    ],
  },
};