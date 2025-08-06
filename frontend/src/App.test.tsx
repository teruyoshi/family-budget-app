import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  test('家計簿アプリのタイトルが表示される', () => {
    render(<App />);
    const heading = screen.getByRole('heading', { name: '家計簿アプリ' });
    expect(heading).toBeInTheDocument();
  });
});