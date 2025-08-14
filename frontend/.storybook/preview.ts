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
          '共通コンポーネント',
          [
            'AmountInput',
            'TextInput',
            'AmountText',
            'TextLabel',
            'DatePicker',
            'AppTitle',
            'TransactionForm',
          ],
          '残高機能',
          '支出機能',
          '収入機能',
          '履歴機能',
        ],
      },
    },
  },

  tags: ['autodocs'],
}

export default preview
