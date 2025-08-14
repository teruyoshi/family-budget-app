import type { Meta, StoryObj } from '@storybook/react-vite'
import HistoryItem from '../HistoryItem'

const meta: Meta<typeof HistoryItem> = {
  component: HistoryItem,
  title: 'features/history/common/HistoryItem',
  tags: ['autodocs'], // これでDocsページが自動生成
}
export default meta

export const ExpenseItem: StoryObj<typeof HistoryItem> = {
  args: {
    item: { id: '1', amount: 1500, timestamp: '2025/01/15(水)' },
    label: '支出',
    color: 'warning',
  },
}

export const IncomeItem: StoryObj<typeof HistoryItem> = {
  args: {
    item: { id: '2', amount: 25000, timestamp: '2025/01/15(水)' },
    label: '収入',
    color: 'success',
  },
}
