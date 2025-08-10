import { Meta, StoryObj } from '@storybook/react'
import TotalExpenseDisplay from '../TotalExpenseDisplay'

const meta: Meta<typeof TotalExpenseDisplay> = {
  component: TotalExpenseDisplay,
  title: 'features/expenses/TotalExpenseDisplay',
  tags: ['autodocs'], // これでDocsページが自動生成
}
export default meta

export const Default: StoryObj<typeof TotalExpenseDisplay> = {
  args: {
    totalAmount: 15000,
  },
}

export const LargeAmount: StoryObj<typeof TotalExpenseDisplay> = {
  args: {
    totalAmount: 100000,
  },
}

export const SmallAmount: StoryObj<typeof TotalExpenseDisplay> = {
  args: {
    totalAmount: 500,
  },
}
