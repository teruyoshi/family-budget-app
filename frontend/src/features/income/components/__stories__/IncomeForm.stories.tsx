import type { Meta, StoryObj } from '@storybook/react'
import IncomeForm from '../IncomeForm'

const meta: Meta<typeof IncomeForm> = {
  title: '収入機能/IncomeForm',
  component: IncomeForm,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `収入登録フォームコンポーネント
TransactionFormを使用して共通のフォーム構造とバリデーションを提供します。
@group 収入機能
@example
\`\`\`tsx
<IncomeForm onSubmit={(amount, date) => {
  console.log('収入登録:', amount, date);
}} />
\`\`\`
        
詳細な技術仕様は [TypeDoc](http://localhost:3001) で確認できます。`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    onSubmit: {
      control: 'text',
      description: 'onSubmitプロパティ (任意)',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
