/**
 * hooks/ ディレクトリのバレルエクスポート（最小版）
 *
 * AmountInput等のUIコンポーネントに必要な最小限のフックのみを提供。
 * routes.tsx依存を避けて循環依存を防止します。
 */

// 金額関連フック（routes.tsx依存なし）
export { default as useMoney, type UseMoneyReturn } from './useMoney'
export {
  default as useMoneyFormat,
  type UseMoneyFormatReturn,
} from './useMoneyFormat'

// 型定義のみエクスポート（実装は移行済み）
export type { Expense, Income } from '@/types'