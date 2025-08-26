import type { Preview } from '@storybook/react-vite'

const preview: Preview = {
  parameters: {
    // 📖 Docs設定 - 簡潔で見やすいドキュメント自動生成
    docs: {
      source: {
        state: 'open',
        excludeDecorators: true,
        transform: (code: string) => {
          // 不要な装飾コードを削除してクリーンな表示
          return code
            .replace(/^\s*export\s+default\s+{[^}]*};\s*$/gm, '')
            .replace(/^\s*\/\*[\s\S]*?\*\/\s*$/gm, '')
            .trim()
        },
      },
      toc: {
        contentsSelector: '.sbdocs-content',
        headingSelector: 'h1, h2, h3',
        title: '目次',
        disable: false,
        unsafeTocHtml: false,
      },
      autodocs: 'tag',
    },

    // 🎛️ Controls設定 - 直感的なプロパティ操作
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      expanded: true,
      sort: 'requiredFirst',
      hideNoControlsWarning: true,
    },

    // 🏷️ Actions設定 - イベントログの最適化
    actions: {
      argTypesRegex: '^on[A-Z].*',
      depth: 2,
    },

    // 📱 Viewport設定 - レスポンシブテスト用
    viewport: {
      viewports: {
        mobile: {
          name: 'モバイル',
          styles: { width: '375px', height: '667px' },
        },
        tablet: {
          name: 'タブレット',
          styles: { width: '768px', height: '1024px' },
        },
        desktop: {
          name: 'デスクトップ',
          styles: { width: '1200px', height: '800px' },
        },
      },
    },

    // 🎨 Background設定 - コンポーネントテスト用背景
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#333333' },
        { name: 'gray', value: '#f5f5f5' },
      ],
    },

    // 📂 Story並び順 - 論理的な階層構造
    options: {
      storySort: {
        order: [
          'Introduction', // はじめに
          'UI Components', // 基本UIコンポーネント
          [
            'AmountInput',
            'AmountText',
            'AppTitle',
            'Button',
            'DatePicker',
            'PageLoader',
            'TextInput',
            'TextLabel',
          ],
          'Form Components', // フォーム関連
          [
            'ControlledAmountInput',
            'ControlledCustomDateSwitch',
            'ControlledDatePicker',
            'FormErrorMessage',
            'TransactionForm',
          ],
          'Layout Components', // レイアウト
          'Navigation Components', // ナビゲーション
          [
            'AppBreadcrumbs',
            'AppDrawer',
            'AppNavigation',
            'AppTopBar',
            'NavigationMenu',
          ],
          'Feature Components', // 機能別コンポーネント
          ['Balance', 'Expenses', 'Income', 'History'],
          '*', // その他
        ],
        method: 'alphabetical',
        locales: 'ja-JP',
      },
    },

    // 🔧 Layout設定 - ドキュメント表示の最適化
    layout: 'fullscreen',

    // 📊 Measure & Outline アドオン設定
    measure: {
      results: {
        precision: 2,
        formatters: {
          px: (value: number) => `${Math.round(value)}px`,
        },
      },
    },
    outline: {
      color: '#FF4785',
      width: 2,
    },
  },

  // 🏷️ 自動ドキュメント生成タグ
  tags: ['autodocs'],

  // 📝 グローバル引数型 - 共通プロパティの型定義
  argTypes: {
    // MUI共通プロパティ
    sx: {
      description: 'MUI sx props for custom styling',
      control: { type: 'object' },
      table: { category: 'MUI Props' },
    },
    className: {
      description: 'CSS class name',
      control: { type: 'text' },
      table: { category: 'HTML Props' },
    },
    // React共通プロパティ
    children: {
      description: 'React children elements',
      control: { type: 'text' },
      table: { category: 'React Props' },
    },
  },
}

export default preview
