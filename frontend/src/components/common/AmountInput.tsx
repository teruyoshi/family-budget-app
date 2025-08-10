import { useAmount } from '@/hooks'
import TextInput from './TextInput'
import type { SxProps, Theme } from '@mui/material'

/**
 * 金額入力コンポーネントのProps型定義
 *
 * 金額入力に特化したプロパティセット。自動的に¥記号とカンマ区切りで表示される。
 */
export interface AmountInputProps {
  /** プレースホルダーテキスト（例: "金額を入力してください"） */
  placeholder?: string

  /**
   * 現在の金額（数値）
   * @example 15000 → "¥15,000" と表示
   */
  value: number

  /**
   * 金額変更時のコールバック関数
   * @param value 入力された数値（NaNや無効値は渡されない）
   */
  onChange: (value: number) => void

  /** MUI sx propsによるカスタムスタイル */
  sx?: SxProps<Theme>

  /** 必須項目として扱うかどうか（バリデーション表示用） */
  required?: boolean

  /** 全幅で表示するかどうか（デフォルト: true） */
  fullWidth?: boolean

  /**
   * MUI TextFieldのバリアント
   * @default "outlined"
   */
  variant?: 'outlined' | 'filled' | 'standard'

  /** アクセシビリティ用ラベル（aria-label） */
  'aria-label'?: string

  /** アクセシビリティ用説明（aria-describedby） */
  'aria-describedby'?: string

  /** エラー状態を表示するかどうか */
  error?: boolean

  /** エラーメッセージテキスト */
  helperText?: string
}

/**
 * 金額入力専用コンポーネント
 *
 * 数値入力を金額表示に自動変換する特殊なテキスト入力コンポーネント。
 * 自動的にカンマ区切りと¥記号を表示し、右寄せレイアウトで数値の視認性を向上させます。
 * TextInputをベースにしており、内部的には数値として管理されます。
 *
 * ## 特徴
 * - 入力中は数値のみを受け付け、自動的に¥15,000形式でフォーマット
 * - 右寄せ表示で金額の桁を把握しやすい
 * - プレースホルダーは中央揃えで使いやすさを配慮
 * - 半角数値のみ受け付け、全角数値は自動変換
 *
 * ## 使用例
 *
 * ### 基本的な使用例
 * ```tsx
 * <AmountInput
 *   value={amount}
 *   onChange={setAmount}
 *   placeholder="金額を入力してください"
 * />
 * ```
 *
 * ### 支出入力フォーム
 * ```tsx
 * <AmountInput
 *   value={expense}
 *   onChange={setExpense}
 *   placeholder="支出金額"
 *   required
 *   variant="outlined"
 * />
 * ```
 *
 * ### カスタムスタイル適用
 * ```tsx
 * <AmountInput
 *   value={income}
 *   onChange={setIncome}
 *   sx={{ backgroundColor: 'success.light' }}
 *   fullWidth={false}
 * />
 * ```
 */
export default function AmountInput({
  placeholder,
  value,
  onChange,
  sx,
  required = false,
  fullWidth = true,
  variant = 'outlined',
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedby,
  error = false,
  helperText,
}: AmountInputProps) {
  const [{ formatted: displayValue }, setAmount] = useAmount(value)

  const handleChange = (inputValue: string) => {
    const numericValue = parseInt(inputValue.replace(/[^0-9]/g, ''), 10) || 0
    setAmount(numericValue)
    onChange(numericValue)
  }

  return (
    <TextInput
      type="text"
      placeholder={placeholder}
      value={displayValue}
      onChange={handleChange}
      required={required}
      fullWidth={fullWidth}
      variant={variant}
      error={error}
      helperText={helperText}
      inputProps={{
        'aria-label':
          ariaLabel ||
          `金額入力フィールド、現在の値: ${displayValue || '未入力'}`,
        'aria-describedby': ariaDescribedby,
        'aria-invalid': error,
        inputMode: 'numeric' as const,
        pattern: '[0-9]*',
      }}
      sx={{
        '& .MuiInputBase-input': {
          textAlign: 'right',
          '&::placeholder': {
            textAlign: 'center',
            opacity: 0.6,
          },
        },
        ...sx,
      }}
    />
  )
}
