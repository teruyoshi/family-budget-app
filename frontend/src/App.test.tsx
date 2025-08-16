import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AppContent } from './App'

/**
 * Suspenseによるコード分割対応のテストユーティリティ
 */
const renderAppWithRouter = (initialEntries = ['/']) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <AppContent />
    </MemoryRouter>
  )
}

describe.skip('App', () => {
  test('家計簿アプリのタイトルが表示される', async () => {
    renderAppWithRouter()

    // ローディング完了を待機
    await waitFor(
      () => {
        expect(screen.queryByText('読み込み中...')).not.toBeInTheDocument()
      },
      { timeout: 15000 }
    )

    // ダッシュボードページ特有の要素で確認
    await waitFor(
      () => {
        expect(screen.getByText('¥0')).toBeInTheDocument() // 残高表示
        expect(
          screen.getByRole('menuitem', { name: 'ダッシュボードページに移動' })
        ).toHaveClass('Mui-selected')
      },
      { timeout: 5000 }
    )
  }, 20000)

  test('初期残高0円が表示される', async () => {
    renderAppWithRouter()

    // ローディング完了を待機
    await waitFor(
      () => {
        expect(screen.queryByText('読み込み中...')).not.toBeInTheDocument()
      },
      { timeout: 15000 }
    )

    // 残高表示確認
    await waitFor(
      () => {
        const balanceLabel = screen.getByText('残高：')
        const balanceContainer = balanceLabel.parentElement
        expect(balanceContainer).toHaveTextContent('残高：¥0')
      },
      { timeout: 5000 }
    )
  }, 20000)

  test('支出フォームと収入フォームが表示される', async () => {
    renderAppWithRouter()

    // ローディング完了を待機
    await waitFor(
      () => {
        expect(screen.queryByText('読み込み中...')).not.toBeInTheDocument()
      },
      { timeout: 15000 }
    )

    // フォーム要素確認
    await waitFor(
      () => {
        expect(
          screen.getByPlaceholderText('支出金額を入力')
        ).toBeInTheDocument()
        expect(
          screen.getByPlaceholderText('収入金額を入力')
        ).toBeInTheDocument()
        expect(
          screen.getByRole('button', { name: '支出を登録' })
        ).toBeInTheDocument()
        expect(
          screen.getByRole('button', { name: '収入を登録' })
        ).toBeInTheDocument()
      },
      { timeout: 5000 }
    )
  }, 20000)

  test('404ページが表示される', async () => {
    renderAppWithRouter(['/unknown-path'])

    // ローディング完了を待機
    await waitFor(
      () => {
        expect(screen.queryByText('読み込み中...')).not.toBeInTheDocument()
      },
      { timeout: 15000 }
    )

    // 404ページ確認
    await waitFor(
      () => {
        expect(
          screen.getByText('404 - ページが見つかりません')
        ).toBeInTheDocument()
        expect(
          screen.getByText('お探しのページは存在しません。')
        ).toBeInTheDocument()
      },
      { timeout: 5000 }
    )
  }, 20000)
})
