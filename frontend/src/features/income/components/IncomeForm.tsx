import { TransactionForm } from '@/components/common'

/**
 * 収入登録フォームコンポーネントのProps型定義
 */
export interface IncomeFormProps {
  /** フォーム送信時のコールバック関数 */
  onSubmit?: (amount: number, date: string) => void
}

/**
 * TransactionFormを使用した収入登録フォームコンポーネント
 *
 * @component
 * @example
 * <IncomeForm onSubmit={(amount, date) => addIncome(amount, date)} />
 */

export default function IncomeForm({ onSubmit }: IncomeFormProps) {
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
