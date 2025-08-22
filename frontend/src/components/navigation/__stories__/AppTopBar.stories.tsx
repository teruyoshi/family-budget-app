import type { Meta, StoryObj } from '@storybook/react-vite'
import { ThemeProvider } from '@mui/material/styles'
import { createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { Box } from '@mui/material'
import AppTopBar from '../AppTopBar'

const theme = createTheme()

const meta: Meta<typeof AppTopBar> = {
  title: 'Components/Navigation/AppTopBar',
  component: AppTopBar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
アプリケーショントップバーコンポーネント

MUI AppBarを使用したヘッダーナビゲーション。
モバイル・デスクトップ対応でハンバーガーメニュー機能付き。

## 主な機能
- レスポンシブAppBar表示
- モバイル用ハンバーガーメニュー
- アプリタイトル表示
- ドロワー幅に応じた自動調整
- アクセシビリティ対応

## レスポンシブ動作
- デスクトップ: ドロワー幅を考慮した固定位置表示
- モバイル: 全幅表示でハンバーガーメニュー表示
        `,
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ position: 'relative', height: '100vh' }}>
          <Story />
        </Box>
      </ThemeProvider>
    ),
  ],
  argTypes: {
    drawerWidth: {
      control: { type: 'number', min: 200, max: 400, step: 20 },
      description: 'ドロワーの幅（px）',
    },
    title: {
      control: 'text',
      description: 'アプリタイトル',
    },
    onMenuToggle: {
      description: 'ハンバーガーメニュークリック処理',
    },
  },
  args: {
    onMenuToggle: () => console.log('Menu toggle clicked'),
  },
}

export default meta
type Story = StoryObj<typeof meta>

/**
 * デフォルトのトップバー表示
 */
export const Default: Story = {
  args: {
    drawerWidth: 240,
    title: '家計簿アプリ',
  },
  parameters: {
    docs: {
      description: {
        story:
          'デフォルト設定でのトップバー表示。ドロワー幅240px、タイトルは「家計簿アプリ」。',
      },
    },
  },
}

/**
 * カスタムタイトルでの表示
 */
export const CustomTitle: Story = {
  args: {
    drawerWidth: 240,
    title: 'My Budget Manager',
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
 * 長いタイトルでの表示
 */
export const LongTitle: Story = {
  args: {
    drawerWidth: 240,
    title: 'ファミリー家計簿管理システム - 収支管理アプリケーション',
  },
  parameters: {
    docs: {
      description: {
        story:
          '長いタイトルでの表示テスト。noWrapにより文字が省略される動作を確認。',
      },
    },
  },
}

/**
 * コンパクトドロワー幅での表示
 */
export const CompactDrawer: Story = {
  args: {
    drawerWidth: 200,
    title: '家計簿アプリ',
  },
  parameters: {
    docs: {
      description: {
        story: 'ドロワー幅200pxでのコンパクト表示。AppBarの位置調整を確認。',
      },
    },
  },
}

/**
 * ワイドドロワー幅での表示
 */
export const WideDrawer: Story = {
  args: {
    drawerWidth: 320,
    title: '家計簿アプリ',
  },
  parameters: {
    docs: {
      description: {
        story:
          'ドロワー幅320pxでの拡張表示。広いドロワーに対するAppBarの調整を確認。',
      },
    },
  },
}

/**
 * モバイル表示シミュレーション
 */
export const MobileView: Story = {
  args: {
    drawerWidth: 240,
    title: '家計簿アプリ',
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story:
          'モバイル端末での表示シミュレーション。ハンバーガーメニューボタンが表示される。',
      },
    },
  },
}

/**
 * タブレット表示シミュレーション
 */
export const TabletView: Story = {
  args: {
    drawerWidth: 240,
    title: '家計簿アプリ',
  },
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
    docs: {
      description: {
        story:
          'タブレット端末での表示シミュレーション。中間サイズでのレスポンシブ動作を確認。',
      },
    },
  },
}

/**
 * デスクトップ表示シミュレーション
 */
export const DesktopView: Story = {
  args: {
    drawerWidth: 240,
    title: '家計簿アプリ',
  },
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
    docs: {
      description: {
        story:
          'デスクトップ端末での表示シミュレーション。ハンバーガーメニューは非表示になる。',
      },
    },
  },
}

/**
 * インタラクションテスト
 */
export const WithInteraction: Story = {
  args: {
    drawerWidth: 240,
    title: '家計簿アプリ',
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story:
          'ハンバーガーメニューボタンのクリック動作テスト。モバイル表示でのインタラクションを確認。',
      },
    },
  },
}

/**
 * アクセシビリティテスト
 */
export const AccessibilityTest: Story = {
  args: {
    drawerWidth: 240,
    title: '家計簿アプリ',
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story:
          'アクセシビリティ要素の確認。ARIA属性、見出し要素、キーボードナビゲーションを検証。',
      },
    },
  },
}
