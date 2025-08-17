import { useEffect, useState } from 'react'

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
 * 金額状態管理フック
 *
 * 純粋な数値状態のみを管理する軽量フックです。
 * フォーマット処理は別ファイルのuseMoneyFormatフックと組み合わせて使用します。
 *
 * ## 特徴
 * - 単一責任: 数値状態管理のみに専念
 * - 軽量: フォーマット処理によるリレンダー影響なし
 * - 組み合わせ可能: 別ファイルのuseMoneyFormatフックと自由に組み合わせ
 *
 * @param initialValue 初期金額の数値
 * @returns [現在値, 更新関数] のタプル
 *
 * @example
 * ```tsx
 * import useMoney from './useMoney'
 * import useMoneyFormat from './useMoneyFormat'
 *
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
