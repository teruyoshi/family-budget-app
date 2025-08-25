import type { Meta, StoryObj } from '@storybook/react-vite'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import { createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { Box, Typography, Card, CardContent } from '@mui/material'
import { DateLocalizationProvider } from '@/components/provider'
import AppLayout from '../AppLayout'

const theme = createTheme()

// サンプルコンテンツコンポーネント
const SampleContent = ({ title = 'サンプルページ' }) => (
  <Box>
    <Typography variant="h4" component="h1" gutterBottom>
      {title}
    </Typography>
    <Typography variant="body1" paragraph>
      これはAppLayoutコンポーネントのサンプルコンテンツです。
      実際のアプリケーションでは、ここに各ページの具体的な内容が表示されます。
    </Typography>
    <Card sx={{ mt: 2 }}>
      <CardContent>
        <Typography variant="h6" component="h2" gutterBottom>
          コンテンツセクション
        </Typography>
        <Typography variant="body2">
          このレイアウトコンポーネントは、アプリケーション全体で統一された
          ユーザーインターフェースを提供し、ナビゲーション、コンテンツエリア、
          パンくずナビゲーションを適切に配置します。
        </Typography>
      </CardContent>
    </Card>
  </Box>
)

const meta: Meta<typeof AppLayout> = {
  title: 'コンポーネント/レイアウト/AppLayout',
  component: AppLayout,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
アプリケーション共通レイアウトコンポーネント

全ページで共通するレイアウト要素を提供し、AppNavigation（AppBar + Drawer）を統合した
レスポンシブ対応の完全なアプリケーションレイアウトを実現します。

## 主な機能
- AppNavigation統合（AppBar + Drawer）
- レスポンシブナビゲーション（モバイル・デスクトップ対応）
- 統一されたコンテナ幅とスタイリング
- パンくずナビゲーション
- ページトランジション効果
- アクセシビリティ対応

## レイアウト構造
- ヘッダー: AppBar（モバイルではハンバーガーメニュー）
- サイドバー: Drawer（デスクトップでは常時表示、モバイルではトグル）
- メインコンテンツ: ナビゲーション幅を考慮した適切な配置
- パンくずナビゲーション
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
    maxWidth: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', false],
      description: 'コンテンツエリアの最大幅',
    },
    backgroundColor: {
      control: 'color',
      description: '背景色の設定',
    },
    padding: {
      control: 'number',
      description: 'コンテンツエリアのパディング',
    },
    showNavigation: {
      control: 'boolean',
      description: 'ナビゲーションの表示有無',
    },
    drawerWidth: {
      control: 'number',
      description: 'ドロワーの幅（px）',
    },
    title: {
      control: 'text',
      description: 'アプリケーションタイトル',
    },
    enableTransitions: {
      control: 'boolean',
      description: 'ページトランジションの有効/無効',
    },
    transitionType: {
      control: 'select',
      options: ['fade', 'slide', 'none'],
      description: 'トランジションのタイプ',
    },
    showBreadcrumbs: {
      control: 'boolean',
      description: 'パンくずナビゲーションの表示有無',
    },
  },
}

export default meta

type Story = StoryObj<typeof AppLayout>

export const デフォルト: Story = {
  args: {},
  render: (args) => (
    <AppLayout {...args}>
      <SampleContent />
    </AppLayout>
  ),
}

export const ナビゲーションなし: Story = {
  args: {
    showNavigation: false,
  },
  render: (args) => (
    <AppLayout {...args}>
      <SampleContent title="ナビゲーションなしページ" />
    </AppLayout>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'ナビゲーションを非表示にしたレイアウト。ログインページなどで使用。',
      },
    },
  },
}

export const パンくずなし: Story = {
  args: {
    showBreadcrumbs: false,
  },
  render: (args) => (
    <AppLayout {...args}>
      <SampleContent title="パンくずなしページ" />
    </AppLayout>
  ),
  parameters: {
    docs: {
      description: {
        story: 'パンくずナビゲーションを非表示にしたレイアウト。',
      },
    },
  },
}

export const カスタム幅: Story = {
  args: {
    maxWidth: 'lg',
  },
  render: (args) => (
    <AppLayout {...args}>
      <SampleContent title="大きな幅のページ" />
    </AppLayout>
  ),
  parameters: {
    docs: {
      description: {
        story: 'コンテンツエリアの幅をlgに設定したレイアウト。',
      },
    },
  },
}

export const カスタム背景: Story = {
  args: {
    backgroundColor: '#e3f2fd',
  },
  render: (args) => (
    <AppLayout {...args}>
      <SampleContent title="カスタム背景色ページ" />
    </AppLayout>
  ),
  parameters: {
    docs: {
      description: {
        story: '背景色をカスタマイズしたレイアウト。',
      },
    },
  },
}

export const 幅広ドロワー: Story = {
  args: {
    drawerWidth: 300,
  },
  render: (args) => (
    <AppLayout {...args}>
      <SampleContent title="幅広ドロワーページ" />
    </AppLayout>
  ),
  parameters: {
    docs: {
      description: {
        story: 'ドロワー幅を300pxに設定したレイアウト。',
      },
    },
  },
}

export const カスタムタイトル: Story = {
  args: {
    title: 'カスタムアプリ',
  },
  render: (args) => (
    <AppLayout {...args}>
      <SampleContent title="カスタムタイトルページ" />
    </AppLayout>
  ),
  parameters: {
    docs: {
      description: {
        story: 'アプリケーションタイトルをカスタマイズしたレイアウト。',
      },
    },
  },
}

export const トランジションなし: Story = {
  args: {
    enableTransitions: false,
  },
  render: (args) => (
    <AppLayout {...args}>
      <SampleContent title="トランジションなしページ" />
    </AppLayout>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'ページトランジション効果を無効にしたレイアウト。パフォーマンス重視の場合に使用。',
      },
    },
  },
}

export const スライドトランジション: Story = {
  args: {
    transitionType: 'slide',
  },
  render: (args) => (
    <AppLayout {...args}>
      <SampleContent title="スライドトランジションページ" />
    </AppLayout>
  ),
  parameters: {
    docs: {
      description: {
        story: 'スライドトランジション効果を適用したレイアウト。',
      },
    },
  },
}

export const フルカスタマイズ: Story = {
  args: {
    maxWidth: 'xl',
    backgroundColor: '#f8f9fa',
    padding: 6,
    drawerWidth: 280,
    title: '高度カスタムアプリ',
    transitionType: 'slide',
  },
  render: (args) => (
    <AppLayout {...args}>
      <SampleContent title="フルカスタマイズページ" />
    </AppLayout>
  ),
  parameters: {
    docs: {
      description: {
        story: '全てのオプションをカスタマイズしたレイアウト例。',
      },
    },
  },
}
