import type { Preview } from '@storybook/react-vite'

const preview: Preview = {
  parameters: {
    docs: {
      source: {
        state: 'open',
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      expanded: true,
      sort: 'requiredFirst',
    },
    options: {
      storySort: {
        order: [
          'UI Components',
          [
            'AmountInput',
            'TextInput',
          ],
          'Form Components',
          'Layout Components',
          'Navigation Components',
          'Feature Components',
        ],
      },
    },
  },

  tags: ['autodocs'],
}

export default preview
