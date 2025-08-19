import type { Meta, StoryObj } from '@storybook/react-vite'
import { useForm } from 'react-hook-form'
import { Box, Button, Typography } from '@mui/material'
import { useState } from 'react'
import ControlledAmountInput from '../ControlledAmountInput'
import type { TransactionFormData } from '@/lib/validation/schemas'

// ストーリー用のフォームラッパー
function FormWrapper({
  defaultAmount = 0,
  placeholder = '金額を入力してください',
  showSubmitData = false,
}: {
  defaultAmount?: number
  placeholder?: string
  showSubmitData?: boolean
}) {
  const { control, handleSubmit, watch } = useForm<TransactionFormData>({
    defaultValues: {
      amount: defaultAmount,
      description: '',
      category: '',
      date: '',
    },
  })

  const [submitData, setSubmitData] = useState<TransactionFormData | null>(null)
  const currentAmount = watch('amount')

  const onSubmit = (data: TransactionFormData) => {
    console.log('フォーム送信データ:', data)
    if (showSubmitData) {
      setSubmitData(data)
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ p: 2 }}>
      <ControlledAmountInput<TransactionFormData>
        control={control}
        name="amount"
        placeholder={placeholder}
      />
      
      <Box sx={{ mt: 2, display: 'flex', gap: 1, alignItems: 'center' }}>
        <Button type="submit" variant="contained" size="small">
          送信
        </Button>
        <Typography variant="body2" color="text.secondary">
          現在の値: {typeof currentAmount === 'number' ? currentAmount : 0}
        </Typography>
      </Box>

      {showSubmitData && submitData && (
        <Box sx={{ mt: 2, p: 1, bgcolor: 'grey.100', borderRadius: 1 }}>
          <Typography variant="body2" color="text.secondary">
            送信されたデータ:
          </Typography>
          <Typography variant="body2" component="pre" sx={{ fontSize: '0.8rem' }}>
            {JSON.stringify(submitData, null, 2)}
          </Typography>
        </Box>
      )}
    </Box>
  )
}

// バリデーションエラーのデモ用フォーム
function ValidationFormWrapper() {
  const { control, handleSubmit, setError, clearErrors } = useForm<TransactionFormData>({
    defaultValues: {
      amount: 0,
      description: '',
      category: '',
      date: '',
    },
  })

  const onSubmit = (data: TransactionFormData) => {
    console.log('フォーム送信データ:', data)
  }

  const triggerError = () => {
    setError('amount', {
      type: 'manual',
      message: '金額は1円以上である必要があります',
    })
  }

  const clearError = () => {
    clearErrors('amount')
  }

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ p: 2 }}>
      <ControlledAmountInput<TransactionFormData>
        control={control}
        name="amount"
        placeholder="金額を入力してください"
      />
      
      <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
        <Button type="submit" variant="contained" size="small">
          送信
        </Button>
        <Button onClick={triggerError} variant="outlined" size="small" color="error">
          エラー表示
        </Button>
        <Button onClick={clearError} variant="outlined" size="small">
          エラークリア
        </Button>
      </Box>
    </Box>
  )
}

const meta: Meta<typeof ControlledAmountInput> = {
  title: 'Components/Forms/ControlledAmountInput',
  component: ControlledAmountInput,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'react-hook-form連携金額入力コンポーネント。フォーム内で使用される金額入力フィールドで、Controllerでラップしてバリデーション・エラー表示を自動化。',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    control: {
      description: 'react-hook-formのcontrolオブジェクト',
      control: false,
    },
    name: {
      description: 'フィールド名',
      control: 'text',
    },
    placeholder: {
      description: '金額フィールドのプレースホルダー',
      control: 'text',
    },
  },
}

export default meta
type Story = StoryObj<typeof ControlledAmountInput>

/**
 * デフォルト状態（空の金額入力）
 */
export const Default: Story = {
  render: () => <FormWrapper />,
}

/**
 * 初期値ありの状態
 */
export const WithInitialValue: Story = {
  render: () => <FormWrapper defaultAmount={15000} />,
}

