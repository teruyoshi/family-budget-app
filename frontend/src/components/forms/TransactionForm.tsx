import { type SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box } from '@mui/material'
import { Button } from '@/components/ui'
import {
  ControlledAmountInput,
  ControlledCustomDateSwitch,
  ControlledDatePicker,
} from '.'
import {
  type TransactionFormData,
  transactionFormSchema,
} from '@/lib/validation/schemas'

/**
 * TransactionFormコンポーネントのProps型定義
 */
export interface TransactionFormProps {
  /** 金額入力フィールドのプレースホルダー */
  placeholder: string
  /** 送信ボタンのテキスト */
  buttonText: string
  /** 送信ボタンのカラー */
  buttonColor: 'error' | 'success'
  /** 日付選択フィールドのラベル */
  datePickerLabel: string
  /** フォーム送信時のコールバック関数 */
  onSubmit?: (data: TransactionFormData) => void
  /** フォームの初期値 */
  defaultValues?: Partial<TransactionFormData>
}

/**
 * 収入・支出共用取引登録フォームコンポーネント
 *
 * react-hook-form + zodバリデーション対応の汎用的な取引入力フォーム。
 * 動的日付選択機能とリアルタイムバリデーションを備える。
 *
 * @example
 * ```tsx
 * <TransactionForm
 *   placeholder="支出金額を入力"
 *   buttonText="支出を登録"
 *   buttonColor="error"
 *   datePickerLabel="支出日付"
 *   onSubmit={(data) => addExpense(data)}
 * />
 * ```
 */

export default function TransactionForm({
  placeholder,
  buttonText,
  buttonColor,
  datePickerLabel,
  onSubmit,
  defaultValues = {},
}: TransactionFormProps) {
  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { isValid },
  } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: {
      amount: 0,
      date: new Date().toLocaleDateString('sv-SE', { timeZone: 'Asia/Tokyo' }),
      useCustomDate: false,
      ...defaultValues,
    },
    mode: 'onChange',
  })

  const useCustomDate = watch('useCustomDate')

  const handleFormSubmit: SubmitHandler<TransactionFormData> = (data) => {
    onSubmit?.(data)
    reset({
      amount: 0,
      date: data.date,
      useCustomDate: data.useCustomDate,
    })
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(handleFormSubmit)}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
    >
      <ControlledCustomDateSwitch control={control} name="useCustomDate" />

      {useCustomDate && (
        <ControlledDatePicker
          control={control}
          name="date"
          label={datePickerLabel}
        />
      )}

      <ControlledAmountInput
        control={control}
        name="amount"
        placeholder={placeholder}
      />

      <Button
        type="submit"
        variant="contained"
        color={buttonColor}
        fullWidth
        disabled={!isValid}
      >
        {buttonText}
      </Button>
    </Box>
  )
}
