import type { Meta, StoryObj } from '@storybook/react-vite'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import AppNavigation from '../AppNavigation'

/**
 * AppNavigationコンポーネントのStorybookストーリー
 *
 * ルーティングシナリオ、レスポンシブ対応、テーマ適用、
 * 各種ナビゲーション状態を展示します。
 */

const theme = createTheme()

const meta: Meta<typeof AppNavigation> = {
  title: 'Navigation/AppNavigation',
  component: AppNavigation,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# AppNavigation

React Router対応のレスポンシブナビゲーションコンポーネント。

## 主な機能
- **レスポンシブデザイン**: モバイル・デスクトップ自動対応
- **ルーティング統合**: React Router完全対応
- **アクセシビリティ**: ARIA準拠、キーボードナビゲーション対応
- **アクティブ状態**: 現在ページのハイライト表示
- **アニメーション**: スムーズなドロワー開閉

## 設計思想
- ユーザビリティ最優先の直感的UI
- 一貫したナビゲーション体験
- パフォーマンス最適化済み

## 技術実装
- Material-UI AppBar + Drawer
- useMediaQuery によるレスポンシブ判定
- React Router useLocation/useNavigate フック活用
        `,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#f5f5f5' },
        { name: 'dark', value: '#303030' },
      ],
    },
  },
  decorators: [
    (Story, { parameters }) => (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MemoryRouter initialEntries={[parameters.route || '/']}>
          <div style={{ minHeight: '100vh' }}>
            <Story />
          </div>
        </MemoryRouter>
      </ThemeProvider>
    ),
  ],
  argTypes: {
    drawerWidth: {
      control: { type: 'range', min: 200, max: 400, step: 20 },
      description: 'ドロワーの幅（ピクセル）',
    },
    title: {
      control: 'text',
      description: 'アプリケーションタイトル',
    },
  },
} satisfies Meta<typeof AppNavigation>

export default meta
type Story = StoryObj<typeof meta>

/**
 * デフォルトナビゲーション（ダッシュボード）
 */
export const Default: Story = {
  args: {
    drawerWidth: 240,
    title: '家計簿アプリ',
  },
  parameters: {
    route: '/',
    docs: {
      description: {
        story:
          'ダッシュボードページ選択時のデフォルト状態。ダッシュボード項目がアクティブになっています。',
      },
    },
  },
}

/**
 * 支出管理ページ選択状態
 */
export const ExpensesActive: Story = {
  args: {
    drawerWidth: 240,
    title: '家計簿アプリ',
  },
  parameters: {
    route: '/expenses',
    docs: {
      description: {
        story:
          '支出管理ページ選択時の状態。支出管理項目がアクティブハイライトされています。',
      },
    },
  },
}

/**
 * 収入管理ページ選択状態
 */
export const IncomeActive: Story = {
  args: {
    drawerWidth: 240,
    title: '家計簿アプリ',
  },
  parameters: {
    route: '/income',
    docs: {
      description: {
        story:
          '収入管理ページ選択時の状態。収入管理項目がアクティブハイライトされています。',
      },
    },
  },
}

/**
 * 履歴表示ページ選択状態
 */
export const HistoryActive: Story = {
  args: {
    drawerWidth: 240,
    title: '家計簿アプリ',
  },
  parameters: {
    route: '/history',
    docs: {
      description: {
        story:
          '履歴表示ページ選択時の状態。履歴表示項目がアクティブハイライトされています。',
      },
    },
  },
}

/**
 * 設定ページ選択状態
 */
export const SettingsActive: Story = {
  args: {
    drawerWidth: 240,
    title: '家計簿アプリ',
  },
  parameters: {
    route: '/settings',
    docs: {
      description: {
        story:
          '設定ページ選択時の状態。設定項目がアクティブハイライトされています。',
      },
    },
  },
}

/**
 * カスタムドロワー幅
 */
export const WideDrawer: Story = {
  args: {
    drawerWidth: 320,
    title: '家計簿アプリ（ワイド）',
  },
  parameters: {
    route: '/',
    docs: {
      description: {
        story:
          '幅広ドロワー設定（320px）。より多くの情報を表示したい場合に使用。',
      },
    },
  },
}

/**
 * 狭いドロワー幅
 */
export const NarrowDrawer: Story = {
  args: {
    drawerWidth: 200,
    title: '家計簿',
  },
  parameters: {
    route: '/',
    docs: {
      description: {
        story:
          '狭いドロワー設定（200px）。画面領域を最大限活用したい場合に使用。',
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
    title: 'My Budget Tracker',
  },
  parameters: {
    route: '/',
    docs: {
      description: {
        story:
          'カスタムアプリケーションタイトルの例。ブランディングや多言語対応に活用。',
      },
    },
  },
}

/**
 * モバイルビューシミュレーション
 */
export const MobileView: Story = {
  args: {
    drawerWidth: 240,
    title: '家計簿アプリ',
  },
  parameters: {
    route: '/',
    viewport: {
      name: 'iphone',
      styles: {
        width: '375px',
        height: '667px',
      },
    },
    docs: {
      description: {
        story:
          'モバイルビューでの表示。ハンバーガーメニューによるナビゲーション制御。',
      },
    },
  },
}

/**
 * タブレットビューシミュレーション
 */
export const TabletView: Story = {
  args: {
    drawerWidth: 240,
    title: '家計簿アプリ',
  },
  parameters: {
    route: '/expenses',
    viewport: {
      name: 'ipad',
      styles: {
        width: '768px',
        height: '1024px',
      },
    },
    docs: {
      description: {
        story:
          'タブレットビューでの表示。中間サイズでの最適化されたレイアウト。',
      },
    },
  },
}

/**
 * ダークテーマ
 */
export const DarkTheme: Story = {
  args: {
    drawerWidth: 240,
    title: '家計簿アプリ',
  },
  parameters: {
    route: '/income',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        story:
          'ダークテーマでの表示例。将来的なテーマ切り替え機能のプレビュー。',
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={createTheme({ palette: { mode: 'dark' } })}>
        <CssBaseline />
        <MemoryRouter initialEntries={['/income']}>
          <div style={{ minHeight: '100vh', backgroundColor: '#303030' }}>
            <Story />
          </div>
        </MemoryRouter>
      </ThemeProvider>
    ),
  ],
}

/**
 * 全ナビゲーション項目プレビュー
 */
export const AllNavigationStates: Story = {
  args: {
    drawerWidth: 240,
    title: '家計簿アプリ',
  },
  parameters: {
    route: '/',
    docs: {
      description: {
        story: `
全ナビゲーション項目の一覧プレビュー。

### 利用可能なページ
- **ダッシュボード** (/) - メイン画面、概要表示
- **支出管理** (/expenses) - 支出入力・管理
- **収入管理** (/income) - 収入入力・管理  
- **履歴表示** (/history) - 取引履歴一覧
- **設定** (/settings) - アプリ設定

### 特徴
- Material Design アイコン使用
- 直感的なアイコンとラベル組み合わせ
- アクセシビリティ配慮済み
        `,
      },
    },
  },
}

/**
 * インタラクションテスト用
 */
export const InteractiveDemo: Story = {
  args: {
    drawerWidth: 240,
    title: '家計簿アプリ - インタラクティブ',
  },
  parameters: {
    route: '/',
    docs: {
      description: {
        story: `
インタラクション確認用のデモ。

### テスト項目
- ナビゲーション項目のクリック
- ハンバーガーメニューの開閉
- キーボードナビゲーション
- アクティブ状態の変化

### 操作方法
1. 各ナビゲーション項目をクリック
2. モバイルビューでハンバーガーメニューをテスト
3. Tabキーでキーボードナビゲーション確認
        `,
      },
    },
  },
}

/**
 * アクセシビリティテスト用
 */
export const AccessibilityDemo: Story = {
  args: {
    drawerWidth: 240,
    title: '家計簿アプリ - A11Y',
  },
  parameters: {
    route: '/settings',
    docs: {
      description: {
        story: `
アクセシビリティ機能のデモンストレーション。

### A11Y 機能
- **ARIA ラベル**: 全ての操作要素に適切なラベル
- **キーボードナビゲーション**: Tab, Enter, Space キー対応
- **スクリーンリーダー対応**: セマンティックなマークアップ
- **フォーカス管理**: 視覚的フォーカスインジケーター
- **色覚サポート**: アイコン+テキストによる情報伝達

### テスト方法
1. Tabキーでフォーカス移動確認
2. Enter/Spaceキーで操作実行
3. スクリーンリーダーでの読み上げ確認
        `,
      },
    },
  },
}

/**
 * パフォーマンステスト用
 */
export const PerformanceDemo: Story = {
  args: {
    drawerWidth: 240,
    title: '家計簿アプリ - パフォーマンス',
  },
  parameters: {
    route: '/',
    docs: {
      description: {
        story: `
パフォーマンス最適化の確認用デモ。

### 最適化項目
- **レンダリング最適化**: React.memo, useMemo 活用
- **イベントハンドラー**: useCallback によるメモ化
- **リソース効率**: アイコンコンポーネントの適切な使用
- **アニメーション**: ハードウェアアクセラレーション対応

### 計測ポイント
- 初期レンダリング時間
- ナビゲーション切り替え時間
- メモリ使用量
- アニメーション FPS
        `,
      },
    },
  },
}
