import { HistoryList } from './common'
import type { Expense } from '@/hooks'

interface IncomeHistoryProps {
  incomes: Expense[]
}

/**
 * 収入履歴コンポーネント
 *
 * 収入データのリストを時系列順（降順）で表示します。
 * 各収入項目は金額と日時を表示し、視覚的に分かりやすい形で提示します。
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