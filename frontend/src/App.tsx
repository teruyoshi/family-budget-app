import { useState } from 'react'
import { Container, Paper, Typography, List, ListItem, ListItemText, Chip, Alert } from '@mui/material'
import ExpenseForm from './features/expenses/components/ExpenseForm'

interface Expense {
  id: string
  amount: number
  timestamp: string
}

function App() {
  const [expenses, setExpenses] = useState<Expense[]>([])

  const handleExpenseSubmit = (amount: number) => {
    const newExpense: Expense = {
      id: Date.now().toString(),
      amount,
      timestamp: new Date().toLocaleString('ja-JP')
    }
    setExpenses(prev => [newExpense, ...prev])
  }

  const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0)

  return (
    <Container
      maxWidth="md"
      sx={{
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        py: 4,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          mb: 4,
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{
            textAlign: 'center',
            fontWeight: 'bold',
            mb: 3,
          }}
        >
          家計簿アプリ（デモ）
        </Typography>

        <Alert severity="info" sx={{ mb: 3 }}>
          GitHub Pagesデモ版です。データはブラウザのメモリに保存されます。
        </Alert>

        <ExpenseForm onSubmit={handleExpenseSubmit} />
        
        {totalAmount > 0 && (
          <Typography
            variant="h6"
            sx={{
              mt: 3,
              textAlign: 'center',
              color: 'primary.main',
              fontWeight: 'bold',
            }}
          >
            合計支出: ¥{totalAmount.toLocaleString()}
          </Typography>
        )}
      </Paper>

      {expenses.length > 0 && (
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
                }}
              >
                <ListItemText
                  primary={
                    <Typography variant="h6" color="text.primary">
                      ¥{expense.amount.toLocaleString()}
                    </Typography>
                  }
                  secondary={expense.timestamp}
                />
                <Chip
                  label="支出"
                  color="warning"
                  size="small"
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Container>
  )
}

export default App
