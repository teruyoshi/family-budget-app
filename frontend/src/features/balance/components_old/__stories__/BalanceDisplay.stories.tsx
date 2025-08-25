import type { Meta, StoryObj } from '@storybook/react-vite'
import BalanceDisplay from '../BalanceDisplay'

const meta: Meta<typeof BalanceDisplay> = {
  component: BalanceDisplay,
  title: '機能/balance/BalanceDisplay',
  tags: ['autodocs'], // これでDocsページが自動生成
}
export default meta

export const デフォルト: StoryObj<typeof BalanceDisplay> = {
  args: {
    balance: 25000,
  },
}

export const マイナス残高: StoryObj<typeof BalanceDisplay> = {
  args: {
    balance: -1500,
  },
}

export const ゼロ残高: StoryObj<typeof BalanceDisplay> = {
  args: {
    balance: 0,
  },
}
