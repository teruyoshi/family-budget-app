import type { Meta, StoryObj } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import AmountInput from '../AmountInput'

const meta: Meta<typeof AmountInput> = {
  component: AmountInput,
  title: '共通コンポーネント/AmountInput',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '金額入力専用コンポーネント。数値を自動で¥記号付きカンマ区切りで表示します。',
      },
    },
  },
  argTypes: {
    value: {
      control: { type: 'number' },
      description: '現在の金額数値',
    },
    placeholder: {
      control: { type: 'text' },
      description: 'プレースホルダーテキスト',
    },
    required: {
      control: { type: 'boolean' },
      description: '必須項目フラグ',
    },
    fullWidth: {
      control: { type: 'boolean' },
      description: '全幅表示フラグ',
    },
    variant: {
      control: { type: 'select' },
      options: ['outlined', 'filled', 'standard'],
      description: 'MUI TextFieldのバリアント',
    },
  },
}
export default meta

export const Default: StoryObj<typeof AmountInput> = {
  args: {
    placeholder: '金額を入力してください',
    value: 15000,
    onChange: action('onChange'),
  },
}

export const Empty: StoryObj<typeof AmountInput> = {
  name: '空の状態',
  args: {
    placeholder: '金額を入力',
    value: 0,
    onChange: action('onChange'),
  },
}

export const LargeAmount: StoryObj<typeof AmountInput> = {
  name: '大きな金額',
  args: {
    placeholder: '大きな金額',
    value: 1234567890,
    onChange: action('onChange'),
  },
}

export const Required: StoryObj<typeof AmountInput> = {
  name: '必須入力',
  args: {
    placeholder: '支出金額（必須）',
    value: 0,
    required: true,
    onChange: action('onChange'),
  },
}

export const ExpenseInput: StoryObj<typeof AmountInput> = {
  name: '支出入力フォーム',
  args: {
    placeholder: '支出金額を入力',
    value: 3500,
    required: true,
    variant: 'outlined',
    onChange: action('onChange'),
  },
}

export const IncomeInput: StoryObj<typeof AmountInput> = {
  name: '収入入力フォーム',
  args: {
    placeholder: '収入金額を入力',
    value: 250000,
    variant: 'filled',
    sx: { backgroundColor: 'success.light' },
    onChange: action('onChange'),
  },
}

export const CompactWidth: StoryObj<typeof AmountInput> = {
  name: 'コンパクト幅',
  args: {
    placeholder: '金額',
    value: 5000,
    fullWidth: false,
    sx: { width: 200 },
    onChange: action('onChange'),
  },
}

export const StandardVariant: StoryObj<typeof AmountInput> = {
  name: 'Standardバリアント',
  args: {
    placeholder: '金額入力',
    value: 12000,
    variant: 'standard',
    onChange: action('onChange'),
  },
}

export const CustomStyling: StoryObj<typeof AmountInput> = {
  name: 'カスタムスタイリング',
  args: {
    placeholder: 'カスタムスタイル',
    value: 98765,
    sx: {
      '& .MuiOutlinedInput-root': {
        borderRadius: 2,
        backgroundColor: 'grey.50',
      },
    },
    onChange: action('onChange'),
  },
}

export const WithError: StoryObj<typeof AmountInput> = {
  name: 'エラー状態',
  args: {
    placeholder: '金額を入力してください',
    value: 0,
    error: true,
    helperText: '金額は必須項目です',
    required: true,
    onChange: action('onChange'),
  },
}

export const WithAriaLabel: StoryObj<typeof AmountInput> = {
  name: 'アクセシビリティ対応',
  args: {
    placeholder: '月収入力',
    value: 300000,
    'aria-label': '月収金額入力フィールド',
    'aria-describedby': 'income-help',
    helperText: '税込みの月収を入力してください',
    onChange: action('onChange'),
  },
}
