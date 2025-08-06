import { useState } from 'react';
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
    <form onSubmit={handleSubmit} className="space-y-4">
      <ExpenseInput
        value={amount}
        onChange={setAmount}
      />
      <button
        type="submit"
        className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        支出を登録
      </button>
    </form>
  );
}

export default ExpenseForm;