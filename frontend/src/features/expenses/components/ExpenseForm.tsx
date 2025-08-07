import { TransactionForm } from '@/components/common'

/**
 * 支出登録フォームコンポーネント
 *
 * 支出金額の入力から登録までを担当するコンテナコンポーネントです。
 * TransactionFormを使用して共通のフォーム構造を提供します。
 *
 * 機能:
 * - 支出金額の状態管理（TransactionFormに委譲）
 * - 日付入力機能
 * - フォーム送信時のバリデーション（TransactionFormに委譲）
 * - 送信後のフォームリセット（TransactionFormに委譲）
 *
 * @example
 * <ExpenseForm onSubmit={(amount, date) => console.log('Expense:', amount, date)} />
 */
interface ExpenseFormProps {
  onSubmit?: (amount: number, date: string) => void
}

function ExpenseForm({ onSubmit }: ExpenseFormProps) {
  const handleSubmit = (amount: number, date: string) => {
    if (onSubmit) {
      onSubmit(amount, date)
    }
  }

  return (
    <TransactionForm
      placeholder="支出金額を入力"
      buttonText="支出を登録"
      buttonColor="error"
      datePickerLabel="支出日付"
      onSubmit={handleSubmit}
    />
  )
}

export default ExpenseForm
