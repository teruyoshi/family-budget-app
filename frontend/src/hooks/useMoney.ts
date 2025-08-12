import { useState, useEffect, useMemo } from 'react'
import { formatMoneyForInput, formatMoneyForDisplay } from '@/lib/format'

/**
 * 金額状態管理フックの戻り値型定義
 *
 * 純粋な数値状態管理のみを担当し、フォーマット処理は分離されたuseMoneyFormatフックが担当します。
 * 単一責任原則に従い、状態管理とフォーマット処理を分離することで保守性を向上させます。
 *
 * @example
 * ```typescript
 * const [money, setMoney] = useMoney(15000)
 * console.log(money) // 15000
 *
 * setMoney(25000)
 * console.log(money) // 25000
 * ```
 */
export type UseMoneyReturn = [
  /** 現在の金額数値 */
  number,
  /** 金額更新関数（数値のみ受け付け） */
  (amount: number) => void,
]

/**
 * 金額フォーマットフックの戻り値型定義
 *
 * 数値から各種フォーマット済み文字列を生成します。
 * lib/formatライブラリを活用して用途別の最適なフォーマットを提供します。
 *
 * @example
 * ```typescript
 * const formatted = useMoneyFormat(15000)
 * console.log(formatted.forInput)   // "¥15,000"
 * console.log(formatted.forDisplay) // "¥15,000"
 * ```
 */
export type UseMoneyFormatReturn = {
  /** 入力UI向けフォーマット済み文字列（ゼロ・負値は空文字） */
  forInput: string
  /** 表示専用フォーマット済み文字列（全値表示） */
  forDisplay: string
}

/**
 * 金額状態管理フック
 *
 * 純粋な数値状態のみを管理する軽量フックです。
 * フォーマット処理はuseMoneyFormatフックと組み合わせて使用します。
 *
 * ## 特徴
 * - 単一責任: 数値状態管理のみに専念
 * - 軽量: フォーマット処理によるリレンダー影響なし
 * - 組み合わせ可能: useMoneyFormatフックと自由に組み合わせ
 *
 * @param initialValue 初期金額の数値
 * @returns [現在値, 更新関数] のタプル
 *
 * @example
 * ```tsx
 * const [money, setMoney] = useMoney(15000)
 * const formatted = useMoneyFormat(money)
 *
 * console.log(money)                // 15000
 * console.log(formatted.forInput)   // "¥15,000"
 * console.log(formatted.forDisplay) // "¥15,000"
 *
 * setMoney(0)
 * console.log(formatted.forInput)   // "" (入力UI向けは空文字)
 * console.log(formatted.forDisplay) // "¥0" (表示専用は全値表示)
 * ```
 */
export default function useMoney(initialValue: number): UseMoneyReturn {
  const [money, setMoney] = useState<number>(initialValue)

  // 初期値変更時の状態同期
  useEffect(() => {
    setMoney(initialValue)
  }, [initialValue])

  return [money, setMoney]
}

/**
 * 金額フォーマット専用フック
 *
 * 数値から各種用途向けのフォーマット済み文字列を生成します。
 * lib/formatライブラリを活用してパフォーマンスを最適化しています。
 *
 * ## 特徴
 * - フォーマット専用: 状態は持たず、フォーマット処理のみ担当
 * - 用途別最適化: 入力UI向け・表示専用の2パターンを提供
 * - メモ化最適化: フォーマット結果をメモ化してリレンダー抑制
 * - 統一ライブラリ: lib/format内の関数を活用して一貫性保証
 *
 * @param value フォーマット対象の数値
 * @returns 用途別フォーマット済み文字列オブジェクト
 *
 * @example
 * ```tsx
 * const [money] = useMoney(15000)
 * const formatted = useMoneyFormat(money)
 *
 * // 入力UI向け（ゼロ・負値は空文字）
 * <input value={formatted.forInput} />
 *
 * // 表示専用（全値表示）
 * <span>{formatted.forDisplay}</span>
 * ```
 */
export function useMoneyFormat(value: number): UseMoneyFormatReturn {
  // 入力UI向けフォーマット（ゼロ・負値は空文字）
  const forInput = useMemo(() => formatMoneyForInput(value), [value])

  // 表示専用フォーマット（全値表示）
  const forDisplay = useMemo(() => formatMoneyForDisplay(value), [value])

  // オブジェクト全体をメモ化してパフォーマンス最適化
  return useMemo(() => ({ forInput, forDisplay }), [forInput, forDisplay])
}
