/**
 * The main configuration file for Storybook.
 * This file is used to configure the Storybook environment, including the location of stories,
 * the addons to use, and the framework to be used.
 *
 * @type {import('@storybook/react-vite').StorybookConfig}
 */
const config = {
  /**
   * An array of glob patterns that determines where to find stories.
   * Storybook will look for files with the `.mdx` or `.stories.@(js|jsx|mjs|ts|tsx)` extension
   * in the `src` directory and its subdirectories.
   */
  stories: [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  /**
   * A list of addons to be used by Storybook.
   * Addons extend the functionality of Storybook with new features, such as accessibility testing,
   * documentation generation, and more.
   */
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding"
  ],
  /**
   * The framework to be used by Storybook.
   * This specifies the view layer that Storybook will use to render components.
   * In this case, it is configured to use `@storybook/react-vite`.
   */
  framework: "@storybook/react-vite"
};

export default config;