import type { Meta, StoryObj } from '@storybook/react';
import DatePicker from '../DatePicker';

const meta: Meta<typeof DatePicker> = {
  title: '共通コンポーネント/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `日付選択コンポーネントのProps型定義
        
詳細な技術仕様は [TypeDoc](http://localhost:3001) で確認できます。`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: '現在の日付値（YYYY-MM-DD形式の文字列） (必須)',
    },
    onChange: {
      control: 'text',
      description: '日付変更時のコールバック関数 (必須)',
    },
    label: {
      control: 'text',
      description: '日付ピッカーのラベル (必須)',
    },
    disabled: {
      control: 'boolean',
      description: '無効状態にするかどうか (任意)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 'テキスト',
    onChange: 'テキスト',
    label: 'ラベル',
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: '無効状態の表示例',
      },
    },
  },
};
