import { Container, Paper, Typography } from '@mui/material'
import ExpenseForm from './features/expenses/components/ExpenseForm'

function App() {
  const handleExpenseSubmit = (amount: number) => {
    console.log('支出登録:', amount)
  }

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
        py: 4,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: '100%',
          maxWidth: 400,
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
          家計簿アプリ
        </Typography>

        <ExpenseForm onSubmit={handleExpenseSubmit} />
      </Paper>
    </Container>
  )
}

export default App
