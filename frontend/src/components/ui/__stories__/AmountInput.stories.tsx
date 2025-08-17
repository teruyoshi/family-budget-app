import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import AmountInput from '../AmountInput'

const meta: Meta<typeof AmountInput> = {
  title: 'UI Components/AmountInput',
  component: AmountInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '数値を自動で¥記号付きカンマ区切り形式にフォーマットする入力フィールド。react-hook-formとの完全互換性を持ち、右寄せ表示で視認性を向上。',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      description: '現在の金額',
      control: { type: 'number' },
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    onChange: {
      description: '金額変更時のコールバック',
      table: {
        type: { summary: '(value: number) => void' },
      },
    },
    placeholder: {
      description: 'プレースホルダーテキスト',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
      },
    },
    label: {
      description: 'フィールドラベル',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
      },
    },
    required: {
      description: '必須入力項目かどうか',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    fullWidth: {
      description: '全幅表示するかどうか',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    variant: {
      description: 'MUI TextFieldのバリアント',
      control: { type: 'select' },
      options: ['outlined', 'filled', 'standard'],
      table: {
        type: { summary: "'outlined' | 'filled' | 'standard'" },
        defaultValue: { summary: "'outlined'" },
      },
    },
    error: {
      description: 'エラー状態',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
      },
    },
    helperText: {
      description: 'エラーメッセージ',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// 基本ストーリー
export const Default: Story = {
  args: {
    value: 0,
    placeholder: '金額を入力',
  },
}

// ラベル付き
export const WithLabel: Story = {
  args: {
    value: 15000,
    label: '支出金額',
    placeholder: '金額を入力してください',
  },
}

// 必須項目
export const Required: Story = {
  args: {
    value: 0,
    label: '収入金額',
    placeholder: '必須項目です',
    required: true,
  },
}

// エラー状態
export const WithError: Story = {
  args: {
    value: 0,
    label: '金額',
    placeholder: '金額を入力',
    error: true,
    helperText: '金額は必須項目です',
  },
}

// バリアント - Filled
export const FilledVariant: Story = {
  args: {
    value: 25000,
    label: '予算金額',
    variant: 'filled',
  },
}

// バリアント - Standard
export const StandardVariant: Story = {
  args: {
    value: 50000,
    label: '目標金額',
    variant: 'standard',
  },
}

// 大きな金額での表示
export const LargeAmount: Story = {
  args: {
    value: 1234567,
    label: '年収',
    placeholder: '年収を入力',
  },
}

// インタラクティブストーリー（状態管理あり）
export const Interactive: Story = {
  render: function InteractiveAmountInput(args) {
    const [value, setValue] = useState(args.value || 0)

    return (
      <AmountInput
        {...args}
        value={value}
        onChange={setValue}
      />
    )
  },
  args: {
    label: 'インタラクティブ金額入力',
    placeholder: '自由に入力してください',
    value: 10000,
  },
}

// フォームレイアウトでの使用例
export const InFormLayout: Story = {
  render: function FormLayoutExample(args) {
    const [expenseAmount, setExpenseAmount] = useState(3000)
    const [incomeAmount, setIncomeAmount] = useState(25000)

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
        <AmountInput
          value={expenseAmount}
          onChange={setExpenseAmount}
          label="支出金額"
          placeholder="支出を入力"
        />
        <AmountInput
          value={incomeAmount}
          onChange={setIncomeAmount}
          label="収入金額"
          placeholder="収入を入力"
        />
        <div style={{ marginTop: '16px', padding: '8px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
          <p>支出: ¥{expenseAmount.toLocaleString()}</p>
          <p>収入: ¥{incomeAmount.toLocaleString()}</p>
          <p><strong>残高: ¥{(incomeAmount - expenseAmount).toLocaleString()}</strong></p>
        </div>
      </div>
    )
  },
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'フォーム内での実際の使用例。複数の金額入力フィールドと計算結果の表示。',
      },
    },
  },
}