import { TransactionForm } from '@/components/common'

/**
 * IncomeFormコンポーネントのプロパティ
 * @typedef {Object} IncomeFormProps
 * @property {Function} [onSubmit] - フォーム送信時のコールバック関数
 */
interface IncomeFormProps {
  onSubmit?: (amount: number, date: string) => void
}

/**
 * 収入登録フォームコンポーネント
 *
 * 収入金額の入力から登録までを担当するコンテナコンポーネントです。
 * TransactionFormを使用して共通のフォーム構造とバリデーションを提供します。
 *
 * @group 収入機能
 * @component
 * @param {IncomeFormProps} props - コンポーネントのプロパティ
 * @param {Function} [props.onSubmit] - フォーム送信時のコールバック関数(amount: number, date: string) => void
 *
 * @returns {JSX.Element} 収入登録フォームUI
 *
 * @example
 * ```tsx
 * // 基本的な使用例
 * <IncomeForm onSubmit={(amount, date) => {
 *   console.log('収入登録:', amount, date);
 * }} />
 *
 * // 状態管理と組み合わせ
 * <IncomeForm onSubmit={actions.addIncome} />
 * ```
 */

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
