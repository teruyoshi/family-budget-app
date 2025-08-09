import type { Meta, StoryObj } from '@storybook/react';
import ExpenseInput from '../ExpenseInput';

const meta: Meta<typeof ExpenseInput> = {
  title: '支出機能/ExpenseInput',
  component: ExpenseInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `ExpenseInputコンポーネントのプロパティ
@typedef {Object} ExpenseInputProps
@property {number} value - 現在の入力値（数値）
@property {Function} onChange - 値変更時のコールバック関数
@property {string} [placeholder] - 入力欄のプレースホルダーテキスト
        
詳細な技術仕様は [TypeDoc](http://localhost:3001) で確認できます。`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'number',
      description: 'valueプロパティ (必須)',
    },
    onChange: {
      control: 'number',
      description: 'onChangeプロパティ (必須)',
    },
    placeholder: {
      control: 'text',
      description: 'placeholderプロパティ (任意)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 0,
    onChange: 0,
    placeholder: 'プレースホルダーテキスト',
  },
};

