import { Typography } from '@mui/material'
import { useMoneyFormat } from '@/hooks'
import type { SxProps, Theme, TypographyProps } from '@mui/material'

/**
 * 金額表示コンポーネントのProps
 */
export interface AmountTextProps {
  /** 表示する金額 */
  amount: number
  /** Typographyバリアント @default "body1" */
  variant?: TypographyProps['variant']
  /** カスタムスタイル */
  sx?: SxProps<Theme>
  /** HTML要素タイプ */
  component?: TypographyProps['component']
  /** テスト用ID */
  'data-testid'?: string
}

/**
 * 金額表示コンポーネント
 *
 * 数値を¥記号付きカンマ区切り形式で表示するTypographyベースコンポーネント。
 * アプリ全体で統一された金額フォーマットを提供。
 *
 * @example
 * <AmountText amount={25000} />
 *
 * @example
 * <AmountText amount={1500000} variant="h4" sx={{ color: 'success.main' }} />
 */
export default function AmountText({
  amount,
  variant = 'body1',
  sx,
  component,
  'data-testid': dataTestId,
}: AmountTextProps) {
  const displayAmount = useMoneyFormat(amount).forDisplay

  const typographyProps = {
    variant,
    sx,
    ...(component && { component }),
    ...(dataTestId && { 'data-testid': dataTestId }),
  }

  return (
    <Typography {...typographyProps}>
      {displayAmount}
    </Typography>
  )
}