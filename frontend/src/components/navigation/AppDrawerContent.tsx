import { Box, Divider } from '@mui/material'
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
 * />
 * ```
 */
export default function AppDrawerContent({
  title,
  isMobile,
  onDrawerClose,
}: AppDrawerContentProps) {
  return (
    <Box>
      <AppDrawerHeader
        title={title}
        isMobile={isMobile}
        onDrawerClose={onDrawerClose}
      />
      <Divider />
      <NavigationMenu isMobile={isMobile} onDrawerClose={onDrawerClose} />
    </Box>
  )
}
