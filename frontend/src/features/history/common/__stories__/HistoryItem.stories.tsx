import type { Meta, StoryObj } from '@storybook/react'
import HistoryItem from '../HistoryItem'

const meta: Meta<typeof HistoryItem> = {
  title: '履歴機能/HistoryItem',
  component: HistoryItem,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `履歴アイテムコンポーネント
支出・収入履歴の個別アイテムを表示します。左側にラベルチップ、右側に金額を表示。
@example
\`\`\`tsx
<HistoryItem
  item={expenseItem}
  label="支出"
  color="warning"
/>
\`\`\`
        
詳細な技術仕様は [TypeDoc](http://localhost:3001) で確認できます。`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    item: {
      control: 'object',
      description: 'itemプロパティ (必須)',
    },
    label: {
      control: 'text',
      description: 'labelプロパティ (必須)',
    },
    color: {
      control: 'select',
      description: 'colorプロパティ (必須)',
      options: ['warning', 'success'],
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    item: undefined,
    label: 'ラベル',
    color: undefined,
  },
}
