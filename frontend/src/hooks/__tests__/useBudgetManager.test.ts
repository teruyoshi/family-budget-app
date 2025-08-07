import { renderHook, act } from '@testing-library/react'
import { useBudgetManager } from '../useBudgetManager'

describe('useBudgetManager', () => {
  beforeEach(() => {
    // モックの日付を固定して一貫したテスト結果を保証
    jest.useFakeTimers()
    jest.setSystemTime(new Date('2025-01-15 10:30:00'))
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  test('初期状態が正しい', () => {
    const { result } = renderHook(() => useBudgetManager())
    const [values] = result.current

    expect(values.expenses).toEqual([])
    expect(values.incomes).toEqual([])
    expect(values.balance).toBe(0)
    expect(values.totalExpenseAmount).toBe(0)
    expect(values.totalIncomeAmount).toBe(0)
  })

  test('支出追加が正しく動作する', () => {
    const { result } = renderHook(() => useBudgetManager())
    const [, actions] = result.current

    act(() => {
      actions.addExpense(1000, '2025-01-15')
    })

    const [values] = result.current
    expect(values.expenses).toHaveLength(1)
    expect(values.expenses[0].amount).toBe(1000)
    expect(values.expenses[0].timestamp).toBe('2025/01/15(水)')
    expect(values.totalExpenseAmount).toBe(1000)
    expect(values.balance).toBe(-1000)
  })

  test('指定した日付が履歴に反映される', () => {
    const { result } = renderHook(() => useBudgetManager())
    const [, actions] = result.current

    act(() => {
      actions.addExpense(1500, '2025-12-25')
    })

    const [values] = result.current
    expect(values.expenses[0].timestamp).toBe('2025/12/25(木)')
  })

  test('収入追加が正しく動作する', () => {
    const { result } = renderHook(() => useBudgetManager())
    const [, actions] = result.current

    act(() => {
      actions.addIncome(5000, '2025-01-15')
    })

    const [values] = result.current
    expect(values.incomes).toHaveLength(1)
    expect(values.incomes[0].amount).toBe(5000)
    expect(values.incomes[0].timestamp).toBe('2025/01/15(水)')
    expect(values.totalIncomeAmount).toBe(5000)
    expect(values.balance).toBe(5000)
  })

  test('複数の支出・収入で残高が正しく計算される', () => {
    const { result } = renderHook(() => useBudgetManager())
    const [, actions] = result.current

    act(() => {
      actions.addIncome(10000, '2025-01-15')
      actions.addExpense(3000, '2025-01-15')
      actions.addExpense(2000, '2025-01-16')
    })

    const [values] = result.current
    expect(values.totalIncomeAmount).toBe(10000)
    expect(values.totalExpenseAmount).toBe(5000)
    expect(values.balance).toBe(5000)
  })

  test('新しいアイテムが配列の先頭に追加される', () => {
    const { result } = renderHook(() => useBudgetManager())
    const [, actions] = result.current

    act(() => {
      actions.addExpense(1000, '2025-01-15')
    })

    // 1秒待機して異なるタイムスタンプを確保
    jest.advanceTimersByTime(1000)

    act(() => {
      actions.addExpense(2000, '2025-01-16')
    })

    const [values] = result.current
    expect(values.expenses).toHaveLength(2)
    expect(values.expenses[0].amount).toBe(2000) // 新しいものが先頭
    expect(values.expenses[1].amount).toBe(1000)
    expect(values.expenses[0].id).not.toBe(values.expenses[1].id)
  })
})