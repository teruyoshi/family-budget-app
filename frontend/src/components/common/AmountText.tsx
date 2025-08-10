import { Typography, type TypographyProps } from '@mui/material'

/**
 * 金額表示コンポーネントのProps型定義
 */
export interface AmountTextProps {
  /** 表示する金額 */
  amount: number
  /** Typographyバリアント */
  variant?: TypographyProps['variant']
  /** カスタムスタイル */
  sx?: TypographyProps['sx']
}

/**
 * 金額を¥1,000形式で表示するコンポーネント
 *
 * @component
 * @example
 * <AmountText amount={1000} variant="h5" />
 */
export default function AmountText({
  amount,
  variant = 'body1',
  sx,
}: AmountTextProps) {
  return (
    <Typography variant={variant} sx={sx}>
      ¥{amount.toLocaleString()}
    </Typography>
  )
}
