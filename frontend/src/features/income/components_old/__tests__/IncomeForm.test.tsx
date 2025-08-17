import { render, screen, fireEvent } from '@testing-library/react'
import IncomeForm from '../IncomeForm'

describe('IncomeForm', () => {
  test('収入入力用のテキストボックスが表示される', () => {
    render(<IncomeForm />)
    const incomeInput = screen.getByPlaceholderText('収入金額を入力')
    expect(incomeInput).toBeInTheDocument()
  })

  test('収入を登録ボタンが表示される', () => {
    render(<IncomeForm />)
    const submitButton = screen.getByRole('button', { name: '収入を登録' })
    expect(submitButton).toBeInTheDocument()
  })

  test('日付指定トグルスイッチが表示される', () => {
    render(<IncomeForm />)
    const dateToggle = screen.getByRole('switch', { name: '日付を指定する' })
    expect(dateToggle).toBeInTheDocument()
  })

  test('トグルスイッチを有効にすると日付ピッカーが表示される', () => {
    render(<IncomeForm />)

    // 最初は日付ピッカーが非表示
    expect(
      screen.queryByRole('group', { name: '収入日付' })
    ).not.toBeInTheDocument()

    // トグルスイッチをクリック
    const dateToggle = screen.getByRole('switch', { name: '日付を指定する' })
    fireEvent.click(dateToggle)

    // 日付ピッカーが表示される
    expect(screen.getByRole('group', { name: '収入日付' })).toBeInTheDocument()
  })
})
