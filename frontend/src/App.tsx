import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {
  DashboardPage,
  ExpensePage,
  IncomePage,
  HistoryPage,
  SettingsPage,
} from '@/pages'

/**
 * メインアプリケーションコンポーネント
 *
 * React Router による SPA ルーティングを提供し、
 * 各ページコンポーネントへの適切なルーティングを管理します。
 *
 * @remarks
 * **ルーティング構成:**
 * - BrowserRouter: History API を使用したクライアントサイドルーティング
 * - 全ページコンポーネント対応: Dashboard, Expenses, Income, History, Settings
 * - 型安全なルート定義: AppRouteとの連携
 * 
 * **実装済みページ:**
 * - `/` : DashboardPage - メインダッシュボード（収入・支出統合管理）
 * - `/expenses` : ExpensePage - 支出管理専用ページ
 * - `/income` : IncomePage - 収入管理専用ページ  
 * - `/history` : HistoryPage - 全取引履歴表示ページ
 * - `/settings` : SettingsPage - 設定管理ページ（将来拡張用）
 *
 * **アーキテクチャ:**
 * - ページベース構造: 機能別にページを分離
 * - コンポーネント再利用: 各ページで共通コンポーネントを活用
 * - 状態管理: useBudgetManager による一元管理
 * - レスポンシブ対応: 全ページでモバイル・デスクトップ対応
 *
 * @example
 * ```tsx
 * // 各ページへのナビゲーション例
 * <Link to="/">ダッシュボード</Link>
 * <Link to="/expenses">支出管理</Link>
 * <Link to="/income">収入管理</Link>
 * <Link to="/history">履歴表示</Link>
 * <Link to="/settings">設定</Link>
 * ```
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ダッシュボード（ホーム）ページ */}
        <Route path="/" element={<DashboardPage />} />
        
        {/* 支出管理ページ */}
        <Route path="/expenses" element={<ExpensePage />} />
        
        {/* 収入管理ページ */}
        <Route path="/income" element={<IncomePage />} />
        
        {/* 履歴表示ページ */}
        <Route path="/history" element={<HistoryPage />} />
        
        {/* 設定ページ */}
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
