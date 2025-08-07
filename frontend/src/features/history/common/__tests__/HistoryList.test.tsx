import { render, screen } from '@testing-library/react'
import { HistoryList } from '../HistoryList'

describe('HistoryList', () => {
  const mockItems = [
    { id: '1', amount: 1500, timestamp: '2025/01/15(水)' },
    { id: '2', amount: 2000, timestamp: '2025/01/14(火)' },
  ]

  test('アイテムがある場合にリストが表示される', () => {
    render(
      <HistoryList
        items={mockItems}
        title="支出履歴"
        itemLabel="支出"
        itemColor="warning"
      />
    )

    expect(screen.getByText('支出履歴')).toBeInTheDocument()
    expect(screen.getByText('¥1,500')).toBeInTheDocument()
    expect(screen.getByText('¥2,000')).toBeInTheDocument()
    expect(screen.getAllByText('支出')).toHaveLength(2)
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
        items={mockItems}
        title="収入履歴"
        itemLabel="収入"
        itemColor="success"
      />
    )

    expect(screen.getByText('収入履歴')).toBeInTheDocument()
    expect(screen.getAllByText('収入')).toHaveLength(2)
  })

  test('正しい数のアイテムが表示される', () => {
    render(
      <HistoryList
        items={mockItems}
        title="支出履歴"
        itemLabel="支出"
        itemColor="warning"
      />
    )

    const listItems = screen.getAllByRole('listitem')
    expect(listItems).toHaveLength(2)
  })
})