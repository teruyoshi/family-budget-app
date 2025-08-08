import { ListItem, ListItemText, Chip } from '@mui/material'
import { AmountText } from '@/components/common'
import type { Expense } from '@/hooks'

/**
 * HistoryItemコンポーネントのプロパティ
 * @typedef {Object} HistoryItemProps
 * @property {Expense} item - 表示するデータアイテム
 * @property {string} label - アイテムのラベル（例: "支出"、"収入"）
 * @property {'warning' | 'success'} color - 表示カラー（warning: 支出、success: 収入）
 */
interface HistoryItemProps {
  item: Expense
  label: string
  color: 'warning' | 'success'
}

/**
 * 履歴アイテムコンポーネント
 *
 * 支出・収入履歴の個別アイテムを表示する共通コンポーネントです。
 * 左側にラベルチップ、右側に金額を表示し、日付はグループヘッダーで管理されます。
 *
 * @component
 * @param {HistoryItemProps} props - コンポーネントのプロパティ
 * @param {Expense} props.item - 表示するデータアイテム
 * @param {string} props.label - アイテムのラベル
 * @param {'warning' | 'success'} props.color - 表示カラー
 *
 * @returns {JSX.Element} 履歴アイテムUI
 *
 * @example
 * ```tsx
 * const expenseItem = {
 *   id: '1',
 *   amount: 1500,
 *   timestamp: '2024/01/15(月)'
 * };
 *
 * <HistoryItem
 *   item={expenseItem}
 *   label="支出"
 *   color="warning"
 * />
 * ```
 */
export function HistoryItem({ item, label, color }: HistoryItemProps) {
  return (
    <ListItem
      sx={{
        border: 1,
        borderColor: 'divider',
        borderRadius: 1,
        mb: 1,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <ListItemText
        primary={<Chip label={label} color={color} size="small" />}
      />
      <AmountText
        amount={item.amount}
        variant="h6"
        sx={{ color: `${color}.main`, fontWeight: 'bold' }}
      />
    </ListItem>
  )
}
