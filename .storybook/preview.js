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
  },
  tags: ["autodocs"],
};

export default preview;
