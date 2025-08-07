import {
  ListItem,
  ListItemText,
  Chip,
  Box,
  Typography,
} from '@mui/material'
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
 * カテゴリラベルと色を指定することで、支出・収入両方に対応します。
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
      <Box sx={{ textAlign: 'right' }}>
        <AmountText 
          amount={item.amount} 
          variant="h6" 
          sx={{ color: `${color}.main`, fontWeight: 'bold' }}
        />
        <Typography 
          variant="caption" 
          sx={{ display: 'block', color: 'text.secondary', mt: 0.5 }}
        >
          {item.timestamp}
        </Typography>
      </Box>
    </ListItem>
  )
}