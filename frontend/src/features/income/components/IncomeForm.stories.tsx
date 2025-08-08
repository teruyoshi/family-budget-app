import type { Meta, StoryObj } from '@storybook/react';
import IncomeForm from './IncomeForm';

const meta: Meta<typeof IncomeForm> = {
  title: '収入機能/IncomeForm',
  component: IncomeForm,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `IncomeFormコンポーネントのプロパティ @typedef {Object} IncomeFormProps @property {Function} [onSubmit] - フォーム送信時のコールバック関数
        
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

