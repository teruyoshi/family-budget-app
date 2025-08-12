import { useState } from 'react'
import {
  Box,
  Button,
  FormControlLabel,
  Switch,
  Typography,
} from '@mui/material'
import { DatePicker, AmountInput } from './'

/**
 * 取引登録統合フォームコンポーネントのProps型定義
 *
 * 収入・支出両方に対応した汎用的な取引入力フォーム用のプロパティセット。
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
   * @param amount - 入力された金額（正の数値のみ）
   * @param date - 選択された日付（YYYY-MM-DD形式）
   * @example
   * ```tsx
   * const handleExpense = (amount: number, date: string) => {
   *   addExpense({ amount, date, description: ''支出' })
   * }
   * ```
   */
  onSubmit?: (amount: number, date: string) => void
}

/**
 * 収入・支出共用取引登録統合フォームコンポーネント
 *
 * 金額入力・日付選択・送信ボタンを統合した汎用的な取引入力フォーム。
 * 動的日付選択機能（トグルスイッチ）と自動バリデーションを備え、
 * ExpenseFormやIncomeFormの共通基盤として機能します。
 *
 * @remarks
 * - **動的日付選択**: トグルスイッチで日付指定の有無を切り替え
 * - **自動バリデーション**: 正の数値のみ受け付け（ゼロ・負値は無効）
 * - **日付ロジック**: トグル無効時は今日の日付を使用
 * - **フォーム状態**: 金額のみリセット（日付・トグル状態保持）
 * - **アクセシビリティ**: キーボード操作・Enter送信対応
 * - **レスポンシブ**: モバイルデバイスでの操作性を考慮
 *
 * @example
 * ```tsx
 * // 支出登録フォームとしての使用
 * const handleExpenseSubmit = (amount: number, date: string) => {
 *   addExpense({
 *     amount,
 *     date,
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
 * // 収入登録フォームとしての使用
 * const handleIncomeSubmit = (amount: number, date: string) => {
 *   addIncome({
 *     amount,
 *     date, 
 *     description: '給与収入',
 *     source: 'salary'
 *   })
 * }
 *
 * <TransactionForm
 *   placeholder="収入金額を入力"
 *   buttonText="収入を登録"
 *   buttonColor="success"
 *   datePickerLabel="収入日付"
 *   onSubmit={handleIncomeSubmit}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // フォーム結果のBudgetManager連携例
 * const { addTransaction } = useBudgetManager()
 *
 * const handleTransactionSubmit = (amount: number, date: string) => {
 *   addTransaction({
 *     id: crypto.randomUUID(),
 *     type: 'expense', // or 'income'
 *     amount,
 *     date,
 *     description: '手動入力'
 *   })
 * }
 *
 * <TransactionForm
 *   placeholder="金額を入力"
 *   buttonText="登録"
 *   buttonColor="error"
 *   datePickerLabel="取引日"
 *   onSubmit={handleTransactionSubmit}
 * />
 * ```
 */

export default function TransactionForm({
  placeholder,
  buttonText,
  buttonColor,
  datePickerLabel,
  onSubmit,
}: TransactionFormProps) {
  const [amount, setAmount] = useState(0)
  const [date, setDate] = useState(
    new Date().toLocaleDateString('sv-SE', { timeZone: 'Asia/Tokyo' })
  )
  const [useCustomDate, setUseCustomDate] = useState(false)

  /** フォーム送信処理 */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // バリデーション: 正の数値のみ受け入れ
    if (amount > 0 && onSubmit) {
      // トグルが有効な場合は選択日付、無効な場合は今日の日付を使用
      const finalDate = useCustomDate
        ? date
        : new Date().toLocaleDateString('sv-SE', { timeZone: 'Asia/Tokyo' })
      onSubmit(amount, finalDate)
      setAmount(0) // 金額のみリセット（日付とトグル状態は保持）
    }
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
    >
      <FormControlLabel
        control={
          <Switch
            checked={useCustomDate}
            onChange={(e) => setUseCustomDate(e.target.checked)}
            color="primary"
          />
        }
        label={
          <Typography variant="body2" color="text.secondary">
            日付を指定する
          </Typography>
        }
        sx={{ alignSelf: 'flex-start', mb: 0 }}
      />

      {useCustomDate && (
        <DatePicker label={datePickerLabel} value={date} onChange={setDate} />
      )}

      <AmountInput
        placeholder={placeholder}
        value={amount}
        onChange={setAmount}
      />

      <Button
        type="submit"
        variant="contained"
        color={buttonColor}
        fullWidth
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
