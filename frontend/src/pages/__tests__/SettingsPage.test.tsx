import { screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import SettingsPage from '../SettingsPage'
import { renderUltraFast } from '@/__tests__/test-utils/optimized-render'

/**
 * SettingsPageコンポーネントのテストスイート（Phase 1: 軽量化版）
 *
 * 設定ページの重要な機能のみをテストし、実行時間を最適化
 * ルーター競合を避けるためrenderUltraFastを使用
 */
describe('SettingsPage', () => {
  /**
   * 軽量化されたテストヘルパー
   */
  const renderSettingsPage = () => {
    return renderUltraFast(
      <MemoryRouter>
        <SettingsPage />
      </MemoryRouter>
    )
  }

  /**
   * 設定ページの基本表示確認
   */
  test('設定ページの基本表示が正常', () => {
    renderSettingsPage()

    // 重要な要素の存在確認（軽量化）
    expect(screen.getByRole('heading', { level: 1, name: '設定' })).toBeInTheDocument()
    expect(screen.getByText('アプリケーションの設定管理')).toBeInTheDocument()
  })

  /**
   * 工事中状態の基本確認
   */
  test('開発中メッセージが表示される', () => {
    renderSettingsPage()

    // 工事中状態の基本確認
    expect(screen.getByText('設定機能は開発中です')).toBeInTheDocument()
  })

})
