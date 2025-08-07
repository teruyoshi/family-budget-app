import { render, screen } from '@testing-library/react'
import { HistoryList } from '../HistoryList'

describe('HistoryList', () => {
  const mockItemsSameDate = [
    { id: '1', amount: 1500, timestamp: '2025/01/15(水)' },
    { id: '2', amount: 2000, timestamp: '2025/01/15(水)' },
  ]

  const mockItemsDifferentDates = [
    { id: '1', amount: 1500, timestamp: '2025/01/15(水)' },
    { id: '2', amount: 2000, timestamp: '2025/01/14(火)' },
    { id: '3', amount: 3000, timestamp: '2025/01/15(水)' },
  ]

  test('同じ日付のアイテムがグループ化されて表示される', () => {
    render(
      <HistoryList
        items={mockItemsSameDate}
        title="支出履歴"
        itemLabel="支出"
        itemColor="warning"
      />
    )

    expect(screen.getByText('支出履歴')).toBeInTheDocument()
    expect(screen.getByText('2025/01/15(水)')).toBeInTheDocument()
    expect(screen.getByText('¥1,500')).toBeInTheDocument()
    expect(screen.getByText('¥2,000')).toBeInTheDocument()
    expect(screen.getAllByText('支出')).toHaveLength(2)
  })

  test('異なる日付のアイテムが別々のセクションに分かれる', () => {
    render(
      <HistoryList
        items={mockItemsDifferentDates}
        title="支出履歴"
        itemLabel="支出"
        itemColor="warning"
      />
    )

    expect(screen.getByText('支出履歴')).toBeInTheDocument()
    expect(screen.getByText('2025/01/15(水)')).toBeInTheDocument()
    expect(screen.getByText('2025/01/14(火)')).toBeInTheDocument()
    expect(screen.getAllByText('支出')).toHaveLength(3)
  })

  test('アイテムが空の場合に何も表示されない', () => {
    const { container } = render(
      <HistoryList
        items={[]}
        title="支出履歴"
        itemLabel="支出"
        itemColor="warning"
      />
    )

    expect(container.firstChild).toBeNull()
  })

  test('収入リストが正しく表示される', () => {
    render(
      <HistoryList
        items={mockItemsSameDate}
        title="収入履歴"
        itemLabel="収入"
        itemColor="success"
      />
    )

    expect(screen.getByText('収入履歴')).toBeInTheDocument()
    expect(screen.getAllByText('収入')).toHaveLength(2)
  })

  test('日付が降順でソートされる', () => {
    const items = [
      { id: '1', amount: 1000, timestamp: '2025/01/13(月)' },
      { id: '2', amount: 2000, timestamp: '2025/01/15(水)' },
      { id: '3', amount: 3000, timestamp: '2025/01/14(火)' },
    ]

    render(
      <HistoryList
        items={items}
        title="支出履歴"
        itemLabel="支出"
        itemColor="warning"
      />
    )

    const dateHeaders = screen.getAllByText(/2025\/01\/\d+\(.+\)/)
    expect(dateHeaders[0]).toHaveTextContent('2025/01/15(水)') // 最新が先頭
    expect(dateHeaders[1]).toHaveTextContent('2025/01/14(火)')
    expect(dateHeaders[2]).toHaveTextContent('2025/01/13(月)')
  })
})