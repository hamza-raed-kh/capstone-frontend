import "../src/index.css";

/**
 * The configuration for the Storybook preview.
 * This file is used to configure how stories are rendered in the Storybook UI.
 * It can be used to add global decorators, parameters, and other settings that
 * apply to all stories.
 *
 * @type {import('@storybook/react').Preview}
 */
const preview = {
  parameters: {
    controls: {
      matchers: { color: /(background|color)$/i },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo"
    }
  },
  tags: ["autodocs"],
};

export default preview;
