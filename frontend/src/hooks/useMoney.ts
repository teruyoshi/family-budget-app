import { useState, useEffect, useMemo } from 'react'
import { formatMoneyForInput } from '@/lib/format'

/**
 * 金額状態管理フックの戻り値型定義
 *
 * 金額の現在値とフォーマット済み表示文字列、更新関数をタプル形式で返します。
 * 統一されたlib/formatライブラリを使用して一貫したフォーマットを保証します。
 *
 * ## 型構造
 * - `[0]`: 金額データオブジェクト
 *   - `formatted`: 入力UI向けフォーマット済み文字列（ゼロ・負値は空文字）
 *   - `value`: 現在の金額数値（常にnumber型）
 * - `[1]`: 金額更新関数（number型のみ受け付け）
 *
 * @example
 * ```typescript
 * const [moneyData, setMoney] = useMoney(15000)
 * console.log(moneyData.formatted) // "¥15,000"
 * console.log(moneyData.value)     // 15000
 *
 * setMoney(0)
 * console.log(moneyData.formatted) // "" (入力UI向けは空文字)
 * console.log(moneyData.value)     // 0
 * ```
 */
export type UseMoneyReturn = [
  {
    /** 入力UI向けフォーマット済み金額文字列（ゼロ・負値は空文字） */
    formatted: string
    /** 現在の金額数値 */
    value: number
  },
  /** 金額更新関数（数値のみ受け付け） */
  (amount: number) => void,
]

/**
 * 金額状態管理フック
 *
 * 金額の数値状態を管理し、統一されたフォーマットライブラリを使用して¥記号付きカンマ区切りフォーマットを提供します。
 * 入力フォームでの金額処理に特化した設計となっています。
 *
 * ## 特徴
 * - 純粋な状態管理: 数値状態のみを管理し、フォーマット処理はライブラリに委譲
 * - 統一フォーマット: lib/format/formatMoneyForInput を使用（入力UI向け仕様）
 * - ゼロ値処理: 0や無効値は空文字で表示（プレースホルダー表示のため）
 * - 負値処理: 負の値は空文字で表示（支出・収入は正値のみ）
 * - メモ化最適化: フォーマット結果をメモ化してリレンダー抑制
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
 *
 * // ゼロ値は空文字（入力UI向け）
 * setMoney(0)
 * console.log(money.formatted) // ""
 * ```
 */
export default function useMoney(initialValue: number): UseMoneyReturn {
  const [money, setMoney] = useState<number>(initialValue)

  // 初期値変更時の状態同期
  useEffect(() => {
    setMoney(initialValue)
  }, [initialValue])

  // 統一フォーマットライブラリを使用（入力UI向け）
  // フォーマット結果のメモ化でパフォーマンス最適化
  const formatted = useMemo(() => formatMoneyForInput(money), [money])

  return [{ formatted, value: money }, setMoney]
}
