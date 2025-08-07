import TextInput from '../../../components/common/TextInput'

/**
 * 支出金額専用入力コンポーネント
 * 
 * 数値のみ入力可能な支出金額入力に特化したコンポーネントです。
 * リアルタイムバリデーションにより、不正な入力を防止します。
 * 
 * 機能:
 * - 数値のみ入力許可（正規表現バリデーション）
 * - 小数点サポート（例: 1250.50）
 * - リアルタイム入力制御
 * 
 * @example
 * <ExpenseInput 
 *   value={amount} 
 *   onChange={setAmount} 
 *   placeholder="1000" 
 * />
 */
interface ExpenseInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

function ExpenseInput({
  value,
  onChange,
  placeholder = '支出金額を入力',
}: ExpenseInputProps) {
  const handleChange = (inputValue: string) => {
    // 入力バリデーション: 数値のみ許可（小数点を含む）
    // 空文字列または数値パターン（例: "123", "12.34", ".5"）のみ受け入れ
    if (inputValue === '' || /^\d*\.?\d*$/.test(inputValue)) {
      onChange(inputValue)
    }
  }

  return (
    <TextInput
      type="number"
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
    />
  )
}

export default ExpenseInput
