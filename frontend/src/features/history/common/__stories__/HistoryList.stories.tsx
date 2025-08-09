import type { Meta, StoryObj } from '@storybook/react';
import HistoryList from '../HistoryList';

const meta: Meta<typeof HistoryList> = {
  title: '履歴機能/HistoryList',
  component: HistoryList,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `履歴リストコンポーネント
支出・収入履歴の共通レイアウトを提供するコンポーネントです。
アイテムを日付でグループ化し、日付降順で表示します。アイテムが空の場合はnullを返します。
@component
@param {HistoryListProps} props - コンポーネントのプロパティ
@param {Expense[]} props.items - 表示するデータアイテムの配列
@param {string} props.title - リストのタイトル
@param {string} props.itemLabel - 各アイテムのラベル
@param {'warning' | 'success'} props.itemColor - アイテムの表示カラー
@returns {JSX.Element | null} 履歴リストUIまたはnull（アイテムが空の場合）
@example
\`\`\`tsx
const expenses = [
  { id: '1', amount: 1500, timestamp: '2024/01/15(月)' },
  { id: '2', amount: 800, timestamp: '2024/01/14(日)' }
];
<HistoryList
  items={expenses}
  title="支出履歴"
  itemLabel="支出"
  itemColor="warning"
/>
\`\`\`
        
詳細な技術仕様は [TypeDoc](http://localhost:3001) で確認できます。`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    items: {
      control: 'object',
      description: 'itemsプロパティ (必須)',
    },
    title: {
      control: 'text',
      description: 'titleプロパティ (必須)',
    },
    itemLabel: {
      control: 'text',
      description: 'itemLabelプロパティ (必須)',
    },
    itemColor: {
      control: 'select',
      description: 'itemColorプロパティ (必須)',
      options: ["warning","success"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: undefined,
    title: 'テキスト',
    itemLabel: 'ラベル',
    itemColor: undefined,
  },
};

