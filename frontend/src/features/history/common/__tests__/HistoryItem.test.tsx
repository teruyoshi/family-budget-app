import { render, screen } from '@testing-library/react'
import { HistoryItem } from '../HistoryItem'

describe('HistoryItem', () => {
  const mockExpense = {
    id: '1',
    amount: 1500,
    timestamp: '2025/01/15(水)',
  }

  test('支出アイテムが正しく表示される', () => {
    render(<HistoryItem item={mockExpense} label="支出" color="warning" />)

    expect(screen.getByText('支出')).toBeInTheDocument()
    expect(screen.getByText('¥1,500')).toBeInTheDocument()
    // 日付はセクションヘッダーで表示されるため、個別アイテムには表示されない
    expect(screen.queryByText('2025/01/15(水)')).not.toBeInTheDocument()
  })

  test('収入アイテムが正しく表示される', () => {
    const mockIncome = {
      id: '2',
      amount: 3000,
      timestamp: '2025/01/16(木)',
    }

    render(<HistoryItem item={mockIncome} label="収入" color="success" />)

    expect(screen.getByText('収入')).toBeInTheDocument()
    expect(screen.getByText('¥3,000')).toBeInTheDocument()
    expect(screen.queryByText('2025/01/16(木)')).not.toBeInTheDocument()
  })

  test('正しいCSSクラスが適用される', () => {
    render(<HistoryItem item={mockExpense} label="支出" color="warning" />)

    const chip = screen.getByText('支出').closest('.MuiChip-root')
    expect(chip).toHaveClass('MuiChip-colorWarning')
  })
})
