import { useState } from 'react';
import { Container, Paper, Typography, Button, Box } from '@mui/material';
import ExpenseForm from './features/expenses/components/ExpenseForm';

function App() {
  const [count, setCount] = useState(0);

  const handleExpenseSubmit = (amount: number) => {
    console.log('支出登録:', amount);
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
        py: 4
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: '100%',
          maxWidth: 400
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{
            textAlign: 'center',
            fontWeight: 'bold',
            mb: 3
          }}
        >
          家計簿アプリ
        </Typography>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <ExpenseForm onSubmit={handleExpenseSubmit} />
          
          <Box sx={{ textAlign: 'center' }}>
            <Button
              variant="contained"
              onClick={() => setCount((count) => count + 1)}
              sx={{ fontWeight: 'bold' }}
            >
              count is {count}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default App;
