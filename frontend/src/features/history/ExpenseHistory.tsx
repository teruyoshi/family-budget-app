import { HistoryList } from './common'
import type { Expense } from '@/hooks'

/**
 * ExpenseHistoryコンポーネントのプロパティ
 * @typedef {Object} ExpenseHistoryProps
 * @property {Expense[]} expenses - 表示する支出データの配列
 */
interface ExpenseHistoryProps {
  expenses: Expense[]
}

/**
 * 支出履歴コンポーネント
 *
 * 支出データのリストを日付グループ化して時系列順（降順）で表示します。
 * 各支出項目は警告カラーで表示され、金額とラベルが含まれます。
 *
 * @component
 * @param {ExpenseHistoryProps} props - コンポーネントのプロパティ
 * @param {Expense[]} props.expenses - 表示する支出データの配列
 *
 * @returns {JSX.Element} 支出履歴表示UI
 *
 * @example
 * ```tsx
 * const expenses = [
 *   { id: '1', amount: 1500, timestamp: '2024/01/15(月)' },
 *   { id: '2', amount: 800, timestamp: '2024/01/15(月)' }
 * ];
 *
 * <ExpenseHistory expenses={expenses} />
 * ```
 */
export function ExpenseHistory({ expenses }: ExpenseHistoryProps) {
  return (
    <HistoryList
      items={expenses}
      title="支出履歴"
      itemLabel="支出"
      itemColor="warning"
    />
  )
}
