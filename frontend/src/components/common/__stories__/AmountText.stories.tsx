import type { Meta, StoryObj } from '@storybook/react';
import AmountText from '../AmountText';

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
  argTypes: {
    amount: {
      control: 'number',
      description: '表示する金額（数値） (必須)',
    },
    variant: {
      control: 'object',
      description: 'Typography のバリエーション (任意)',
    },
    sx: {
      control: 'object',
      description: 'スタイルオブジェクト (任意)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    amount: 1000,
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <AmountText amount={1000} variant="h6" />
      <AmountText amount={5000} variant="h5" />
      <AmountText amount={25000} variant="h4" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '異なるバリアントでの金額表示例',
      },
    },
  },
};
