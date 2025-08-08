import type { Meta, StoryObj } from '@storybook/react';
import HistoryList from './HistoryList';

const meta: Meta<typeof HistoryList> = {
  title: '履歴機能/HistoryList',
  component: HistoryList,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `履歴リストコンポーネント

支出・収入履歴の共通レイアウトを提供するコンポーネントです。
アイテムを日付でグループ化し、日付降順で表示します。
アイテムが空の場合はnullを返します。

詳細な技術仕様は [TypeDoc](http://localhost:3001) で確認できます。`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    items: {
      control: 'object',
      description: '表示するデータアイテムの配列 (必須)',
    },
    title: {
      control: 'text',
      description: 'リストのタイトル (必須)',
    },
    itemLabel: {
      control: 'text',
      description: '各アイテムのラベル (必須)',
    },
    itemColor: {
      control: 'select',
      description: 'アイテムの表示カラー (必須)',
      options: ["warning","success"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      { id: '1', amount: 1500, description: 'サンプル項目1', timestamp: '2024/01/15(月)' },
      { id: '2', amount: 800, description: 'サンプル項目2', timestamp: '2024/01/14(日)' }
    ],
    title: 'サンプル履歴',
    itemLabel: '項目',
    itemColor: 'warning',
  },
};