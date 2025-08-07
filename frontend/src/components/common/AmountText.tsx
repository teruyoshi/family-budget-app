import { Typography, type TypographyProps } from '@mui/material'
import type { ReactNode } from 'react'

interface AmountTextProps {
  children: ReactNode
  amount?: number
  variant?: TypographyProps['variant']
  sx?: TypographyProps['sx']
}

/**
 * 汎用金額テキスト表示コンポーネント
 * 
 * 金額や数値を表示するための汎用コンポーネント。
 * amountが指定された場合は¥1,000形式で表示し、childrenが指定された場合はそのまま表示します。
 */
function AmountText({ children, amount, variant = 'body1', sx }: AmountTextProps) {
  const displayText = amount !== undefined ? `¥${amount.toLocaleString()}` : children
  
  return (
    <Typography variant={variant} sx={sx}>
      {displayText}
    </Typography>
  )
}

export default AmountText