import type { Meta, StoryObj } from '@storybook/react';
import BalanceDisplay from './BalanceDisplay';

const meta: Meta<typeof BalanceDisplay> = {
  title: '残高機能/BalanceDisplay',
  component: BalanceDisplay,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `残高表示コンポーネント

現在の残高を中央揃えで表示します。残高は緑色で強調表示され、「残高」ラベルと金額が横並びで配置されます。

詳細な技術仕様は [TypeDoc](http://localhost:3001) で確認できます。`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    balance: {
      control: 'number',
      description: '表示する残高金額（正負両方対応） (必須)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    balance: 25000,
  },
};

export const NegativeBalance: Story = {
  args: {
    balance: -10000,
  },
  parameters: {
    docs: {
      description: {
        story: 'マイナス残高の表示例',
      },
    },
  },
};

export const ZeroBalance: Story = {
  args: {
    balance: 0,
  },
  parameters: {
    docs: {
      description: {
        story: '残高0円の表示例',
      },
    },
  },
};

