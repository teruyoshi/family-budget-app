import { TransactionForm } from '@/components/common'

/**
 * 支出登録フォームコンポーネントのProps型定義
 */
export interface ExpenseFormProps {
  /** フォーム送信時のコールバック関数 */
  onSubmit?: (amount: number, date: string) => void
}

/**
 * TransactionFormを使用した支出登録フォームコンポーネント
 *
 * @component
 * @example
 * <ExpenseForm onSubmit={(amount, date) => addExpense(amount, date)} />
 */

export default function ExpenseForm({ onSubmit }: ExpenseFormProps) {
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
