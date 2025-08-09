import { HistoryList } from './common'
import type { Expense } from '@/hooks'

interface IncomeHistoryProps {
  incomes: Expense[]
}

/**
 * 収入履歴コンポーネント
 * 収入データを日付グループ化して時系列降順で表示します。
 *
 * @group 履歴機能
 *
 * @example
 * ```tsx
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

export default IncomeHistory
