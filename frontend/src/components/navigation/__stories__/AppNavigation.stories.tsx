import type { Meta, StoryObj } from '@storybook/react-vite'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import { createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { DateLocalizationProvider } from '@/components/provider'
import AppNavigation from './AppNavigation'

const theme = createTheme()

const meta: Meta<typeof AppNavigation> = {
  title: 'Components/Navigation/AppNavigation',
  component: AppNavigation,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
アプリケーションナビゲーションコンポーネント

MUI AppBar と Drawer を使用したレスポンシブナビゲーション。
モバイル・デスクトップ両対応で、アクティブページハイライト機能付き。

## 主な機能
- AppBar: ヘッダーナビゲーション
- Drawer: サイドナビゲーション（モバイル対応）
- アクティブページハイライト
- レスポンシブデザイン
- キーボードナビゲーション対応
- ARIA アクセシビリティ準拠

## レスポンシブ動作
- デスクトップ: 常時表示のサイドナビゲーション
- モバイル: ハンバーガーメニューでトグル式ドロワー
        `,
      },
    },
  },
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/']}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <DateLocalizationProvider>
            <Story />
          </DateLocalizationProvider>
        </ThemeProvider>
      </MemoryRouter>
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
  },
}

export default meta
type Story = StoryObj<typeof meta>

/**
 * デフォルトのナビゲーション表示
 */
export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'デフォルト設定でのナビゲーション表示。タイトルは「家計簿アプリ」、ドロワー幅は240px。',
      },
    },
  },
}

/**
 * カスタムタイトルでの表示
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
 * カスタムドロワー幅での表示
 */
export const WideDrawer: Story = {
  args: {
    drawerWidth: 320,
  },
  parameters: {
    docs: {
      description: {
        story: 'ドロワー幅を320pxに拡張した表示。メニュー項目が多い場合やアイコンとテキストを並列表示する場合に適用。',
      },
    },
  },
}

/**
 * コンパクトドロワーでの表示
 */
export const CompactDrawer: Story = {
  args: {
    drawerWidth: 200,
  },
  parameters: {
    docs: {
      description: {
        story: 'ドロワー幅を200pxに縮小したコンパクト表示。画面スペースを最大限活用したい場合に適用。',
      },
    },
  },
}

/**
 * 長いタイトルでの表示
 */
export const LongTitle: Story = {
  args: {
    title: 'ファミリー家計簿管理システム - 収支管理アプリケーション',
  },
  parameters: {
    docs: {
      description: {
        story: '長いタイトルでの表示テスト。タイトルの折り返しやレスポンシブ動作を確認。',
      },
    },
  },
}

/**
 * モバイル表示シミュレーション
 */
export const MobileView: Story = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'モバイル端末での表示シミュレーション。ハンバーガーメニューとドロワーの動作を確認。',
      },
    },
  },
}

/**
 * タブレット表示シミュレーション
 */
export const TabletView: Story = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
    docs: {
      description: {
        story: 'タブレット端末での表示シミュレーション。中間サイズでのレスポンシブ動作を確認。',
      },
    },
  },
}

/**
 * デスクトップ表示シミュレーション
 */
export const DesktopView: Story = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
    docs: {
      description: {
        story: 'デスクトップ端末での表示シミュレーション。常時表示ドロワーとAppBarの動作を確認。',
      },
    },
  },
}