import { useState, useEffect, useMemo } from 'react'

export type UseAmountReturn = [
  { formatted: string; value: number },
  (amount: number) => void,
]

/**
 * 金額フォーマット用カスタムフック
 *
 * 数値を¥1,000形式の文字列に自動変換し、リアルタイム更新します。
 * 0や無効値は空文字として扱います。
 *
 * @param initialAmount 初期金額
 * @returns [金額オブジェクト, 更新関数]
 */
export default function useAmount(initialAmount: number): UseAmountReturn {
  const [amount, setAmount] = useState<number>(initialAmount)

  const formatCurrency = (value: number): string => {
    if (isNaN(value) || value === 0 || value == null || value < 0) return ''
    return `¥${value.toLocaleString()}`
  }

  useEffect(() => {
    setAmount(initialAmount)
  }, [initialAmount])

  const formattedAmount = useMemo(() => formatCurrency(amount), [amount])

  return [{ formatted: formattedAmount, value: amount }, setAmount]
}
