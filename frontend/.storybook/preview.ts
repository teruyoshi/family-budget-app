import type { Preview } from '@storybook/react'

const preview: Preview = {
  parameters: {
    docs: {
      extractComponentDescription: (component, { notes }) => {
        if (notes) {
          return typeof notes === 'string'
            ? notes
            : notes.markdown || notes.text
        }
        return null
      },
      source: {
        state: 'open',
      },
      toc: {
        contentsSelector: '.sbdocs-content',
        headingSelector: 'h1, h2, h3',
        title: '目次',
        disable: false,
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
          ['AmountInput', 'TextInput', 'AmountText', 'TextLabel', 'DatePicker', 'AppTitle', 'TransactionForm'],
          '残高機能',
          '支出機能', 
          '収入機能',
          '履歴機能',
        ],
      },
    },
  },
}

export default preview
