import FaqPage from "./FaqPage";

/**
 * Storybook configuration for the `FAQpage` component.
 * This file defines the stories for the `FAQpage` component, which are used to
 * visualize and test the component in isolation. Each story represents a different
 * state or variation of the component.
 *
 * @type {import('@storybook/react').Meta}
 */
export default {
    title: "Pages/FaqPage",
    component: FaqPage,
}

/**
 * The search variant of the `FaqPage` component.
 *
 * @type {import('@storybook/react').StoryObj}
 */
export const main = {
  args: {
    faqs: [
        {
            question: "Is this Question 1?",
            answer: "Yes, this is question 1.",
        },
        {
            question: "Is this Question 2?",
            answer: "Yes, this is question 2.",
        },
        {
            question: "Is this Question 3?",
            answer: "Yes, this is question 3.",
        },
]
  },
};
