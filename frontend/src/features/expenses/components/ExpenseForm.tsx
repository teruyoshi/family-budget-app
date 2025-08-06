import { useState } from 'react';
import { Box, Button } from '@mui/material';
import ExpenseInput from './ExpenseInput';

interface ExpenseFormProps {
  onSubmit?: (amount: number) => void;
}

function ExpenseForm({ onSubmit }: ExpenseFormProps) {
  const [amount, setAmount] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numericAmount = parseFloat(amount);
    if (numericAmount > 0 && onSubmit) {
      onSubmit(numericAmount);
      setAmount('');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <ExpenseInput
        value={amount}
        onChange={setAmount}
      />
      <Button
        type="submit"
        variant="contained"
        color="error"
        fullWidth
        sx={{ 
          fontWeight: 'bold',
          py: 1.5
        }}
      >
        支出を登録
      </Button>
    </Box>
  );
}

export default ExpenseForm;