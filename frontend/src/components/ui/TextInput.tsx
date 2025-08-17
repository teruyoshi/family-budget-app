import { TextField } from '@mui/material'
import type { SxProps, Theme } from '@mui/material'

/**
 * 汎用テキスト入力コンポーネント
 *
 * MUI TextFieldをラップした統一的なテキスト入力UI。
 * 様々な入力タイプに対応し、他の入力コンポーネントの基盤としても使用。
 *
 * @example
 * <TextInput value={name} onChange={setName} label="お名前" placeholder="お名前を入力" />
 *
 * @example
 * <TextInput type="email" value={email} onChange={setEmail} label="メールアドレス" required />
 */

/**
 * TextInputコンポーネントのProps
 */
export interface TextInputProps {
  /** 入力タイプ @default "text" */
  type?: 'text' | 'number' | 'email' | 'password'
  /** プレースホルダーテキスト */
  placeholder?: string
  /** フィールドラベル */
  label?: string
  /** フォーム識別用name属性 */
  name?: string
  /** 入力値 */
  value: string
  /** 値変更時のコールバック */
  onChange: (value: string) => void
  /** フォーカス喪失時のコールバック */
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
  /** カスタムスタイル */
  sx?: SxProps<Theme>
  /** 必須項目フラグ @default false */
  required?: boolean
  /** 全幅表示フラグ @default true */
  fullWidth?: boolean
  /** MUIバリアント @default "outlined" */
  variant?: 'outlined' | 'filled' | 'standard'
  /** エラー状態フラグ */
  error?: boolean
  /** エラーメッセージ */
  helperText?: string
  /** input要素追加属性 */
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>
  /** DOM要素参照 */
  ref?: React.Ref<HTMLInputElement>
}

/**
 * 汎用テキスト入力コンポーネント
 */
function TextInput(props: TextInputProps) {
  const {
    onChange,
    ref,
    type = 'text',
    required = false,
    fullWidth = true,
    variant = 'outlined',
    error = false,
    ...textFieldProps
  } = props

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }

  return (
    <TextField
      {...textFieldProps}
      inputRef={ref}
      type={type}
      required={required}
      fullWidth={fullWidth}
      variant={variant}
      error={error}
      onChange={handleChange}
    />
  )
}

export default TextInput