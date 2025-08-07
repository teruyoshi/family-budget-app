import { useState } from 'react'
import { Box, Button } from '@mui/material'
import ExpenseInput from './ExpenseInput'

/**
 * 支出登録フォームコンポーネント
 *
 * 支出金額の入力から登録までを担当するコンテナコンポーネントです。
 * 状態管理、バリデーション、送信処理を統合的に提供します。
 *
 * 機能:
 * - 支出金額の状態管理
 * - フォーム送信時のバリデーション（正の数値チェック）
 * - 送信後のフォームリセット
 * - MUI Box/Buttonによる統一されたスタイリング
 *
 * 設計パターン:
 * - Container Component: ロジック管理を担当
 * - Controlled Component: React状態で入力を制御
 *
 * @example
 * <ExpenseForm onSubmit={(amount) => console.log('Expense:', amount)} />
 */
interface ExpenseFormProps {
  onSubmit?: (amount: number) => void
}

function ExpenseForm({ onSubmit }: ExpenseFormProps) {
  const [amount, setAmount] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const numericAmount = parseFloat(amount)

    // バリデーション: 正の数値のみ受け入れ
    if (numericAmount > 0 && onSubmit) {
      onSubmit(numericAmount)
      setAmount('') // フォームリセット
    }
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
    >
      <ExpenseInput value={amount} onChange={setAmount} />
      <Button
        type="submit"
        variant="contained"
        color="error"
        fullWidth
        sx={{
          fontWeight: 'bold',
          py: 1.5,
        }}
      >
        支出を登録
      </Button>
    </Box>
  )
}

export default ExpenseForm
