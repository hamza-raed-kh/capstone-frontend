import UserRecord from "./UserRecord";

/**
 * Storybook configuration for the `userrecord` component.
 * This file defines the stories for the `userrecord` component, which are used to
 * visualize and test the component in isolation. Each story represents a different
 * state or variation of the component.
 *
 * @type {import('@storybook/react').Meta}
 */
export default {
    title: "Components/UserRecord",
    component: UserRecord,
}

/**
 * The followed variant of the `UserRecord` component.
 *
 * @type {import('@storybook/react').StoryObj}
 */
export const Followed = {
  args: {
    variant: "followed",
    avatar: "https://imgs.search.brave.com/Nu92Ba-Z_C_AJh8giZUFnICO6fmpksx3f_IwdQ58Srk/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/c3RvY2t2YXVsdC5u/ZXQvZGF0YS8yMDE1/LzA5LzA2LzE3Nzk1/OC90aHVtYjE2Lmpw/Zw",
    username: "Simon",
  },
};

/**
 * The banned variant of the `UserRecord` component.
 *
 * @type {import('@storybook/react').StoryObj}
 */
export const Banned = {
  args: {
    variant: "banned",
    avatar: "https://imgs.search.brave.com/Nu92Ba-Z_C_AJh8giZUFnICO6fmpksx3f_IwdQ58Srk/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/c3RvY2t2YXVsdC5u/ZXQvZGF0YS8yMDE1/LzA5LzA2LzE3Nzk1/OC90aHVtYjE2Lmpw/Zw",
    username: "Simon",
  },
};

/**
 * The invited variant of the `UserRecord` component.
 *
 * @type {import('@storybook/react').StoryObj}
 */
export const Invited = {
  args: {
    variant: "invited",
    avatar: "https://imgs.search.brave.com/Nu92Ba-Z_C_AJh8giZUFnICO6fmpksx3f_IwdQ58Srk/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/c3RvY2t2YXVsdC5u/ZXQvZGF0YS8yMDE1/LzA5LzA2LzE3Nzk1/OC90aHVtYjE2Lmpw/Zw",
    username: "Simon",
  },
};

/**
 * The applied variant of the `UserRecord` component.
 *
 * @type {import('@storybook/react').StoryObj}
 */
export const Applied = {
  args: {
    variant: "applied",
    avatar: "https://imgs.search.brave.com/Nu92Ba-Z_C_AJh8giZUFnICO6fmpksx3f_IwdQ58Srk/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/c3RvY2t2YXVsdC5u/ZXQvZGF0YS8yMDE1/LzA5LzA2LzE3Nzk1/OC90aHVtYjE2Lmpw/Zw",
    username: "Simon",
  },
};

/**
 * The participant variant of the `UserRecord` component.
 *
 * @type {import('@storybook/react').StoryObj}
 */
export const Participant = {
  args: {
    variant: "participant",
    avatar: "https://imgs.search.brave.com/Nu92Ba-Z_C_AJh8giZUFnICO6fmpksx3f_IwdQ58Srk/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/c3RvY2t2YXVsdC5u/ZXQvZGF0YS8yMDE1/LzA5LzA2LzE3Nzk1/OC90aHVtYjE2Lmpw/Zw",
    username: "Simon",
  },
};

/**
 * The disqualified variant of the `UserRecord` component.
 *
 * @type {import('@storybook/react').StoryObj}
 */
export const Disqualified = {
  args: {
    variant: "disqualified",
    avatar: "https://imgs.search.brave.com/Nu92Ba-Z_C_AJh8giZUFnICO6fmpksx3f_IwdQ58Srk/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/c3RvY2t2YXVsdC5u/ZXQvZGF0YS8yMDE1/LzA5LzA2LzE3Nzk1/OC90aHVtYjE2Lmpw/Zw",
    username: "Simon",
  },
};

/**
 * The result variant of the `UserRecord` component.
 *
 * @type {import('@storybook/react').StoryObj}
 */
export const Result = {
  args: {
    variant: "result",
    avatar: "https://imgs.search.brave.com/Nu92Ba-Z_C_AJh8giZUFnICO6fmpksx3f_IwdQ58Srk/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/c3RvY2t2YXVsdC5u/ZXQvZGF0YS8yMDE1/LzA5LzA2LzE3Nzk1/OC90aHVtYjE2Lmpw/Zw",
    username: "Simon",
  },
};
