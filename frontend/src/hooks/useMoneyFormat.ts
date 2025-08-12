import { useMemo } from 'react'
import { formatMoneyForInput, formatMoneyForDisplay } from '@/lib/format'

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
export default function useMoneyFormat(value: number): UseMoneyFormatReturn {
  // 入力UI向けフォーマット（ゼロ・負値は空文字）
  const forInput = useMemo(() => formatMoneyForInput(value), [value])

  // 表示専用フォーマット（全値表示）
  const forDisplay = useMemo(() => formatMoneyForDisplay(value), [value])

  // オブジェクト全体をメモ化してパフォーマンス最適化
  return useMemo(() => ({ forInput, forDisplay }), [forInput, forDisplay])
}