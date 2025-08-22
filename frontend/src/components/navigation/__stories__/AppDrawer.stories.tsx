import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import { createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { Box, Button } from '@mui/material'
import AppDrawer from '../AppDrawer'

const theme = createTheme()

const meta: Meta<typeof AppDrawer> = {
  title: 'Components/Navigation/AppDrawer',
  component: AppDrawer,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
アプリケーションドロワーコンポーネント

MUI Drawerを使用したレスポンシブナビゲーションドロワー。
モバイル・デスクトップ両対応で、適切な表示切り替えを行います。

## 主な機能
- モバイル用一時的ドロワー（temporary）
- デスクトップ用永続的ドロワー（permanent）
- レスポンシブな表示切り替え
- パフォーマンス最適化（keepMounted）
- アクセシビリティ対応
- 共通ドロワーコンテンツの統合

## レスポンシブ動作
- xs~sm: モバイル用ドロワー（オーバーレイ表示）
- md~: デスクトップ用ドロワー（常時表示）

## パフォーマンス最適化
- モバイル用にkeepMountedを設定
- 適切なboxSizing設定
- MUIブレークポイント活用
        `,
      },
    },
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box sx={{ position: 'relative', height: '100vh', display: 'flex' }}>
            <Story />
          </Box>
        </ThemeProvider>
      </BrowserRouter>
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
    isMobile: {
      control: 'boolean',
      description: 'モバイル表示かどうか',
    },
    mobileOpen: {
      control: 'boolean',
      description: 'モバイルドロワーの開閉状態',
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
 * デフォルトのデスクトップドロワー
 */
export const Default: Story = {
  args: {
    drawerWidth: 240,
    title: '家計簿アプリ',
    isMobile: false,
    mobileOpen: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'デフォルト設定でのドロワー表示。デスクトップ用永続的ドロワーが常時表示されます。',
      },
    },
  },
}

/**
 * モバイル用ドロワー（閉じた状態）
 */
export const MobileClosed: Story = {
  args: {
    drawerWidth: 240,
    title: '家計簿アプリ',
    isMobile: true,
    mobileOpen: false,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'モバイル端末でのドロワー（閉じた状態）。一時的ドロワーが非表示になっています。',
      },
    },
  },
}

/**
 * モバイル用ドロワー（開いた状態）
 */
export const MobileOpen: Story = {
  args: {
    drawerWidth: 240,
    title: '家計簿アプリ',
    isMobile: true,
    mobileOpen: true,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'モバイル端末でのドロワー（開いた状態）。一時的ドロワーがオーバーレイ表示されます。',
      },
    },
  },
}

/**
 * カスタムタイトル
 */
export const CustomTitle: Story = {
  args: {
    drawerWidth: 240,
    title: 'My Budget Manager',
    isMobile: false,
    mobileOpen: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'カスタムタイトルでの表示例。英語タイトルでの国際化対応を確認できます。',
      },
    },
  },
}

/**
 * コンパクト幅ドロワー
 */
export const CompactWidth: Story = {
  args: {
    drawerWidth: 200,
    title: '家計簿アプリ',
    isMobile: false,
    mobileOpen: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'ドロワー幅200pxでのコンパクト表示。狭い画面や省スペース設計での使用例。',
      },
    },
  },
}

/**
 * ワイド幅ドロワー
 */
export const WideWidth: Story = {
  args: {
    drawerWidth: 320,
    title: '家計簿アプリ',
    isMobile: false,
    mobileOpen: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'ドロワー幅320pxでの拡張表示。広い画面での詳細情報表示に適用。',
      },
    },
  },
}

/**
 * タブレット表示
 */
export const TabletView: Story = {
  args: {
    drawerWidth: 240,
    title: '家計簿アプリ',
    isMobile: true,
    mobileOpen: false,
  },
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
    docs: {
      description: {
        story: 'タブレット端末での表示。モバイル扱いで一時的ドロワーとして動作します。',
      },
    },
  },
}

/**
 * インタラクティブドロワー制御
 */
export const InteractiveControl: Story = {
  render: (args) => {
    const [mobileOpen, setMobileOpen] = useState(false)
    
    const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen)
    }
    
    const handleDrawerClose = () => {
      setMobileOpen(false)
      args.onDrawerClose()
    }
    
    return (
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box sx={{ position: 'relative', height: '100vh', display: 'flex' }}>
            <AppDrawer
              drawerWidth={args.drawerWidth}
              title={args.title}
              isMobile={true}
              mobileOpen={mobileOpen}
              onDrawerClose={handleDrawerClose}
            />
            <Box sx={{ flexGrow: 1, p: 3 }}>
              <Button
                variant="contained"
                onClick={handleDrawerToggle}
                sx={{ mb: 2 }}
              >
                {mobileOpen ? 'ドロワーを閉じる' : 'ドロワーを開く'}
              </Button>
              <p>ドロワー状態: {mobileOpen ? '開' : '閉'}</p>
              <p>インタラクティブなドロワー制御デモです。</p>
            </Box>
          </Box>
        </ThemeProvider>
      </BrowserRouter>
    )
  },
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
        story: 'インタラクティブなドロワー制御デモ。ボタンでドロワーの開閉を制御できます。',
      },
    },
  },
}

/**
 * 長いタイトルでのテスト
 */
export const LongTitle: Story = {
  args: {
    drawerWidth: 240,
    title: 'ファミリー家計簿管理システム - 総合収支管理アプリケーション',
    isMobile: false,
    mobileOpen: false,
  },
  parameters: {
    docs: {
      description: {
        story: '長いタイトルでの表示テスト。タイトルの折り返し・省略表示を確認できます。',
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
    isMobile: false,
    mobileOpen: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'アクセシビリティ要素の確認。navigation role、aria-label、キーボードナビゲーションを検証。',
      },
    },
  },
}