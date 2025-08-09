import type { Meta, StoryObj } from '@storybook/react';
import IncomeHistory from '../IncomeHistory';

const meta: Meta<typeof IncomeHistory> = {
  title: '履歴機能/IncomeHistory',
  component: IncomeHistory,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `収入履歴コンポーネント
収入データを日付グループ化して時系列降順で表示します。
@group 履歴機能
@example
\`\`\`tsx
<IncomeHistory incomes={incomes} />
\`\`\`
        
詳細な技術仕様は [TypeDoc](http://localhost:3001) で確認できます。`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    incomes: {
      control: 'object',
      description: 'incomesプロパティ (必須)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    incomes: undefined,
  },
};

