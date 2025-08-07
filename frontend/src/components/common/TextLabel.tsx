import { Typography, type TypographyProps } from '@mui/material'

interface TextLabelProps {
  text: string
  variant?: TypographyProps['variant']
  sx?: TypographyProps['sx']
}

/**
 * 汎用テキストラベルコンポーネント
 * 
 * 任意のテキストを表示するための汎用コンポーネント。
 * Material-UIのTypographyをラップして再利用可能にしています。
 */
function TextLabel({ text, variant = 'body1', sx }: TextLabelProps) {
  return (
    <Typography variant={variant} sx={sx}>
      {text}
    </Typography>
  )
}

export default TextLabel