import { Meta, StoryObj } from '@storybook/react'
import TotalIncomeDisplay from '../TotalIncomeDisplay'

const meta: Meta<typeof TotalIncomeDisplay> = {
  component: TotalIncomeDisplay,
  title: 'features/income/TotalIncomeDisplay',
  tags: ['autodocs'], // これでDocsページが自動生成
}
export default meta

export const Default: StoryObj<typeof TotalIncomeDisplay> = {
  args: {
    totalAmount: 250000,
  },
}

export const LargeAmount: StoryObj<typeof TotalIncomeDisplay> = {
  args: {
    totalAmount: 1000000,
  },
}

export const SmallAmount: StoryObj<typeof TotalIncomeDisplay> = {
  args: {
    totalAmount: 50000,
  },
}
