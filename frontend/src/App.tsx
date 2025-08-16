import { BrowserRouter, useRoutes } from 'react-router-dom'
import { routes } from '@/routes/routes'

/**
 * ルーティングコンポーネント
 *
 * useRoutesフックを使用してルーティング設定を管理します。
 * routes配列から動的にルーティングテーブルを生成し、
 * 型安全性とメンテナンス性を向上させています。
 */
function AppRoutes() {
  // routes配列からReact Routerのルート設定を生成
  const routeElements = routes.map((route) => ({
    path: route.path,
    element: route.element,
  }))

  return useRoutes(routeElements)
}

/**
 * ルーターでラップされていない内部アプリケーションコンポーネント
 *
 * テスト環境でMemoryRouterを使用するために、
 * ルーティングロジックを分離しています。
 */
export function AppContent() {
  return <AppRoutes />
}

/**
 * メインアプリケーションコンポーネント
 *
 * React Router による SPA ルーティングを提供し、
 * 各ページコンポーネントへの適切なルーティングを管理します。
 *
 * @remarks
 * **ルーティング構成:**
 * - BrowserRouter: History API を使用したクライアントサイドルーティング
 * - useRoutes: 宣言的なルーティング設定による保守性向上
 * - コード分割: React.lazyによるページ単位の遅延ロード
 * - 404対応: 未知パスに対する適切なフォールバック
 * - 型安全なルート定義: AppRouteとroutesによる一元管理
 *
 * **実装済みページ:**
 * - `/` : DashboardPage - メインダッシュボード（収入・支出統合管理）
 * - `/expenses` : ExpensePage - 支出管理専用ページ
 * - `/income` : IncomePage - 収入管理専用ページ
 * - `/history` : HistoryPage - 全取引履歴表示ページ
 * - `/settings` : SettingsPage - 設定管理ページ（将来拡張用）
 * - `*` : NotFoundPage - 404エラーページ
 *
 * **アーキテクチャ:**
 * - ページベース構造: 機能別にページを分離
 * - ルート定義統一: routes配列による設定の一元管理
 * - 型安全性: AppRoute型による厳密なパス管理
 * - パフォーマンス最適化: コード分割による初期バンドルサイズ削減
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
 *
 * @example
 * ```tsx
 * // ナビゲーションメニューの生成例
 * import { getNavigationRoutes } from '@/routes/routes'
 *
 * const navRoutes = getNavigationRoutes()
 * navRoutes.forEach(route => {
 *   console.log(`${route.title}: ${route.path}`)
 * })
 * ```
 */
function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App
