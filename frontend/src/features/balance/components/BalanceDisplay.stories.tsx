import type { Meta, StoryObj } from '@storybook/react';
import BalanceDisplay from './BalanceDisplay';

const meta: Meta<typeof BalanceDisplay> = {
  title: '残高機能/BalanceDisplay',
  component: BalanceDisplay,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `BalanceDisplayコンポーネントのプロパティ @typedef {Object} BalanceDisplayProps @property {number} balance - 表示する残高（収入 - 支出）
        
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

