import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import DatePicker from '../DatePicker'
import { DateLocalizationProvider } from '@/components/provider'

const meta: Meta<typeof DatePicker> = {
  title: 'UI/DatePicker',
  component: DatePicker,
  decorators: [
    (Story) => (
      <DateLocalizationProvider>
        <Story />
      </DateLocalizationProvider>
    ),
  ],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'MUI X DatePickerをベースとした日本語対応の日付選択コンポーネント。react-hook-form対応でISO 8601形式での日付管理。',
      },
    },
  },
  argTypes: {
    value: {
      control: 'text',
      description: '選択中の日付値（YYYY-MM-DD形式）',
    },
    label: {
      control: 'text',
      description: '日付選択フィールドのラベル',
    },
    disabled: {
      control: 'boolean',
      description: '日付選択の無効状態',
    },
    required: {
      control: 'boolean',
      description: '必須入力項目かどうか',
    },
    fullWidth: {
      control: 'boolean',
      description: '全幅表示するかどうか',
    },
    variant: {
      control: 'select',
      options: ['outlined', 'filled', 'standard'],
      description: 'MUI TextFieldのバリアント',
    },
    error: {
      control: 'boolean',
      description: 'エラー状態',
    },
    helperText: {
      control: 'text',
      description: 'ヘルプテキスト',
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

// 基本的な表示
export const Default: Story = {
  args: {
    label: '日付を選択',
  },
}

// 初期値あり
export const WithValue: Story = {
  args: {
    label: '取引日',
    value: '2024-08-17',
  },
}

// 必須項目
export const Required: Story = {
  args: {
    label: '取引日',
    required: true,
  },
}

// エラー状態
export const WithError: Story = {
  args: {
    label: '取引日',
    error: true,
    helperText: '日付を正しく入力してください',
  },
}

// 無効状態
export const Disabled: Story = {
  args: {
    label: '取引日',
    value: '2024-08-17',
    disabled: true,
  },
}

// Filledバリアント
export const Filled: Story = {
  args: {
    label: '取引日',
    variant: 'filled',
  },
}

// Standardバリアント
export const Standard: Story = {
  args: {
    label: '取引日',
    variant: 'standard',
  },
}

// カスタムスタイル
export const CustomStyle: Story = {
  args: {
    label: '取引日',
    sx: {
      '& .MuiInputLabel-root': {
        color: 'primary.main',
      },
      '& .MuiPickersInputBase-root': {
        backgroundColor: 'grey.50',
      },
    },
  },
}

// インタラクティブ例
export const Interactive: Story = {
  render: function InteractiveExample(args) {
    const [date, setDate] = useState(args.value || '2024-08-17')

    return (
      <div style={{ width: '300px' }}>
        <DatePicker
          {...args}
          value={date}
          onChange={(newDate) => {
            setDate(newDate)
            args.onChange?.(newDate)
          }}
        />
        <p style={{ marginTop: '16px', fontSize: '14px', color: '#666' }}>
          選択された日付: {date || '未選択'}
        </p>
      </div>
    )
  },
  args: {
    label: 'インタラクティブ日付選択',
  },
}

// フォームレイアウトでの使用例
export const InFormLayout: Story = {
  render: function FormLayoutExample() {
    const [startDate, setStartDate] = useState('2024-08-01')
    const [endDate, setEndDate] = useState('2024-08-31')

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          width: '300px',
        }}
      >
        <DatePicker
          value={startDate}
          onChange={setStartDate}
          label="開始日"
          required
        />
        <DatePicker
          value={endDate}
          onChange={setEndDate}
          label="終了日"
          required
        />
        <div
          style={{
            padding: '16px',
            backgroundColor: '#f5f5f5',
            borderRadius: '4px',
          }}
        >
          <strong>選択された期間:</strong>
          <br />
          {startDate} 〜 {endDate}
        </div>
      </div>
    )
  },
  parameters: {
    layout: 'fullscreen',
  },
}

// 全バリエーション比較
export const AllVariants: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        padding: '20px',
      }}
    >
      <div>
        <h3>Outlined (Default)</h3>
        <DatePicker label="取引日" value="2024-08-17" />
      </div>
      <div>
        <h3>Filled</h3>
        <DatePicker label="取引日" value="2024-08-17" variant="filled" />
      </div>
      <div>
        <h3>Standard</h3>
        <DatePicker label="取引日" value="2024-08-17" variant="standard" />
      </div>
      <div>
        <h3>Required</h3>
        <DatePicker label="取引日" required />
      </div>
      <div>
        <h3>Error State</h3>
        <DatePicker label="取引日" error helperText="必須項目です" />
      </div>
      <div>
        <h3>Disabled</h3>
        <DatePicker label="取引日" value="2024-08-17" disabled />
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
}
