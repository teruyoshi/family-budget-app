import { HistoryList } from './common'
import type { Expense } from '@/hooks'

interface ExpenseHistoryProps {
  expenses: Expense[]
}

/**
 * 支出履歴コンポーネント
 * 支出データを日付グループ化して時系列降順で表示します。
 *
 * @group 履歴機能
 *
 * @example
 * ```tsx
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

export default ExpenseHistory
