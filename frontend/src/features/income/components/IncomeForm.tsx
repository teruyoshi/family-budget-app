import { TransactionForm } from '@/components/common'

/**
 * 収入登録フォームコンポーネント
 *
 * 収入金額の入力から登録までを担当するコンテナコンポーネントです。
 * TransactionFormを使用して共通のフォーム構造を提供します。
 *
 * 機能:
 * - 収入金額の状態管理（TransactionFormに委譲）
 * - 収入日付の状態管理（TransactionFormに委譲）
 * - フォーム送信時のバリデーション（TransactionFormに委譲）
 * - 送信後のフォームリセット（TransactionFormに委譲）
 *
 * @example
 * <IncomeForm onSubmit={(amount, date) => console.log('Income:', amount, date)} />
 */
interface IncomeFormProps {
  onSubmit?: (amount: number, date: string) => void
}

function IncomeForm({ onSubmit }: IncomeFormProps) {
  const handleSubmit = (amount: number, date: string) => {
    if (onSubmit) {
      onSubmit(amount, date)
    }
  }

  return (
    <TransactionForm
      placeholder="収入金額を入力"
      buttonText="収入を登録"
      buttonColor="success"
      datePickerLabel="収入日付"
      onSubmit={handleSubmit}
    />
  )
}

export default IncomeForm
