import AmountInput from '../../../components/common/AmountInput'

/**
 * 支出金額専用入力コンポーネント
 *
 * AmountInputをベースにした支出金額入力に特化したコンポーネントです。
 * 入力中にカンマ区切り表示され、数値として管理されます。
 *
 * 機能:
 * - 自動カンマ区切り表示（1000 → 1,000）
 * - 数値のみ入力許可
 * - 値は数値として管理
 *
 * @example
 * <ExpenseInput
 *   value={amount}
 *   onChange={setAmount}
 *   placeholder="1000"
 * />
 */
interface ExpenseInputProps {
  value: number
  onChange: (value: number) => void
  placeholder?: string
}

function ExpenseInput({
  value,
  onChange,
  placeholder = '支出金額を入力',
}: ExpenseInputProps) {
  return (
    <AmountInput
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  )
}

export default ExpenseInput
