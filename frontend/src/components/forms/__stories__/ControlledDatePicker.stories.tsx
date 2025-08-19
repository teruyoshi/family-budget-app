import type { Meta, StoryObj } from '@storybook/react-vite'
import { useForm } from 'react-hook-form'
import { Box, Button, Typography } from '@mui/material'
import { useState } from 'react'
import ControlledDatePicker from '../ControlledDatePicker'
import type { TransactionFormData } from '@/lib/validation/schemas'
import DateLocalizationProvider from '@/components/provider/DateLocalizationProvider'

// ストーリー用のフォームラッパー
function FormWrapper({
  defaultDate = '',
  label = '支出日付',
  showSubmitData = false,
}: {
  defaultDate?: string
  label?: string
  showSubmitData?: boolean
}) {
  const { control, handleSubmit, watch } = useForm<TransactionFormData>({
    defaultValues: {
      amount: 0,
      description: '',
      category: '',
      date: defaultDate,
    },
  })

  const [submitData, setSubmitData] = useState<TransactionFormData | null>(null)
  const currentDate = watch('date')

  const onSubmit = (data: TransactionFormData) => {
    console.log('フォーム送信データ:', data)
    if (showSubmitData) {
      setSubmitData(data)
    }
  }

  return (
    <DateLocalizationProvider>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ p: 2 }}>
        <ControlledDatePicker<TransactionFormData, 'date'>
          control={control}
          name="date"
          label={label}
        />
        
        <Box sx={{ mt: 2, display: 'flex', gap: 1, alignItems: 'center' }}>
          <Button type="submit" variant="contained" size="small">
            送信
          </Button>
          <Typography variant="body2" color="text.secondary">
            現在の値: {currentDate || '未選択'}
          </Typography>
        </Box>

        {showSubmitData && submitData && (
          <Box sx={{ mt: 2, p: 1, bgcolor: 'grey.100', borderRadius: 1 }}>
            <Typography variant="body2" color="text.secondary">
              送信されたデータ:
            </Typography>
            <Typography
              variant="body2"
              component="pre"
              sx={{ fontSize: '0.8rem' }}
            >
              {JSON.stringify(submitData, null, 2)}
            </Typography>
          </Box>
        )}
      </Box>
    </DateLocalizationProvider>
  )
}

// バリデーションエラーのデモ用フォーム
function ValidationFormWrapper() {
  const { control, handleSubmit, setError, clearErrors } =
    useForm<TransactionFormData>({
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
    setError('date', {
      type: 'manual',
      message: '日付は必須です',
    })
  }

  const clearError = () => {
    clearErrors('date')
  }

  return (
    <DateLocalizationProvider>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ p: 2 }}>
        <ControlledDatePicker<TransactionFormData, 'date'>
          control={control}
          name="date"
          label="支出日付"
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
    </DateLocalizationProvider>
  )
}

const meta: Meta<typeof ControlledDatePicker> = {
  title: 'Components/Forms/ControlledDatePicker',
  component: ControlledDatePicker,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'react-hook-form連携日付選択コンポーネント。フォーム内で使用される日付入力フィールドで、Controllerでラップしてバリデーション・エラー表示を自動化。テンプレートリテラルを使用して任意のフォーム型と柔軟なフィールド名に対応。',
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
    label: {
      description: '日付フィールドのラベル',
      control: 'text',
    },
  },
}

export default meta
type Story = StoryObj<typeof ControlledDatePicker>

/**
 * デフォルト状態（空の日付入力）
 */
export const Default: Story = {
  render: () => <FormWrapper />,
}

/**
 * 初期値ありの状態
 */
export const WithInitialValue: Story = {
  render: () => <FormWrapper defaultDate="2024-02-14" />,
}

/**
 * カスタムラベル
 */
export const CustomLabel: Story = {
  render: () => <FormWrapper label="取引実行日" />,
}

/**
 * 今日の日付が設定された状態
 */
export const WithTodaysDate: Story = {
  render: () => {
    const today = new Date().toISOString().split('T')[0]
    return <FormWrapper defaultDate={today} label="今日の日付" />
  },
}

/**
 * フォーム送信データの表示
 */
export const WithSubmitData: Story = {
  render: () => <FormWrapper defaultDate="2024-03-15" showSubmitData />,
}

/**
 * バリデーションエラーの表示
 */
export const WithValidationError: Story = {
  render: () => <ValidationFormWrapper />,
}

/**
 * 複数の日付フィールド
 */
