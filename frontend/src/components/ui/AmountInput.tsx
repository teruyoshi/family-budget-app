import TextInput from './TextInput'
import { amountInputStyles } from './AmountInput.styles'
import { useAmountInput } from './hooks/useAmountInput'
import type { SxProps, Theme } from '@mui/material'

/**
 * 金額入力コンポーネントのProps
 */
export interface AmountInputProps {
  /** 現在の金額 */
  value?: number
  /** 金額変更時のコールバック */
  onChange?: (value: number) => void
  /** フォーカス喪失時コールバック */
  onBlur?: () => void
  /** プレースホルダーテキスト */
  placeholder?: string
  /** MUIスタイル設定 */
  sx?: SxProps<Theme>
  /** 必須入力項目かどうか */
  required?: boolean
  /** 全幅表示するかどうか */
  fullWidth?: boolean
  /** MUI TextFieldのバリアント */
  variant?: 'outlined' | 'filled' | 'standard'
  /** フィールドラベル */
  label?: string
  /** アクセシビリティ説明 */
  'aria-describedby'?: string
  /** エラー状態 */
  error?: boolean
  /** エラーメッセージ */
  helperText?: string
  /** フィールド名 */
  name?: string
  /** DOM要素への参照（React 19準拠） */
  ref?: React.Ref<HTMLInputElement>
}

/**
 * 金額入力コンポーネント
 *
 * React 19準拠のref as prop対応。
 * シンプルなアンコントロールドな金額入力フィールド。
 * 数値を自動で¥記号付きカンマ区切り形式にフォーマット。
 *
 * @example
 * <AmountInput
 *   value={15000}
 *   onChange={setValue}
 *   label="支出金額"
 *   placeholder="金額を入力"
 *   ref={inputRef}
 * />
 */
function AmountInput(props: AmountInputProps) {
  const { value = 0, onChange, ...textInputProps } = props

  const { amount, handleChange } = useAmountInput(value, onChange)

  return (
    <TextInput
      {...textInputProps}
      type="text"
      value={amount}
      onChange={handleChange}
      inputProps={{
        'aria-label':
          textInputProps.label ||
          `金額入力フィールド、現在の値: ${amount || '未入力'}`,
        'aria-describedby': textInputProps['aria-describedby'],
        'aria-invalid': textInputProps.error,
        inputMode: 'numeric' as const,
        pattern: '^¥?[0-9,]*$',
      }}
      sx={{
        ...amountInputStyles.inputField,
        ...textInputProps.sx,
      }}
    />
  )
}

export default AmountInput
