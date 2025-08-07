import { Typography, type TypographyProps } from '@mui/material'
import type { ReactNode } from 'react'

interface TextLabelProps {
  children: ReactNode
  variant?: TypographyProps['variant']
  sx?: TypographyProps['sx']
}

/**
 * 汎用テキストラベルコンポーネント
 *
 * 任意のテキストを表示するための汎用コンポーネント。
 * Material-UIのTypographyをラップして再利用可能にしています。
 * childrenの後にコロンを自動で付与します。
 */
function TextLabel({ children, variant = 'body1', sx }: TextLabelProps) {
  return (
    <Typography variant={variant} sx={sx}>
      {children}：
    </Typography>
  )
}

export default TextLabel
