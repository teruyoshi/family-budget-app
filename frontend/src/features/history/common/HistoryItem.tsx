import { ListItem, ListItemText, Chip } from '@mui/material'
import { AmountText } from '@/components/common'
import type { Expense } from '@/hooks'

interface HistoryItemProps {
  item: Expense
  label: string
  color: 'warning' | 'success'
}

/**
 * 履歴アイテムコンポーネント
 *
 * 支出・収入履歴の個別アイテムを表示する共通コンポーネントです。
 * 日付はセクションヘッダーで表示されるため、個別アイテムには日付を表示しません。
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
