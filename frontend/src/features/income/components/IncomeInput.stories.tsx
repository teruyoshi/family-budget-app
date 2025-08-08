import type { Meta, StoryObj } from '@storybook/react';
import IncomeInput from './IncomeInput';

const meta: Meta<typeof IncomeInput> = {
  title: '収入機能/IncomeInput',
  component: IncomeInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `IncomeInputコンポーネントのプロパティ @typedef {Object} IncomeInputProps @property {number} value - 現在の入力値（数値） @property {Function} onChange - 値変更時のコールバック関数 @property {string} [placeholder] - 入力欄のプレースホルダーテキスト
        
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

