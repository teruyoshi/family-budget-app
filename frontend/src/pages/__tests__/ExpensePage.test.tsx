import { screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import ExpensePage from '../ExpensePage'
import { renderUltraFast } from '@/__tests__/test-utils/optimized-render'

/**
 * ExpensePageコンポーネントのテストスイート（Phase 1: 軽量化版）
 *
 * 支出管理ページの重要な機能のみをテストし、実行時間を最適化
 * ルーター競合を避けるためrenderUltraFastを使用
 */
describe('ExpensePage', () => {
  /**
   * 軽量化されたテストヘルパー
   */
  const renderExpensePage = () => {
    return renderUltraFast(
      <MemoryRouter>
        <ExpensePage />
      </MemoryRouter>
    )
  }

  /**
   * 基本的なページレンダリング確認
   */
  test('支出ページの基本表示が正常', () => {
    renderExpensePage()

    // 重要な要素の存在確認（軽量化）
    expect(
      screen.getByRole('heading', { level: 1, name: '支出管理' })
    ).toBeInTheDocument()
    expect(screen.getByText('新規支出登録')).toBeInTheDocument()
    expect(screen.getByText('支出履歴')).toBeInTheDocument()
  })

  /**
   * フォーム機能の基本確認
   */
  test('支出フォームの基本要素が表示される', () => {
    renderExpensePage()

    // フォーム要素の基本確認
    expect(screen.getByText('支出を登録')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('支出金額を入力')).toBeInTheDocument()
  })
})
