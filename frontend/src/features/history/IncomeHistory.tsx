import { HistoryList } from './common'
import type { Expense } from '@/hooks'

/**
 * 収入履歴コンポーネントのProps型定義
 */
export interface IncomeHistoryProps {
  /** 表示する収入データの配列 */
  incomes: Expense[]
}

/**
 * 収入データを日付グループ化して表示するコンポーネント
 *
 * @component
 * @example
 * <IncomeHistory incomes={incomes} />
 */
export default function IncomeHistory({ incomes }: IncomeHistoryProps) {
  return (
    <HistoryList
      items={incomes}
      title="収入履歴"
      itemLabel="収入"
      itemColor="success"
    />
  )
}
