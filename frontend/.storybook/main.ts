import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-onboarding',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-docs',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: true,
    defaultName: 'ドキュメント',
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      // JSDocコメントから説明を抽出
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,
      shouldIncludePropTagMap: true,
      savePropValueAsString: true,
      
      // JSDoc情報をStorybookに反映
      compilerOptions: {
        allowSyntheticDefaultImports: false,
      },
      
      // node_modules由来の型を除外し、プロジェクト内の型のみ処理
      propFilter: (prop, component) => {
        if (prop.parent) {
          // node_modules内のファイルは除外
          if (/node_modules/.test(prop.parent.fileName)) {
            return false
          }
          // React内部の型は除外
          if (/node_modules\/react/.test(prop.parent.fileName)) {
            return false
          }
        }
        // HTML属性のみの場合は除外（className、styleなど）
        if (prop.name === 'className' || prop.name === 'style' || prop.name === 'key' || prop.name === 'ref') {
          return false
        }
        return true
      },
    },
  },
}

export default config
