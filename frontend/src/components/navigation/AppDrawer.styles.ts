import type { SxProps, Theme } from '@mui/material'

/**
 * AppDrawerコンポーネントのスタイル定義
 *
 * MUI Drawerのレスポンシブナビゲーションスタイル設定。
 */
export const appDrawerStyles = {
  /**
   * モバイル用一時的ドロワーのスタイル
   *
   * ## スタイル特徴
   * - xs~sm: モバイル端末でのみ表示（block）
   * - md~: デスクトップで非表示（none）
   * - オーバーレイ表示によるモバイル最適化
   */
  mobileDrawer: (drawerWidth: number) =>
    ({
      display: { xs: 'block', md: 'none' },
      '& .MuiDrawer-paper': {
        boxSizing: 'border-box',
        width: drawerWidth,
      },
    }) satisfies SxProps<Theme>,

  /**
   * デスクトップ用永続的ドロワーのスタイル
   *
   * ## スタイル特徴
   * - xs~sm: モバイル端末で非表示（none）
   * - md~: デスクトップで表示（block）
   * - 常時表示による効率的ナビゲーション
   */
  desktopDrawer: (drawerWidth: number) =>
    ({
      display: { xs: 'none', md: 'block' },
      '& .MuiDrawer-paper': {
        boxSizing: 'border-box',
        width: drawerWidth,
      },
    }) satisfies SxProps<Theme>,
} as const
