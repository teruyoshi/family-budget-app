import type { Meta, StoryObj } from '@storybook/react-vite'
import { Box } from '@mui/material'
import { Button } from '@/components/ui'

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
プロジェクト標準Buttonコンポーネント。MUI Buttonをベースに、プロジェクト共通のスタイリングとプロパティを適用。

### 特徴
- デフォルトで太字フォント（bold=true）
- カスタマイズ可能なpadding（paddingY）
- フルワイド対応
- MUIのすべてのButtonプロパティに対応
        `,
      },
    },
  },
  argTypes: {
    children: {
      description: 'ボタンの表示内容',
      control: { type: 'text' },
    },
    variant: {
      description: 'ボタンの見た目のバリエーション',
      control: { type: 'select' },
      options: ['text', 'outlined', 'contained'],
    },
    color: {
      description: 'ボタンの色テーマ',
      control: { type: 'select' },
      options: [
        'inherit',
        'primary',
        'secondary',
        'success',
        'error',
        'info',
        'warning',
      ],
    },
    size: {
      description: 'ボタンのサイズ',
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    fullWidth: {
      description: 'フルワイド表示',
      control: { type: 'boolean' },
    },
    bold: {
      description: '太字フォント',
      control: { type: 'boolean' },
    },
    paddingY: {
      description: '垂直パディング',
      control: { type: 'number', min: 0, max: 5, step: 0.5 },
    },
    disabled: {
      description: '無効状態',
      control: { type: 'boolean' },
    },
  },
}

export default meta
type Story = StoryObj<typeof Button>

// 基本的な使用例
export const Default: Story = {
  args: {
    children: 'ボタン',
  },
}

// Variant別のサンプル
export const Variants: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      <Button variant="text">Text</Button>
      <Button variant="outlined">Outlined</Button>
      <Button variant="contained">Contained</Button>
    </Box>
  ),
}

// Color別のサンプル
export const Colors: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      <Button variant="contained" color="primary">
        Primary
      </Button>
      <Button variant="contained" color="secondary">
        Secondary
      </Button>
      <Button variant="contained" color="success">
        Success
      </Button>
      <Button variant="contained" color="error">
        Error
      </Button>
      <Button variant="contained" color="info">
        Info
      </Button>
      <Button variant="contained" color="warning">
        Warning
      </Button>
    </Box>
  ),
}

// Size別のサンプル
export const Sizes: Story = {
  render: () => (
    <Box
      sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}
    >
      <Button variant="contained" size="small">
        Small
      </Button>
      <Button variant="contained" size="medium">
        Medium
      </Button>
      <Button variant="contained" size="large">
        Large
      </Button>
    </Box>
  ),
}

// フルワイド
export const FullWidth: Story = {
  render: () => (
    <Box sx={{ width: '100%', maxWidth: 400 }}>
      <Button variant="contained" color="primary" fullWidth>
        フルワイドボタン
      </Button>
    </Box>
  ),
}

// フォント太字設定
export const FontWeight: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      <Button variant="contained" bold={true}>
        太字（デフォルト）
      </Button>
      <Button variant="contained" bold={false}>
        通常の太さ
      </Button>
    </Box>
  ),
}

// パディング設定
export const PaddingVariations: Story = {
  render: () => (
    <Box
      sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}
    >
      <Button variant="contained" paddingY={0.5}>
        小さいパディング
      </Button>
      <Button variant="contained" paddingY={1.5}>
        デフォルト
      </Button>
      <Button variant="contained" paddingY={3}>
        大きいパディング
      </Button>
    </Box>
  ),
}

// フォーム送信ボタンのサンプル
export const FormSubmitButton: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: 300 }}>
      <Button type="submit" variant="contained" color="success" fullWidth>
        データを保存
      </Button>
      <Button
        type="submit"
        variant="contained"
        color="error"
        fullWidth
        disabled
      >
        無効状態の送信ボタン
      </Button>
    </Box>
  ),
}

// JSXを含むchildren
export const WithIcon: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      <Button variant="contained" color="primary">
        <span style={{ marginRight: '8px' }}>📁</span>
        ファイルを開く
      </Button>
      <Button variant="outlined" color="error">
        削除
        <span style={{ marginLeft: '8px' }}>🗑️</span>
      </Button>
    </Box>
  ),
}

// 実際のアプリケーションでの使用例
export const ApplicationUsage: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, width: 400 }}>
      {/* ナビゲーションボタン */}
      <Box>
        <h4>ナビゲーションボタン</h4>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button variant="text" size="small">
            戻る
          </Button>
          <Button variant="text" size="small">
            次へ
          </Button>
        </Box>
      </Box>

      {/* アクションボタン */}
      <Box>
        <h4>アクションボタン</h4>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Button variant="outlined">キャンセル</Button>
          <Button variant="contained" color="primary">
            保存
          </Button>
        </Box>
      </Box>

      {/* フォームボタン */}
      <Box>
        <h4>フォーム送信ボタン</h4>
        <Button variant="contained" color="success" fullWidth>
          支出を登録
        </Button>
      </Box>

      {/* 危険なアクション */}
      <Box>
        <h4>危険なアクション</h4>
        <Button variant="contained" color="error">
          削除する
        </Button>
      </Box>
    </Box>
  ),
}

// カスタムスタイル
export const CustomStyles: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      <Button
        variant="contained"
        sx={{
          borderRadius: 3,
          textTransform: 'none',
          fontSize: '1.1rem',
        }}
      >
        角丸カスタム
      </Button>
      <Button
        variant="outlined"
        bold={false}
        paddingY={2}
        sx={{
          border: '2px solid',
          '&:hover': {
            border: '2px solid',
          },
        }}
      >
        太めボーダー
      </Button>
    </Box>
  ),
}

// インタラクティブテスト
export const InteractiveTest: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: 300 }}>
      <p>各種ボタンの表示確認</p>
      <Button variant="contained" color="primary" fullWidth>
        プライマリボタン
      </Button>
      <Button variant="outlined" color="secondary">
        セカンダリボタン
      </Button>
    </Box>
  ),
}
