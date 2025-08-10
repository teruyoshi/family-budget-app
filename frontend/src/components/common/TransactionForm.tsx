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
export interface TransactionFormProps {
  /** 金額入力のプレースホルダー */
  placeholder: string
  /** 登録ボタンのテキスト */
  buttonText: string
  /** ボタンの色テーマ */
  buttonColor: 'error' | 'success'
  /** 日付ピッカーのラベル */
  datePickerLabel: string
  /** フォーム送信時のコールバック */
  onSubmit?: (amount: number, date: string) => void
}

/**
 * 金額入力、日付選択、登録ボタンを含む取引登録フォーム
 *
 * @component
 * @example
 * <TransactionForm
 *   placeholder="支出金額を入力"
 *   buttonText="支出を登録"
 *   buttonColor="error"
 *   datePickerLabel="支出日付"
 *   onSubmit={(amount, date) => addExpense(amount, date)}
 * />
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
