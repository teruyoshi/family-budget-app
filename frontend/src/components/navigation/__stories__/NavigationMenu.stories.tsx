import type { Meta, StoryObj } from '@storybook/react-vite'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import { createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { Box } from '@mui/material'
import NavigationMenu from '../NavigationMenu'

const theme = createTheme()

const meta: Meta<typeof NavigationMenu> = {
  title: 'Components/Navigation/NavigationMenu',
  component: NavigationMenu,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
ナビゲーションメニューコンポーネント

ナビゲーションアイテムのリストを表示し、アクティブ状態を管理。
各項目はNavigationMenuItemコンポーネントで構成されます。

## 主な機能
- ルート情報に基づくメニュー項目生成
- アクティブページハイライト
- クリック・キーボードナビゲーション
- モバイル対応ドロワー制御
- アイコン表示対応
- アクセシビリティ準拠

## 構成
- MUI List コンポーネントをベース
- NavigationMenuItem の集合体
- routes.tsx からの動的メニュー生成

## レスポンシブ動作
- デスクトップ: 通常のクリック動作
- モバイル: クリック後に自動ドロワークローズ
        `,
      },
    },
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box sx={{ width: 240, bgcolor: 'background.paper', minHeight: 400 }}>
            <Story />
          </Box>
        </ThemeProvider>
      </BrowserRouter>
    ),
  ],
  argTypes: {
    isMobile: {
      control: 'boolean',
      description: 'モバイル表示かどうか',
    },
    onDrawerClose: {
      action: 'drawer-close',
      description: 'ドロワーを閉じる処理（モバイル時のナビゲーション後に実行）',
    },
  },
  args: {
    onDrawerClose: () => console.log('Drawer close requested'),
  },
}

export default meta
type Story = StoryObj<typeof meta>

/**
 * デフォルトのナビゲーションメニュー
 */
export const Default: Story = {
  args: {
    isMobile: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'デフォルト設定でのナビゲーションメニュー表示。全てのページへのリンクが表示されます。',
      },
    },
  },
}

/**
 * モバイル表示
 */
export const MobileView: Story = {
  args: {
    isMobile: true,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'モバイル端末での表示。メニュー項目クリック時にドロワーが自動的に閉じられます。',
      },
    },
  },
}

/**
 * タブレット表示
 */
export const TabletView: Story = {
  args: {
    isMobile: true,
  },
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
    docs: {
      description: {
        story: 'タブレット端末での表示。モバイルモードとして動作します。',
      },
    },
  },
}

/**
 * デスクトップ表示
 */
export const DesktopView: Story = {
  args: {
    isMobile: false,
  },
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
    docs: {
      description: {
        story: 'デスクトップ端末での表示。ドロワークローズは発生しません。',
      },
    },
  },
}

/**
 * インタラクションテスト
 */
export const WithInteraction: Story = {
  args: {
    isMobile: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'メニュー項目のクリック動作テスト。Actionsタブでドロワークローズイベントを確認できます。',
      },
    },
  },
}

/**
 * アクセシビリティテスト
 */
export const AccessibilityTest: Story = {
  args: {
    isMobile: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'アクセシビリティ要素の確認。List要素、menuitem role、キーボードナビゲーションを検証。',
      },
    },
  },
}

/**
 * コンパクト幅表示
 */
export const CompactWidth: Story = {
  args: {
    isMobile: false,
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box sx={{ width: 200, bgcolor: 'background.paper', minHeight: 400 }}>
            <Story />
          </Box>
        </ThemeProvider>
      </BrowserRouter>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '幅200pxでのコンパクト表示。狭い領域でも適切に表示されることを確認。',
      },
    },
  },
}

/**
 * ワイド幅表示
 */
export const WideWidth: Story = {
  args: {
    isMobile: false,
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box sx={{ width: 320, bgcolor: 'background.paper', minHeight: 400 }}>
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