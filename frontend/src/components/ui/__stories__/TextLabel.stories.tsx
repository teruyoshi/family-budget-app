import type { Meta, StoryObj } from '@storybook/react-vite'
import { Box, Stack } from '@mui/material'
import TextLabel from '../TextLabel'

const meta: Meta<typeof TextLabel> = {
  title: 'UI/TextLabel',
  component: TextLabel,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'コロン自動付加機能付きのテキストラベルコンポーネント。フォームやデータ表示でのラベル統一化に使用。',
      },
    },
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'ラベルとして表示するテキスト（自動でコロンが付加される）',
    },
    variant: {
      control: 'select',
      options: [
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'subtitle1',
        'subtitle2',
        'body1',
        'body2',
        'caption',
        'overline',
      ],
      description: 'MUI Typographyのバリアント',
    },
    htmlFor: {
      control: 'text',
      description: 'フォーム要素との関連付け用ID',
    },
    className: {
      control: 'text',
      description: 'カスタムCSSクラス',
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

// 基本的な表示
export const Default: Story = {
  args: {
    children: '残高',
  },
}

// 長いテキスト
export const LongText: Story = {
  args: {
    children: '今月の支出合計金額',
  },
}

// 見出しバリアント
export const Heading: Story = {
  args: {
    children: 'セクションタイトル',
    variant: 'h6',
  },
}

// 小さなテキスト
export const Small: Story = {
  args: {
    children: '詳細項目',
    variant: 'body2',
  },
}

// カスタムスタイル
export const CustomStyle: Story = {
  args: {
    children: '強調ラベル',
    sx: {
      color: 'primary.main',
      fontWeight: 'bold',
    },
  },
}

// フォームラベル
export const FormLabel: Story = {
  args: {
    children: '金額',
    htmlFor: 'amount-input',
  },
}

// 空のchildren
export const Empty: Story = {
  args: {
    children: '',
  },
}

// 特殊文字を含むテキスト
export const WithSpecialChars: Story = {
  args: {
    children: '支出額（円）',
  },
}

// データ表示レイアウト例
export const DataDisplayLayout: Story = {
  render: () => (
    <Stack spacing={2} sx={{ minWidth: 300 }}>
      <Box display="flex" justifyContent="space-between">
        <TextLabel sx={{ minWidth: 100 }}>今月の収入</TextLabel>
        <Box>¥350,000</Box>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <TextLabel sx={{ minWidth: 100 }}>今月の支出</TextLabel>
        <Box>¥280,000</Box>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <TextLabel sx={{ minWidth: 100, fontWeight: 'bold' }}>残高</TextLabel>
        <Box sx={{ fontWeight: 'bold', color: 'primary.main' }}>¥70,000</Box>
      </Box>
    </Stack>
  ),
}

// フォームレイアウト例
export const FormLayout: Story = {
  render: () => (
    <Stack spacing={2} sx={{ minWidth: 300 }}>
      <Box>
        <TextLabel variant="h6">支出入力</TextLabel>
        <Box sx={{ mt: 1, p: 2, border: '1px solid #ddd', borderRadius: 1 }}>
          支出入力フォームがここに表示される
        </Box>
      </Box>
      <Box>
        <TextLabel>金額</TextLabel>
        <Box sx={{ mt: 0.5, p: 1, border: '1px solid #ddd', borderRadius: 1 }}>
          金額入力フィールド
        </Box>
      </Box>
      <Box>
        <TextLabel>カテゴリ</TextLabel>
        <Box sx={{ mt: 0.5, p: 1, border: '1px solid #ddd', borderRadius: 1 }}>
          カテゴリ選択
        </Box>
      </Box>
    </Stack>
  ),
  parameters: {
    layout: 'fullscreen',
  },
}

// 全バリアント比較
export const AllVariants: Story = {
  render: () => (
    <Stack spacing={2} sx={{ p: 3 }}>
      <div>
        <h3>見出しバリアント</h3>
        <Stack spacing={1}>
          <TextLabel variant="h1">見出し1</TextLabel>
          <TextLabel variant="h2">見出し2</TextLabel>
          <TextLabel variant="h3">見出し3</TextLabel>
          <TextLabel variant="h4">見出し4</TextLabel>
          <TextLabel variant="h5">見出し5</TextLabel>
          <TextLabel variant="h6">見出し6</TextLabel>
        </Stack>
      </div>

      <div>
        <h3>サブタイトルバリアント</h3>
        <Stack spacing={1}>
          <TextLabel variant="subtitle1">サブタイトル1</TextLabel>
          <TextLabel variant="subtitle2">サブタイトル2</TextLabel>
        </Stack>
      </div>

      <div>
        <h3>本文バリアント</h3>
        <Stack spacing={1}>
          <TextLabel variant="body1">本文1（デフォルト）</TextLabel>
          <TextLabel variant="body2">本文2</TextLabel>
          <TextLabel variant="caption">キャプション</TextLabel>
          <TextLabel variant="overline">オーバーライン</TextLabel>
        </Stack>
      </div>
    </Stack>
  ),
  parameters: {
    layout: 'fullscreen',
  },
}

// 色とスタイルバリエーション
export const ColorVariations: Story = {
  render: () => (
    <Stack spacing={2} sx={{ p: 3 }}>
      <TextLabel>デフォルト色</TextLabel>
      <TextLabel sx={{ color: 'primary.main' }}>プライマリ色</TextLabel>
      <TextLabel sx={{ color: 'secondary.main' }}>セカンダリ色</TextLabel>
      <TextLabel sx={{ color: 'error.main' }}>エラー色</TextLabel>
      <TextLabel sx={{ color: 'warning.main' }}>警告色</TextLabel>
      <TextLabel sx={{ color: 'success.main' }}>成功色</TextLabel>
      <TextLabel sx={{ color: 'text.secondary' }}>
        セカンダリテキスト色
      </TextLabel>
      <TextLabel sx={{ fontWeight: 'bold' }}>太字</TextLabel>
      <TextLabel sx={{ fontStyle: 'italic' }}>斜体</TextLabel>
      <TextLabel sx={{ textDecoration: 'underline' }}>下線</TextLabel>
    </Stack>
  ),
  parameters: {
    layout: 'fullscreen',
  },
}
