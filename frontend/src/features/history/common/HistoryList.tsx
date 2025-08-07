import {
  Paper,
  Typography,
  List,
} from '@mui/material'
import { HistoryItem } from './HistoryItem'
import type { Expense } from '@/hooks'

interface HistoryListProps {
  items: Expense[]
  title: string
  itemLabel: string
  itemColor: 'warning' | 'success'
}

/**
 * 履歴リストコンポーネント
 *
 * 支出・収入履歴の共通レイアウトを提供するコンポーネントです。
 * タイトル、アイテムラベル、色を指定することで再利用可能です。
 */
export function HistoryList({ items, title, itemLabel, itemColor }: HistoryListProps) {
  if (items.length === 0) {
    return null
  }

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography
        variant="h5"
        component="h2"
        gutterBottom
        sx={{ mb: 2, fontWeight: 'bold' }}
      >
        {title}
      </Typography>
      <List>
        {items.map((item) => (
          <HistoryItem 
            key={item.id}
            item={item}
            label={itemLabel}
            color={itemColor}
          />
        ))}
      </List>
    </Paper>
  )
}