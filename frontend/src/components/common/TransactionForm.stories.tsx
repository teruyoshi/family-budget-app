import type { Meta, StoryObj } from '@storybook/react';
import TransactionForm from './TransactionForm';

const meta: Meta<typeof TransactionForm> = {
  title: '共通コンポーネント/TransactionForm',
  component: TransactionForm,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `取引登録フォームコンポーネントのProps型定義
        
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

