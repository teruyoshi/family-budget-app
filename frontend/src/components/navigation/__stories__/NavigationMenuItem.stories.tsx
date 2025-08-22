import type { Meta, StoryObj } from '@storybook/react-vite'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import { createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { List, Box } from '@mui/material'
import {
  Dashboard as DashboardIcon,
  TrendingDown as ExpenseIcon,
  TrendingUp as IncomeIcon,
  History as HistoryIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material'
import NavigationMenuItem from '../NavigationMenuItem'
import type { RouteInfo, AppRoute } from '@/types'

const theme = createTheme()

// テスト用のルート情報
const routes: RouteInfo[] = [
  {
    path: '/',
    title: 'ダッシュボード',
    description: '家計簿の概要と主要機能へのアクセス',
    element: <div>Dashboard</div>,
    showInNavigation: true,
    icon: DashboardIcon,
  },
  {
    path: '/expenses',
    title: '支出管理',
    description: '支出の登録と履歴管理',
    element: <div>Expenses</div>,
    showInNavigation: true,
    icon: ExpenseIcon,
  },
  {
    path: '/income',
    title: '収入管理',
    description: '収入の登録と履歴管理',
    element: <div>Income</div>,
    showInNavigation: true,
    icon: IncomeIcon,
  },
  {
    path: '/history',
    title: '履歴表示',
    description: '全ての取引履歴の一覧表示',
    element: <div>History</div>,
    showInNavigation: true,
    icon: HistoryIcon,
  },
  {
    path: '/settings',
    title: '設定',
    description: 'アプリケーションの設定管理',
    element: <div>Settings</div>,
    showInNavigation: true,
    icon: SettingsIcon,
  },
]

const routeWithoutIcon: RouteInfo = {
  path: '/settings' as AppRoute,
  title: 'アイコンなし',
  description: 'アイコンを持たないルート',
  element: <div>No Icon</div>,
  showInNavigation: true,
}

const meta: Meta<typeof NavigationMenuItem> = {
  title: 'Components/Navigation/NavigationMenuItem',
  component: NavigationMenuItem,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
ナビゲーションメニュー項目コンポーネント

個別のナビゲーション項目を表示し、クリック・キーボード操作を処理。
NavigationMenuの構成要素として使用されます。

## 主な機能
- ルート情報に基づく表示制御
- アクティブ状態の視覚的フィードバック
- クリック・キーボードナビゲーション
- モバイル対応ドロワー制御
- アイコン表示（オプション）
- アクセシビリティ対応

## インタラクション
- クリック: ページ遷移
- Enter/Space: キーボードナビゲーション
- モバイル時: 自動ドロワークローズ
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
            <List>
              <Story />
            </List>
          </Box>
        </ThemeProvider>
      </BrowserRouter>
    ),
  ],
  argTypes: {
    route: {
      control: false,
      description: 'ルート情報オブジェクト',
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
    isMobile: false,
    onDrawerClose: () => console.log('Drawer closed'),
  },
}

export default meta
type Story = StoryObj<typeof meta>

/**
 * デフォルトのメニュー項目
 */
export const Default: Story = {
  args: {
    route: routes[0], // Dashboard
  },
  parameters: {
    docs: {
      description: {
        story:
          'デフォルト設定でのメニュー項目表示。ダッシュボードアイコンと共に表示。',
      },
    },
  },
}

/**
 * 支出管理メニュー項目
 */
export const ExpenseItem: Story = {
  args: {
    route: routes[1], // Expenses
  },
  parameters: {
    docs: {
      description: {
        story: '支出管理ページのメニュー項目。TrendingDownアイコンを使用。',
      },
    },
  },
}

/**
 * 収入管理メニュー項目
 */
export const IncomeItem: Story = {
  args: {
    route: routes[2], // Income
  },
  parameters: {
    docs: {
      description: {
        story: '収入管理ページのメニュー項目。TrendingUpアイコンを使用。',
      },
    },
  },
}

/**
 * 履歴表示メニュー項目
 */
export const HistoryItem: Story = {
  args: {
    route: routes[3], // History
  },
  parameters: {
    docs: {
      description: {
        story: '履歴表示ページのメニュー項目。Historyアイコンを使用。',
      },
    },
  },
}

/**
 * 設定メニュー項目
 */
export const SettingsItem: Story = {
  args: {
    route: routes[4], // Settings
  },
  parameters: {
    docs: {
      description: {
        story: '設定ページのメニュー項目。Settingsアイコンを使用。',
      },
    },
  },
}

/**
 * アイコンなしメニュー項目
 */
export const WithoutIcon: Story = {
  args: {
    route: routeWithoutIcon,
  },
  parameters: {
    docs: {
      description: {
        story:
          'アイコンを持たないメニュー項目。アイコン部分は空白で表示されます。',
      },
    },
  },
}

/**
 * モバイル表示
 */
export const MobileView: Story = {
  args: {
    route: routes[0],
    isMobile: true,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story:
          'モバイル端末での表示。クリック時にドロワーが自動的に閉じられます。',
      },
    },
  },
}

/**
 * 全メニュー項目一覧
 */
export const AllItems: Story = {
  render: (args) => (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ width: 240, bgcolor: 'background.paper' }}>
          <List>
            {routes.map((route) => (
              <NavigationMenuItem
                key={route.path}
                route={route}
                isMobile={args.isMobile}
                onDrawerClose={args.onDrawerClose}
              />
            ))}
            <NavigationMenuItem
              route={routeWithoutIcon}
              isMobile={args.isMobile}
              onDrawerClose={args.onDrawerClose}
            />
          </List>
        </Box>
      </ThemeProvider>
    </BrowserRouter>
  ),
  parameters: {
    docs: {
      description: {
        story:
          '全てのメニュー項目を一覧表示。実際のナビゲーションメニューの見た目を確認できます。',
      },
    },
  },
}

/**
 * インタラクションテスト
 */
export const WithInteraction: Story = {
  args: {
    route: routes[0],
  },
  parameters: {
    docs: {
      description: {
        story:
          'メニュー項目のクリック動作テスト。Actionsタブでイベント発火を確認できます。',
      },
    },
  },
}

/**
 * アクセシビリティテスト
 */
export const AccessibilityTest: Story = {
  args: {
    route: routes[0],
  },
  parameters: {
    docs: {
      description: {
        story:
          'アクセシビリティ要素の確認。ARIA属性、ロール、キーボードナビゲーションを検証。',
      },
    },
  },
}
