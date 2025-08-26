import type { Meta, StoryObj } from '@storybook/react-vite'
import ExpenseInput from '../ExpenseInput'

const meta: Meta<typeof ExpenseInput> = {
  component: ExpenseInput,
  title: '機能/expenses/ExpenseInput',
  tags: ['autodocs'], // これでDocsページが自動生成
}
export default meta

export const デフォルト: StoryObj<typeof ExpenseInput> = {
  args: {
    value: 1500,
    onChange: (value: number) => console.log('Changed:', value),
    placeholder: '支出金額を入力',
  },
}

export const 空: StoryObj<typeof ExpenseInput> = {
  args: {
    value: 0,
    onChange: (value: number) => console.log('Changed:', value),
  },
}
