import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getRouteInfo, type AppRoute } from '@/routes/routes'

/**
 * ページタイトル管理用のカスタムフック
 *
 * 現在のルートに基づいてブラウザのタブタイトルを自動更新します。
 * React Routerの現在位置と routes.tsx の設定を連携させて、
 * 一元的なページタイトル管理を実現します。
 *
 * @remarks
 * **主な機能:**
 * - 現在のルートパスに基づく自動タイトル更新
 * - routes.tsx の title 設定との連携
 * - アプリ名付きのタイトル形式: "{ページ名} | 家計簿アプリ"
 * - 404ページ対応
 * - TypeScript による型安全性
 *
 * **使用場面:**
 * - AppLayout コンポーネントでの自動適用
 * - 特定ページでのカスタムタイトル設定
 * - SEO 対応・ユーザビリティ向上
 *
 * @param customTitle - カスタムタイトル（省略時は routes.tsx の設定を使用）
 *
 * @example
 * ```tsx
 * // AppLayout での基本使用（自動タイトル更新）
 * function AppLayout() {
 *   usePageTitle() // 現在ルートに応じて自動更新
 *   return <div>...</div>
 * }
 * ```
 *
 * @example
 * ```tsx
 * // カスタムタイトルの設定
 * function SpecialPage() {
 *   usePageTitle('特別なページ')
 *   return <div>...</div>
 * }
 * ```
 */
export function usePageTitle(customTitle?: string): void {
  const location = useLocation()

  useEffect(() => {
    const appName = '家計簿アプリ'
    
    if (customTitle) {
      // カスタムタイトルが指定された場合
      document.title = `${customTitle} | ${appName}`
      return
    }

    // routes.tsx の設定からタイトルを取得
    const currentRoute = getRouteInfo(location.pathname as AppRoute | '*')
    
    if (currentRoute) {
      document.title = `${currentRoute.title} | ${appName}`
    } else {
      // フォールバック（routes.tsx にない場合）
      document.title = `ページが見つかりません | ${appName}`
    }
  }, [location.pathname, customTitle])
}

/**
 * 現在のページタイトル情報を取得するカスタムフック
 *
 * @returns 現在のページタイトル情報オブジェクト
 *
 * @example
 * ```tsx
 * function PageHeader() {
 *   const titleInfo = useCurrentPageTitle()
 *   return (
 *     <h1>{titleInfo.title}</h1>
 *     <p>{titleInfo.description}</p>
 *   )
 * }
 * ```
 */
export function useCurrentPageTitle() {
  const location = useLocation()
  const currentRoute = getRouteInfo(location.pathname as AppRoute | '*')
  
  return {
    title: currentRoute?.title || 'ページが見つかりません',
    description: currentRoute?.description || '存在しないページへのアクセス',
    path: location.pathname,
  }
}