import type { Meta, StoryObj } from '@storybook/react-vite'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import { createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { Box } from '@mui/material'
import AppDrawerContent from '../AppDrawerContent'

const theme = createTheme()

const meta: Meta<typeof AppDrawerContent> = {
  title: 'Components/Navigation/AppDrawerContent',
  component: AppDrawerContent,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
ドロワーコンテンツコンポーネント

ドロワーヘッダーとナビゲーションメニューを統合したコンテンツ。
AppDrawerの内部コンテンツとして使用されます。

## 主な機能
- AppDrawerHeaderとNavigationMenuの統合
- 区切り線による視覚的分離
- モバイル・デスクトップ対応
- 一元的なプロパティ管理
- 統一されたドロワー体験

## 構成要素
- AppDrawerHeader: タイトル表示とクローズボタン（モバイル時）
- Divider: ヘッダーとメニューの区切り線
- NavigationMenu: ナビゲーション項目一覧

## 使用場面
- AppDrawerの内部コンテンツ
- 一時的・永続的両ドロワーで共通使用
        `,
      },
    },
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box sx={{ width: 240, height: 400, bgcolor: 'background.paper' }}>
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
 * デフォルトのドロワーコンテンツ
 */
export const Default: Story = {
  args: {
    title: '家計簿アプリ',
    isMobile: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'デフォルト設定でのドロワーコンテンツ表示。ヘッダー、区切り線、ナビゲーションメニューが統合表示されます。',
      },
    },
  },
}

/**
 * モバイル表示
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
        story: 'モバイル端末での表示。ヘッダーにクローズボタンが表示され、メニュー選択時に自動クローズされます。',
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
        story: 'カスタムタイトルでの表示例。英語タイトルでの国際化対応を確認できます。',
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
        story: '長いタイトルでの表示テスト。タイトルの折り返し・省略表示を確認できます。',
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
          <Box sx={{ width: 200, height: 400, bgcolor: 'background.paper' }}>
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
    title: '家計簿アプリ',
    isMobile: false,
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box sx={{ width: 320, height: 400, bgcolor: 'background.paper' }}>
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
        story: 'タブレット端末での表示。モバイル扱いでクローズボタンが表示されます。',
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
        story: 'デスクトップ端末での表示。クローズボタンは非表示で永続的な表示となります。',
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
        story: 'インタラクション動作テスト。Actionsタブでクローズイベントやナビゲーションイベントを確認できます。',
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
    isMobile: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'アクセシビリティ要素の確認。見出し要素、区切り線、メニュー項目の構造を検証。',
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
        story: '空のタイトルでの表示テスト。タイトルが空でもレイアウトが正常に機能することを確認。',
      },
    },
  },
}