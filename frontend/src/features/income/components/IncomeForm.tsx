import { useState } from 'react'
import { Box, Button } from '@mui/material'
import IncomeInput from './IncomeInput'

/**
 * 収入登録フォームコンポーネント
 *
 * 収入金額の入力から登録までを担当するコンテナコンポーネントです。
 * 状態管理、バリデーション、送信処理を統合的に提供します。
 *
 * 機能:
 * - 収入金額の状態管理
 * - フォーム送信時のバリデーション（正の数値チェック）
 * - 送信後のフォームリセット
 * - MUI Box/Buttonによる統一されたスタイリング
 *
 * 設計パターン:
 * - Container Component: ロジック管理を担当
 * - Controlled Component: React状態で入力を制御
 *
 * @example
 * <IncomeForm onSubmit={(amount) => console.log('Income:', amount)} />
 */
interface IncomeFormProps {
  onSubmit?: (amount: number) => void
}

function IncomeForm({ onSubmit }: IncomeFormProps) {
  const [amount, setAmount] = useState(0)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // バリデーション: 正の数値のみ受け入れ
    if (amount > 0 && onSubmit) {
      onSubmit(amount)
      setAmount(0) // フォームリセット
    }
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
    >
      <IncomeInput value={amount} onChange={setAmount} />
      <Button
        type="submit"
        variant="contained"
        color="success"
        fullWidth
        sx={{
          fontWeight: 'bold',
          py: 1.5,
        }}
      >
        収入を登録
      </Button>
    </Box>
  )
}

export default IncomeForm
