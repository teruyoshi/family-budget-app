import { useLocation } from 'react-router-dom'
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
  /** ナビゲーションクリック処理 */
  onNavigationClick: (path: AppRoute) => void
  /** キーボードナビゲーション処理 */
  onKeyDown: (event: React.KeyboardEvent, path: AppRoute) => void
}

/**
 * ナビゲーションメニューコンポーネント
 *
 * ナビゲーションアイテムのリストを表示し、アクティブ状態を管理
 *
 * @example
 * ```tsx
 * <NavigationMenu
 *   onNavigationClick={handleNavigationClick}
 *   onKeyDown={handleKeyDown}
 * />
 * ```
 */
export default function NavigationMenu({
  onNavigationClick,
  onKeyDown,
}: NavigationMenuProps) {
  const location = useLocation()

  return (
    <List>
      {getNavigationRoutes().map((route) => {
        const Icon = navigationIcons[route.path as keyof typeof navigationIcons]
        const isActive = location.pathname === route.path

        return (
          <ListItem key={route.path} disablePadding>
            <ListItemButton
              selected={isActive}
              onClick={() => onNavigationClick(route.path as AppRoute)}
              onKeyDown={(event) => onKeyDown(event, route.path as AppRoute)}
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
