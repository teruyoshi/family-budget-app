import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, useMediaQuery, useTheme } from '@mui/material'
import { type AppRoute } from '@/routes/routes'
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
  const [isClosing, setIsClosing] = useState(false)

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const navigate = useNavigate()

  /**
   * モバイルドロワーの開閉処理
   */
  const handleDrawerClose = () => {
    setIsClosing(true)
    setMobileOpen(false)
  }

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false)
  }

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen)
    }
  }

  /**
   * ナビゲーションアイテムクリック処理
   */
  const handleNavigationClick = (path: AppRoute) => {
    navigate(path)
    if (isMobile) {
      handleDrawerClose()
    }
  }

  /**
   * キーボードナビゲーション処理
   */
  const handleKeyDown = (event: React.KeyboardEvent, path: AppRoute) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleNavigationClick(path)
    }
  }

  return (
    <Box sx={{ display: 'flex' }}>
      {/* トップバー */}
      <AppTopBar
        drawerWidth={drawerWidth}
        title={title}
        onMenuToggle={handleDrawerToggle}
      />

      {/* ナビゲーションドロワー */}
      <AppDrawer
        drawerWidth={drawerWidth}
        title={title}
        isMobile={isMobile}
        mobileOpen={mobileOpen}
        onDrawerClose={handleDrawerClose}
        onDrawerTransitionEnd={handleDrawerTransitionEnd}
        onNavigationClick={handleNavigationClick}
        onKeyDown={handleKeyDown}
      />
    </Box>
  )
}
