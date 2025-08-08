import { HistoryList } from './common'
import type { Expense } from '@/hooks'

/**
 * IncomeHistoryコンポーネントのプロパティ
 * @typedef {Object} IncomeHistoryProps
 * @property {Expense[]} incomes - 表示する収入データの配列（型はExpenseと同じ構造）
 */
interface IncomeHistoryProps {
  incomes: Expense[]
}

/**
 * 収入履歴コンポーネント
 *
 * 収入データのリストを日付グループ化して時系列順（降順）で表示します。
 * 各収入項目は成功カラー（グリーン）で表示され、金額とラベルが含まれます。
 *
 * @component
 * @param {IncomeHistoryProps} props - コンポーネントのプロパティ
 * @param {Expense[]} props.incomes - 表示する収入データの配列（Income型と同構造）
 *
 * @returns {JSX.Element} 収入履歴表示UI
 *
 * @example
 * ```tsx
 * const incomes = [
 *   { id: '1', amount: 50000, timestamp: '2024/01/01(月)' },
 *   { id: '2', amount: 5000, timestamp: '2024/01/15(月)' }
 * ];
 *
 * <IncomeHistory incomes={incomes} />
 * ```
 */
export function IncomeHistory({ incomes }: IncomeHistoryProps) {
  return (
    <HistoryList
      items={incomes}
      title="収入履歴"
      itemLabel="収入"
      itemColor="success"
    />
  )
}
