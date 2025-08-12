import { Typography, type TypographyProps } from '@mui/material'
import { formatMoneyForDisplay } from '@/lib/format'

/**
 * 金額表示コンポーネントのProps型定義
 *
 * 統一された金額フォーマットライブラリを使用し、一貫した表示を提供します。
 */
export interface AmountTextProps {
  /**
   * 表示する金額（数値）
   * @example 15000 → "¥15,000" と表示
   * @example 0 → "¥0" と表示（ゼロ値も表示）
   * @example -1500 → "¥-1,500" と表示（負値も表示）
   */
  amount: number

  /**
   * MUI Typographyバリアント
   * @default "body1"
   */
  variant?: TypographyProps['variant']

  /**
   * MUI sx propsによるカスタムスタイル
   * @example { color: 'success.main' } - 収入表示用の緑色
   * @example { color: 'error.main' } - 支出表示用の赤色
   */
  sx?: TypographyProps['sx']

  /**
   * ¥記号を表示するかどうか
   * @default true
   */
  showSymbol?: boolean

  /**
   * 小数点以下の表示桁数
   * @default 0
   * @example decimalPlaces={2} → "¥1,500.75"
   */
  decimalPlaces?: number

  /** アクセシビリティ用ラベル（aria-label） */
  'aria-label'?: string

  /** アクセシビリティ用説明（aria-describedby） */
  'aria-describedby'?: string
}

/**
 * 金額表示専用コンポーネント
 *
 * 数値を統一された金額フォーマット（¥1,000形式）で表示する読み取り専用コンポーネント。
 * MUI Typographyをベースとし、lib/formatライブラリを使用して一貫したフォーマットを保証します。
 *
 * ## 特徴
 * - 統一フォーマット: lib/format/formatMoneyForDisplayを使用
 * - 完全表示: ゼロ値や負値も含めて全て表示（表示専用）
 * - カスタマイズ可能: 記号表示、小数点桁数、色設定対応
 * - アクセシビリティ対応: aria属性でスクリーンリーダー対応
 * - テーマ対応: MUIのsx propsで色・スタイルカスタマイズ
 *
 * ## 使用例
 *
 * ### 基本的な使用例
 * ```tsx
 * <AmountText amount={15000} variant="h5" />
 * // "¥15,000" と表示
 * ```
 *
 * ### 残高表示（ゼロ値も表示）
 * ```tsx
 * <AmountText
 *   amount={25000}
 *   variant="h4"
 *   sx={{ color: 'primary.main', fontWeight: 'bold' }}
 *   aria-label="現在の残高"
 * />
 * ```
 *
 * ### 収入表示（緑色）
 * ```tsx
 * <AmountText
 *   amount={300000}
 *   variant="body1"
 *   sx={{ color: 'success.main' }}
 *   aria-label="月収入"
 * />
 * ```
 *
 * ### 支出表示（赤色）
 * ```tsx
 * <AmountText
 *   amount={-1500}
 *   variant="body2"
 *   sx={{ color: 'error.main' }}
 *   aria-label="支出金額"
 * />
 * ```
 *
 * ### 小数点表示
 * ```tsx
 * <AmountText
 *   amount={1500.75}
 *   decimalPlaces={2}
 *   variant="body1"
 * />
 * // "¥1,500.75" と表示
 * ```
 */
export default function AmountText({
  amount,
  variant = 'body1',
  sx,
  showSymbol = true,
  decimalPlaces = 0,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedby,
}: AmountTextProps) {
  let formattedAmount: string

  try {
    // 統一フォーマットライブラリを使用（表示専用）
    formattedAmount = formatMoneyForDisplay(amount, {
      showSymbol,
      decimalPlaces,
    })
  } catch (error) {
    // MAX_SAFE_INTEGERを超える値などの無効な値の場合
    formattedAmount = '値が無効です'
    console.warn('AmountText: フォーマット処理でエラーが発生しました:', amount, error)
  }

  return (
    <Typography
      variant={variant}
      sx={sx}
      aria-label={ariaLabel || `金額表示: ${formattedAmount}`}
      aria-describedby={ariaDescribedby}
    >
      {formattedAmount}
    </Typography>
  )
}
