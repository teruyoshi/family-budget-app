import { renderHook, act } from '@testing-library/react'
import { useAmountInput } from '../useAmountInput'

describe('useAmountInput', () => {
  test('初期値が正しく設定される', () => {
    const { result } = renderHook(() => useAmountInput(15000))

    expect(result.current.amount).toBe('¥15,000')
  })

  test('0の場合は空文字が返される', () => {
    const { result } = renderHook(() => useAmountInput(0))

    expect(result.current.amount).toBe('')
  })

  test('onChangeが正しく呼ばれる', () => {
    const mockOnChange = jest.fn()
    const { result } = renderHook(() => useAmountInput(0, mockOnChange))

    act(() => {
      result.current.handleChange('2500')
    })

    expect(mockOnChange).toHaveBeenCalledWith(2500)
  })

  test('文字のみの入力では0として処理される', () => {
    const mockOnChange = jest.fn()
    const { result } = renderHook(() => useAmountInput(0, mockOnChange))

    act(() => {
      result.current.handleChange('invalid')
    })

    expect(mockOnChange).toHaveBeenCalledWith(0)
    expect(result.current.amount).toBe('')
  })

  test('値の変更に応じてamountが更新される', () => {
    const { result } = renderHook(() => useAmountInput(1000))

    expect(result.current.amount).toBe('¥1,000')

    act(() => {
      result.current.handleChange('5000')
    })

    expect(result.current.amount).toBe('¥5,000')
  })

  test('数値と文字の混合入力で数値のみが抽出される', () => {
    const mockOnChange = jest.fn()
    const { result } = renderHook(() => useAmountInput(0, mockOnChange))

    act(() => {
      result.current.handleChange('abc123def')
    })

    expect(mockOnChange).toHaveBeenCalledWith(123)
    expect(result.current.amount).toBe('¥123')
  })
})