import { HistoryList } from './common'
import type { Expense } from '@/hooks'

interface ExpenseHistoryProps {
  expenses: Expense[]
}

/**
 * 支出履歴コンポーネント
 *
 * 支出データのリストを時系列順（降順）で表示します。
 * 各支出項目は金額と日時を表示し、視覚的に分かりやすい形で提示します。
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