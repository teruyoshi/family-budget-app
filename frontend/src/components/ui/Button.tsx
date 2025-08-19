import {
  Button as MuiButton,
  type ButtonProps as MuiButtonProps,
} from '@mui/material'

/**
 * カスタムButtonコンポーネントのProps型定義
 */
export interface ButtonProps extends Omit<MuiButtonProps, 'sx'> {
  /**
   * ボタンの表示テキスト
   */
  children: React.ReactNode

  /**
   * フルワイドかどうか
   * @default false
   */
  fullWidth?: boolean

  /**
   * 太字フォントかどうか
   * @default true
   */
  bold?: boolean

  /**
   * パディングサイズ（Y軸）
   * @default 1.5
   */
  paddingY?: number

  /**
   * カスタムスタイル（MUI sx props）
   */
  sx?: MuiButtonProps['sx']
}

/**
 * プロジェクト標準Buttonコンポーネント
 *
 * MUI Buttonをベースに、プロジェクト共通のスタイリングとプロパティを適用。
 * フォーム送信ボタンやアクションボタンで統一されたUIを提供。
 *
 * @example
 * ```tsx
 * // 基本的な使用
 * <Button variant="contained" color="primary">
 *   保存
 * </Button>
 *
 * // フォーム送信ボタン
 * <Button
 *   type="submit"
 *   variant="contained"
 *   color="success"
 *   fullWidth
 *   disabled={!isFormValid}
 * >
 *   データを登録
 * </Button>
 *
 * // カスタムスタイル
 * <Button
 *   variant="outlined"
 *   bold={false}
 *   paddingY={1}
 *   sx={{ borderRadius: 2 }}
 * >
 *   キャンセル
 * </Button>
 * ```
 */
export default function Button({
  children,
  fullWidth = false,
  bold = true,
  paddingY = 1.5,
  sx = {},
  ...muiProps
}: ButtonProps) {
  return (
    <MuiButton
      fullWidth={fullWidth}
      sx={{
        fontWeight: bold ? 'bold' : 'normal',
        py: paddingY,
        ...sx,
      }}
      {...muiProps}
    >
      {children}
    </MuiButton>
  )
}
