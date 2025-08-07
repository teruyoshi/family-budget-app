import { Typography, type TypographyProps } from '@mui/material'

interface AmountTextProps {
  amount: number
  variant?: TypographyProps['variant']
  sx?: TypographyProps['sx']
}

/**
 * 金額表示専用コンポーネント
 *
 * 金額を¥1,000形式で表示する専用コンポーネント。
 */
function AmountText({
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

export default AmountText
