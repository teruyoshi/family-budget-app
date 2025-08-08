import { TransactionForm } from '@/components/common'

/**
 * ExpenseFormコンポーネントのプロパティ
 * @typedef {Object} ExpenseFormProps
 * @property {Function} [onSubmit] - フォーム送信時のコールバック関数
 */
interface ExpenseFormProps {
  onSubmit?: (amount: number, date: string) => void
}

/**
 * 支出登録フォームコンポーネント
 *
 * 支出金額の入力から登録までを担当するコンテナコンポーネントです。
 * TransactionFormを使用して共通のフォーム構造とバリデーションを提供します。
 *
 * @component
 * @param {ExpenseFormProps} props - コンポーネントのプロパティ
 * @param {Function} [props.onSubmit] - フォーム送信時のコールバック関数(amount: number, date: string) => void
 *
 * @returns {JSX.Element} 支出登録フォームUI
 *
 * @example
 * ```tsx
 * // 基本的な使用例
 * <ExpenseForm onSubmit={(amount, date) => {
 *   console.log('支出登録:', amount, date);
 * }} />
 *
 * // 状態管理と組み合わせ
 * <ExpenseForm onSubmit={actions.addExpense} />
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
