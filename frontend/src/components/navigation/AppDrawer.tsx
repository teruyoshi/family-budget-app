import { useState } from 'react'
import { Box, Drawer } from '@mui/material'
import AppDrawerContent from './AppDrawerContent'

/**
 * アプリケーションドロワーコンポーネントのProps型定義
 */
export interface AppDrawerProps {
  /** ドロワーの幅 */
  drawerWidth: number
  /** アプリタイトル */
  title: string
  /** モバイル表示かどうか */
  isMobile: boolean
  /** モバイルドロワーの開閉状態 */
  mobileOpen: boolean
  /** ドロワーを閉じる処理 */
  onDrawerClose: () => void
}

/**
 * アプリケーションドロワーコンポーネント
 *
 * MUI Drawerを使用したレスポンシブナビゲーションドロワー。
 * モバイル・デスクトップ両対応で、適切な表示切り替えを行う。
 *
 * @remarks
 * **主な機能:**
 * - モバイル用一時的ドロワー（temporary）
 * - デスクトップ用永続的ドロワー（permanent）
 * - レスポンシブな表示切り替え
 * - パフォーマンス最適化（keepMounted）
 * - アクセシビリティ対応
 *
 * **レスポンシブ動作:**
 * - xs~sm: モバイル用ドロワー（オーバーレイ表示）
 * - md~: デスクトップ用ドロワー（常時表示）
 *
 * **パフォーマンス最適化:**
 * - モバイル用にkeepMountedを設定
 * - 適切なboxSizing設定
 * - MUIブレークポイント活用
 *
 * @example
 * ```tsx
 * <AppDrawer
 *   drawerWidth={240}
 *   title="家計簿アプリ"
 *   isMobile={isMobile}
 *   mobileOpen={mobileOpen}
 *   onDrawerClose={handleDrawerClose}
 * />
 * ```
 */
export default function AppDrawer({
  drawerWidth,
  title,
  isMobile,
  mobileOpen,
  onDrawerClose,
}: AppDrawerProps) {
  const [isClosing, setIsClosing] = useState(false)

  /**
   * ドロワー遷移終了処理
   */
  const handleDrawerTransitionEnd = () => {
    setIsClosing(false)
  }

  /**
   * ドロワーを閉じる処理（内部状態考慮）
   */
  const handleDrawerClose = () => {
    if (!isClosing) {
      setIsClosing(true)
      onDrawerClose()
    }
  }
  return (
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
        />
      </Drawer>
    </Box>
  )
}