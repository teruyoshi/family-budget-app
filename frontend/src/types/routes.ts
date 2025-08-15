/**
 * React Router 用の型定義
 *
 * アプリケーション内のルーティングに関する型安全性を提供します。
 * 将来的なページ追加時の拡張性を考慮した設計となっています。
 */

/**
 * アプリケーション内の利用可能なルートパス
 *
 * @remarks
 * - 型安全なナビゲーションとルート管理を提供
 * - 将来的な機能拡張に対応した拡張可能な設計
 * - TypeScript の文字列リテラル型による厳密なパス管理
 */
export type AppRoute = 
  | '/'           // ダッシュボード（ホーム）
  | '/expenses'   // 支出管理ページ（将来実装）
  | '/income'     // 収入管理ページ（将来実装）
  | '/history'    // 履歴表示ページ（将来実装）
  | '/settings'   // 設定ページ（将来実装）

/**
 * ルート情報の型定義
 *
 * ナビゲーション生成やメタ情報管理に使用する構造化されたルート情報。
 */
export interface RouteInfo {
  /** ルートパス */
  path: AppRoute
  /** ページタイトル */
  title: string
  /** ページの説明 */
  description: string
  /** ナビゲーションメニューでの表示有無 */
  showInNavigation: boolean
}

/**
 * アプリケーションの全ルート情報
 *
 * 各ページのメタ情報とナビゲーション設定を一元管理。
 * 新しいページ追加時はこの配列に追加することで、
 * ナビゲーションメニューやメタ情報が自動的に反映されます。
 */
export const routes: RouteInfo[] = [
  {
    path: '/',
    title: 'ダッシュボード',
    description: '家計簿の概要と主要機能へのアクセス',
    showInNavigation: true,
  },
  {
    path: '/expenses',
    title: '支出管理',
    description: '支出の登録と履歴管理',
    showInNavigation: true,
  },
  {
    path: '/income',
    title: '収入管理', 
    description: '収入の登録と履歴管理',
    showInNavigation: true,
  },
  {
    path: '/history',
    title: '履歴表示',
    description: '全ての取引履歴の一覧表示',
    showInNavigation: true,
  },
  {
    path: '/settings',
    title: '設定',
    description: 'アプリケーションの設定管理',
    showInNavigation: true,
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
export function getRouteInfo(path: AppRoute): RouteInfo | undefined {
  return routes.find(route => route.path === path)
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
  return routes.filter(route => route.showInNavigation)
}