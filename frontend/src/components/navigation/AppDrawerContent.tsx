import { Box, Divider } from '@mui/material'
import { type AppRoute } from '@/routes/routes'
import AppDrawerHeader from './AppDrawerHeader'
import NavigationMenu from './NavigationMenu'

/**
 * ドロワーコンテンツコンポーネントのProps型定義
 */
export interface AppDrawerContentProps {
  /** アプリタイトル */
  title: string
  /** モバイル表示かどうか */
  isMobile: boolean
  /** ドロワーを閉じる処理 */
  onDrawerClose: () => void
  /** ナビゲーションクリック処理 */
  onNavigationClick: (path: AppRoute) => void
  /** キーボードナビゲーション処理 */
  onKeyDown: (event: React.KeyboardEvent, path: AppRoute) => void
}

/**
 * ドロワーコンテンツコンポーネント
 *
 * ドロワーヘッダーとナビゲーションメニューを統合したコンテンツ
 *
 * @example
 * ```tsx
 * <AppDrawerContent
 *   title="家計簿アプリ"
 *   isMobile={isMobile}
 *   onDrawerClose={handleDrawerClose}
 *   onNavigationClick={handleNavigationClick}
 *   onKeyDown={handleKeyDown}
 * />
 * ```
 */
export default function AppDrawerContent({
  title,
  isMobile,
  onDrawerClose,
  onNavigationClick,
  onKeyDown,
}: AppDrawerContentProps) {
  return (
    <Box>
      <AppDrawerHeader
        title={title}
        isMobile={isMobile}
        onDrawerClose={onDrawerClose}
      />
      <Divider />
      <NavigationMenu
        onNavigationClick={onNavigationClick}
        onKeyDown={onKeyDown}
      />
    </Box>
  )
}
