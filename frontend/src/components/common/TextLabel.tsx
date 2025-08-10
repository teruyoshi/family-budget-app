import { Typography, type TypographyProps } from '@mui/material'
import type { ReactNode } from 'react'

/**
 * テキストラベルコンポーネントのProps型定義
 */
export interface TextLabelProps {
  /** 表示コンテンツ */
  children: ReactNode
  /** Typographyバリアント */
  variant?: TypographyProps['variant']
  /** カスタムスタイル */
  sx?: TypographyProps['sx']
}

/**
 * テキストの後にコロンを自動付加するラベルコンポーネント
 *
 * @component
 * @example
 * <TextLabel>残高</TextLabel> // "残高："
 */
export default function TextLabel({
  children,
  variant = 'body1',
  sx,
}: TextLabelProps) {
  return (
    <Typography variant={variant} sx={sx}>
      {children}：
    </Typography>
  )
}
