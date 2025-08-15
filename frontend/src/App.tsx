import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { routes, type AppRoute } from '@/routes/routes'
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
 * - 型安全なルート定義: AppRouteとroutesによる一元管理
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
 * - ルート定義統一: routes配列による設定の一元管理
 * - 型安全性: AppRoute型による厳密なパス管理
 * - コンポーネント再利用: 各ページで共通コンポーネントを活用
 * - 状態管理: useBudgetManager による一元管理
 * - レスポンシブ対応: 全ページでモバイル・デスクトップ対応
 *
 * @example
 * ```tsx
 * // 型安全なナビゲーション例
 * import { AppRoute, getRouteInfo } from '@/routes/routes'
 * 
 * const dashboardRoute: AppRoute = '/'
 * const routeInfo = getRouteInfo(dashboardRoute)
 * console.log(routeInfo?.title) // "ダッシュボード"
 * ```
 */
function App() {
  // ルート設定からページコンポーネントのマッピングを定義
  const getPageComponent = (path: AppRoute) => {
    switch (path) {
      case '/':
        return <DashboardPage />
      case '/expenses':
        return <ExpensePage />
      case '/income':
        return <IncomePage />
      case '/history':
        return <HistoryPage />
      case '/settings':
        return <SettingsPage />
      default:
        return <DashboardPage />
    }
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* routes配列を使用した動的なルート生成 */}
        {routes.map((route) => (
          <Route 
            key={route.path}
            path={route.path}
            element={getPageComponent(route.path)}
          />
        ))}
      </Routes>
    </BrowserRouter>
  )
}

export default App
