import { type ReactElement, Suspense, lazy } from 'react'
import PageLoader from '@/components/common/PageLoader'
import NotFoundPage from '@/components/common/NotFoundPage'

/**
 * React Router 用のルート定義と型定義
 *
 * アプリケーション内のルーティング設定と型安全性を一元管理します。
 * コード分割とエラーハンドリングを含む包括的なルーティング設定を提供します。
 */

/**
 * アプリケーション内の利用可能なルートパス
 *
 * @remarks
 * - 型安全なナビゲーションとルート管理を提供
 * - 全ページコンポーネント実装完了済み
 * - TypeScript の文字列リテラル型による厳密なパス管理
 */
export type AppRoute =
  | '/' // ダッシュボード（ホーム）- 実装済み
  | '/expenses' // 支出管理ページ - 実装済み
  | '/income' // 収入管理ページ - 実装済み
  | '/history' // 履歴表示ページ - 実装済み
  | '/settings' // 設定ページ - 実装済み（基盤のみ）

// コード分割による遅延ロード
const DashboardPage = lazy(() => import('@/pages/DashboardPage'))
const ExpensePage = lazy(() => import('@/pages/ExpensePage'))
const IncomePage = lazy(() => import('@/pages/IncomePage'))
const HistoryPage = lazy(() => import('@/pages/HistoryPage'))
const SettingsPage = lazy(() => import('@/pages/SettingsPage'))

/**
 * Suspenseでラップされたページコンポーネントを作成
 */
const withSuspense = (
  Component: React.LazyExoticComponent<() => ReactElement>
) => (
  <Suspense fallback={<PageLoader />}>
    <Component />
  </Suspense>
)

/**
 * ルート情報の型定義
 *
 * ルート設定、メタ情報、コンポーネントを一元管理する構造化されたルート情報。
 * コード分割とナビゲーション設定を統合した設計となっています。
 */
export interface RouteInfo {
  /** ルートパス */
  path: AppRoute | '*'
  /** ページタイトル */
  title: string
  /** ページの説明 */
  description: string
  /** レンダリングするコンポーネント */
  element: ReactElement
  /** ナビゲーションメニューでの表示有無 */
  showInNavigation: boolean
}

/**
 * アプリケーションの全ルート情報
 *
 * 各ページのメタ情報、コンポーネント、ナビゲーション設定を一元管理。
 * 新しいページ追加時はこの配列に追加することで、
 * ルーティング、ナビゲーションメニュー、メタ情報が自動的に反映されます。
 *
 * @remarks
 * - コード分割: React.lazyによる遅延ロード
 * - 404対応: 未知パスのフォールバック設定
 * - 型安全性: AppRoute型による厳密なパス管理
 */
export const routes: RouteInfo[] = [
  {
    path: '/',
    title: 'ダッシュボード',
    description: '家計簿の概要と主要機能へのアクセス',
    element: withSuspense(DashboardPage),
    showInNavigation: true,
  },
  {
    path: '/expenses',
    title: '支出管理',
    description: '支出の登録と履歴管理',
    element: withSuspense(ExpensePage),
    showInNavigation: true,
  },
  {
    path: '/income',
    title: '収入管理',
    description: '収入の登録と履歴管理',
    element: withSuspense(IncomePage),
    showInNavigation: true,
  },
  {
    path: '/history',
    title: '履歴表示',
    description: '全ての取引履歴の一覧表示',
    element: withSuspense(HistoryPage),
    showInNavigation: true,
  },
  {
    path: '/settings',
    title: '設定',
    description: 'アプリケーションの設定管理',
    element: withSuspense(SettingsPage),
    showInNavigation: true,
  },
  {
    path: '*',
    title: '404 - ページが見つかりません',
    description: '存在しないページへのアクセス',
    element: <NotFoundPage />,
    showInNavigation: false,
  },
] as const

/**
 * ルートパスからルート情報を取得するヘルパー関数
 *
 * @param path - 検索対象のルートパス
 * @returns ルート情報、見つからない場合は undefined
 *
 * @example
 * ```typescript
 * const dashboardRoute = getRouteInfo('/')
 * console.log(dashboardRoute?.title) // "ダッシュボード"
 * ```
 */
export function getRouteInfo(path: AppRoute | '*'): RouteInfo | undefined {
  return routes.find((route) => route.path === path)
}

/**
 * ナビゲーションメニューに表示するルートのみを取得
 *
 * @returns ナビゲーション表示対象のルート情報配列
 *
 * @example
 * ```typescript
 * const navRoutes = getNavigationRoutes()
 * // ナビゲーションメニューの生成に使用
 * ```
 */
export function getNavigationRoutes(): RouteInfo[] {
  return routes.filter((route) => route.showInNavigation)
}
