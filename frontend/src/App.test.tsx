import { screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AppContent } from './App'
import { renderUltraFast } from './__tests__/test-utils/optimized-render'

/**
 * 軽量化されたAppテスト（Phase 1: ページレベル統合テスト復活）
 * 重要な統合機能のみをテストし、実行時間を最適化
 * ルーター競合を避けるためrenderUltraFastを使用
 */
const renderAppWithRouter = (initialEntries = ['/']) => {
  return renderUltraFast(
    <MemoryRouter initialEntries={initialEntries}>
      <AppContent />
    </MemoryRouter>
  )
}

describe('App', () => {
  test('アプリケーションが正常にレンダリングされる', async () => {
    renderAppWithRouter()

    // 基本要素の存在確認（軽量化）
    await waitFor(
      () => {
        expect(screen.getByText('¥0')).toBeInTheDocument() // 残高表示
      },
      { timeout: 3000 }
    )
  })

  test('基本フォーム要素が表示される', async () => {
    renderAppWithRouter()

    // 重要なフォーム要素の存在確認（軽量化）
    await waitFor(
      () => {
        expect(
          screen.getByPlaceholderText('支出金額を入力')
        ).toBeInTheDocument()
        expect(
          screen.getByPlaceholderText('収入金額を入力')
        ).toBeInTheDocument()
      },
      { timeout: 3000 }
    )
  })

  test('404ページのルーティング動作確認', async () => {
    renderAppWithRouter(['/unknown-path'])

    // 404ページの基本確認（軽量化）
    await waitFor(
      () => {
        expect(
          screen.getByText('404 - ページが見つかりません')
        ).toBeInTheDocument()
      },
      { timeout: 3000 }
    )
  })
})
