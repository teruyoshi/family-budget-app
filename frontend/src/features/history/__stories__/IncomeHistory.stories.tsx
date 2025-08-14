import type { Meta, StoryObj } from '@storybook/react-vite'
import IncomeHistory from '../IncomeHistory'

const meta: Meta<typeof IncomeHistory> = {
  component: IncomeHistory,
  title: 'features/history/IncomeHistory',
  tags: ['autodocs'], // これでDocsページが自動生成
}
export default meta

export const WithIncomes: StoryObj<typeof IncomeHistory> = {
  args: {
    incomes: [
      { id: '1', amount: 50000, timestamp: '2025/01/15(水)' },
      { id: '2', amount: 25000, timestamp: '2025/01/10(金)' },
      { id: '3', amount: 30000, timestamp: '2025/01/08(水)' },
    ],
  },
}

export const Empty: StoryObj<typeof IncomeHistory> = {
  args: {
    incomes: [],
  },
}
