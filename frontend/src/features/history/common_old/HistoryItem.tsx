import { Chip, ListItem, ListItemText } from '@mui/material'
import { AmountText } from '@/components/common_old'
import type { Expense } from '@/hooks'

/**
 * 履歴アイテムコンポーネントのProps型定義
 */
export interface HistoryItemProps {
  /** 表示するアイテム（支出・収入）データ */
  item: Expense
  /** 表示するラベル（"支出"または"収入"） */
  label: string
  /** チップの色設定 */
  color: 'warning' | 'success'
}

/**
 * 支出・収入履歴の個別アイテム表示コンポーネント
 *
 * @component
 * @example
 * <HistoryItem
 *   item={expenseItem}
 *   label="支出"
 *   color="warning"
 * />
 */
export default function HistoryItem({ item, label, color }: HistoryItemProps) {
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
