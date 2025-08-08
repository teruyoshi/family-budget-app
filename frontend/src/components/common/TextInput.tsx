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
 * @component
 * @param {TextInputProps} props - コンポーネントのプロパティ
 * @param {'text' | 'number' | 'email' | 'password'} props.type - 入力フィールドのタイプ
 * @param {string} props.placeholder - プレースホルダーテキスト
 * @param {string} props.value - 現在の入力値
 * @param {function} props.onChange - 値変更時のコールバック関数
 * @param {SxProps<Theme>} props.sx - スタイルオブジェクト
 * @param {boolean} props.required - 必須項目かどうか
 * @param {boolean} props.fullWidth - 全幅で表示するかどうか
 * @param {'outlined' | 'filled' | 'standard'} props.variant - 入力フィールドのバリアント
 * @returns {JSX.Element} Material-UIのTextFieldをラップしたテキスト入力コンポーネント
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
