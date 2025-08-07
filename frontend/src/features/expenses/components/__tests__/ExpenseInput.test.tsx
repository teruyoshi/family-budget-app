import { render, screen, fireEvent } from '@testing-library/react'
import ExpenseInput from '../ExpenseInput'

describe('ExpenseInput', () => {
  test('正の整数の入力が許可される', () => {
    const mockOnChange = jest.fn()

    render(<ExpenseInput value={0} onChange={mockOnChange} />)

    const input = screen.getByPlaceholderText('支出金額を入力')
    fireEvent.change(input, { target: { value: '1000' } })

    expect(mockOnChange).toHaveBeenCalledWith(1000)
  })

  test('カンマ区切り表示される', () => {
    const mockOnChange = jest.fn()

    render(<ExpenseInput value={1000} onChange={mockOnChange} />)

    const input = screen.getByDisplayValue('1,000')
    expect(input).toBeInTheDocument()
  })

  test('不正な文字は自動的にフィルタされる', () => {
    const mockOnChange = jest.fn()

    render(<ExpenseInput value={0} onChange={mockOnChange} />)

    const input = screen.getByPlaceholderText('支出金額を入力')
    fireEvent.change(input, { target: { value: '100abc' } })

    // 数字部分のみが抽出される
    expect(mockOnChange).toHaveBeenCalledWith(100)
  })

  test('空文字の入力で0になる', () => {
    const mockOnChange = jest.fn()

    render(<ExpenseInput value={100} onChange={mockOnChange} />)

    const input = screen.getByDisplayValue('100')
    fireEvent.change(input, { target: { value: '' } })

    expect(mockOnChange).toHaveBeenCalledWith(0)
  })

  test('カスタムプレースホルダーが表示される', () => {
    const mockOnChange = jest.fn()

    render(
      <ExpenseInput
        value={0}
        onChange={mockOnChange}
        placeholder="カスタム金額入力"
      />
    )

    const input = screen.getByPlaceholderText('カスタム金額入力')
    expect(input).toBeInTheDocument()
  })

  test('テキストタイプが設定される（カンマ表示のため）', () => {
    const mockOnChange = jest.fn()

    render(<ExpenseInput value={0} onChange={mockOnChange} />)

    const input = screen.getByPlaceholderText('支出金額を入力')
    expect(input).toHaveAttribute('type', 'text')
  })
})