export const MultipleFields: Story = {
  render: () => {
    const { control, handleSubmit, watch } = useForm<{
      startDate: string
      endDate: string
      reminderDate: string
    }>({
      defaultValues: {
        startDate: '2024-04-01',
        endDate: '2024-04-30',
        reminderDate: '',
      },
    })

    const [startDate, endDate, reminderDate] = watch(['startDate', 'endDate', 'reminderDate'])

    const onSubmit = (data: { startDate: string; endDate: string; reminderDate: string }) => {
      console.log('複数フィールドデータ:', data)
    }

    return (
      <DateLocalizationProvider>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400 }}>
            <Box>
              <Typography variant="subtitle2" gutterBottom>開始日</Typography>
              <ControlledDatePicker<{ startDate: string; endDate: string; reminderDate: string }, 'startDate'>
                control={control}
                name="startDate"
                label="開始日を選択"
              />
            </Box>
            
            <Box>
              <Typography variant="subtitle2" gutterBottom>終了日</Typography>
              <ControlledDatePicker<{ startDate: string; endDate: string; reminderDate: string }, 'endDate'>
                control={control}
                name="endDate"
                label="終了日を選択"
              />
            </Box>
            
            <Box>
              <Typography variant="subtitle2" gutterBottom>リマインダー日</Typography>
              <ControlledDatePicker<{ startDate: string; endDate: string; reminderDate: string }, 'reminderDate'>
                control={control}
                name="reminderDate"
                label="リマインダー日を選択"
              />
            </Box>

            <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
              <Typography variant="h6" gutterBottom>選択された日付</Typography>
              <Typography variant="body2">
                開始日: {startDate || '未選択'}
              </Typography>
              <Typography variant="body2">
                終了日: {endDate || '未選択'}
              </Typography>
              <Typography variant="body2">
                リマインダー日: {reminderDate || '未選択'}
              </Typography>
              {startDate && endDate && (
                <Typography variant="body1" sx={{ mt: 1, fontWeight: 'bold' }}>
                  期間: {Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24) + 1)}日間
                </Typography>
              )}
            </Box>

            <Button type="submit" variant="contained">
              データ送信
            </Button>
          </Box>
        </Box>
      </DateLocalizationProvider>
    )
  },
}

/**
 * インタラクティブテスト（日付の変化を確認）
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

    const currentDate = watch('date')

    const onSubmit = (data: TransactionFormData) => {
      alert(`送信された日付: ${data.date || '未選択'}`)
    }

    const setPresetDate = (date: string) => {
      setValue('date', date)
    }

    const today = new Date().toISOString().split('T')[0]
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0]

    return (
      <DateLocalizationProvider>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ p: 2 }}>
          <ControlledDatePicker<TransactionFormData, 'date'>
            control={control}
            name="date"
            label="日付を選択またはプリセットを使用"
          />
          
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              プリセット日付:
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Button
                variant="outlined"
                size="small"
                onClick={() => setPresetDate(yesterday)}
              >
                昨日
              </Button>
              <Button
                variant="outlined"
                size="small"
                onClick={() => setPresetDate(today)}
              >
                今日
              </Button>
              <Button
                variant="outlined"
                size="small"
                onClick={() => setPresetDate(tomorrow)}
              >
                明日
              </Button>
              <Button
                variant="outlined"
                size="small"
                onClick={() => setPresetDate('2024-12-25')}
              >
                クリスマス
              </Button>
              <Button
                variant="outlined"
                size="small"
                onClick={() => setPresetDate('')}
              >
                クリア
              </Button>
            </Box>
          </Box>

          <Box sx={{ mt: 2, display: 'flex', gap: 2, alignItems: 'center' }}>
            <Button type="submit" variant="contained">
              送信
            </Button>
            <Typography variant="body1">
              現在の値: {currentDate || '未選択'}
            </Typography>
          </Box>

          {currentDate && (
            <Box sx={{ mt: 2, p: 1, bgcolor: 'info.light', borderRadius: 1 }}>
              <Typography variant="body2">
                選択された日付の詳細:
              </Typography>
              <Typography variant="body2">
                • 日付: {new Date(currentDate).toLocaleDateString('ja-JP')}
              </Typography>
              <Typography variant="body2">
                • 曜日: {new Date(currentDate).toLocaleDateString('ja-JP', { weekday: 'long' })}
              </Typography>
              <Typography variant="body2">
                • ISO形式: {currentDate}
              </Typography>
            </Box>
          )}
        </Box>
      </DateLocalizationProvider>
    )
  },
}