import type { Meta, StoryObj } from '@storybook/react-vite'
import AmountText from '../AmountText'

const meta: Meta<typeof AmountText> = {
  title: 'UI Components/AmountText',
  component: AmountText,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '数値を¥記号付きカンマ区切り形式で表示するTypographyベースコンポーネント。アプリ全体で統一された金額フォーマットを提供。',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    amount: {
      description: '表示する金額',
      control: { type: 'number' },
      table: {
        type: { summary: 'number' },
      },
    },
    variant: {
      description: 'Typographyバリアント',
      control: { type: 'select' },
      options: [
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'subtitle1',
        'subtitle2',
        'body1',
        'body2',
        'caption',
        'overline',
      ],
      table: {
        type: { summary: 'TypographyVariant' },
        defaultValue: { summary: "'body1'" },
      },
    },
    component: {
      description: 'HTML要素タイプ',
      control: { type: 'select' },
      options: ['div', 'span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      table: {
        type: { summary: 'ElementType' },
      },
    },
    sx: {
      description: 'カスタムスタイル',
      control: { type: 'object' },
      table: {
        type: { summary: 'SxProps<Theme>' },
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// 基本ストーリー
export const Default: Story = {
  args: {
    amount: 25000,
  },
}

// 様々な金額
export const PositiveAmount: Story = {
  args: {
    amount: 150000,
  },
}

export const NegativeAmount: Story = {
  args: {
    amount: -5000,
  },
}

export const ZeroAmount: Story = {
  args: {
    amount: 0,
  },
}

export const LargeAmount: Story = {
  args: {
    amount: 1234567890,
  },
}

// バリアント
export const Heading1: Story = {
  args: {
    amount: 500000,
    variant: 'h1',
  },
}

export const Heading4: Story = {
  args: {
    amount: 100000,
    variant: 'h4',
  },
}

export const Body2: Story = {
  args: {
    amount: 15000,
    variant: 'body2',
  },
}

export const Caption: Story = {
  args: {
    amount: 3000,
    variant: 'caption',
  },
}

// スタイル付き
export const SuccessColor: Story = {
  args: {
    amount: 250000,
    variant: 'h5',
    sx: { color: 'success.main', fontWeight: 'bold' },
  },
}

export const ErrorColor: Story = {
  args: {
    amount: -15000,
    variant: 'body1',
    sx: { color: 'error.main' },
  },
}

export const WarningColor: Story = {
  args: {
    amount: 50000,
    variant: 'h6',
    sx: { color: 'warning.main', textDecoration: 'underline' },
  },
}

export const RightAligned: Story = {
  args: {
    amount: 75000,
    sx: {
      textAlign: 'right',
      minWidth: '150px',
      border: '1px solid #ccc',
      padding: '8px',
    },
  },
}

// コンポーネント要素
export const AsDiv: Story = {
  args: {
    amount: 100000,
    component: 'div',
    variant: 'h5',
  },
}

export const AsSpan: Story = {
  args: {
    amount: 25000,
    component: 'span',
    variant: 'body1',
  },
}

// 実用例
export const CardDisplay: Story = {
  render: (args) => (
    <div
      style={{
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        padding: '16px',
        width: '200px',
        backgroundColor: '#f5f5f5',
      }}
    >
      <div style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>
        残高
      </div>
      <AmountText
        {...args}
        variant="h5"
        sx={{ color: 'primary.main', fontWeight: 'bold' }}
      />
    </div>
  ),
  args: {
    amount: 125000,
  },
  parameters: {
    docs: {
      description: {
        story: 'カード形式での残高表示例。',
      },
    },
  },
}

export const IncomeCard: Story = {
  render: (args) => (
    <div
      style={{
        border: '1px solid #4caf50',
        borderRadius: '8px',
        padding: '16px',
        width: '180px',
        backgroundColor: '#e8f5e8',
      }}
    >
      <div style={{ marginBottom: '8px', fontSize: '14px', color: '#2e7d32' }}>
        今月の収入
      </div>
      <AmountText
        {...args}
        variant="h6"
        sx={{ color: 'success.main', fontWeight: 'bold' }}
      />
    </div>
  ),
  args: {
    amount: 350000,
  },
  parameters: {
    docs: {
      description: {
        story: '収入表示カードの例。緑系の色でポジティブな印象。',
      },
    },
  },
}

export const ExpenseCard: Story = {
  render: (args) => (
    <div
      style={{
        border: '1px solid #f44336',
        borderRadius: '8px',
        padding: '16px',
        width: '180px',
        backgroundColor: '#ffeaea',
      }}
    >
      <div style={{ marginBottom: '8px', fontSize: '14px', color: '#c62828' }}>
        今月の支出
      </div>
      <AmountText
        {...args}
        variant="h6"
        sx={{ color: 'error.main', fontWeight: 'bold' }}
      />
    </div>
  ),
  args: {
    amount: -225000,
  },
  parameters: {
    docs: {
      description: {
        story: '支出表示カードの例。赤系の色で注意を促す。',
      },
    },
  },
}

export const TableRow: Story = {
  render: (args) => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        padding: '8px',
        border: '1px solid #e0e0e0',
      }}
    >
      <div style={{ flex: 1 }}>ランチ代</div>
      <div style={{ width: '80px', color: '#666', fontSize: '14px' }}>
        2024/01/15
      </div>
      <AmountText
        {...args}
        variant="body2"
        sx={{ minWidth: '80px', textAlign: 'right' }}
      />
    </div>
  ),
  args: {
    amount: -1200,
  },
  parameters: {
    docs: {
      description: {
        story: 'テーブル行での金額表示例。右寄せで統一感のあるレイアウト。',
      },
    },
  },
}

