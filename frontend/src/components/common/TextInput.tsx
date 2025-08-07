import { forwardRef } from 'react'
import { TextField } from '@mui/material'
import type { SxProps, Theme } from '@mui/material'

/**
 * 汎用テキスト入力コンポーネント
 *
 * MUI TextFieldをラップした再利用可能なコンポーネントです。
 * プロジェクト全体で一貫したスタイリングとAPI設計を提供します。
 *
 * 設計原則:
 * - Single Responsibility: 入力機能のみに責任を持つ
 * - Composition: MUIコンポーネントを合成して機能を提供
 * - Reusability: 型安全で再利用可能な設計
 *
 * @example
 * // 基本使用例
 * <TextInput
 *   value={name}
 *   onChange={setName}
 *   placeholder="名前を入力"
 * />
 *
 * // 数値入力
 * <TextInput
 *   type="number"
 *   value={amount}
 *   onChange={setAmount}
 *   required
 * />
 */
interface TextInputProps {
  type?: 'text' | 'number' | 'email' | 'password'
  placeholder?: string
  value: string
  onChange: (value: string) => void
  sx?: SxProps<Theme>
  required?: boolean
  fullWidth?: boolean
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
