import { ReactNode } from 'react'
import { Container, Box } from '@mui/material'

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
}

/**
 * アプリケーション共通レイアウトコンポーネント
 *
 * 全ページで共通するレイアウト要素を提供します。
 * 現在は基本的なコンテナとスタイリングのみですが、
 * 将来的にはナビゲーションバー、フッター等の共通要素を追加予定です。
 *
 * @remarks
 * **現在の機能:**
 * - 統一されたコンテナ幅とスタイリング
 * - レスポンシブ対応
 * - 背景色・パディングの統一
 *
 * **将来的な拡張予定:**
 * - ナビゲーションバー（AppBar + Drawer）
 * - フッター
 * - パンくずリスト
 * - サイドバー
 * - 通知・アラート表示エリア
 *
 * **使用例:**
 * - 各ページコンポーネントで共通レイアウトとして使用
 * - ナビゲーション機能追加時の統合ポイント
 *
 * @example
 * ```tsx
 * // 基本的な使用例
 * <AppLayout>
 *   <YourPageContent />
 * </AppLayout>
 * ```
 *
 * @example
 * ```tsx
 * // カスタマイズされた使用例
 * <AppLayout maxWidth="lg" backgroundColor="#f0f0f0" padding={3}>
 *   <YourPageContent />
 * </AppLayout>
 * ```
 */
export default function AppLayout({
  children,
  maxWidth = 'md',
  backgroundColor = '#f5f5f5',
  padding = 4,
}: AppLayoutProps) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor,
      }}
    >
      {/* 将来的な拡張予定エリア: ナビゲーションバー */}
      {/* 
      <AppNavigation />
      */}

      {/* メインコンテンツエリア */}
      <Container
        maxWidth={maxWidth}
        sx={{
          py: padding,
        }}
      >
        {children}
      </Container>

      {/* 将来的な拡張予定エリア: フッター */}
      {/* 
      <AppFooter />
      */}
    </Box>
  )
}