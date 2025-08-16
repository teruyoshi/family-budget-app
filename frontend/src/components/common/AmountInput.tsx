import { forwardRef } from 'react'
import { useMoney, useMoneyFormat } from '@/hooks'
import { parseMoneyString } from '@/lib/format'
import TextInput from './TextInput'
import type { SxProps, Theme } from '@mui/material'

/**
 * 金額入力コンポーネントのProps型定義
 *
 * 金額入力に特化したプロパティセット。react-hook-form対応で、
 * 自動的に¥記号とカンマ区切りで表示される。
 */
export interface AmountInputProps {
  /** プレースホルダーテキスト（例: "金額を入力してください"） */
  placeholder?: string

  /**
   * 現在の金額（数値）
   * @example 15000 → "¥15,000" と表示
   */
  value?: number

  /**
   * 金額変更時のコールバック関数
   * @param value 入力された数値（NaNや無効値は渡されない）
   */
  onChange?: (value: number) => void

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

  /** フィールド名（react-hook-form用） */
  name?: string

  /** フォーカス失ったときのコールバック（react-hook-form用） */
  onBlur?: () => void
}

/**
 * 金額入力専用コンポーネント
 *
 * 数値入力を統一された金額表示フォーマットに自動変換する特殊なテキスト入力コンポーネント。
 * react-hook-formとの完全な互換性を持ち、自動的にカンマ区切りと¥記号を表示し、
 * 右寄せレイアウトで数値の視認性を向上させます。
 *
 * ## 特徴
 * - react-hook-form完全対応: forwardRefでref転送、Controller連携
 * - 統一フォーマット: lib/format/useMoney + parseMoneyString を使用
 * - 入力中は数値のみを受け付け、自動的に¥15,000形式でフォーマット
 * - 堅牢なパース処理: 統一されたparseMoneyString関数でエラーハンドリング
 * - 右寄せ表示で金額の桁を把握しやすい
 * - プレースホルダーは中央揃えで使いやすさを配慮
 * - 半角数値のみ受け付け、全角数値は自動変換
 *
 * ## 使用例
 *
 * ### react-hook-formでの使用例
 * ```tsx
 * import { useForm, Controller } from 'react-hook-form'
 * import { zodResolver } from '@hookform/resolvers/zod'
 * import { amountInputSchema } from '@/lib/validation/schemas'
 *
 * const { control, handleSubmit } = useForm({
 *   resolver: zodResolver(amountInputSchema)
 * })
 *
 * <Controller
 *   name="amount"
 *   control={control}
 *   render={({ field, fieldState }) => (
 *     <AmountInput
 *       {...field}
 *       placeholder="金額を入力してください"
 *       error={!!fieldState.error}
 *       helperText={fieldState.error?.message}
 *     />
 *   )}
 * />
 * ```
 *
 * ### 従来の使用例（互換性維持）
 * ```tsx
 * <AmountInput
 *   value={amount}
 *   onChange={setAmount}
 *   placeholder="金額を入力してください"
 * />
 * ```
 */
const AmountInput = forwardRef<HTMLInputElement, AmountInputProps>(
  function AmountInput(
    {
      placeholder,
      value = 0,
      onChange,
      sx,
      required = false,
      fullWidth = true,
      variant = 'outlined',
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescribedby,
      error = false,
      helperText,
      name,
      onBlur,
    },
    ref
  ) {
    const [money, setMoney] = useMoney(value)
    const { forInput: displayValue } = useMoneyFormat(money)

    const handleChange = (inputValue: string) => {
      try {
        // 統一されたパース処理ライブラリを使用
        // ¥記号、カンマ、全角数字などを適切に処理
        const numericValue = parseMoneyString(inputValue)
        setMoney(numericValue)
        onChange?.(numericValue)
      } catch (error) {
        // MAX_SAFE_INTEGERを超える値や無効な入力の場合
        // エラーを無視して現在の値を維持（UIの安定性を保つ）
        console.warn(
          'AmountInput: 入力値が大きすぎるか無効です:',
          inputValue,
          error
        )
      }
    }

    return (
      <TextInput
        ref={ref}
        type="text"
        name={name}
        placeholder={placeholder}
        value={displayValue}
        onChange={handleChange}
        onBlur={onBlur}
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
          pattern: '^¥?[0-9,]*$',
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
)

export default AmountInput