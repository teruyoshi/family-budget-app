import { Meta, StoryObj } from '@storybook/react'
import ExpenseInput from '../ExpenseInput'

const meta: Meta<typeof ExpenseInput> = {
  component: ExpenseInput,
  title: 'features/expenses/ExpenseInput',
  tags: ['autodocs'], // これでDocsページが自動生成
}
export default meta

export const Default: StoryObj<typeof ExpenseInput> = {
  args: {
    value: 1500,
    onChange: (value: number) => console.log('Changed:', value),
    placeholder: '支出金額を入力',
  },
}

export const Empty: StoryObj<typeof ExpenseInput> = {
  args: {
    value: 0,
    onChange: (value: number) => console.log('Changed:', value),
  },
}
