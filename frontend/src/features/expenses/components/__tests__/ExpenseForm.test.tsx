import { render, screen } from '@testing-library/react'
import ExpenseForm from '../ExpenseForm'

describe('ExpenseForm', () => {
  test('支出入力用のテキストボックスが表示される', () => {
    render(<ExpenseForm />)
    const expenseInput = screen.getByPlaceholderText('支出金額を入力')
    expect(expenseInput).toBeInTheDocument()
  })

  test('支出を登録ボタンが表示される', () => {
    render(<ExpenseForm />)
    const submitButton = screen.getByRole('button', { name: '支出を登録' })
    expect(submitButton).toBeInTheDocument()
  })

  test('日付を入力するピッカーが存在する', () => {
    render(<ExpenseForm />)
    // MUI X DatePickerの場合、複数の要素に同じラベルが存在するため、より具体的なセレクタを使用
    const datePicker = screen.getByRole('group', { name: '支出日付' })
    expect(datePicker).toBeInTheDocument()
  })
})
