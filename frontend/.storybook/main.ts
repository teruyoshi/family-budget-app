export default {
  stories: [
    '../src/**/*.stories.@(ts|tsx)',
    '!../src/**/*_old/**/*.stories.@(ts|tsx)',
  ],
  addons: ['@storybook/addon-docs'],

  framework: {
    name: '@storybook/react-vite',
    options: {},
  },

  reactDocgen: 'react-docgen-typescript',
}
