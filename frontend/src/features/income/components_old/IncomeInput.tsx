import AmountInput from '../../../components/common_old/AmountInput'

/**
 * 収入金額入力コンポーネントのProps型定義
 */
export interface IncomeInputProps {
  /** 現在の入力値 */
  value: number
  /** 値変更時のコールバック関数 */
  onChange: (value: number) => void
  /** 入力欄のプレースホルダー */
  placeholder?: string
}

/**
 * AmountInputをベースにした収入金額入力コンポーネント
 *
 * @component
 * @example
 * <IncomeInput
 *   value={incomeAmount}
 *   onChange={setIncomeAmount}
 *   placeholder="収入金額を入力"
 * />
 */

export default function IncomeInput({
  value,
  onChange,
  placeholder = '収入金額を入力',
}: IncomeInputProps) {
  return (
    <AmountInput placeholder={placeholder} value={value} onChange={onChange} />
  )
}
