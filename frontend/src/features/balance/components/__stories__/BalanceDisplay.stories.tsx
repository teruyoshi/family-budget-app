import { Meta, StoryObj } from '@storybook/react'
import BalanceDisplay from '../BalanceDisplay'

const meta: Meta<typeof BalanceDisplay> = {
  component: BalanceDisplay,
  title: 'features/balance/BalanceDisplay',
  tags: ['autodocs'], // これでDocsページが自動生成
}
export default meta

export const Default: StoryObj<typeof BalanceDisplay> = {
  args: {
    balance: 25000,
  },
}

export const NegativeBalance: StoryObj<typeof BalanceDisplay> = {
  args: {
    balance: -1500,
  },
}

export const ZeroBalance: StoryObj<typeof BalanceDisplay> = {
  args: {
    balance: 0,
  },
}
