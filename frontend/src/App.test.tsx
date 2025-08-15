import { render, screen, act, waitFor } from '@testing-library/react'
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

describe('App', () => {
  test('家計簿アプリのタイトルが表示される', async () => {
    await act(async () => {
      renderAppWithRouter()
    })
    
    // Suspenseによる遅延ロードの完了を待機
    await waitFor(() => {
      const heading = screen.getByRole('heading', { name: '家計簿アプリ' })
      expect(heading).toBeInTheDocument()
    }, { timeout: 10000 })
  }, 15000)

  test('初期残高0円が表示される', async () => {
    await act(async () => {
      renderAppWithRouter()
    })
    
    await waitFor(() => {
      const balanceLabel = screen.getByText('残高：')
      const balanceContainer = balanceLabel.parentElement
      expect(balanceContainer).toHaveTextContent('残高：¥0')
    }, { timeout: 10000 })
  }, 15000)

  test('支出フォームと収入フォームが表示される', async () => {
    await act(async () => {
      renderAppWithRouter()
    })
    
    await waitFor(() => {
      expect(screen.getByPlaceholderText('支出金額を入力')).toBeInTheDocument()
      expect(screen.getByPlaceholderText('収入金額を入力')).toBeInTheDocument()
      expect(
        screen.getByRole('button', { name: '支出を登録' })
      ).toBeInTheDocument()
      expect(
        screen.getByRole('button', { name: '収入を登録' })
      ).toBeInTheDocument()
    }, { timeout: 10000 })
  }, 15000)

  test('404ページが表示される', async () => {
    await act(async () => {
      renderAppWithRouter(['/unknown-path'])
    })
    
    await waitFor(() => {
      expect(screen.getByText('404 - ページが見つかりません')).toBeInTheDocument()
      expect(screen.getByText('お探しのページは存在しません。')).toBeInTheDocument()
    }, { timeout: 10000 })
  }, 15000)
})
