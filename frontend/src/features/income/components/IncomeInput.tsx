import AmountInput from '../../../components/common/AmountInput'

/**
 * IncomeInputコンポーネントのプロパティ
 * @typedef {Object} IncomeInputProps
 * @property {number} value - 現在の入力値（数値）
 * @property {Function} onChange - 値変更時のコールバック関数
 * @property {string} [placeholder] - 入力欄のプレースホルダーテキスト
 */
interface IncomeInputProps {
  value: number
  onChange: (value: number) => void
  placeholder?: string
}

/**
 * 収入金額専用入力コンポーネント
 *
 * AmountInputをベースにした収入金額入力に特化したコンポーネントです。
 * 入力中にカンマ区切り表示され、数値として管理されます。
 *
 * @component
 * @param {IncomeInputProps} props - コンポーネントのプロパティ
 * @param {number} props.value - 現在の入力値
 * @param {Function} props.onChange - 値変更時のコールバック関数
 * @param {string} [props.placeholder] - プレースホルダーテキスト
 *
 * @returns {JSX.Element} 収入金額入力UI
 *
 * @example
 * ```tsx
 * const [incomeAmount, setIncomeAmount] = useState(0);
 *
 * <IncomeInput
 *   value={incomeAmount}
 *   onChange={setIncomeAmount}
 *   placeholder="50000"
 * />
 * ```
 */

function IncomeInput({
  value,
  onChange,
  placeholder = '収入金額を入力',
}: IncomeInputProps) {
  return (
    <AmountInput placeholder={placeholder} value={value} onChange={onChange} />
  )
}

export default IncomeInput
