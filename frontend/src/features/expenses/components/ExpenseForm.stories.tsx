import type { Meta, StoryObj } from '@storybook/react';
import ExpenseForm from './ExpenseForm';

const meta: Meta<typeof ExpenseForm> = {
  title: '支出機能/ExpenseForm',
  component: ExpenseForm,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `ExpenseFormコンポーネントのプロパティ @typedef {Object} ExpenseFormProps @property {Function} [onSubmit] - フォーム送信時のコールバック関数
        
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

