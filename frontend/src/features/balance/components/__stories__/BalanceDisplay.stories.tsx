import type { Meta, StoryObj } from '@storybook/react';
import BalanceDisplay from '../BalanceDisplay';

const meta: Meta<typeof BalanceDisplay> = {
  title: '残高機能/BalanceDisplay',
  component: BalanceDisplay,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `残高表示コンポーネント
現在の残高を中央揃えで緑色表示します。
@group 残高機能
@example
\`\`\`tsx
<BalanceDisplay balance={25000} />
<BalanceDisplay balance={-1500} />
\`\`\`
        
詳細な技術仕様は [TypeDoc](http://localhost:3001) で確認できます。`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    balance: {
      control: 'number',
      description: 'balanceプロパティ (必須)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    balance: 1000,
  },
};

