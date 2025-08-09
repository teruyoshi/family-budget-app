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
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
