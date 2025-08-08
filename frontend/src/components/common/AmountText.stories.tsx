import type { Meta, StoryObj } from '@storybook/react';
import AmountText from './AmountText';

const meta: Meta<typeof AmountText> = {
  title: '共通コンポーネント/AmountText',
  component: AmountText,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `金額表示コンポーネントのProps型定義
        
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

