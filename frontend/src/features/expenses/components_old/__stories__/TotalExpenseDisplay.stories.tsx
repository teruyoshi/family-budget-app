import type { Meta, StoryObj } from '@storybook/react-vite'
import TotalExpenseDisplay from '../TotalExpenseDisplay'

const meta: Meta<typeof TotalExpenseDisplay> = {
  component: TotalExpenseDisplay,
  title: '機能/expenses/TotalExpenseDisplay',
  tags: ['autodocs'], // これでDocsページが自動生成
}
export default meta

export const デフォルト: StoryObj<typeof TotalExpenseDisplay> = {
  args: {
    totalAmount: 15000,
  },
}

export const 大きな金額: StoryObj<typeof TotalExpenseDisplay> = {
  args: {
    totalAmount: 100000,
  },
}

export const SmallAmount: StoryObj<typeof TotalExpenseDisplay> = {
  args: {
    totalAmount: 500,
  },
}
