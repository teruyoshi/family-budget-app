import { useState } from 'react'
import { Box, useMediaQuery, useTheme } from '@mui/material'
import AppTopBar from './AppTopBar'
import AppDrawer from './AppDrawer'

/**
 * アプリケーションナビゲーションコンポーネントのProps型定義
 */
export interface AppNavigationProps {
  /** ドロワーの幅 */
  drawerWidth?: number
  /** アプリタイトル */
  title?: string
}

/**
 * アプリケーションナビゲーションコンポーネント
 *
 * MUI AppBar と Drawer を使用したレスポンシブナビゲーション。
 * モバイル・デスクトップ両対応で、アクティブページハイライト機能付き。
 *
 * @remarks
 * **主な機能:**
 * - AppBar: ヘッダーナビゲーション
 * - Drawer: サイドナビゲーション（モバイル対応）
 * - アクティブページハイライト
 * - レスポンシブデザイン
 * - キーボードナビゲーション対応
 * - ARIA アクセシビリティ準拠
 *
 * **レスポンシブ動作:**
 * - デスクトップ: 常時表示のサイドナビゲーション
 * - モバイル: ハンバーガーメニューでトグル式ドロワー
 *
 * **アクセシビリティ:**
 * - ARIA ラベル設定
 * - キーボードナビゲーション
 * - スクリーンリーダー対応
 *
 * @example
 * ```tsx
 * // 基本的な使用例
 * <AppNavigation />
 * ```
 *
 * @example
 * ```tsx
 * // カスタマイズ例
 * <AppNavigation
 *   drawerWidth={280}
 *   title="My Budget App"
 * />
 * ```
 */
export default function AppNavigation({
  drawerWidth = 240,
  title = '家計簿アプリ',
}: AppNavigationProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  /**
   * ハンバーガーメニュートグル処理
   */
  const handleMenuToggle = () => {
    setMobileOpen(prev => !prev)
  }

  /**
   * ドロワーを閉じる処理
   */
  const handleDrawerClose = () => {
    setMobileOpen(false)
  }

  return (
    <Box sx={{ display: 'flex' }}>
      {/* トップバー */}
      <AppTopBar
        drawerWidth={drawerWidth}
        title={title}
        onMenuToggle={handleMenuToggle}
      />

      {/* ナビゲーションドロワー */}
      <AppDrawer
        drawerWidth={drawerWidth}
        title={title}
        isMobile={isMobile}
        mobileOpen={mobileOpen}
        onDrawerClose={handleDrawerClose}
      />
    </Box>
  )
}
