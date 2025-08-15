import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useTheme,
  useMediaQuery,
  Divider,
} from '@mui/material'
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  TrendingDown as ExpenseIcon,
  TrendingUp as IncomeIcon,
  History as HistoryIcon,
  Settings as SettingsIcon,
  Close as CloseIcon,
} from '@mui/icons-material'
import { getNavigationRoutes, type AppRoute } from '@/routes/routes'

/**
 * ナビゲーションアイコンマッピング
 */
const navigationIcons = {
  '/': DashboardIcon,
  '/expenses': ExpenseIcon,
  '/income': IncomeIcon,
  '/history': HistoryIcon,
  '/settings': SettingsIcon,
} as const

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
  title = '家計簿アプリ' 
}: AppNavigationProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const location = useLocation()
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

  /**
   * ドロワーコンテンツ
   */
  const drawerContent = (
    <Box>
      {/* ドロワーヘッダー */}
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 2,
        }}
      >
        <Typography 
          variant="h6" 
          noWrap 
          component="div"
          sx={{ 
            fontWeight: 'bold',
            color: 'primary.main' 
          }}
        >
          {title}
        </Typography>
        {isMobile && (
          <IconButton
            color="inherit"
            aria-label="ナビゲーションを閉じる"
            edge="end"
            onClick={handleDrawerClose}
          >
            <CloseIcon />
          </IconButton>
        )}
      </Toolbar>
      
      <Divider />
      
      {/* ナビゲーションメニュー */}
      <List>
        {getNavigationRoutes().map((route) => {
          const Icon = navigationIcons[route.path as keyof typeof navigationIcons]
          const isActive = location.pathname === route.path
          
          return (
            <ListItem key={route.path} disablePadding>
              <ListItemButton
                selected={isActive}
                onClick={() => handleNavigationClick(route.path as AppRoute)}
                onKeyDown={(event) => handleKeyDown(event, route.path as AppRoute)}
                sx={{
                  minHeight: 48,
                  px: 2.5,
                  '&.Mui-selected': {
                    backgroundColor: 'primary.light',
                    color: 'primary.contrastText',
                    '&:hover': {
                      backgroundColor: 'primary.main',
                    },
                  },
                }}
                aria-label={`${route.title}ページに移動`}
                role="menuitem"
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: 3,
                    color: isActive ? 'inherit' : 'text.secondary',
                  }}
                >
                  <Icon />
                </ListItemIcon>
                <ListItemText 
                  primary={route.title}
                  primaryTypographyProps={{
                    fontSize: '0.95rem',
                    fontWeight: isActive ? 'medium' : 'regular',
                  }}
                />
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>
    </Box>
  )

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
          <Typography 
            variant="h6" 
            noWrap 
            component="h1"
            sx={{ flexGrow: 1 }}
          >
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
          {drawerContent}
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
          {drawerContent}
        </Drawer>
      </Box>
    </Box>
  )
}