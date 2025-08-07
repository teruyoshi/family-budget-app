import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Chip,
  Box,
} from '@mui/material'
import { AmountText } from '@/components/common'
import type { Expense } from '@/hooks'

interface ExpenseHistoryProps {
  expenses: Expense[]
}

/**
 * 支出履歴コンポーネント
 *
 * 支出データのリストを時系列順（降順）で表示します。
 * 各支出項目は金額と日時を表示し、視覚的に分かりやすい形で提示します。
 */
export function ExpenseHistory({ expenses }: ExpenseHistoryProps) {
  if (expenses.length === 0) {
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
        支出履歴
      </Typography>
      <List>
        {expenses.map((expense) => (
          <ListItem
            key={expense.id}
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
              primary={<Chip label="支出" color="warning" size="small" />}
            />
            <Box sx={{ textAlign: 'right' }}>
              <AmountText 
                amount={expense.amount} 
                variant="h6" 
                sx={{ color: 'warning.main', fontWeight: 'bold' }}
              />
              <Typography 
                variant="caption" 
                sx={{ display: 'block', color: 'text.secondary', mt: 0.5 }}
              >
                {expense.timestamp}
              </Typography>
            </Box>
          </ListItem>
        ))}
      </List>
    </Paper>
  )
}