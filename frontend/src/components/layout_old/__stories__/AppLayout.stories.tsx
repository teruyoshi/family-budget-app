import type { Meta, StoryObj } from '@storybook/react-vite'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { Box, CssBaseline, Paper, Typography } from '@mui/material'
import AppLayout from '../AppLayout'

/**
 * AppLayoutコンポーネントのStorybookストーリー
 *
 * ナビゲーション統合レイアウト、レスポンシブ対応、
 * 各種設定バリエーションを展示します。
 */

const theme = createTheme()

// サンプルコンテンツコンポーネント
const SampleContent = ({
  title,
  description,
}: {
  title: string
  description: string
}) => (
  <Box sx={{ p: 2 }}>
    <Typography variant="h4" component="h1" gutterBottom>
      {title}
    </Typography>
    <Typography variant="body1" paragraph>
      {description}
    </Typography>
    <Paper sx={{ p: 3, mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        サンプルコンテンツエリア
      </Typography>
      <Typography variant="body2">
        ここにページ固有のコンテンツが表示されます。
        AppLayoutは全ページで共通のレイアウト構造を提供し、
        ナビゲーション、ヘッダー、フッターの一貫性を保ちます。
      </Typography>
    </Paper>
  </Box>
)

const meta: Meta<typeof AppLayout> = {
  title: 'Layout/AppLayout',
  component: AppLayout,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# AppLayout

全ページ共通のアプリケーションレイアウトコンポーネント。

## 主な機能
- **統一レイアウト**: 全ページで一貫したUI構造
- **ナビゲーション統合**: AppNavigationコンポーネント内蔵
- **レスポンシブ対応**: 画面サイズに応じた最適化
- **カスタマイズ可能**: 幅、背景色、パディング等の調整
- **パンくずナビ**: ページ階層の可視化

## 設計思想
- ユーザビリティ重視の直感的レイアウト
- 開発効率化のための共通化
- アクセシビリティ配慮

## 技術実装
- Material-UI Container + Box レイアウト
- AppNavigation統合による一体型UI
- usePageTitle フックによる自動タイトル管理
        `,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#f5f5f5' },
        { name: 'dark', value: '#303030' },
        { name: 'white', value: '#ffffff' },
      ],
    },
  },
  decorators: [
    (Story, { parameters }) => (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MemoryRouter initialEntries={[parameters.route || '/']}>
          <Story />
        </MemoryRouter>
      </ThemeProvider>
    ),
  ],
  argTypes: {
    maxWidth: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl', false],
      description: 'コンテンツの最大幅設定',
    },
    backgroundColor: {
      control: 'color',
      description: 'レイアウト背景色',
    },
    padding: {
      control: { type: 'range', min: 0, max: 8, step: 1 },
      description: 'コンテンツパディング（MUI spacing単位）',
    },
    showNavigation: {
      control: 'boolean',
      description: 'ナビゲーション表示/非表示',
    },
    drawerWidth: {
      control: { type: 'range', min: 200, max: 400, step: 20 },
      description: 'ドロワー幅（ナビゲーション有効時）',
    },
    title: {
      control: 'text',
      description: 'アプリケーションタイトル',
    },
    enableTransitions: {
      control: 'boolean',
      description: 'ページトランジション有効/無効',
    },
    transitionType: {
      control: { type: 'select' },
      options: ['fade', 'slide', 'none'],
      description: 'トランジションタイプ',
    },
    showBreadcrumbs: {
      control: 'boolean',
      description: 'パンくずナビゲーション表示/非表示',
    },
  },
} satisfies Meta<typeof AppLayout>

export default meta
type Story = StoryObj<typeof meta>

/**
 * デフォルトレイアウト
 */
export const Default: Story = {
  args: {
    maxWidth: 'md',
    backgroundColor: '#f5f5f5',
    padding: 4,
    showNavigation: true,
    drawerWidth: 240,
    title: '家計簿アプリ',
    enableTransitions: true,
    transitionType: 'fade',
    showBreadcrumbs: true,
  },
  render: (args) => (
    <AppLayout {...args}>
      <SampleContent
        title="ダッシュボード"
        description="デフォルトレイアウトの例。中サイズコンテナ、標準パディング、ナビゲーション有効。"
      />
    </AppLayout>
  ),
  parameters: {
    route: '/',
    docs: {
      description: {
        story:
          'AppLayoutのデフォルト設定。ほとんどのページで使用される標準的なレイアウト構成。',
      },
    },
  },
}

/**
 * フルワイドレイアウト
 */
export const FullWidth: Story = {
  args: {
    maxWidth: false,
    backgroundColor: '#ffffff',
    padding: 2,
    showNavigation: true,
    drawerWidth: 240,
    title: '家計簿アプリ',
    enableTransitions: true,
    transitionType: 'fade',
    showBreadcrumbs: true,
  },
  render: (args) => (
    <AppLayout {...args}>
      <SampleContent
        title="フルワイド表示"
        description="画面幅を最大限活用するレイアウト。大量のデータ表示やダッシュボードに適用。"
      />
    </AppLayout>
  ),
  parameters: {
    route: '/history',
    docs: {
      description: {
        story:
          'maxWidth=falseによるフルワイドレイアウト。テーブルやチャートなど幅広コンテンツに最適。',
      },
    },
  },
}

/**
 * コンパクトレイアウト
 */
export const Compact: Story = {
  args: {
    maxWidth: 'sm',
    backgroundColor: '#fafafa',
    padding: 2,
    showNavigation: true,
    drawerWidth: 200,
    title: '家計簿',
    enableTransitions: true,
    transitionType: 'slide',
    showBreadcrumbs: true,
  },
  render: (args) => (
    <AppLayout {...args}>
      <SampleContent
        title="コンパクト表示"
        description="狭い画面やシンプルなページに適したコンパクトレイアウト。"
      />
    </AppLayout>
  ),
  parameters: {
    route: '/settings',
    docs: {
      description: {
        story:
          '狭いコンテナ幅とドロワー幅によるコンパクトレイアウト。設定ページやシンプルなフォームに適用。',
      },
    },
  },
}

/**
 * ワイドレイアウト
 */
export const Wide: Story = {
  args: {
    maxWidth: 'xl',
    backgroundColor: '#f0f0f0',
    padding: 6,
    showNavigation: true,
    drawerWidth: 280,
    title: '家計簿アプリ - ワイド表示',
    enableTransitions: true,
    transitionType: 'fade',
    showBreadcrumbs: true,
  },
  render: (args) => (
    <AppLayout {...args}>
      <SampleContent
        title="ワイド表示"
        description="大画面での表示に最適化されたワイドレイアウト。豊富なコンテンツを快適に表示。"
      />
    </AppLayout>
  ),
  parameters: {
    route: '/expenses',
    docs: {
      description: {
        story:
          '大画面向けのワイドレイアウト。広いドロワーと大きなパディングで、デスクトップ環境に最適化。',
      },
    },
  },
}

/**
 * ナビゲーション非表示
 */
export const NoNavigation: Story = {
  args: {
    maxWidth: 'md',
    backgroundColor: '#ffffff',
    padding: 4,
    showNavigation: false,
    title: 'ログインページ',
    enableTransitions: false,
    showBreadcrumbs: false,
  },
  render: (args) => (
    <AppLayout {...args}>
      <SampleContent
        title="ナビゲーション非表示"
        description="ログインページや単独ページなど、ナビゲーションが不要な場面での使用例。"
      />
    </AppLayout>
  ),
  parameters: {
    route: '/login',
    docs: {
      description: {
        story:
          'showNavigation=falseによるナビゲーション非表示レイアウト。ログインページや独立ページに使用。',
      },
    },
  },
}

/**
 * カスタム背景色
 */
export const CustomBackground: Story = {
  args: {
    maxWidth: 'md',
    backgroundColor: '#e8f5e8',
    padding: 4,
    showNavigation: true,
    drawerWidth: 240,
    title: '家計簿アプリ',
    enableTransitions: true,
    transitionType: 'fade',
    showBreadcrumbs: true,
  },
  render: (args) => (
    <AppLayout {...args}>
      <SampleContent
        title="カスタム背景"
        description="背景色をカスタマイズしたレイアウト例。テーマやブランディングに応じた調整が可能。"
      />
    </AppLayout>
  ),
  parameters: {
    route: '/income',
    docs: {
      description: {
        story:
          'backgroundColorプロパティによるカスタム背景色。テーマカラーやページ種別による色分けが可能。',
      },
    },
  },
}

/**
 * トランジション無効
 */
export const NoTransitions: Story = {
  args: {
    maxWidth: 'md',
    backgroundColor: '#f5f5f5',
    padding: 4,
    showNavigation: true,
    drawerWidth: 240,
    title: '家計簿アプリ',
    enableTransitions: false,
    showBreadcrumbs: true,
  },
  render: (args) => (
    <AppLayout {...args}>
      <SampleContent
        title="トランジション無効"
        description="アニメーション無効化レイアウト。パフォーマンス重視やアクセシビリティ配慮時に使用。"
      />
    </AppLayout>
  ),
  parameters: {
    route: '/history',
    docs: {
      description: {
        story:
          'enableTransitions=falseによるアニメーション無効化。低性能デバイスや動きに敏感なユーザー向け。',
      },
    },
  },
}

/**
 * モバイルレイアウト
 */
export const MobileLayout: Story = {
  args: {
    maxWidth: 'sm',
    backgroundColor: '#f5f5f5',
    padding: 2,
    showNavigation: true,
    drawerWidth: 240,
    title: '家計簿アプリ',
    enableTransitions: true,
    transitionType: 'slide',
    showBreadcrumbs: false,
  },
  render: (args) => (
    <AppLayout {...args}>
      <SampleContent
        title="モバイル表示"
        description="モバイルデバイス向けに最適化されたレイアウト。コンパクトな表示とタッチフレンドリーな設計。"
      />
    </AppLayout>
  ),
  parameters: {
    route: '/expenses',
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
          'モバイルデバイス向けレイアウト。狭いパディング、スライドトランジション、パンくず非表示で最適化。',
      },
    },
  },
}

/**
 * タブレットレイアウト
 */
export const TabletLayout: Story = {
  args: {
    maxWidth: 'md',
    backgroundColor: '#f5f5f5',
    padding: 3,
    showNavigation: true,
    drawerWidth: 260,
    title: '家計簿アプリ',
    enableTransitions: true,
    transitionType: 'fade',
    showBreadcrumbs: true,
  },
  render: (args) => (
    <AppLayout {...args}>
      <SampleContent
        title="タブレット表示"
        description="タブレットデバイス向けの中間サイズレイアウト。デスクトップとモバイルの中間設定。"
      />
    </AppLayout>
  ),
  parameters: {
    route: '/history',
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
          'タブレット向けレイアウト。中間的なパディングとドロワー幅で、タブレット環境に最適化。',
      },
    },
  },
}

/**
 * ダークテーマ
 */
export const DarkTheme: Story = {
  args: {
    maxWidth: 'md',
    backgroundColor: '#303030',
    padding: 4,
    showNavigation: true,
    drawerWidth: 240,
    title: '家計簿アプリ',
    enableTransitions: true,
    transitionType: 'fade',
    showBreadcrumbs: true,
  },
  render: (args) => (
    <AppLayout {...args}>
      <Box sx={{ color: 'white' }}>
        <SampleContent
          title="ダークテーマ"
          description="ダークテーマ適用時のレイアウト例。将来的なテーマ切り替え機能のプレビュー。"
        />
      </Box>
    </AppLayout>
  ),
  parameters: {
    route: '/settings',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        story:
          'ダークテーマでのレイアウト表示。暗い背景色と明るいテキストで目に優しい表示。',
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={createTheme({ palette: { mode: 'dark' } })}>
        <CssBaseline />
        <MemoryRouter initialEntries={['/settings']}>
          <Story />
        </MemoryRouter>
      </ThemeProvider>
    ),
  ],
}

/**
 * レスポンシブデモ
 */
export const ResponsiveDemo: Story = {
  args: {
    maxWidth: 'lg',
    backgroundColor: '#f5f5f5',
    padding: 4,
    showNavigation: true,
    drawerWidth: 240,
    title: '家計簿アプリ - レスポンシブ',
    enableTransitions: true,
    transitionType: 'fade',
    showBreadcrumbs: true,
  },
  render: (args) => (
    <AppLayout {...args}>
      <Box>
        <Typography variant="h4" component="h1" gutterBottom>
          レスポンシブレイアウトデモ
        </Typography>
        <Typography variant="body1" paragraph>
          画面サイズに応じて自動的に最適化されるレイアウト。
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: '1fr 1fr',
              md: '1fr 1fr 1fr',
            },
            gap: 2,
            mt: 3,
          }}
        >
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <Paper key={num} sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h6">カード {num}</Typography>
              <Typography variant="body2">
                レスポンシブ対応コンテンツ
              </Typography>
            </Paper>
          ))}
        </Box>
      </Box>
    </AppLayout>
  ),
  parameters: {
    route: '/',
    docs: {
      description: {
        story: `
レスポンシブレイアウトのデモンストレーション。

### ブレークポイント対応
- **xs (< 600px)**: 1カラム表示
- **sm (600-900px)**: 2カラム表示  
- **md (900px+)**: 3カラム表示

### 自動調整機能
- ナビゲーション: デスクトップ常時表示 ↔ モバイルハンバーガー
- パディング: 画面サイズに応じた最適化
- フォント: 画面に適したサイズ調整
        `,
      },
    },
  },
}

/**
 * パフォーマンステスト用
 */
export const PerformanceTest: Story = {
  args: {
    maxWidth: 'md',
    backgroundColor: '#f5f5f5',
    padding: 4,
    showNavigation: true,
    drawerWidth: 240,
    title: '家計簿アプリ - パフォーマンス',
    enableTransitions: true,
    transitionType: 'fade',
    showBreadcrumbs: true,
  },
  render: (args) => (
    <AppLayout {...args}>
      <Box>
        <Typography variant="h4" component="h1" gutterBottom>
          パフォーマンステスト
        </Typography>
        <Typography variant="body1" paragraph>
          大量コンテンツでのレイアウト性能確認。
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {Array.from({ length: 100 }, (_, i) => (
            <Paper key={i} sx={{ p: 1 }}>
              <Typography variant="body2">
                項目 {i + 1}: パフォーマンステスト用のサンプルコンテンツです。
              </Typography>
            </Paper>
          ))}
        </Box>
      </Box>
    </AppLayout>
  ),
  parameters: {
    route: '/history',
    docs: {
      description: {
        story:
          '大量コンテンツでのパフォーマンステスト。100個の項目を表示してレンダリング性能を確認。',
      },
    },
  },
}
