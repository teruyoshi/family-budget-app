import { List } from '@mui/material'
import { getNavigationRoutes } from '@/routes/routes'
import NavigationMenuItem from './NavigationMenuItem'

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
  return (
    <List>
      {getNavigationRoutes().map((route) => (
        <NavigationMenuItem
          key={route.path}
          route={route}
          isMobile={isMobile}
          onDrawerClose={onDrawerClose}
        />
      ))}
    </List>
  )
}
