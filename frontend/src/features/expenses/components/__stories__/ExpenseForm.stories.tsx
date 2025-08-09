import type { Meta, StoryObj } from '@storybook/react';
import ExpenseForm from '../ExpenseForm';

const meta: Meta<typeof ExpenseForm> = {
  title: '支出機能/ExpenseForm',
  component: ExpenseForm,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `支出登録フォームコンポーネント
TransactionFormを使用して共通のフォーム構造とバリデーションを提供します。
@group 支出機能
@example
\`\`\`tsx
<ExpenseForm onSubmit={(amount, date) => {
  console.log('支出登録:', amount, date);
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
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
};

