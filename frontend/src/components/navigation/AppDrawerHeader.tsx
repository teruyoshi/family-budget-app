import { IconButton, Toolbar, Typography } from '@mui/material'
import { Close as CloseIcon } from '@mui/icons-material'

/**
 * ドロワーヘッダーコンポーネントのProps型定義
 */
export interface AppDrawerHeaderProps {
  /** アプリタイトル */
  title: string
  /** モバイル表示かどうか */
  isMobile: boolean
  /** ドロワーを閉じる処理 */
  onDrawerClose: () => void
}

/**
 * ドロワーヘッダーコンポーネント
 *
 * アプリタイトルとモバイル時の閉じるボタンを表示
 *
 * @example
 * ```tsx
 * <AppDrawerHeader
 *   title="家計簿アプリ"
 *   isMobile={true}
 *   onDrawerClose={handleDrawerClose}
 * />
 * ```
 */
export default function AppDrawerHeader({
  title,
  isMobile,
  onDrawerClose,
}: AppDrawerHeaderProps) {
  return (
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
          color: 'primary.main',
        }}
      >
        {title}
      </Typography>
      {isMobile && (
        <IconButton
          color="inherit"
          aria-label="ナビゲーションを閉じる"
          edge="end"
          onClick={onDrawerClose}
        >
          <CloseIcon />
        </IconButton>
      )}
    </Toolbar>
  )
}
