import type { Meta, StoryObj } from '@storybook/react';
import ExpenseHistory from './ExpenseHistory';

const meta: Meta<typeof ExpenseHistory> = {
  title: '履歴機能/ExpenseHistory',
  component: ExpenseHistory,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `ExpenseHistoryコンポーネントのプロパティ @typedef {Object} ExpenseHistoryProps @property {Expense[]} expenses - 表示する支出データの配列
        
詳細な技術仕様は [TypeDoc](http://localhost:3001) で確認できます。`,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
};

