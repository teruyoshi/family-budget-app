import { Typography, type TypographyProps } from '@mui/material'
import type { ReactNode } from 'react'

/**
 * テキストラベルコンポーネントのProps型定義
 */
interface TextLabelProps {
  /** 表示するコンテンツ */
  children: ReactNode
  /** Typography のバリエーション */
  variant?: TypographyProps['variant']
  /** スタイルオブジェクト */
  sx?: TypographyProps['sx']
}

/**
 * 汎用テキストラベルコンポーネント
 *
 * 任意のテキストを表示するための汎用コンポーネント。
 * Material-UIのTypographyをラップして再利用可能にしています。
 * childrenの後にコロンを自動で付与します。
 *
 * @component
 * @param {TextLabelProps} props - コンポーネントのプロパティ
 * @param {ReactNode} props.children - 表示するコンテンツ
 * @param {TypographyProps['variant']} props.variant - Typography のバリエーション
 * @param {TypographyProps['sx']} props.sx - スタイルオブジェクト
 * @returns {JSX.Element} コロン付きのテキストラベルコンポーネント
 *
 * @example
 * // 基本的な使用例
 * <TextLabel>残高</TextLabel>  // 出力: "残高："
 *
 * @example
 * // カスタムバリエーションで使用
 * <TextLabel variant="h6">合計支出</TextLabel>
 */
function TextLabel({ children, variant = 'body1', sx }: TextLabelProps) {
  return (
    <Typography variant={variant} sx={sx}>
      {children}：
    </Typography>
  )
}

export default TextLabel
