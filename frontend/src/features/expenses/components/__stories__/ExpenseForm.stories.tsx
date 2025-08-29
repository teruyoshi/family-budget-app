import type { Meta, StoryObj } from '@storybook/react-vite'
import ExpenseForm from '../ExpenseForm'

const meta: Meta<typeof ExpenseForm> = {
  component: ExpenseForm,
  title: '機能/expenses/ExpenseForm',
  tags: ['autodocs'], // これでDocsページが自動生成
}
export default meta

export const デフォルト: StoryObj<typeof ExpenseForm> = {
  args: {
    onSubmit: (amount: number, date: string) => {
      console.log('支出登録:', amount, date)
    },
  },
}
