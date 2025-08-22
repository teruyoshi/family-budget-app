import type { Meta, StoryObj } from '@storybook/react-vite'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import { createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { Box } from '@mui/material'
import AppDrawerHeader from '../AppDrawerHeader'

const theme = createTheme()

const meta: Meta<typeof AppDrawerHeader> = {
  title: 'Components/Navigation/AppDrawerHeader',
  component: AppDrawerHeader,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
ドロワーヘッダーコンポーネント

ドロワー上部のヘッダー領域を担当するコンポーネント。
アプリタイトルの表示とモバイル時のクローズボタンを提供します。

## 主な機能
- AppTitleコンポーネントによる統一されたタイトル表示
- モバイル時の自動クローズボタン表示
- レスポンシブ対応のレイアウト
- MUI Toolbar による一貫した構造
- アクセシビリティ対応

## レスポンシブ動作
- デスクトップ: タイトルのみ表示
- モバイル: タイトル + クローズボタン表示

## 統合性
- AppTitleコンポーネントとの統合
- AppDrawerContentの構成要素
- 一貫したスタイル適用
        `,
      },
    },
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box sx={{ width: 240, bgcolor: 'background.paper' }}>
            <Story />
          </Box>
        </ThemeProvider>
      </BrowserRouter>
    ),
  ],
  argTypes: {
    title: {
      control: 'text',
      description: 'アプリタイトル',
    },
    isMobile: {
      control: 'boolean',
      description: 'モバイル表示かどうか',
    },
    onDrawerClose: {
      action: 'drawer-close',
      description: 'ドロワーを閉じる処理',
    },
  },
  args: {
    onDrawerClose: () => console.log('Drawer close requested'),
  },
}

export default meta
type Story = StoryObj<typeof meta>

/**
 * デフォルトのヘッダー（デスクトップ）
 */
export const Default: Story = {
  args: {
    title: '家計簿アプリ',
    isMobile: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'デフォルト設定でのヘッダー表示。デスクトップ表示時はタイトルのみが表示されます。',
      },
    },
  },
}

/**
 * モバイル表示（クローズボタン付き）
 */
export const MobileView: Story = {
  args: {
    title: '家計簿アプリ',
    isMobile: true,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story:
          'モバイル端末での表示。タイトルと共にクローズボタンが表示されます。',
      },
    },
  },
}

/**
 * カスタムタイトル
 */
export const CustomTitle: Story = {
  args: {
    title: 'My Budget Manager',
    isMobile: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'カスタムタイトルでの表示例。英語タイトルでの国際化対応を確認できます。',
      },
    },
  },
}

/**
 * 長いタイトル
 */
export const LongTitle: Story = {
  args: {
    title: 'ファミリー家計簿管理システム - 総合収支管理アプリケーション',
    isMobile: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          '長いタイトルでの表示テスト。AppTitleコンポーネントによる適切な表示処理を確認。',
      },
    },
  },
}

/**
 * 長いタイトル（モバイル + クローズボタン）
 */
export const LongTitleMobile: Story = {
  args: {
    title: 'ファミリー家計簿管理システム - 総合収支管理アプリケーション',
    isMobile: true,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story:
          '長いタイトル + モバイル表示での動作。クローズボタンとの配置バランスを確認。',
      },
    },
  },
}

/**
 * コンパクト幅表示
 */
export const CompactWidth: Story = {
  args: {
    title: '家計簿アプリ',
    isMobile: false,
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box sx={{ width: 200, bgcolor: 'background.paper' }}>
            <Story />
          </Box>
        </ThemeProvider>
      </BrowserRouter>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          '幅200pxでのコンパクト表示。狭い領域でも適切に表示されることを確認。',
      },
    },
  },
}

/**
 * ワイド幅表示
 */
export const WideWidth: Story = {
  args: {
    title: '家計簿アプリ',
    isMobile: false,
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box sx={{ width: 320, bgcolor: 'background.paper' }}>
            <Story />
          </Box>
        </ThemeProvider>
      </BrowserRouter>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '幅320pxでの拡張表示。広い領域での表示を確認。',
      },
    },
  },
}

/**
 * タブレット表示
 */
export const TabletView: Story = {
  args: {
    title: '家計簿アプリ',
    isMobile: true,
  },
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
    docs: {
      description: {
        story:
          'タブレット端末での表示。モバイル扱いでクローズボタンが表示されます。',
      },
    },
  },
}

/**
 * デスクトップ表示
 */
export const DesktopView: Story = {
  args: {
    title: '家計簿アプリ',
    isMobile: false,
  },
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
    docs: {
      description: {
        story: 'デスクトップ端末での表示。クローズボタンは非表示となります。',
      },
    },
  },
}

/**
 * インタラクションテスト
 */
export const WithInteraction: Story = {
  args: {
    title: '家計簿アプリ',
    isMobile: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'クローズボタンのクリック動作テスト。Actionsタブでクローズイベントを確認できます。',
      },
    },
  },
}

/**
 * アクセシビリティテスト
 */
export const AccessibilityTest: Story = {
  args: {
    title: '家計簿アプリ',
    isMobile: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'アクセシビリティ要素の確認。toolbar role、aria-label、キーボードナビゲーションを検証。',
      },
    },
  },
}

/**
 * 空のタイトル
 */
export const EmptyTitle: Story = {
  args: {
    title: '',
    isMobile: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          '空のタイトルでの表示テスト。タイトルが空でもレイアウトが正常に機能することを確認。',
      },
    },
  },
}

/**
 * 空のタイトル（モバイル）
 */
export const EmptyTitleMobile: Story = {
  args: {
    title: '',
    isMobile: true,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story:
          '空のタイトル + モバイル表示での動作。クローズボタンのみが表示される状態を確認。',
      },
    },
  },
}
