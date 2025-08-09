import type { Meta, StoryObj } from '@storybook/react'
import ExpenseHistory from '../ExpenseHistory'

const meta: Meta<typeof ExpenseHistory> = {
  title: '履歴機能/ExpenseHistory',
  component: ExpenseHistory,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `支出履歴コンポーネント
支出データを日付グループ化して時系列降順で表示します。
@group 履歴機能
@example
\`\`\`tsx
<ExpenseHistory expenses={expenses} />
\`\`\`
        
詳細な技術仕様は [TypeDoc](http://localhost:3001) で確認できます。`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    expenses: {
      control: 'object',
      description: 'expensesプロパティ (必須)',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    expenses: undefined,
  },
}
