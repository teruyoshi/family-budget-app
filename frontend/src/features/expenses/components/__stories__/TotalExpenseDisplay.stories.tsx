import type { Meta, StoryObj } from '@storybook/react'
import TotalExpenseDisplay from '../TotalExpenseDisplay'

const meta: Meta<typeof TotalExpenseDisplay> = {
  title: '支出機能/TotalExpenseDisplay',
  component: TotalExpenseDisplay,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `TotalExpenseDisplayコンポーネントのプロパティ
@typedef {Object} TotalExpenseDisplayProps
@property {number} totalAmount - 表示する合計支出金額
        
詳細な技術仕様は [TypeDoc](http://localhost:3001) で確認できます。`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    totalAmount: {
      control: 'number',
      description: 'totalAmountプロパティ (必須)',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    totalAmount: 1000,
  },
}
