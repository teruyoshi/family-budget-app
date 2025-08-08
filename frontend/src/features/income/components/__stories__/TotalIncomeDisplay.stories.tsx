import type { Meta, StoryObj } from '@storybook/react';
import TotalIncomeDisplay from './TotalIncomeDisplay';

const meta: Meta<typeof TotalIncomeDisplay> = {
  title: '収入機能/TotalIncomeDisplay',
  component: TotalIncomeDisplay,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `TotalIncomeDisplayコンポーネントのプロパティ @typedef {Object} TotalIncomeDisplayProps @property {number} totalAmount - 表示する合計収入金額
        
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

