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
 * 取引登録フォームコンポーネントのProps型定義
 */
interface TransactionFormProps {
  /** 金額入力フィールドのプレースホルダーテキスト */
  placeholder: string
  /** 登録ボタンのテキスト */
  buttonText: string
  /** 登録ボタンの色テーマ */
  buttonColor: 'error' | 'success'
  /** 日付選択フィールドのラベル */
  datePickerLabel: string
  /** フォーム送信時のコールバック関数 */
  onSubmit?: (amount: number, date: string) => void
}

/**
 * 取引登録フォーム共通コンポーネント
 *
 * 支出・収入登録フォームの共通部分を汎化したコンポーネントです。
 * 金額入力、日付入力（オプション）、登録ボタンを提供します。
 * トグルスイッチで日付選択の有効/無効を切り替え可能です。
 *
 * 機能:
 * - 取引金額の状態管理
 * - 日付入力機能（トグルで制御）
 * - 日付選択無効時は自動的に今日の日付を使用
 * - フォーム送信時のバリデーション（正の数値チェック）
 * - 送信後のフォームリセット
 * - カスタマイズ可能なボタンスタイリング
 *
 * 設計パターン:
 * - Generic Component: 支出・収入両方で再利用可能
 * - Controlled Component: React状態で入力を制御
 * - Flexible Interface: 日付選択の有無を動的に制御
 *
 * @group 共通コンポーネント
 * @component
 * @param {TransactionFormProps} props - コンポーネントのプロパティ
 * @param {string} props.placeholder - 金額入力フィールドのプレースホルダーテキスト
 * @param {string} props.buttonText - 登録ボタンのテキスト
 * @param {'error' | 'success'} props.buttonColor - 登録ボタンの色テーマ
 * @param {string} props.datePickerLabel - 日付選択フィールドのラベル
 * @param {function} props.onSubmit - フォーム送信時のコールバック関数
 * @returns {JSX.Element} 金額・日付入力と登録ボタンを含む汎用取引フォーム
 *
 * @example
 * // 支出フォーム
 * <TransactionForm
 *   placeholder="支出金額を入力"
 *   buttonText="支出を登録"
 *   buttonColor="error"
 *   datePickerLabel="支出日付"
 *   onSubmit={(amount, date) => console.log('Expense:', amount, date)}
 * />
 *
 * @example
 * // 収入フォーム
 * <TransactionForm
 *   placeholder="収入金額を入力"
 *   buttonText="収入を登録"
 *   buttonColor="success"
 *   datePickerLabel="収入日付"
 *   onSubmit={(amount, date) => addIncome(amount, date)}
 * />
 */

function TransactionForm({
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

  /**
   * フォーム送信ハンドラー
   * @param {React.FormEvent} e - フォーム送信イベント
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // バリデーション: 正の数値のみ受け入れ
    if (amount > 0 && onSubmit) {
      // 日付選択が無効な場合は今日の日付（アジア/東京タイムゾーン）を使用
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

      <DatePicker
        label={datePickerLabel}
        value={date}
        onChange={setDate}
        disabled={!useCustomDate}
      />

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

export default TransactionForm
