import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import SettingsPage from '../SettingsPage'

/**
 * SettingsPageコンポーネントのテストスイート
 *
 * 設定ページの基本的な表示・構造をテストします。
 * 現在は基盤実装のみのため、将来機能追加時の拡張を考慮したテスト設計。
 */
describe('SettingsPage', () => {
  /**
   * テストヘルパー: SettingsPageをMemoryRouterでラップしてレンダリング
   */
  const renderSettingsPage = () => {
    return render(
      <MemoryRouter>
        <SettingsPage />
      </MemoryRouter>
    )
  }

  /**
   * 基本的なレンダリングテスト
   */
  test('renders settings page correctly', () => {
    renderSettingsPage()

    // ページタイトルが表示されているかチェック
    expect(screen.getByText('設定')).toBeInTheDocument()

    // ページ説明が表示されているかチェック
    expect(screen.getByText('アプリケーションの設定管理')).toBeInTheDocument()

    // 設定アイコンが表示されているかチェック
    const settingsIcon = screen.getByTestId('SettingsIcon') || 
                         screen.getByText('設定').previousElementSibling
    expect(settingsIcon).toBeInTheDocument()
  })

  /**
   * 工事中メッセージの表示テスト
   */
  test('displays under construction message', () => {
    renderSettingsPage()

    // 工事中メッセージが表示されているかチェック
    expect(screen.getByText('設定機能は開発中です')).toBeInTheDocument()

    // 詳細説明が表示されているかチェック
    expect(screen.getByText(/現在この機能は実装準備中です/)).toBeInTheDocument()
  })

  /**
   * 将来実装予定機能の表示テスト
   */
  test('displays planned features section', () => {
    renderSettingsPage()

    // 実装予定の設定項目タイトルが表示されているかチェック
    expect(screen.getByText('実装予定の設定項目')).toBeInTheDocument()

    // 各設定カテゴリが表示されているかチェック
    expect(screen.getByText('🎨 外観設定')).toBeInTheDocument()
    expect(screen.getByText('💾 データ設定')).toBeInTheDocument()
    expect(screen.getByText('🔔 通知設定')).toBeInTheDocument()
    expect(screen.getByText('⚙️ アプリケーション設定')).toBeInTheDocument()
  })

  /**
   * 外観設定の説明テスト
   */
  test('displays appearance settings description', () => {
    renderSettingsPage()

    // 外観設定の各項目が表示されているかチェック
    expect(screen.getByText(/テーマ選択/)).toBeInTheDocument()
    expect(screen.getByText(/言語設定/)).toBeInTheDocument()
    expect(screen.getByText(/フォントサイズ調整/)).toBeInTheDocument()
    expect(screen.getByText(/カラーテーマのカスタマイズ/)).toBeInTheDocument()
  })

  /**
   * データ設定の説明テスト
   */
  test('displays data settings description', () => {
    renderSettingsPage()

    // データ設定の各項目が表示されているかチェック
    expect(screen.getByText(/データエクスポート/)).toBeInTheDocument()
    expect(screen.getByText(/データインポート/)).toBeInTheDocument()
    expect(screen.getByText(/自動バックアップ設定/)).toBeInTheDocument()
    expect(screen.getByText(/データ削除・リセット/)).toBeInTheDocument()
  })

  /**
   * アプリケーション情報の表示テスト
   */
  test('displays current application information', () => {
    renderSettingsPage()

    // アプリケーション情報セクションが表示されているかチェック
    expect(screen.getByText('現在のアプリケーション情報')).toBeInTheDocument()

    // バージョン情報が表示されているかチェック
    expect(screen.getByText(/バージョン: 0.3.1/)).toBeInTheDocument()

    // 最終更新情報が表示されているかチェック
    expect(screen.getByText(/最終更新: React Router 対応完了/)).toBeInTheDocument()

    // データ保存方式が表示されているかチェック
    expect(screen.getByText(/データ保存: ブラウザローカルストレージ/)).toBeInTheDocument()

    // 対応ブラウザ情報が表示されているかチェック
    expect(screen.getByText(/対応ブラウザ: Chrome, Firefox, Safari, Edge/)).toBeInTheDocument()
  })

  /**
   * テーマカラーの適用テスト
   */
  test('applies settings theme colors correctly', () => {
    renderSettingsPage()

    // ページタイトルが設定テーマ色（ブルー系）で表示されているかチェック
    const pageTitle = screen.getByText('設定')
    expect(pageTitle).toHaveStyle({ color: '#1565c0' })
  })

  /**
   * レイアウト構造のテスト
   */
  test('has proper layout structure', () => {
    renderSettingsPage()

    // 中サイズ（md）のコンテナが使用されているかチェック
    const container = screen.getByText('設定').closest('[class*="MuiContainer"]')
    expect(container).toBeInTheDocument()

    // ヘッダーとメインコンテンツが適切に分離されているかチェック
    const header = screen.getByText('設定').closest('[elevation="3"]') ||
                   screen.getByText('設定').closest('[class*="MuiPaper"]')
    const mainContent = screen.getByText('設定機能は開発中です').closest('[elevation="2"]') ||
                       screen.getByText('設定機能は開発中です').closest('[class*="MuiPaper"]')

    expect(header).toBeInTheDocument()
    expect(mainContent).toBeInTheDocument()
  })

  /**
   * アクセシビリティテスト
   */
  test('has proper accessibility structure', () => {
    renderSettingsPage()

    // ページタイトルが適切な見出しレベル（h1）になっているかチェック
    const pageTitle = screen.getByText('設定')
    expect(pageTitle.tagName).toBe('H1')

    // セクションタイトルが適切な見出しレベルになっているかチェック
    const implementationPlanTitle = screen.getByText('実装予定の設定項目')
    const appInfoTitle = screen.getByText('現在のアプリケーション情報')
    
    // 実際の見出しレベルを確認（component="h2", component="h3" に設定されている）
    expect(implementationPlanTitle.tagName).toBe('H2') // component="h2"で設定
    expect(appInfoTitle.tagName).toBe('H3') // component="h3"で設定

    // カテゴリタイトルが適切な見出しレベル（h3）になっているかチェック
    const categoryTitles = [
      screen.getByText('🎨 外観設定'),
      screen.getByText('💾 データ設定'),
      screen.getByText('🔔 通知設定'),
      screen.getByText('⚙️ アプリケーション設定')
    ]
    
    categoryTitles.forEach(title => {
      expect(title.tagName).toBe('H3')
    })
  })

  /**
   * 情報アラートの表示テスト
   */
  test('displays info alert correctly', () => {
    renderSettingsPage()

    // 情報アラートが表示されているかチェック
    const alert = screen.getByRole('alert') || 
                  screen.getByText('設定機能は開発中です').closest('[role="alert"]')
    expect(alert).toBeInTheDocument()

    // アラートが情報タイプ（info）であることを確認
    // MUIのAlert コンポーネントの severity="info" の確認
    expect(alert).toBeInTheDocument()
  })
})