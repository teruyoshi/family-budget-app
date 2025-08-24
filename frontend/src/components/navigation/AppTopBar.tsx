import { AppBar, IconButton, Toolbar, useTheme } from '@mui/material'
import { Menu as MenuIcon } from '@mui/icons-material'
import { AppTitle } from '@/components/ui'

/**
 * アプリケーショントップバーコンポーネントのProps型定義
 */
export interface AppTopBarProps {
  /** ドロワーの幅 */
  drawerWidth: number
  /** アプリタイトル */
  title: string
  /** ハンバーガーメニュークリック処理 */
  onMenuToggle: () => void
}

/**
 * アプリケーショントップバーコンポーネント
 *
 * MUI AppBarを使用したヘッダーナビゲーション。
 * モバイル・デスクトップ対応でハンバーガーメニュー機能付き。
 *
 * @remarks
 * **主な機能:**
 * - レスポンシブAppBar表示
 * - モバイル用ハンバーガーメニュー
 * - アプリタイトル表示
 * - ドロワー幅に応じた自動調整
 * - アクセシビリティ対応
 *
 * **レスポンシブ動作:**
 * - デスクトップ: ドロワー幅を考慮した固定位置表示
 * - モバイル: 全幅表示でハンバーガーメニュー表示
 *
 * @example
 * ```tsx
 * <AppTopBar
 *   drawerWidth={240}
 *   title="家計簿アプリ"
 *   onMenuToggle={handleDrawerToggle}
 * />
 * ```
 */
export default function AppTopBar({
  drawerWidth,
  title,
  onMenuToggle,
}: AppTopBarProps) {
  const theme = useTheme()

  return (
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
          onClick={onMenuToggle}
          sx={{ mr: 2, display: { md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <AppTitle
          title={title}
          variant="h6"
          component="h1"
          noWrap
          sx={{ flexGrow: 1 }}
        />
      </Toolbar>
    </AppBar>
  )
}
