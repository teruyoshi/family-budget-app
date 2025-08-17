import type { Meta, StoryObj } from '@storybook/react-vite'
import AppTitle from '../AppTitle'

const meta: Meta<typeof AppTitle> = {
  title: 'UI/AppTitle',
  component: AppTitle,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '家計簿アプリの固定タイトルを表示するコンポーネント。Typography ベースでカスタマイズ可能。',
      },
    },
  },
  argTypes: {
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
      ],
      description: 'Typography の variant 設定',
    },
    component: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'div'],
      description: 'レンダリングする HTML 要素',
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

// 基本的な表示
export const Default: Story = {
  args: {},
}

// 大きなタイトル
export const Large: Story = {
  args: {
    variant: 'h2',
  },
}

// 小さなタイトル
export const Small: Story = {
  args: {
    variant: 'h6',
  },
}

// カスタムスタイル
export const Styled: Story = {
  args: {
    variant: 'h3',
    sx: {
      color: 'primary.main',
      textAlign: 'center',
      fontWeight: 'bold',
      textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
    },
  },
}

// サブタイトルバリアント
export const Subtitle: Story = {
  args: {
    variant: 'subtitle1',
    component: 'h2',
    sx: {
      color: 'text.secondary',
      fontStyle: 'italic',
    },
  },
}

// 中央揃えレイアウト
export const Centered: Story = {
  args: {
    variant: 'h4',
    sx: {
      textAlign: 'center',
      padding: 2,
      backgroundColor: 'grey.50',
      borderRadius: 1,
    },
  },
  parameters: {
    layout: 'fullscreen',
  },
}

// 複数バリエーション比較
export const Variants: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        padding: '20px',
      }}
    >
      <AppTitle variant="h1" />
      <AppTitle variant="h2" />
      <AppTitle variant="h3" />
      <AppTitle variant="h4" />
      <AppTitle variant="h5" />
      <AppTitle variant="h6" />
      <AppTitle variant="subtitle1" />
      <AppTitle variant="body1" />
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
}
