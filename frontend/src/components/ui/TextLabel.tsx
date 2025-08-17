import { Typography, type TypographyProps } from '@mui/material'

/**
 * テキストラベルコンポーネント
 *
 * コロン自動付加機能付きのラベル表示。
 * フォームやデータ表示でのラベル統一化に使用。
 *
 * @example
 * ```tsx
 * <TextLabel>残高</TextLabel> // → "残高："
 * <TextLabel htmlFor="amount">金額</TextLabel>
 * ```
 */
export interface TextLabelProps {
  children: React.ReactNode
  variant?: TypographyProps['variant']
  sx?: TypographyProps['sx']
  className?: string
  htmlFor?: string
}

function TextLabel({
  children,
  variant = 'body1',
  sx,
  className,
  htmlFor,
}: TextLabelProps) {
  return (
    <Typography
      variant={variant}
      sx={sx}
      className={className}
      {...(htmlFor && { htmlFor })}
    >
      {children}：
    </Typography>
  )
}

export default TextLabel