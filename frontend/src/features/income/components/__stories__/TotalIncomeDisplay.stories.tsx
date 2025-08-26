import type { Meta, StoryObj } from '@storybook/react-vite'
import TotalIncomeDisplay from '../TotalIncomeDisplay'

const meta: Meta<typeof TotalIncomeDisplay> = {
  component: TotalIncomeDisplay,
  title: '機能/income/TotalIncomeDisplay',
  tags: ['autodocs'], // これでDocsページが自動生成
}
export default meta

export const デフォルト: StoryObj<typeof TotalIncomeDisplay> = {
  args: {
    totalAmount: 250000,
  },
}

export const 大きな金額: StoryObj<typeof TotalIncomeDisplay> = {
  args: {
    totalAmount: 1000000,
  },
}

export const SmallAmount: StoryObj<typeof TotalIncomeDisplay> = {
  args: {
    totalAmount: 50000,
  },
}
