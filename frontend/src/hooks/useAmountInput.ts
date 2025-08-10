import { useState, useEffect, useMemo } from 'react'

/**
 * useAmountInputの返り値型定義
 */
export type UseAmountInputReturn = [
  /** 金額オブジェクト：{フォーマット済み文字列, 数値} */
  { amount: string; numericAmount: number },
  /** 数値での金額設定関数 */
  (value: number) => void
]

/**
 * 金額入力フォーマット用カスタムフック
 *
 * 数値を受け取り、フォーマットされた金額表示文字列と値更新関数を返します。
 * AmountInputコンポーネントの金額フォーマット処理ロジックを抽象化したフックです。
 *
 * ## 特徴
 * - 数値を¥記号付きカンマ区切り文字列に自動変換
 * - 0や無効値は空文字として処理
 * - リアルタイムでフォーマット表示を更新
 *
 * ## 使用例
 *
 * ### 基本的な使用例
 * ```tsx
 * const [{ amount, numericAmount }, setAmount] = useAmountInput(0)
 * 
 * return (
 *   <div>
 *     <span>表示: {amount}</span>
 *     <span>数値: {numericAmount}</span>
 *     <button onClick={() => setAmount(15000)}>
 *       15000円に設定
 *     </button>
 *   </div>
 * )
 * ```
 *
 * ### フォーム入力での使用例
 * ```tsx
 * const [{ amount: expenseDisplay, numericAmount: expense }, setExpense] = useAmountInput(0)
 * 
 * const handleSubmit = () => {
 *   // expense変数で数値を直接使用
 *   console.log('支出:', expense)
 * }
 * ```
 *
 * @param initialValue 初期金額（数値）
 * @returns [金額オブジェクト, 値更新関数] のタプル
 */
export default function useAmountInput(initialValue: number): UseAmountInputReturn {
  const [numericValue, setNumericValue] = useState<number>(initialValue)

  /**
   * 数値を¥1,000形式の文字列に変換
   * @param num 変換する数値
   * @returns フォーマット済み文字列（0やNaNは空文字）
   */
  const formatNumber = (num: number): string => {
    // NaN、undefined、null、0の場合は空文字を返す
    if (isNaN(num) || num === 0 || num == null) return ''
    // 負の値も空文字として扱う
    if (num < 0) return ''
    return `¥${num.toLocaleString()}`
  }

  /**
   * 初期値が変更された時に数値を更新
   */
  useEffect(() => {
    setNumericValue(initialValue)
  }, [initialValue])

  /**
   * 数値での値更新関数
   * @param value 設定する数値
   */
  const setValue = (value: number) => {
    setNumericValue(value)
  }

  /**
   * 数値から計算されるフォーマット済み表示文字列
   */
  const displayValue = useMemo(() => formatNumber(numericValue), [numericValue])

  return [{ amount: displayValue, numericAmount: numericValue }, setValue]
}