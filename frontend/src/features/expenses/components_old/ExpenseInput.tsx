import AmountInput from '../../../components/common/AmountInput'

/**
 * 支出金額入力コンポーネントのProps型定義
 */
export interface ExpenseInputProps {
  /** 現在の入力値 */
  value: number
  /** 値変更時のコールバック関数 */
  onChange: (value: number) => void
  /** 入力欄のプレースホルダー */
  placeholder?: string
}

/**
 * AmountInputをベースにした支出金額入力コンポーネント
 *
 * @component
 * @example
 * <ExpenseInput
 *   value={expenseAmount}
 *   onChange={setExpenseAmount}
 *   placeholder="支出金額を入力"
 * />
 */

export default function ExpenseInput({
  value,
  onChange,
  placeholder = '支出金額を入力',
}: ExpenseInputProps) {
  return (
    <AmountInput placeholder={placeholder} value={value} onChange={onChange} />
  )
}