export const SummaryList: Story = {
  render: () => (
    <div
      style={{
        width: '250px',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        padding: '16px',
      }}
    >
      <h3 style={{ margin: '0 0 16px 0', fontSize: '18px' }}>月次サマリー</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span>収入</span>
          <AmountText
            amount={300000}
            variant="body2"
            sx={{ color: 'success.main' }}
          />
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span>支出</span>
          <AmountText
            amount={-180000}
            variant="body2"
            sx={{ color: 'error.main' }}
          />
        </div>
        <hr
          style={{
            margin: '8px 0',
            border: 'none',
            borderTop: '1px solid #e0e0e0',
          }}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span style={{ fontWeight: 'bold' }}>残高</span>
          <AmountText
            amount={120000}
            variant="h6"
            sx={{ color: 'primary.main', fontWeight: 'bold' }}
          />
        </div>
      </div>
    </div>
  ),
  args: {},
  parameters: {
    docs: {
      description: {
        story: '月次サマリーでの金額表示例。収入・支出・残高を色分けして表示。',
      },
    },
  },
}

export const CompactList: Story = {
  render: () => (
    <div style={{ width: '300px' }}>
      {[
        { description: 'コーヒー', amount: -380 },
        { description: '電車代', amount: -160 },
        { description: '給与', amount: 250000 },
        { description: '書籍代', amount: -2800 },
        { description: 'ボーナス', amount: 50000 },
      ].map((item, index) => (
        <div
          key={index}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '8px 0',
            borderBottom: index < 4 ? '1px solid #f0f0f0' : 'none',
          }}
        >
          <span style={{ fontSize: '14px' }}>{item.description}</span>
          <AmountText
            amount={item.amount}
            variant="caption"
            sx={{
              color: item.amount > 0 ? 'success.main' : 'error.main',
              minWidth: '80px',
              textAlign: 'right',
            }}
          />
        </div>
      ))}
    </div>
  ),
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          'コンパクトな取引履歴リストの例。正負で色分けした見やすいレイアウト。',
      },
    },
  },
}
