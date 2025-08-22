import { useLocation, useNavigate } from 'react-router-dom'
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material'
import type { AppRoute, RouteInfo } from '@/types'

/**
 * ナビゲーションメニュー項目コンポーネントのProps型定義
 */
export interface NavigationMenuItemProps {
  /** ルート情報 */
  route: RouteInfo
  /** モバイル表示かどうか */
  isMobile: boolean
  /** ドロワーを閉じる処理（モバイル時のナビゲーション後に実行） */
  onDrawerClose: () => void
}

/**
 * ナビゲーションメニュー項目コンポーネント
 *
 * 個別のナビゲーション項目を表示し、クリック・キーボード操作を処理
 *
 * @example
 * ```tsx
 * <NavigationMenuItem
 *   route={route}
 *   isMobile={isMobile}
 *   onDrawerClose={handleDrawerClose}
 * />
 * ```
 */
export default function NavigationMenuItem({
  route,
  isMobile,
  onDrawerClose,
}: NavigationMenuItemProps) {
  const location = useLocation()
  const navigate = useNavigate()

  const Icon = route.icon
  const isActive = location.pathname === route.path

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
    <ListItem disablePadding>
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
          {Icon && <Icon />}
        </ListItemIcon>
        <ListItemText>
          <Typography
            variant="body2"
            sx={{
              fontSize: '0.95rem',
              fontWeight: isActive ? 'medium' : 'regular',
            }}
          >
            {route.title}
          </Typography>
        </ListItemText>
      </ListItemButton>
    </ListItem>
  )
}
