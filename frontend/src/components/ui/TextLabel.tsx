import { Typography, type TypographyProps } from '@mui/material'

/**
 * テキストラベルコンポーネント
 *
 * コロン自動付加機能付きのラベル表示コンポーネント。
 * フォームやデータ表示でのラベル統一化に使用。
 *
 * @example
 * ```tsx
 * <TextLabel>残高</TextLabel> // → "残高："
 * ```
 */
export interface TextLabelProps {
  /** ラベルとして表示するコンテンツ */
  children: React.ReactNode
  /** Typography の variant 設定 */
  variant?: TypographyProps['variant']
  /** Material-UI の SxProps でスタイルカスタマイズ */
  sx?: TypographyProps['sx']
  /** HTML class 属性 */
  className?: string
  /** ラベル対象の input 要素の ID */
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