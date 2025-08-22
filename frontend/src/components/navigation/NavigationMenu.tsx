import { useLocation, useNavigate } from 'react-router-dom'
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import {
  Dashboard as DashboardIcon,
  TrendingDown as ExpenseIcon,
  History as HistoryIcon,
  TrendingUp as IncomeIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material'
import { type AppRoute, getNavigationRoutes } from '@/routes/routes'

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
 * ナビゲーションメニューコンポーネントのProps型定義
 */
export interface NavigationMenuProps {
  /** モバイル表示かどうか */
  isMobile: boolean
  /** ドロワーを閉じる処理（モバイル時のナビゲーション後に実行） */
  onDrawerClose: () => void
}

/**
 * ナビゲーションメニューコンポーネント
 *
 * ナビゲーションアイテムのリストを表示し、アクティブ状態を管理
 *
 * @example
 * ```tsx
 * <NavigationMenu
 *   isMobile={isMobile}
 *   onDrawerClose={handleDrawerClose}
 * />
 * ```
 */
export default function NavigationMenu({
  isMobile,
  onDrawerClose,
}: NavigationMenuProps) {
  const location = useLocation()
  const navigate = useNavigate()

  /**
   * ナビゲーションアイテムクリック処理
   */
  const handleNavigationClick = (path: AppRoute) => {
    navigate(path)
    if (isMobile) {
      onDrawerClose()
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
  )
}
