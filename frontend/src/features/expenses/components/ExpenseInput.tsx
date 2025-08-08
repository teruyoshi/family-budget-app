import AmountInput from '../../../components/common/AmountInput'

/**
 * ExpenseInputコンポーネントのプロパティ
 * @typedef {Object} ExpenseInputProps
 * @property {number} value - 現在の入力値（数値）
 * @property {Function} onChange - 値変更時のコールバック関数
 * @property {string} [placeholder] - 入力欄のプレースホルダーテキスト
 */
interface ExpenseInputProps {
  value: number
  onChange: (value: number) => void
  placeholder?: string
}

/**
 * 支出金額専用入力コンポーネント
 *
 * AmountInputをベースにした支出金額入力に特化したコンポーネントです。
 * 入力中にカンマ区切り表示され、数値として管理されます。
 *
 * @component
 * @param {ExpenseInputProps} props - コンポーネントのプロパティ
 * @param {number} props.value - 現在の入力値
 * @param {Function} props.onChange - 値変更時のコールバック関数
 * @param {string} [props.placeholder] - プレースホルダーテキスト
 *
 * @returns {JSX.Element} 支出金額入力UI
 *
 * @example
 * ```tsx
 * const [expenseAmount, setExpenseAmount] = useState(0);
 *
 * <ExpenseInput
 *   value={expenseAmount}
 *   onChange={setExpenseAmount}
 *   placeholder="1000"
 * />
 * ```
 */

function ExpenseInput({
  value,
  onChange,
  placeholder = '支出金額を入力',
}: ExpenseInputProps) {
  return (
    <AmountInput placeholder={placeholder} value={value} onChange={onChange} />
  )
}

export default ExpenseInput
