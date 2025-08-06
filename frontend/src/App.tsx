import { useState } from 'react';
import ExpenseForm from './features/expenses/components/ExpenseForm';

function App() {
  const [count, setCount] = useState(0);

  const handleExpenseSubmit = (amount: number) => {
    console.log('支出登録:', amount);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-4">
        <h1 className="text-3xl font-bold text-center mb-6">家計簿アプリ</h1>
        <div className="space-y-4">
          <ExpenseForm onSubmit={handleExpenseSubmit} />
          <div className="text-center">
            <button
              onClick={() => setCount((count) => count + 1)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              count is {count}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
