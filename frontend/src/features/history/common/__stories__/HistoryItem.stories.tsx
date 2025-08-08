import type { Meta, StoryObj } from '@storybook/react';
import HistoryItem from './HistoryItem';

const meta: Meta<typeof HistoryItem> = {
  title: '履歴機能/HistoryItem',
  component: HistoryItem,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `HistoryItemコンポーネントのプロパティ @typedef {Object} HistoryItemProps @property {Expense} item - 表示するデータアイテム @property {string} label - アイテムのラベル（例: "支出"、"収入"） @property {'warning' | 'success'} color - 表示カラー（warning: 支出、success: 収入）
        
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

