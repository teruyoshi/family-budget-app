import { type ReactNode } from 'react'
import { Box, Container, Toolbar } from '@mui/material'
import { AppBreadcrumbs, AppNavigation } from '@/components/navigation_old'
import { PageTransition } from '@/components/common_old'
import { usePageTitle } from '@/hooks'

/**
 * アプリケーション共通レイアウトコンポーネントのProps型定義
 */
export interface AppLayoutProps {
  /** レンダリングする子要素 */
  children: ReactNode
  /** 最大幅の設定 */
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false
  /** 背景色の設定 */
  backgroundColor?: string
  /** パディングの設定 */
  padding?: number | string
  /** ナビゲーションの表示有無 */
  showNavigation?: boolean
  /** ドロワーの幅 */
  drawerWidth?: number
  /** アプリタイトル */
  title?: string
  /** ページトランジション設定 */
  enableTransitions?: boolean
  /** トランジションタイプ */
  transitionType?: 'fade' | 'slide' | 'none'
  /** パンくずナビゲーションの表示有無 */
  showBreadcrumbs?: boolean
}

/**
 * アプリケーション共通レイアウトコンポーネント
 *
 * 全ページで共通するレイアウト要素を提供します。
 * AppNavigation（AppBar + Drawer）を統合し、
 * レスポンシブ対応の完全なアプリケーションレイアウトを実現します。
 *
 * @remarks
 * **主な機能:**
 * - AppNavigation統合（AppBar + Drawer）
 * - レスポンシブナビゲーション（モバイル・デスクトップ対応）
 * - 統一されたコンテナ幅とスタイリング
 * - アクティブページハイライト
 * - アクセシビリティ対応
 *
 * **レイアウト構造:**
 * - ヘッダー: AppBar（モバイルではハンバーガーメニュー）
 * - サイドバー: Drawer（デスクトップでは常時表示、モバイルではトグル）
 * - メインコンテンツ: ナビゲーション幅を考慮した適切な配置
 *
 * **将来的な拡張予定:**
 * - フッター
 * - パンくずリスト
 * - 通知・アラート表示エリア
 * - ページタイトル管理
 *
 * @example
 * ```tsx
 * // 基本的な使用例（ナビゲーション有り）
 * <AppLayout>
 *   <YourPageContent />
 * </AppLayout>
 * ```
 *
 * @example
 * ```tsx
 * // ナビゲーション無しの使用例
 * <AppLayout showNavigation={false}>
 *   <LoginPage />
 * </AppLayout>
 * ```
 *
 * @example
 * ```tsx
 * // カスタマイズされた使用例
 * <AppLayout
 *   maxWidth="lg"
 *   backgroundColor="#f0f0f0"
 *   drawerWidth={280}
 *   title="My Custom App"
 * >
 *   <YourPageContent />
 * </AppLayout>
 * ```
 */
export default function AppLayout({
  children,
  maxWidth = 'md',
  backgroundColor = '#f5f5f5',
  padding = 4,
  showNavigation = true,
  drawerWidth = 240,
  title = '家計簿アプリ',
  enableTransitions = true,
  transitionType = 'fade',
  showBreadcrumbs = true,
}: AppLayoutProps) {
  // ページタイトル自動管理
  usePageTitle()
  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        backgroundColor,
      }}
    >
      {/* ナビゲーション */}
      {showNavigation && (
        <AppNavigation drawerWidth={drawerWidth} title={title} />
      )}

      {/* メインコンテンツエリア */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: showNavigation
            ? { md: `calc(100% - ${drawerWidth}px)` }
            : '100%',
          minHeight: '100vh',
        }}
      >
        {/* AppBar のスペース確保 */}
        {showNavigation && <Toolbar />}

        {/* ページコンテンツ */}
        <Container
          maxWidth={maxWidth}
          sx={{
            py: padding,
            px: { xs: 2, sm: 3 },
          }}
        >
          {/* パンくずナビゲーション */}
          {showBreadcrumbs && <AppBreadcrumbs />}

          {enableTransitions ? (
            <PageTransition type={transitionType}>{children}</PageTransition>
          ) : (
            children
          )}
        </Container>

        {/* 将来的な拡張予定エリア: フッター */}
        {/* 
        <AppFooter />
        */}
      </Box>
    </Box>
  )
}
