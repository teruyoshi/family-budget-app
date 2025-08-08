import { Typography, type TypographyProps } from '@mui/material'

/**
 * 金額表示コンポーネントのProps型定義
 */
interface AmountTextProps {
  /** 表示する金額（数値） */
  amount: number
  /** Typography のバリエーション */
  variant?: TypographyProps['variant']
  /** スタイルオブジェクト */
  sx?: TypographyProps['sx']
}

/**
 * 金額表示専用コンポーネント
 *
 * 金額を¥1,000形式で表示する専用コンポーネント。
 * Material-UIのTypographyを使用してフォーマット済みの金額を表示します。
 *
 * @group 共通コンポーネント
 * @component
 * @param {AmountTextProps} props - コンポーネントのプロパティ
 * @param {number} props.amount - 表示する金額（数値）
 * @param {TypographyProps['variant']} props.variant - Typography のバリエーション
 * @param {TypographyProps['sx']} props.sx - スタイルオブジェクト
 * @returns {JSX.Element} フォーマット済み金額を表示するTypographyコンポーネント
 *
 * @example
 * // 基本的な使用例
 * <AmountText amount={1000} />
 *
 * @example
 * // カスタムスタイルを適用
 * <AmountText
 *   amount={50000}
 *   variant="h5"
 *   sx={{ color: 'success.main', fontWeight: 'bold' }}
 * />
 */
function AmountText({ amount, variant = 'body1', sx }: AmountTextProps) {
  return (
    <Typography variant={variant} sx={sx}>
      ¥{amount.toLocaleString()}
    </Typography>
  )
}

export default AmountText
