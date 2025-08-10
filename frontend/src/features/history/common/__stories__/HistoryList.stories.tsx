import { Meta, StoryObj } from '@storybook/react'
import HistoryList from '../HistoryList'

const meta: Meta<typeof HistoryList> = {
  component: HistoryList,
  title: 'features/history/common/HistoryList',
  tags: ['autodocs'], // これでDocsページが自動生成
}
export default meta

export const ExpenseList: StoryObj<typeof HistoryList> = {
  args: {
    items: [
      { id: '1', amount: 1500, timestamp: '2025/01/15(水)' },
      { id: '2', amount: 800, timestamp: '2025/01/15(水)' },
      { id: '3', amount: 2000, timestamp: '2025/01/14(火)' },
    ],
    title: '支出履歴',
    itemLabel: '支出',
    itemColor: 'warning',
  },
}

export const IncomeList: StoryObj<typeof HistoryList> = {
  args: {
    items: [
      { id: '1', amount: 50000, timestamp: '2025/01/15(水)' },
      { id: '2', amount: 25000, timestamp: '2025/01/10(金)' },
    ],
    title: '収入履歴',
    itemLabel: '収入',
    itemColor: 'success',
  },
}

export const Empty: StoryObj<typeof HistoryList> = {
  args: {
    items: [],
    title: '履歴なし',
    itemLabel: '項目',
    itemColor: 'warning',
  },
}
