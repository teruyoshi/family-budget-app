import { TransactionForm } from '@/components/common'

interface ExpenseFormProps {
  onSubmit?: (amount: number, date: string) => void
}

/**
 * 支出登録フォームコンポーネント
 * TransactionFormを使用して共通のフォーム構造とバリデーションを提供します。
 *
 * @group 支出機能
 *
 * @example
 * ```tsx
 * <ExpenseForm onSubmit={(amount, date) => {
 *   console.log('支出登録:', amount, date);
 * }} />
 * ```
 */

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
