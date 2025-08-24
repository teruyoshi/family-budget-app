import type { Meta, StoryObj } from '@storybook/react-vite'
import AppTitle from '../AppTitle'

const meta: Meta<typeof AppTitle> = {
  title: 'UI/AppTitle',
  component: AppTitle,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
アプリケーションタイトルを表示する汎用コンポーネント。
Typography ベースでカスタマイズ可能。titleが未指定の場合は「家計簿アプリ」を表示。

## 主な特徴
- カスタムタイトル対応
- デフォルトタイトルサポート
- noWrapオプション
- Typographyの全機能対応
        `,
      },
    },
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'タイトルテキスト（省略時は「家計簿アプリ」）',
    },
    variant: {
      control: 'select',
      options: [
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'subtitle1',
        'subtitle2',
        'body1',
        'body2',
      ],
      description: 'Typography の variant 設定',
    },
    component: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'div'],
      description: 'レンダリングする HTML 要素',
    },
    noWrap: {
      control: 'boolean',
      description: 'テキストの折り返しを無効にする',
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

/**
 * デフォルト表示
 */
export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          'デフォルト設定での表示。タイトルは「家計簿アプリ」、variantはh4。',
      },
    },
  },
}

/**
 * カスタムタイトル
 */
export const CustomTitle: Story = {
  args: {
    title: 'My Budget App',
  },
  parameters: {
    docs: {
      description: {
        story: 'カスタムタイトルでの表示例。英語タイトルでの国際化対応を確認。',
      },
    },
  },
}

/**
 * 大きなタイトル
 */
export const Large: Story = {
  args: {
    variant: 'h2',
  },
  parameters: {
    docs: {
      description: {
        story: 'h2バリアントでの大きなタイトル表示。',
      },
    },
  },
}

/**
 * 小さなタイトル
 */
export const Small: Story = {
  args: {
    variant: 'h6',
  },
  parameters: {
    docs: {
      description: {
        story: 'h6バリアントでの小さなタイトル表示。',
      },
    },
  },
}

/**
 * ナビゲーション用タイトル
 */
export const NavigationTitle: Story = {
  args: {
    title: 'Budget Manager',
    variant: 'h6',
    component: 'h1',
    noWrap: true,
    sx: { flexGrow: 1 },
  },
  parameters: {
    docs: {
      description: {
        story:
          'AppBar等のナビゲーションで使用するタイトル。noWrapとflexGrowを設定。',
      },
    },
  },
}

/**
 * カスタムスタイル
 */
export const Styled: Story = {
  args: {
    variant: 'h3',
    sx: {
      color: 'primary.main',
      textAlign: 'center',
      fontWeight: 'bold',
      textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'カスタムスタイルを適用したタイトル表示。',
      },
    },
  },
}

/**
 * 長いタイトルのnoWrapテスト
 */
export const LongTitleNoWrap: Story = {
  args: {
    title: 'ファミリー家計簿管理システム - 収支管理アプリケーション',
    variant: 'h6',
    noWrap: true,
    sx: { width: 200, border: '1px dashed grey' },
  },
  parameters: {
    docs: {
      description: {
        story: '長いタイトルでnoWrapが有効な場合の表示。文字が省略される。',
      },
    },
  },
}

/**
 * サブタイトルバリアント
 */
export const Subtitle: Story = {
  args: {
    variant: 'subtitle1',
    component: 'h2',
    sx: {
      color: 'text.secondary',
      fontStyle: 'italic',
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'subtitle1バリアントでのサブタイトル表示。',
      },
    },
  },
}

/**
 * 中央揃えレイアウト
 */
export const Centered: Story = {
  args: {
    variant: 'h4',
    sx: {
      textAlign: 'center',
      padding: 2,
      backgroundColor: 'grey.50',
      borderRadius: 1,
    },
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: '中央揃えで背景色を付けたタイトル表示。',
      },
    },
  },
}

/**
 * 複数バリエーション比較
 */
export const Variants: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        padding: '20px',
      }}
    >
      <AppTitle variant="h1" />
      <AppTitle variant="h2" />
      <AppTitle variant="h3" />
      <AppTitle variant="h4" />
      <AppTitle variant="h5" />
      <AppTitle variant="h6" />
      <AppTitle variant="subtitle1" />
      <AppTitle variant="body1" />
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          '全てのvariantオプションの表示比較。サイズ感やフォントウェイトの違いを確認。',
      },
    },
  },
}
