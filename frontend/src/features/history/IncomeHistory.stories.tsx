import type { Meta, StoryObj } from '@storybook/react';
import IncomeHistory from './IncomeHistory';

const meta: Meta<typeof IncomeHistory> = {
  title: '履歴機能/IncomeHistory',
  component: IncomeHistory,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `IncomeHistoryコンポーネントのプロパティ @typedef {Object} IncomeHistoryProps @property {Expense[]} incomes - 表示する収入データの配列（型はExpenseと同じ構造）
        
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

