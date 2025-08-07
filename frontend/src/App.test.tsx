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
    expect(balanceContainer).toHaveTextContent('残金：¥10,000')
  })

  test('支出を5000で登録すると残金：5000が表示されている', async () => {
    const user = userEvent.setup()
    render(<App />)
    
    const amountInput = screen.getByPlaceholderText('支出金額を入力')
    const submitButton = screen.getByRole('button', { name: '支出を登録' })
    
    await user.type(amountInput, '5000')
    await user.click(submitButton)
    
    const balanceLabel = screen.getByText('残金：')
    const balanceContainer = balanceLabel.parentElement
    expect(balanceContainer).toHaveTextContent('残金：¥5,000')
  })

  test('支出を3000で登録すると合計支出：¥3,000が表示されている', async () => {
    const user = userEvent.setup()
    render(<App />)
    
    const amountInput = screen.getByPlaceholderText('支出金額を入力')
    const submitButton = screen.getByRole('button', { name: '支出を登録' })
    
    await user.type(amountInput, '3000')
    await user.click(submitButton)
    
    expect(screen.getByText('合計支出: ¥3,000')).toBeInTheDocument()
  })

  test('複数回支出登録すると合計支出が正しく計算される', async () => {
    const user = userEvent.setup()
    render(<App />)
    
    const amountInput = screen.getByPlaceholderText('支出金額を入力')
    const submitButton = screen.getByRole('button', { name: '支出を登録' })
    
    // 1回目の支出登録
    await user.type(amountInput, '2000')
    await user.click(submitButton)
    
    // 2回目の支出登録
    await user.clear(amountInput)
    await user.type(amountInput, '1500')
    await user.click(submitButton)
    
    expect(screen.getByText('合計支出: ¥3,500')).toBeInTheDocument()
  })
})
