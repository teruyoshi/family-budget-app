import type { Meta, StoryObj } from '@storybook/react';
import AmountInput from './AmountInput';

const meta: Meta<typeof AmountInput> = {
  title: '共通コンポーネント/AmountInput',
  component: AmountInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `金額入力専用のコンポーネントです。¥マークの表示と数値フォーマット機能を内蔵しています。
        
詳細な技術仕様は [TypeDoc](http://localhost:3001/modules/components_common_AmountInput.html) で確認できます。`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'プレースホルダーテキスト',
    },
    value: {
      control: 'number',
      description: '現在の金額（数値）',
    },
    required: {
      control: 'boolean',
      description: '必須項目かどうか',
    },
    fullWidth: {
      control: 'boolean', 
      description: '全幅で表示するかどうか',
    },
    variant: {
      control: 'select',
      options: ['outlined', 'filled', 'standard'],
      description: '入力フィールドのバリアント',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: '金額を入力してください',
    value: 0,
    onChange: (value: number) => console.log('Amount changed:', value),
  },
};

export const WithValue: Story = {
  args: {
    placeholder: '金額を入力してください',
    value: 10000,
    onChange: (value: number) => console.log('Amount changed:', value),
  },
};

export const Required: Story = {
  args: {
    placeholder: '必須項目です',
    value: 0,
    required: true,
    onChange: (value: number) => console.log('Amount changed:', value),
  },
};

export const FullWidth: Story = {
  args: {
    placeholder: '全幅表示',
    value: 5000,
    fullWidth: true,
    onChange: (value: number) => console.log('Amount changed:', value),
  },
  parameters: {
    layout: 'padded',
  },
};