import { render, screen } from '@testing-library/react';
import App from './App';

test('支出入力用のテキストボックスが表示される', () => {
  render(<App />);
  const expenseInput = screen.getByPlaceholderText('支出金額を入力');
  expect(expenseInput).toBeInTheDocument();
});