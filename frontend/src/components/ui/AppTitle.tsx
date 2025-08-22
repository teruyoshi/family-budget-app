import { Typography, type TypographyProps } from '@mui/material'

/**
 * アプリケーションタイトル表示コンポーネント
 *
 * アプリケーションタイトルを表示する汎用コンポーネント。
 * Typography ベースでカスタマイズ可能。titleが未指定の場合は「家計簿アプリ」を表示。
 *
 * @example
 * ```tsx
 * // デフォルトタイトル
 * <AppTitle />
 * 
 * // カスタムタイトル
 * <AppTitle title="My Budget App" />
 * 
 * // スタイル・バリアントカスタマイズ
 * <AppTitle 
 *   title="家計簿システム"
 *   variant="h3" 
 *   sx={{ color: 'primary.main' }} 
 * />
 * 
 * // ナビゲーション用（折り返しなし・flexGrow）
 * <AppTitle
 *   title="Budget Manager"
 *   variant="h6"
 *   noWrap
 *   sx={{ flexGrow: 1 }}
 * />
 * ```
 */
export interface AppTitleProps {
  /** タイトルテキスト（省略時は「家計簿アプリ」） */
  title?: string
  /** Typography バリアント */
  variant?: TypographyProps['variant']
  /** HTML要素タイプ */
  component?: TypographyProps['component']
  /** MUIスタイル設定 */
  sx?: TypographyProps['sx']
  /** テキストの折り返しを無効にする */
  noWrap?: boolean
}

function AppTitle({ 
  title = '家計簿アプリ', 
  variant = 'h4', 
  component = 'h1', 
  sx,
  noWrap = false 
}: AppTitleProps) {
  return (
    <Typography 
      variant={variant} 
      component={component} 
      sx={sx}
      noWrap={noWrap}
    >
      {title}
    </Typography>
  )
}

export default AppTitle
