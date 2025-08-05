import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center relative">
      {/* Tailwind CSS テスト用の水平移動する点 */}
      <div className="absolute top-1/2 left-0 w-4 h-4 bg-red-500 rounded-full animate-ping transform -translate-y-1/2">
        <div className="absolute inset-0 bg-red-500 rounded-full animate-pulse"></div>
      </div>
      
      <div className="absolute top-1/2 w-6 h-6 bg-blue-600 rounded-full transform -translate-y-1/2 animate-bounce" 
           style={{
             animation: 'horizontalMove 3s infinite linear'
           }}>
      </div>
      
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-4">
        <div className="flex justify-center space-x-4 mb-6">
          <a href="https://vite.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1 className="text-3xl font-bold text-center mb-6">Vite + React</h1>
        <div className="text-center">
          <button 
            onClick={() => setCount((count) => count + 1)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
          >
            count is {count}
          </button>
          <p className="text-gray-600 mb-4">
            Edit <code className="bg-gray-200 px-1 rounded">src/App.tsx</code> and save to test HMR
          </p>
        </div>
      </div>
      <p className="text-gray-500 text-center mt-6">
        Click on the Vite and React logos to learn more
      </p>
      
      <style>{`
        @keyframes horizontalMove {
          0% { left: 0%; }
          50% { left: calc(100% - 24px); }
          100% { left: 0%; }
        }
      `}</style>
    </div>
  )
}

export default App
