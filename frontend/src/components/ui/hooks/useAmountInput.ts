import { useMoney, useMoneyFormat } from '@/hooks'
import { parseMoneyString } from '@/lib/format'

/**
 * 金額入力処理のカスタムフック
 *
 * 金額入力フィールドの状態管理と入力処理を提供する。
 * 数値とフォーマット済み表示の相互変換を自動化。
 *
 * @param value 初期金額
 * @param onChange 金額変更時のコールバック
 * @returns 金額入力処理に必要な値と関数
 */
export function useAmountInput(
  value: number = 0,
  onChange?: (value: number) => void
) {
  const [money, setMoney] = useMoney(value)
  const amount = useMoneyFormat(money).forInput

  const handleChange = (inputValue: string) => {
    try {
      const numericValue = parseMoneyString(inputValue)
      setMoney(numericValue)
      onChange?.(numericValue)
    } catch (error) {
      console.warn('AmountInput: 無効な入力値:', inputValue, error)
    }
  }

  return {
    amount,
    handleChange,
  }
}
