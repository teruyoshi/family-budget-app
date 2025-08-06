import { useState } from 'react';

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
      <input
        type="number"
        placeholder="支出金額を入力"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded"
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