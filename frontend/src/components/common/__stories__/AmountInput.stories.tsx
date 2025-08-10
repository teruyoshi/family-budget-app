import type { Meta, StoryObj } from '@storybook/react'
import AmountInput from '../AmountInput'

const meta: Meta<typeof AmountInput> = {
  title: '共通コンポーネント/AmountInput',
  component: AmountInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `# 金額入力コンポーネント

金額入力専用のコンポーネントです。自動的にカンマ区切りと円マーク表示を行い、右寄せで表示します。

## 特徴
- 自動的な¥記号とカンマ区切り表示
- 数値のみの入力制限
- 右寄せレイアウト
- TextInputをベースに構築

## 使用場面
- 支出金額の入力
- 収入金額の入力
- 予算設定フォーム`,
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
    placeholder: '金額を入力してください',
    value: 15000,
    onChange: (value: number) => console.log('Changed:', value),
  },
  parameters: {
    docs: {
      description: {
        story: '基本的な使用例です。金額は自動的に¥15,000のように表示されます。',
      },
    },
  },
}

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <div>
        <h4>Outlined（デフォルト）</h4>
        <AmountInput value={25000} onChange={(value) => console.log('Outlined:', value)} variant="outlined" placeholder="支出金額" />
      </div>
      <div>
        <h4>Filled</h4>
        <AmountInput value={50000} onChange={(value) => console.log('Filled:', value)} variant="filled" placeholder="収入金額" />
      </div>
      <div>
        <h4>Standard</h4>
        <AmountInput value={8500} onChange={(value) => console.log('Standard:', value)} variant="standard" placeholder="その他金額" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '異なるバリアント（outlined, filled, standard）の表示例です。右寄せのレイアウトと¥記号の表示を確認できます。',
      },
    },
  },
}

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <div>
        <h4>空の状態</h4>
        <AmountInput value={0} onChange={(value) => console.log('Empty:', value)} placeholder="金額を入力" />
      </div>
      <div>
        <h4>必須項目</h4>
        <AmountInput value={0} onChange={(value) => console.log('Required:', value)} placeholder="必須入力" required />
      </div>
      <div>
        <h4>大きな金額</h4>
        <AmountInput value={1234567} onChange={(value) => console.log('Large:', value)} placeholder="大きな金額" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '様々な状態での表示例です。空の状態、必須項目、大きな金額（¥1,234,567）の表示を確認できます。',
      },
    },
  },
}
