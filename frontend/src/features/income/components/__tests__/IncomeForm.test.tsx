import { render, screen } from '@testing-library/react'
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
})
