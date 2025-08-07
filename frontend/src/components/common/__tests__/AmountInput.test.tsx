import { render, screen, fireEvent } from '@testing-library/react'
import AmountInput from '../AmountInput'

describe('AmountInput', () => {
  test('金額が正しくフォーマットされて表示される', () => {
    const mockOnChange = jest.fn()

    render(
      <AmountInput
        value={1500}
        onChange={mockOnChange}
        placeholder="金額を入力"
      />
    )

    const input = screen.getByDisplayValue('¥1,500')
    expect(input).toBeInTheDocument()
  })

  test('0の場合は空文字が表示される', () => {
    const mockOnChange = jest.fn()

    render(
      <AmountInput
        value={0}
        onChange={mockOnChange}
        placeholder="金額を入力"
      />
    )

    const input = screen.getByPlaceholderText('金額を入力')
    expect(input).toHaveValue('')
  })

  test('数値入力でonChangeが呼ばれる', () => {
    const mockOnChange = jest.fn()

    render(
      <AmountInput
        value={0}
        onChange={mockOnChange}
        placeholder="金額を入力"
      />
    )

    const input = screen.getByPlaceholderText('金額を入力')
    fireEvent.change(input, { target: { value: '2500' } })

    expect(mockOnChange).toHaveBeenCalledWith(2500)
  })

  test('非数値文字が除外される', () => {
    const mockOnChange = jest.fn()

    render(
      <AmountInput
        value={0}
        onChange={mockOnChange}
        placeholder="金額を入力"
      />
    )

    const input = screen.getByPlaceholderText('金額を入力')
    fireEvent.change(input, { target: { value: 'abc123def' } })

    expect(mockOnChange).toHaveBeenCalledWith(123)
  })

  test('空文字入力で0が設定される', () => {
    const mockOnChange = jest.fn()

    render(
      <AmountInput
        value={1000}
        onChange={mockOnChange}
        placeholder="金額を入力"
      />
    )

    const input = screen.getByDisplayValue('¥1,000')
    fireEvent.change(input, { target: { value: '' } })

    expect(mockOnChange).toHaveBeenCalledWith(0)
  })

  test('大きな数値も正しくフォーマットされる', () => {
    const mockOnChange = jest.fn()

    render(
      <AmountInput
        value={1234567}
        onChange={mockOnChange}
        placeholder="金額を入力"
      />
    )

    const input = screen.getByDisplayValue('¥1,234,567')
    expect(input).toBeInTheDocument()
  })
})