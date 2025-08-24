import type { Meta, StoryObj } from '@storybook/react-vite'
import { Box, Typography, Paper } from '@mui/material'
import { DateLocalizationProvider } from '@/components/provider'
import TransactionForm from '../TransactionForm'
import type { TransactionFormData } from '@/lib/validation/schemas'

const meta: Meta<typeof TransactionForm> = {
  title: 'Forms/TransactionForm',
  component: TransactionForm,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
収入・支出共用取引登録統合フォームコンポーネント。

### 特徴
- react-hook-form + zodバリデーション対応
- 動的日付選択機能（トグルスイッチ）
- リアルタイムバリデーション
- 金額入力、日付選択、送信ボタンを統合
- 支出・収入両方に対応した汎用設計

### 使用例
- 支出登録フォーム（buttonColor: "error"）
- 収入登録フォーム（buttonColor: "success"）
        `,
      },
    },
  },
  decorators: [
    (Story) => (
      <DateLocalizationProvider>
        <Paper sx={{ p: 3, maxWidth: 400, width: '100%' }}>
          <Story />
        </Paper>
      </DateLocalizationProvider>
    ),
  ],
  argTypes: {
    placeholder: {
      description: '金額入力フィールドのプレースホルダー',
      control: { type: 'text' },
    },
    buttonText: {
      description: '送信ボタンのテキスト',
      control: { type: 'text' },
    },
    buttonColor: {
      description: '送信ボタンの色テーマ',
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'error', 'info', 'warning'],
    },
    datePickerLabel: {
      description: '日付選択フィールドのラベル',
      control: { type: 'text' },
    },
  },
}

export default meta
type Story = StoryObj<typeof TransactionForm>

// 基本的な使用例
export const Default: Story = {
  args: {
    placeholder: '金額を入力してください',
    buttonText: '登録する',
    buttonColor: 'success',
    datePickerLabel: '日付を選択',
  },
}

// 支出登録フォーム
export const ExpenseForm: Story = {
  args: {
    placeholder: '支出金額を入力',
    buttonText: '支出を登録',
    buttonColor: 'error',
    datePickerLabel: '支出日付',
  },
  parameters: {
    docs: {
      description: {
        story: '支出登録用の設定例。エラー色のボタンで支出を強調。',
      },
    },
  },
}

// 収入登録フォーム
export const IncomeForm: Story = {
  args: {
    placeholder: '収入金額を入力',
    buttonText: '収入を登録',
    buttonColor: 'success',
    datePickerLabel: '収入日付',
  },
  parameters: {
    docs: {
      description: {
        story: '収入登録用の設定例。成功色のボタンで収入を強調。',
      },
    },
  },
}

// デフォルト値設定あり
export const WithDefaultValues: Story = {
  args: {
    placeholder: '給与収入を入力',
    buttonText: '給与を登録',
    buttonColor: 'success',
    datePickerLabel: '給与日',
    defaultValues: {
      amount: 250000,
      useCustomDate: true,
      date: '2024-01-25',
    },
  },
  parameters: {
    docs: {
      description: {
        story: '初期値を設定したフォーム例。給与など定期的な取引に適用。',
      },
    },
  },
}

// バリエーション比較
export const FormVariations: Story = {
  render: () => (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', gap: 4, width: '100%' }}
    >
      {/* 支出フォーム */}
      <Box>
        <Typography variant="h6" gutterBottom color="error">
          支出登録フォーム
        </Typography>
        <Paper sx={{ p: 3 }}>
          <TransactionForm
            placeholder="支出金額を入力"
            buttonText="支出を登録"
            buttonColor="error"
            datePickerLabel="支出日付"
          />
        </Paper>
      </Box>

      {/* 収入フォーム */}
      <Box>
        <Typography variant="h6" gutterBottom color="success.main">
          収入登録フォーム
        </Typography>
        <Paper sx={{ p: 3 }}>
          <TransactionForm
            placeholder="収入金額を入力"
            buttonText="収入を登録"
            buttonColor="success"
            datePickerLabel="収入日付"
          />
        </Paper>
      </Box>

      {/* 汎用フォーム */}
      <Box>
        <Typography variant="h6" gutterBottom>
          汎用取引フォーム
        </Typography>
        <Paper sx={{ p: 3 }}>
          <TransactionForm
            placeholder="取引金額を入力"
            buttonText="取引を登録"
            buttonColor="success"
            datePickerLabel="取引日付"
          />
        </Paper>
      </Box>
    </Box>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: '支出・収入・汎用フォームの使い分け例を並べて表示。',
      },
    },
  },
}

// 機能デモンストレーション
export const FeatureDemo: Story = {
  render: () => {
    const handleSubmit = (data: TransactionFormData) => {
      alert(`送信されたデータ:
金額: ¥${data.amount.toLocaleString()}
日付: ${data.date}
カスタム日付使用: ${data.useCustomDate ? 'はい' : 'いいえ'}`)
    }

    return (
      <Box sx={{ width: '100%' }}>
        <Typography variant="h6" gutterBottom>
          インタラクティブデモ
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          フォームを操作して送信ボタンを押すと、入力内容がアラートで表示されます。
        </Typography>
        <Paper sx={{ p: 3 }}>
          <TransactionForm
            placeholder="金額を入力してテスト"
            buttonText="送信テスト"
            buttonColor="success"
            datePickerLabel="テスト日付"
            onSubmit={handleSubmit}
          />
        </Paper>
      </Box>
    )
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'フォームの動的な動作をテストできるインタラクティブな例。',
      },
    },
  },
}

// 高度な設定例
export const AdvancedConfiguration: Story = {
  render: () => {
    const handleExpenseSubmit = (data: TransactionFormData) => {
      console.log('支出データ:', data)
      // 実際のアプリでは支出追加処理
    }

    const handleIncomeSubmit = (data: TransactionFormData) => {
      console.log('収入データ:', data)
      // 実際のアプリでは収入追加処理
    }

    return (
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 4,
          width: '100%',
        }}
      >
        {/* 食費支出フォーム */}
        <Box>
          <Typography variant="subtitle1" gutterBottom>
            食費支出
          </Typography>
          <Paper sx={{ p: 3 }}>
            <TransactionForm
              placeholder="食費を入力"
              buttonText="食費を記録"
              buttonColor="error"
              datePickerLabel="購入日"
              onSubmit={handleExpenseSubmit}
              defaultValues={{
                amount: 0,
                useCustomDate: false,
                date: new Date().toLocaleDateString('sv-SE', {
                  timeZone: 'Asia/Tokyo',
                }),
              }}
            />
          </Paper>
        </Box>

        {/* 給与収入フォーム */}
        <Box>
          <Typography variant="subtitle1" gutterBottom>
            給与収入
          </Typography>
          <Paper sx={{ p: 3 }}>
            <TransactionForm
              placeholder="給与額を入力"
              buttonText="給与を記録"
              buttonColor="success"
              datePickerLabel="支給日"
              onSubmit={handleIncomeSubmit}
              defaultValues={{
                amount: 250000,
                useCustomDate: true,
                date: '2024-01-25',
              }}
            />
          </Paper>
        </Box>
      </Box>
    )
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          '実際のアプリケーションでの詳細な設定例。カテゴリ別フォームの実装パターン。',
      },
    },
  },
}

// レスポンシブデザイン
export const ResponsiveLayout: Story = {
  render: () => (
    <Box sx={{ width: '100%', maxWidth: '100vw' }}>
      <Typography variant="h6" gutterBottom>
        レスポンシブレイアウト
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            md: '1fr 1fr',
            lg: '1fr 1fr 1fr',
          },
          gap: 2,
        }}
      >
        <Paper sx={{ p: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            モバイル向け
          </Typography>
          <TransactionForm
            placeholder="支出額"
            buttonText="登録"
            buttonColor="error"
            datePickerLabel="日付"
          />
        </Paper>
        <Paper sx={{ p: 3 }}>
          <Typography variant="subtitle2" gutterBottom>
            タブレット向け
          </Typography>
          <TransactionForm
            placeholder="収入金額を入力"
            buttonText="収入を登録"
            buttonColor="success"
            datePickerLabel="収入日付"
          />
        </Paper>
        <Paper sx={{ p: 3, display: { xs: 'none', lg: 'block' } }}>
          <Typography variant="subtitle2" gutterBottom>
            デスクトップ向け
          </Typography>
          <TransactionForm
            placeholder="詳細な金額を入力してください"
            buttonText="詳細データを登録"
            buttonColor="success"
            datePickerLabel="詳細取引日付"
          />
        </Paper>
      </Box>
    </Box>
  ),
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'responsive',
    },
    docs: {
      description: {
        story:
          'モバイル、タブレット、デスクトップでのレスポンシブレイアウト例。',
      },
    },
  },
}

// エラー状態のデモ
export const ValidationDemo: Story = {
  render: () => (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h6" gutterBottom>
        バリデーション動作確認
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        金額を入力すると送信ボタンが有効になります。0円や負の値では無効のままです。
      </Typography>
      <Paper sx={{ p: 3 }}>
        <TransactionForm
          placeholder="1以上の金額を入力"
          buttonText="バリデーションテスト"
          buttonColor="error"
          datePickerLabel="テスト日付"
        />
      </Paper>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'フォームバリデーションの動作を確認できる例。リアルタイムでボタンの有効・無効が切り替わります。',
      },
    },
  },
}

// ダークモード対応
export const DarkModeCompatible: Story = {
  render: () => (
    <Box sx={{ width: '100%' }}>
      <Paper
        sx={{
          p: 3,
          bgcolor: 'grey.900',
          color: 'white',
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'grey.600',
            },
            '&:hover fieldset': {
              borderColor: 'grey.500',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'primary.main',
            },
          },
          '& .MuiInputLabel-root': {
            color: 'grey.300',
          },
          '& .MuiFormControlLabel-label': {
            color: 'grey.300',
          },
        }}
      >
        <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
          ダークモード対応例
        </Typography>
        <TransactionForm
          placeholder="ダークモードでの金額入力"
          buttonText="ダークモードで登録"
          buttonColor="success"
          datePickerLabel="ダークモード日付"
        />
      </Paper>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'ダークモード環境での表示例。MUIテーマに対応したスタイリング。',
      },
    },
  },
}
