import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Chip,
} from '@mui/material'
import { AmountText } from '@/components/common'
import type { Expense } from '@/hooks'

interface IncomeHistoryProps {
  incomes: Expense[]
}

/**
 * 収入履歴コンポーネント
 *
 * 収入データのリストを時系列順（降順）で表示します。
 * 各収入項目は金額と日時を表示し、視覚的に分かりやすい形で提示します。
 */
export function IncomeHistory({ incomes }: IncomeHistoryProps) {
  if (incomes.length === 0) {
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
        収入履歴
      </Typography>
      <List>
        {incomes.map((income) => (
          <ListItem
            key={income.id}
            sx={{
              border: 1,
              borderColor: 'divider',
              borderRadius: 1,
              mb: 1,
            }}
          >
            <ListItemText
              primary={<AmountText variant="h6">{income.amount}</AmountText>}
              secondary={income.timestamp}
            />
            <Chip label="収入" color="success" size="small" />
          </ListItem>
        ))}
      </List>
    </Paper>
  )
}
