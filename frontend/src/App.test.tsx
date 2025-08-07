import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  test('家計簿アプリのタイトルが表示される', () => {
    render(<App />)
    const heading = screen.getByRole('heading', { name: '家計簿アプリ' })
    expect(heading).toBeInTheDocument()
  })

  test('初期残高0円が表示される', () => {
    render(<App />)
    const balanceLabel = screen.getByText('残高：')
    const balanceContainer = balanceLabel.parentElement
    expect(balanceContainer).toHaveTextContent('残高：¥0')
  })

  test('支出フォームと収入フォームが表示される', () => {
    render(<App />)
    expect(screen.getByPlaceholderText('支出金額を入力')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('収入金額を入力')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: '支出を登録' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: '収入を登録' })
    ).toBeInTheDocument()
  })
})
