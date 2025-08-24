import type { Meta, StoryObj } from '@storybook/react-vite'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import { createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { Box } from '@mui/material'
import {
  Dashboard as DashboardIcon,
  TrendingDown as ExpenseIcon,
  TrendingUp as IncomeIcon,
  History as HistoryIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material'
import AppBreadcrumbs from '../AppBreadcrumbs'

const theme = createTheme()

// getRouteInfo のモック
interface RouteInfo {
  path: string
  title: string
  description: string
  showInNavigation: boolean
  icon: React.ComponentType
}

const mockGetRouteInfo = (path: string): RouteInfo | null => {
  const routes: Record<string, RouteInfo> = {
    '/': {
      path: '/',
      title: 'ダッシュボード',
      description: '家計簿の概要と主要機能へのアクセス',
      showInNavigation: true,
      icon: DashboardIcon,
    },
    '/expenses': {
      path: '/expenses',
      title: '支出管理',
      description: '支出の登録と履歴管理',
      showInNavigation: true,
      icon: ExpenseIcon,
    },
    '/income': {
      path: '/income',
      title: '収入管理',
      description: '収入の登録と履歴管理',
      showInNavigation: true,
      icon: IncomeIcon,
    },
    '/history': {
      path: '/history',
      title: '履歴表示',
      description: '全ての取引履歴の一覧表示',
      showInNavigation: true,
      icon: HistoryIcon,
    },
    '/settings': {
      path: '/settings',
      title: '設定',
      description: 'アプリケーションの設定管理',
      showInNavigation: true,
      icon: SettingsIcon,
    },
  }
  return routes[path] || null
}

// モックの設定
jest.mock('@/routes/routes', () => ({
  getRouteInfo: mockGetRouteInfo,
}))

const meta: Meta<typeof AppBreadcrumbs> = {
  title: 'Components/Navigation/AppBreadcrumbs',
  component: AppBreadcrumbs,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
パンくずナビゲーションコンポーネント

現在のルートパスに基づいて自動的にパンくずリストを生成します。
MUI の Breadcrumbs コンポーネントを使用し、React Router と連携。

## 主な機能
- 現在ルートの自動検出とパンくず生成
- routes.tsx の設定との連携
- ホームアイコン付きナビゲーション
- カスタムアイテムの追加対応
- アクセシビリティ準拠（aria-label等）

## パンくず構造
- 第1階層: ホーム（常に表示）
- 第2階層: 現在のページ
- 将来拡張: 深い階層のページ（詳細ページ等）

## 使用場面
- AppLayout での自動表示
- ユーザーの現在位置把握
- 上位階層への簡単ナビゲーション
        `,
      },
    },
  },
  decorators: [
    (Story, { parameters }) => (
      <MemoryRouter initialEntries={[parameters?.path || '/expenses']}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box sx={{ p: 2 }}>
            <Story />
          </Box>
        </ThemeProvider>
      </MemoryRouter>
    ),
  ],
  argTypes: {
    customItems: {
      control: 'object',
      description: 'カスタムパンくずアイテムの追加',
    },
    showHomeIcon: {
      control: 'boolean',
      description: 'ホームアイコンの表示有無',
    },
    maxWidth: {
      control: { type: 'number', min: 200, max: 800, step: 50 },
      description: '最大表示幅',
    },
  },
  args: {
    showHomeIcon: true,
    customItems: [],
  },
}

export default meta
type Story = StoryObj<typeof meta>

/**
 * デフォルトのパンくず表示（支出管理ページ）
 */
export const Default: Story = {
  parameters: {
    path: '/expenses',
    docs: {
      description: {
        story:
          'デフォルト設定での支出管理ページのパンくず表示。ホーム > 支出管理の階層構造。',
      },
    },
  },
}

/**
 * 収入管理ページでのパンくず
 */
export const IncomePage: Story = {
  parameters: {
    path: '/income',
    docs: {
      description: {
        story: '収入管理ページでのパンくず表示。ホーム > 収入管理の階層構造。',
      },
    },
  },
}

/**
 * 履歴表示ページでのパンくず
 */
export const HistoryPage: Story = {
  parameters: {
    path: '/history',
    docs: {
      description: {
        story: '履歴表示ページでのパンくず表示。ホーム > 履歴表示の階層構造。',
      },
    },
  },
}

/**
 * 設定ページでのパンくず
 */
export const SettingsPage: Story = {
  parameters: {
    path: '/settings',
    docs: {
      description: {
        story: '設定ページでのパンくず表示。ホーム > 設定の階層構造。',
      },
    },
  },
}

/**
 * ホームアイコン非表示
 */
export const WithoutHomeIcon: Story = {
  args: {
    showHomeIcon: false,
  },
  parameters: {
    path: '/expenses',
    docs: {
      description: {
        story:
          'ホームアイコンを非表示にした場合。テキストのみのシンプルなパンくず表示。',
      },
    },
  },
}

/**
 * カスタムアイテム付き（詳細ページ想定）
 */
export const WithCustomItems: Story = {
  args: {
    customItems: [
      { label: '詳細ページ', href: '/expenses/detail/123' },
      { label: '編集' },
    ],
  },
  parameters: {
    path: '/expenses',
    docs: {
      description: {
        story:
          'カスタムアイテムを追加した場合。詳細ページや編集ページなどの深い階層ナビゲーション。',
      },
    },
  },
}

/**
 * 複数カスタムアイテム
 */
export const MultipleCustomItems: Story = {
  args: {
    customItems: [
      { label: 'カテゴリ一覧', href: '/expenses/categories' },
      { label: '食費', href: '/expenses/categories/food' },
      { label: '詳細', href: '/expenses/categories/food/detail' },
      { label: '編集' },
    ],
  },
  parameters: {
    path: '/expenses',
    docs: {
      description: {
        story:
          '複数のカスタムアイテムを持つ深い階層のパンくず。最大5階層までの表示例。',
      },
    },
  },
}

/**
 * 幅制限付き表示
 */
export const WithMaxWidth: Story = {
  args: {
    maxWidth: 300,
    customItems: [
      {
        label: 'とても長いカテゴリ名のページ',
        href: '/expenses/long-category',
      },
      { label: 'さらに長い詳細ページタイトル' },
    ],
  },
  parameters: {
    path: '/expenses',
    docs: {
      description: {
        story:
          '最大幅を300pxに制限した場合。長いテキストは省略記号で表示される。',
      },
    },
  },
}

/**
 * コンパクト表示
 */
export const Compact: Story = {
  args: {
    showHomeIcon: false,
    maxWidth: 250,
  },
  parameters: {
    path: '/settings',
    docs: {
      description: {
        story:
          'アイコン非表示＋幅制限でのコンパクト表示。狭いスペースでの使用に適している。',
      },
    },
  },
}

/**
 * 長いタイトルでの表示テスト
 */
export const LongTitles: Story = {
  args: {
    customItems: [
      {
        label:
          '非常に長いカテゴリ名のページでテキストオーバーフローの動作を確認する',
        href: '/long-category',
      },
      {
        label: 'さらに長い詳細ページのタイトルでテキスト省略の確認',
      },
    ],
  },
  parameters: {
    path: '/expenses',
    docs: {
      description: {
        story:
          '長いタイトルでの表示テスト。テキストオーバーフローの動作とレイアウト崩れの防止を確認。',
      },
    },
  },
}

/**
 * 全パンくずパターン一覧
 */
export const AllPatterns: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* 基本パターン */}
      <Box>
        <MemoryRouter initialEntries={['/expenses']}>
          <AppBreadcrumbs />
        </MemoryRouter>
      </Box>

      {/* アイコン非表示 */}
      <Box>
        <MemoryRouter initialEntries={['/income']}>
          <AppBreadcrumbs showHomeIcon={false} />
        </MemoryRouter>
      </Box>

      {/* カスタムアイテム付き */}
      <Box>
        <MemoryRouter initialEntries={['/history']}>
          <AppBreadcrumbs
            customItems={[
              { label: '詳細ページ', href: '/detail' },
              { label: '編集' },
            ]}
          />
        </MemoryRouter>
      </Box>

      {/* 幅制限付き */}
      <Box>
        <MemoryRouter initialEntries={['/settings']}>
          <AppBreadcrumbs
            maxWidth={250}
            customItems={[{ label: '長いカテゴリ名のページ', href: '/long' }]}
          />
        </MemoryRouter>
      </Box>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: '全パンくずパターンの一覧表示。様々な設定での表示確認に使用。',
      },
    },
  },
}

/**
 * インタラクションテスト
 */
export const WithInteraction: Story = {
  args: {
    customItems: [
      { label: 'クリック可能な詳細', href: '/detail' },
      { label: '現在のページ' },
    ],
  },
  parameters: {
    path: '/expenses',
    docs: {
      description: {
        story:
          'パンくずリンクのクリック動作テスト。Actionsタブでナビゲーションイベントを確認。',
      },
    },
  },
}

/**
 * アクセシビリティテスト
 */
export const AccessibilityTest: Story = {
  parameters: {
    path: '/expenses',
    docs: {
      description: {
        story:
          'アクセシビリティ要素の確認。aria-label、キーボードナビゲーション、スクリーンリーダー対応。',
      },
    },
  },
}
