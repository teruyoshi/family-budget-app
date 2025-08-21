import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { Menu as MenuIcon } from '@mui/icons-material'
import { type AppRoute } from '@/routes/routes'
import AppDrawerContent from './AppDrawerContent'

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
      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          zIndex: theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="ナビゲーションメニューを開く"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="h1" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
        </Toolbar>
      </AppBar>

      {/* ナビゲーションドロワー */}
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label="メインナビゲーション"
        role="navigation"
      >
        {/* モバイル用ドロワー */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // モバイルパフォーマンス向上
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          <AppDrawerContent
            title={title}
            isMobile={isMobile}
            onDrawerClose={handleDrawerClose}
            onNavigationClick={handleNavigationClick}
            onKeyDown={handleKeyDown}
          />
        </Drawer>

        {/* デスクトップ用ドロワー */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          open
        >
          <AppDrawerContent
            title={title}
            isMobile={isMobile}
            onDrawerClose={handleDrawerClose}
            onNavigationClick={handleNavigationClick}
            onKeyDown={handleKeyDown}
          />
        </Drawer>
      </Box>
    </Box>
  )
}
