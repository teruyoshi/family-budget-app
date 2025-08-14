import type { Meta, StoryObj } from '@storybook/react-vite'
import ExpenseHistory from '../ExpenseHistory'

const meta: Meta<typeof ExpenseHistory> = {
  component: ExpenseHistory,
  title: 'features/history/ExpenseHistory',
  tags: ['autodocs'], // これでDocsページが自動生成
}
export default meta

export const WithExpenses: StoryObj<typeof ExpenseHistory> = {
  args: {
    expenses: [
      { id: '1', amount: 1500, timestamp: '2025/01/15(水)' },
      { id: '2', amount: 800, timestamp: '2025/01/15(水)' },
      { id: '3', amount: 2000, timestamp: '2025/01/14(火)' },
    ],
  },
}

export const Empty: StoryObj<typeof ExpenseHistory> = {
  args: {
    expenses: [],
  },
}
