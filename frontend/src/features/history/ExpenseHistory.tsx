import { HistoryList } from './common_old'
import type { Expense } from '@/hooks'

/**
 * 支出履歴コンポーネントのProps型定義
 */
export interface ExpenseHistoryProps {
  /** 表示する支出データの配列 */
  expenses: Expense[]
}

/**
 * 支出データを日付グループ化して表示するコンポーネント
 *
 * @component
 * @example
 * <ExpenseHistory expenses={expenses} />
 */
export default function ExpenseHistory({ expenses }: ExpenseHistoryProps) {
  return (
    <HistoryList
      items={expenses}
      title="支出履歴"
      itemLabel="支出"
      itemColor="warning"
    />
  )
}
