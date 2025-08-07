import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('App', () => {
  test('家計簿アプリのタイトルが表示される', () => {
    render(<App />)
    const heading = screen.getByRole('heading', { name: '家計簿アプリ' })
    expect(heading).toBeInTheDocument()
  })

  test('初期残金10000円が表示される', () => {
    render(<App />)
    const balanceLabel = screen.getByText('残金：')
    const balanceContainer = balanceLabel.parentElement
    expect(balanceContainer).toHaveTextContent('残金：10000')
  })

  test('支出を5000で登録すると残金：5000が表示されている', async () => {
    const user = userEvent.setup()
    render(<App />)
    
    const amountInput = screen.getByPlaceholderText('支出金額を入力')
    const submitButton = screen.getByRole('button', { name: '登録' })
    
    await user.type(amountInput, '5000')
    await user.click(submitButton)
    
    const balanceLabel = screen.getByText('残金：')
    const balanceContainer = balanceLabel.parentElement
    expect(balanceContainer).toHaveTextContent('残金：5000')
  })
})
