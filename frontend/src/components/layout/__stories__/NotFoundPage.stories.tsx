import type { Meta, StoryObj } from '@storybook/react-vite'
import { Box } from '@mui/material'
import NotFoundPage from '../NotFoundPage'

const meta: Meta<typeof NotFoundPage> = {
  title: 'コンポーネント/レイアウト/NotFoundPage',
  component: NotFoundPage,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
404エラーページコンポーネント

存在しないルートにアクセスした際に表示されるフォールバックページです。
シンプルで分かりやすいデザインで、ユーザーをダッシュボードに誘導します。

## 主な機能
- 404エラーメッセージの表示
- ダッシュボードへの戻りリンク
- シンプルで直感的なUI
- センター配置レイアウト

## 使用場面
- React Routerの404フォールバック
- 存在しないページへのアクセス
- ブロークンリンクの処理
        `,
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof NotFoundPage>

export const デフォルト: Story = {
  render: () => <NotFoundPage />,
}

export const コンテナ内: Story = {
  render: () => (
    <Box
      sx={{
        width: '100%',
        height: '400px',
        border: '1px dashed #ccc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
      }}
    >
      <NotFoundPage />
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'コンテナ内での表示例。実際のアプリケーションでの配置をシミュレート。',
      },
    },
  },
}

export const フルスクリーン: Story = {
  render: () => (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
      }}
    >
      <NotFoundPage />
    </Box>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'フルスクリーン表示での404ページ。実際の使用状況に近い表示。',
      },
    },
  },
}

export const カスタム背景付き: Story = {
  render: () => (
    <Box
      sx={{
        width: '100%',
        height: '400px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }}
    >
      <Box
        sx={{
          backgroundColor: 'white',
          borderRadius: 2,
          p: 2,
          boxShadow: 2,
        }}
      >
        <NotFoundPage />
      </Box>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'カスタム背景とカード形式での表示例。デザインシステムとの統合例。',
      },
    },
  },
}

export const レスポンシブ: Story = {
  render: () => <NotFoundPage />,
  parameters: {
    viewport: {
      viewports: {
        mobile: {
          name: 'モバイル',
          styles: {
            width: '375px',
            height: '667px',
          },
        },
        tablet: {
          name: 'タブレット',
          styles: {
            width: '768px',
            height: '1024px',
          },
        },
        desktop: {
          name: 'デスクトップ',
          styles: {
            width: '1440px',
            height: '900px',
          },
        },
      },
    },
    docs: {
      description: {
        story: 'レスポンシブ対応の確認用。各デバイスサイズでの表示を確認できます。',
      },
    },
  },
}