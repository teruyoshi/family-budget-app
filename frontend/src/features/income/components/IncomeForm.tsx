import { TransactionForm } from '@/components/common'

interface IncomeFormProps {
  onSubmit?: (amount: number, date: string) => void
}

/**
 * 収入登録フォームコンポーネント
 * TransactionFormを使用して共通のフォーム構造とバリデーションを提供します。
 *
 * @group 収入機能
 *
 * @example
 * ```tsx
 * <IncomeForm onSubmit={(amount, date) => {
 *   console.log('収入登録:', amount, date);
 * }} />
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
