import { render, screen, fireEvent } from '@testing-library/react'
import { DateLocalizationProvider } from '@/components/provider'
import ExpenseForm from '../ExpenseForm'

const setup = (props = {}) => {
  return render(
    <DateLocalizationProvider>
      <ExpenseForm {...props} />
    </DateLocalizationProvider>
  )
}

describe('ExpenseForm', () => {
  test('支出入力用のテキストボックスが表示される', () => {
    setup()
    const expenseInput = screen.getByPlaceholderText('支出金額を入力')
    expect(expenseInput).toBeInTheDocument()
  })

  test('支出を登録ボタンが表示される', () => {
    setup()
    const submitButton = screen.getByRole('button', { name: '支出を登録' })
    expect(submitButton).toBeInTheDocument()
  })

  test('日付指定トグルスイッチが表示される', () => {
    setup()
    const dateToggle = screen.getByRole('switch', { name: '日付を指定する' })
    expect(dateToggle).toBeInTheDocument()
  })

  test('トグルスイッチを有効にすると日付ピッカーが表示される', () => {
    setup()

    // 最初は日付ピッカーが非表示
    expect(
      screen.queryByRole('group', { name: '支出日付' })
    ).not.toBeInTheDocument()

    // トグルスイッチをクリック
    const dateToggle = screen.getByRole('switch', { name: '日付を指定する' })
    fireEvent.click(dateToggle)

    // 日付ピッカーが表示される
    expect(screen.getByRole('group', { name: '支出日付' })).toBeInTheDocument()
  })
})
