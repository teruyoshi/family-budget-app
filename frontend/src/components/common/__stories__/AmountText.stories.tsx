import type { Meta, StoryObj } from '@storybook/react';
import AmountText from './AmountText';

const meta: Meta<typeof AmountText> = {
  title: '共通コンポーネント/AmountText',
  component: AmountText,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `金額表示専用コンポーネント

金額を¥1,000形式で表示します。Material-UIのTypographyを使用してフォーマット済みの金額を表示します。

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
      control: 'select',
      description: 'Typography のバリエーション (任意)',
      options: ['body1', 'body2', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
      <AmountText amount={1500} variant="h6" />
      <AmountText amount={25000} variant="h5" />
      <AmountText amount={350000} variant="h4" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '異なるサイズの金額表示例',
      },
    },
  },
};

export const NegativeAmount: Story = {
  args: {
    amount: -5000,
    sx: { color: 'error.main' },
  },
  parameters: {
    docs: {
      description: {
        story: 'マイナス金額の表示例（赤色で強調）',
      },
    },
  },
};

