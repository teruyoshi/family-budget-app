import { useState, useEffect, useMemo } from 'react'

/**
 * 金額状態の戻り値型定義
 * 
 * 金額の現在値とフォーマット済み表示文字列、更新関数をタプルで返します。
 */
export type UseMoneyReturn = [
  { formatted: string; value: number },
  (amount: number) => void,
]

/**
 * 金額状態管理フック
 *
 * 金額の数値状態を管理し、¥記号付きカンマ区切りフォーマットを提供します。
 * 入力フォームや表示コンポーネントでの金額処理を統一化します。
 *
 * ## 特徴
 * - リアルタイムフォーマット: 数値変更時に自動で¥1,000形式に変換
 * - ゼロ値処理: 0や無効値は空文字で表示（入力UI向け）
 * - 負値処理: 負の値は空文字で表示（支出・収入は正値のみ）
 * - メモ化最適化: 同じ値でのリレンダー抑制
 *
 * @param initialValue 初期金額の数値
 * @returns [金額データオブジェクト, 金額更新関数] のタプル
 * 
 * @example
 * ```tsx
 * const [money, setMoney] = useMoney(15000)
 * console.log(money.formatted) // "¥15,000"
 * console.log(money.value)     // 15000
 * setMoney(25000) // 金額を更新
 * ```
 */
export default function useMoney(initialValue: number): UseMoneyReturn {
  const [money, setMoney] = useState<number>(initialValue)

  /**
   * 金額を¥記号付きカンマ区切り形式にフォーマット
   * ゼロ・無効値・負値は空文字を返す（入力UI向け）
   */
  const formatMoney = (value: number): string => {
    if (isNaN(value) || value === 0 || value == null || value < 0) return ''
    return `¥${value.toLocaleString()}`
  }

  // 初期値変更時の同期
  useEffect(() => {
    setMoney(initialValue)
  }, [initialValue])

  // フォーマット結果のメモ化（パフォーマンス最適化）
  const formatted = useMemo(() => formatMoney(money), [money])

  return [{ formatted, value: money }, setMoney]
}
