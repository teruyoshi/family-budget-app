import { type SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button } from '@mui/material'
import {
  ControlledAmountInput,
  ControlledCustomDateSwitch,
  ControlledDatePicker,
} from './form'
import {
  type TransactionFormData,
  transactionFormSchema,
} from '@/lib/validation/schemas'

/**
 * 取引登録統合フォームコンポーネントのProps型定義
 *
 * 収入・支出両方に対応した汎用的な取引入力フォーム用のプロパティセット。
 * react-hook-form + zod バリデーション対応で、
 * 金額入力・日付選択・送信ボタンの統合UIを提供します。
 */
export interface TransactionFormProps {
  /**
   * 金額入力フィールドのプレースホルダーテキスト
   * @example "支出金額を入力" - 支出登録フォームの場合
   * @example "収入金額を入力" - 収入登録フォームの場合
   */
  placeholder: string

  /**
   * 送信ボタンに表示するテキスト
   * @example "支出を登録" - 支出登録フォームの場合
   * @example "収入を登録" - 収入登録フォームの場合
   */
  buttonText: string

  /**
   * 送信ボタンのMUIカラーテーマ
   * @example "error" - 支出（赤系）フォーム用
   * @example "success" - 収入（緑系）フォーム用
   */
  buttonColor: 'error' | 'success'

  /**
   * 日付選択フィールドのラベル
   * @example "支出日付" - 支出登録時の日付ラベル
   * @example "収入日付" - 収入登録時の日付ラベル
   */
  datePickerLabel: string

  /**
   * フォーム送信時のコールバック関数
   * @param data - バリデーション済みフォームデータ（TransactionFormData型）
   * @example
   * ```tsx
   * const handleExpense = (data: TransactionFormData) => {
   *   const finalDate = data.useCustomDate ? data.date : new Date().toISOString().split('T')[0]
   *   addExpense({ amount: data.amount, date: finalDate, description: '支出' })
   * }
   * ```
   */
  onSubmit?: (data: TransactionFormData) => void

  /**
   * フォームの初期値（任意）
   * @defaultValue { amount: 0, date: 今日の日付, useCustomDate: false }
   */
  defaultValues?: Partial<TransactionFormData>
}

/**
 * 収入・支出共用取引登録統合フォームコンポーネント
 *
 * react-hook-form + zodバリデーション対応の汎用的な取引入力フォーム。
 * 金額入力・日付選択・送信ボタンを統合し、動的日付選択機能（トグルスイッチ）と
 * 堅牢なバリデーション機能を備え、ExpenseFormやIncomeFormの共通基盤として機能。
 *
 * @remarks
 * - **react-hook-form**: 効率的なフォーム管理と不要な再レンダリング抑制
 * - **zodバリデーション**: 型安全なスキーマベースバリデーション
 * - **動的日付選択**: トグルスイッチで日付指定の有無を切り替え
 * - **リアルタイムエラー表示**: 入力時にバリデーションエラーを表示
 * - **日付ロジック**: トグル無効時は今日の日付を自動使用
 * - **フォーム状態**: 送信後は金額のみリセット（日付・トグル状態保持）
 * - **アクセシビリティ**: キーボード操作・Enter送信・エラーメッセージ読み上げ対応
 *
 * @example
 * ```tsx
 * // 支出登録フォームとしての使用
 * const handleExpenseSubmit = (data: TransactionFormData) => {
 *   const finalDate = data.useCustomDate ? data.date : new Date().toISOString().split('T')[0]
 *   addExpense({
 *     amount: data.amount,
 *     date: finalDate,
 *     description: '支出',
 *     category: 'general'
 *   })
 * }
 *
 * <TransactionForm
 *   placeholder="支出金額を入力"
 *   buttonText="支出を登録"
 *   buttonColor="error"
 *   datePickerLabel="支出日付"
 *   onSubmit={handleExpenseSubmit}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // 初期値を指定した使用例
 * const handleIncomeSubmit = (data: TransactionFormData) => {
 *   const finalDate = data.useCustomDate ? data.date : new Date().toISOString().split('T')[0]
 *   addIncome({
 *     amount: data.amount,
 *     date: finalDate,
 *     description: '給与収入'
 *   })
 * }
 *
 * <TransactionForm
 *   placeholder="収入金額を入力"
 *   buttonText="収入を登録"
 *   buttonColor="success"
 *   datePickerLabel="収入日付"
 *   defaultValues={{ amount: 250000, useCustomDate: true }}
 *   onSubmit={handleIncomeSubmit}
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
    mode: 'onChange', // リアルタイムバリデーション
  })

  const useCustomDate = watch('useCustomDate')

  /** フォーム送信処理 */
  const handleFormSubmit: SubmitHandler<TransactionFormData> = (data) => {
    onSubmit?.(data)
    // 金額のみリセット（日付とトグル状態は保持）
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
      <ControlledCustomDateSwitch control={control} />

      {useCustomDate && (
        <ControlledDatePicker control={control} label={datePickerLabel} />
      )}

      <ControlledAmountInput control={control} placeholder={placeholder} />

      <Button
        type="submit"
        variant="contained"
        color={buttonColor}
        fullWidth
        disabled={!isValid}
        sx={{
          fontWeight: 'bold',
          py: 1.5,
        }}
      >
        {buttonText}
      </Button>
    </Box>
  )
}
