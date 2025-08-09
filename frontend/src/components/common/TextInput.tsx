import { forwardRef } from 'react'
import { TextField } from '@mui/material'
import type { SxProps, Theme } from '@mui/material'

/**
 * 汎用テキスト入力コンポーネント
 *
 * MUI TextFieldをラップし、プロジェクト全体で一貫したAPIを提供します。
 *
 * @group 共通コンポーネント
 *
 * @example
 * // 基本使用例
 * <TextInput
 *   value={name}
 *   onChange={setName}
 *   placeholder="名前を入力"
 * />
 *
 * @example
 * // 数値入力
 * <TextInput
 *   type="number"
 *   value={amount}
 *   onChange={setAmount}
 *   required
 * />
 *
 * @example
 * // メール入力
 * <TextInput
 *   type="email"
 *   value={email}
 *   onChange={setEmail}
 *   placeholder="メールアドレス"
 *   required
 * />
 */

/**
 * テキスト入力コンポーネントのProps型定義
 */
interface TextInputProps {
  /** 入力フィールドのタイプ */
  type?: 'text' | 'number' | 'email' | 'password'
  /** プレースホルダーテキスト */
  placeholder?: string
  /** 現在の入力値 */
  value: string
  /** 値変更時のコールバック関数 */
  onChange: (value: string) => void
  /** スタイルオブジェクト */
  sx?: SxProps<Theme>
  /** 必須項目かどうか */
  required?: boolean
  /** 全幅で表示するかどうか */
  fullWidth?: boolean
  /** 入力フィールドのバリアント */
  variant?: 'outlined' | 'filled' | 'standard'
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      type = 'text',
      placeholder,
      value,
      onChange,
      sx,
      required = false,
      fullWidth = true,
      variant = 'outlined',
    },
    ref
  ) => {
    /**
     * 入力値変更ハンドラー
     * @param {React.ChangeEvent<HTMLInputElement>} e - 変更イベント
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value)
    }

    return (
      <TextField
        inputRef={ref}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required={required}
        fullWidth={fullWidth}
        variant={variant}
        sx={sx}
      />
    )
  }
)

TextInput.displayName = 'TextInput'

export default TextInput
