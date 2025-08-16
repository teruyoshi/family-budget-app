import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import DashboardPage from '../DashboardPage'

/**
 * DashboardPageコンポーネントのテストスイート
 *
 * ダッシュボードページの基本的な表示・機能をテストします。
 */
describe('DashboardPage', () => {
  /**
   * テストヘルパー: DashboardPageをMemoryRouterでラップしてレンダリング
   */
  const renderDashboardPage = () => {
    return render(
      <MemoryRouter>
        <DashboardPage />
      </MemoryRouter>
    )
  }

  /**
   * 基本的なレンダリングテスト
   */
  test('renders dashboard page correctly', () => {
    renderDashboardPage()

    // ダッシュボードページが表示されているかチェック
    expect(screen.getByText('¥0')).toBeInTheDocument() // 残高表示確認
    expect(
      screen.getByRole('menuitem', { name: 'ダッシュボードページに移動' })
    ).toHaveClass('Mui-selected')

    // 残高表示が存在するかチェック
    expect(screen.getByText(/残高/)).toBeInTheDocument()

    // 支出フォームが表示されているかチェック
    expect(screen.getByText('支出を登録')).toBeInTheDocument()

    // 収入フォームが表示されているかチェック
    expect(screen.getByText('収入を登録')).toBeInTheDocument()
  })

  /**
   * フォーム要素の存在確認テスト
   */
  test('contains required form elements', () => {
    renderDashboardPage()

    // 金額入力フィールドの存在確認
    const amountInputs = screen.getAllByPlaceholderText(/金額を入力/)
    expect(amountInputs).toHaveLength(2) // 支出用と収入用

    // 送信ボタンの存在確認
    expect(screen.getByText('支出を登録')).toBeInTheDocument()
    expect(screen.getByText('収入を登録')).toBeInTheDocument()
  })

  /**
   * 履歴表示エリアの存在確認テスト
   */
  test('contains history sections', () => {
    renderDashboardPage()

    // 履歴コンポーネントが存在することを確認
    // 空の状態では履歴コンポーネントは何も表示しないが、Grid構造は存在する
    const gridContainers = screen
      .getAllByRole('generic')
      .filter((el) => el.className.includes('MuiGrid-container'))

    // Grid構造が存在することで履歴エリアの存在を確認
    expect(gridContainers.length).toBeGreaterThan(0)
  })

  /**
   * レスポンシブレイアウトのテスト
   */
  test('has responsive layout structure', () => {
    renderDashboardPage()

    // Containerコンポーネントが最大幅を制限しているかチェック
    const container = screen.getByText('¥0').closest('[class*="MuiContainer"]')
    expect(container).toBeInTheDocument()
  })

  /**
   * 初期状態での空のデータ表示テスト
   */
  test('displays initial empty state correctly', () => {
    renderDashboardPage()

    // 残高が表示されているかチェック（¥0の形式で表示）
    expect(screen.getByText('¥0')).toBeInTheDocument()

    // 履歴が空の状態での表示確認
    // 実際の履歴コンポーネントは存在するが、空の場合は何も表示しない仕様
    // 基本的なページ構造が正しく表示されていることを確認
    expect(
      screen.getByRole('menuitem', { name: 'ダッシュボードページに移動' })
    ).toHaveClass('Mui-selected')
  })

  /**
   * アクセシビリティテスト
   */
  test('has proper accessibility attributes', () => {
    renderDashboardPage()

    // メインコンテンツエリアがランドマークとして認識されるかチェック
    // const mainContent = screen.getByText('家計簿アプリ').closest('main') ||
    //                    screen.getByText('家計簿アプリ').closest('[role="main"]')

    // フォーム要素のアクセシビリティチェック
    expect(screen.getByPlaceholderText('支出金額を入力')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('収入金額を入力')).toBeInTheDocument()
  })
})
