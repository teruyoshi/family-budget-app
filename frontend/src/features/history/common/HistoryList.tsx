import {
  Paper,
  Typography,
  List,
  ListSubheader,
  Divider,
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
 * アイテムを日付でグループ化して表示します。
 */
export function HistoryList({ items, title, itemLabel, itemColor }: HistoryListProps) {
  if (items.length === 0) {
    return null
  }

  // 日付でアイテムをグループ化
  const groupedItems = items.reduce((groups, item) => {
    const date = item.timestamp
    if (!groups[date]) {
      groups[date] = []
    }
    groups[date].push(item)
    return groups
  }, {} as Record<string, Expense[]>)

  // 日付を降順でソート
  const sortedDates = Object.keys(groupedItems).sort((a, b) => {
    // "2025/01/15(水)" のような形式から日付部分を抽出して比較
    const dateA = new Date(a.split('(')[0])
    const dateB = new Date(b.split('(')[0])
    return dateB.getTime() - dateA.getTime()
  })

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
      {sortedDates.map((date, index) => (
        <div key={date}>
          {index > 0 && <Divider sx={{ my: 2 }} />}
          <ListSubheader
            component="div"
            sx={{ 
              bgcolor: 'transparent',
              fontWeight: 'bold',
              fontSize: '0.9rem',
              color: 'text.primary',
              px: 0,
              py: 1,
            }}
          >
            {date}
          </ListSubheader>
          <List sx={{ pt: 0 }}>
            {groupedItems[date].map((item) => (
              <HistoryItem 
                key={item.id}
                item={item}
                label={itemLabel}
                color={itemColor}
              />
            ))}
          </List>
        </div>
      ))}
    </Paper>
  )
}