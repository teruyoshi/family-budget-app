import { Typography, type TypographyProps } from '@mui/material'

/**
 * アプリケーションタイトル表示コンポーネント
 *
 * 「家計簿アプリ」固定タイトルを表示する専用コンポーネント。
 * Typography ベースでカスタマイズ可能。
 *
 * @example
 * ```tsx
 * <AppTitle />
 * <AppTitle variant="h3" sx={{ color: 'primary.main' }} />
 * ```
 */
export interface AppTitleProps {
  variant?: TypographyProps['variant']
  component?: TypographyProps['component']
  sx?: TypographyProps['sx']
}

function AppTitle({ variant = 'h4', component = 'h1', sx }: AppTitleProps) {
  return (
    <Typography variant={variant} component={component} sx={sx}>
      家計簿アプリ
    </Typography>
  )
}

export default AppTitle