/**
 * カスタムプレースホルダー
 */
export const CustomPlaceholder: Story = {
  render: () => <FormWrapper placeholder="支出金額を入力してください" />,
}

/**
 * 大きな金額の表示例
 */
export const LargeAmount: Story = {
  render: () => <FormWrapper defaultAmount={1234567} />,
}

/**
 * フォーム送信データの表示
 */
export const WithSubmitData: Story = {
  render: () => <FormWrapper defaultAmount={5000} showSubmitData />,
}

/**
 * バリデーションエラーの表示
 */
export const WithValidationError: Story = {
  render: () => <ValidationFormWrapper />,
}

/**
 * 複数の金額入力フィールド
 */
export const MultipleFields: Story = {
  render: () => {
    const { control, handleSubmit, watch } = useForm<{
      income: number
      expense: number
      budget: number
    }>({
      defaultValues: {
        income: 300000,
        expense: 0,
        budget: 250000,
      },
    })

    const [income, expense, budget] = watch(['income', 'expense', 'budget'])
    const balance = (income || 0) - (expense || 0)

    const onSubmit = (data: any) => {
      console.log('複数フィールドデータ:', data)
    }

    return (
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400 }}>
          <Box>
            <Typography variant="subtitle2" gutterBottom>収入</Typography>
            <ControlledAmountInput
              control={control}
              name="income"
              placeholder="月収を入力"
            />
          </Box>
          
          <Box>
            <Typography variant="subtitle2" gutterBottom>支出</Typography>
            <ControlledAmountInput
              control={control}
              name="expense"
              placeholder="支出額を入力"
            />
          </Box>
          
          <Box>
            <Typography variant="subtitle2" gutterBottom>予算</Typography>
            <ControlledAmountInput
              control={control}
              name="budget"
              placeholder="予算を入力"
            />
          </Box>

          <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
            <Typography variant="h6" gutterBottom>収支計算</Typography>
            <Typography variant="body2">
              収入: ¥{(income || 0).toLocaleString()}
            </Typography>
            <Typography variant="body2">
              支出: ¥{(expense || 0).toLocaleString()}
            </Typography>
            <Typography variant="body2">
              予算: ¥{(budget || 0).toLocaleString()}
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                mt: 1, 
                fontWeight: 'bold',
                color: balance >= 0 ? 'success.main' : 'error.main'
              }}
            >
              残高: ¥{balance.toLocaleString()}
            </Typography>
          </Box>

          <Button type="submit" variant="contained">
            データ送信
          </Button>
        </Box>
      </Box>
    )
  },
}

/**
 * インタラクティブテスト（入力値の変化を確認）
 */
export const InteractiveTest: Story = {
  render: () => {
    const { control, handleSubmit, watch, setValue } = useForm<TransactionFormData>({
      defaultValues: {
        amount: 0,
        description: '',
        category: '',
        date: '',
      },
    })

    const currentAmount = watch('amount')

    const onSubmit = (data: TransactionFormData) => {
      alert(`送信された金額: ¥${(data.amount || 0).toLocaleString()}`)
    }

    const setPresetAmount = (amount: number) => {
      setValue('amount', amount)
    }

    return (
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ p: 2 }}>
        <ControlledAmountInput<TransactionFormData>
          control={control}
          name="amount"
          placeholder="金額を入力またはプリセットを選択"
        />
        
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            プリセット金額:
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {[1000, 5000, 10000, 50000, 100000].map((amount) => (
              <Button
                key={amount}
                variant="outlined"
                size="small"
                onClick={() => setPresetAmount(amount)}
              >
                ¥{amount.toLocaleString()}
              </Button>
            ))}
          </Box>
        </Box>

        <Box sx={{ mt: 2, display: 'flex', gap: 2, alignItems: 'center' }}>
          <Button type="submit" variant="contained">
            送信
          </Button>
          <Typography variant="body1">
            現在の値: ¥{(currentAmount || 0).toLocaleString()}
          </Typography>
        </Box>
      </Box>
    )
  },
}