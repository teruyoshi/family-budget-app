import type { Meta, StoryObj } from '@storybook/react'
import AmountInput from '../AmountInput'

const meta: Meta<typeof AmountInput> = {
  title: '共通コンポーネント/AmountInput',
  component: AmountInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `金額入力コンポーネントのProps型定義
        
詳細な技術仕様は [TypeDoc](http://localhost:3001) で確認できます。`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'プレースホルダーテキスト (任意)',
    },
    value: {
      control: 'number',
      description: '現在の金額（数値） (必須)',
    },
    onChange: {
      control: 'number',
      description: '金額変更時のコールバック関数 (必須)',
    },
    sx: {
      control: 'object',
      description: 'スタイルオブジェクト (任意)',
    },
    required: {
      control: 'boolean',
      description: '必須項目かどうか (任意)',
    },
    fullWidth: {
      control: 'boolean',
      description: '全幅で表示するかどうか (任意)',
    },
    variant: {
      control: 'select',
      description: '入力フィールドのバリアント (任意)',
      options: ['outlined', 'filled', 'standard'],
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'プレースホルダーテキスト',
    value: 0,
    onChange: () => {},
  },
}

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <AmountInput
        value={1000}
        onChange={() => {}}
        variant="outlined"
        placeholder="金額を入力"
      />
      <AmountInput
        value={2000}
        onChange={() => {}}
        variant="filled"
        placeholder="金額を入力"
      />
      <AmountInput
        value={3000}
        onChange={() => {}}
        variant="standard"
        placeholder="金額を入力"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'バリアントの表示例',
      },
    },
  },
}
