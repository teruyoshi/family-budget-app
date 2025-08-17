/**
 * 共通コンポーネントProps型定義
 *
 * 複数のコンポーネントで共通利用されるProps型定義を集約。
 * 再利用性とコンポーネント間の一貫性を向上させます。
 */

import { type Currency } from './common'

/**
 * ページコンポーネント共通Props
 *
 * 全ページコンポーネントで共通利用される基本的なProps型。
 */
export interface PageProps {
  /** ページタイトル（オプション） */
  title?: string
  /** 追加CSSクラス名 */
  className?: string
}

/**
 * 金額表示コンポーネント共通Props
 *
 * AmountText、AmountInputなど金額を扱うコンポーネント用の共通Props型。
 */
export interface AmountDisplayProps {
  /** 表示金額 */
  amount: number
  /** 通貨単位（デフォルト: JPY） */
  currency?: Currency
  /** 符号表示有無（+/- の表示） */
  showSign?: boolean
}