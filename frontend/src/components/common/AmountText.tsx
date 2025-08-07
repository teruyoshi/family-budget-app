import { Typography, type TypographyProps } from '@mui/material'
import type { ReactNode } from 'react'

interface AmountTextProps {
  children: ReactNode
  variant?: TypographyProps['variant']
  sx?: TypographyProps['sx']
}

/**
 * 汎用金額テキスト表示コンポーネント
 * 
 * 金額や数値を表示するための汎用コンポーネント。
 * childrenで受け取った内容を表示します。
 */
function AmountText({ children, variant = 'body1', sx }: AmountTextProps) {
  return (
    <Typography variant={variant} sx={sx}>
      {children}
    </Typography>
  )
}

export default AmountText