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
 * The only variant of the `UserRecord` component.
 *
 * @type {import('@storybook/react').StoryObj}
 */
export const Default = {
  args: {
    variant: "invited",
    avatar: "https://imgs.search.brave.com/Nu92Ba-Z_C_AJh8giZUFnICO6fmpksx3f_IwdQ58Srk/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/c3RvY2t2YXVsdC5u/ZXQvZGF0YS8yMDE1/LzA5LzA2LzE3Nzk1/OC90aHVtYjE2Lmpw/Zw",
    username: "Simon",
  },
};
