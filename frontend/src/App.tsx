import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-4">
        <h1 className="text-3xl font-bold text-center mb-6">家計簿アプリ</h1>
        <div className="text-center">
          <input
            type="number"
            placeholder="支出金額を入力"
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          <button
            onClick={() => setCount((count) => count + 1)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
          >
            count is {count}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
