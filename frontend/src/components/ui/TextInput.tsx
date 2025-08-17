import { TextField } from '@mui/material'
import type { SxProps, Theme } from '@mui/material'

/**
 * 汎用テキスト入力コンポーネント
 *
 * MUI TextFieldをラップしてプロジェクト全体で統一されたAPIを提供する基盤コンポーネント。
 * 様々な入力タイプ（text, number, email, password）に対応し、一貫したスタイリングとバリデーション機能を提供します。
 * AmountInputなど特殊な入力コンポーネントの基盤としても使用されます。
 *
 * @remarks
 * - 制御コンポーネントパターンを採用（value + onChange）
 * - MUIの全バリアント（outlined, filled, standard）をサポート
 * - React 19のref as prop機能によりシンプルなref転送
 * - 入力タイプに応じた適切なキーボード表示（モバイル対応）
 *
 * @component
 *
 * @example
 * ```tsx
 * // 基本的なテキスト入力
 * <TextInput
 *   value={name}
 *   onChange={setName}
 *   placeholder="お名前を入力してください"
 * />
 * ```
 *
 * @example
 * ```tsx
 * // メールアドレス入力
 * <TextInput
 *   type="email"
 *   value={email}
 *   onChange={setEmail}
 *   placeholder="メールアドレス"
 *   required
 * />
 * ```
 *
 * @example
 * ```tsx
 * // パスワード入力（バリアント指定）
 * <TextInput
 *   type="password"
 *   value={password}
 *   onChange={setPassword}
 *   variant="filled"
 *   required
 * />
 * ```
 */

/**
 * 汎用テキスト入力コンポーネントのProps型定義
 *
 * MUI TextFieldをラップした統一APIを提供する基本入力コンポーネント用のプロパティセット
 */
export interface TextInputProps {
  /**
   * 入力フィールドのタイプ
   * @default "text"
   */
  type?: 'text' | 'number' | 'email' | 'password'

  /** プレースホルダーテキスト（例: "名前を入力してください"） */
  placeholder?: string

  /** HTML input要素のname属性（フォーム送信やreact-hook-form用） */
  name?: string

  /** 現在の入力値（制御コンポーネントとして使用） */
  value: string

  /**
   * 値変更時のコールバック関数
   * @param value ユーザーが入力した新しい文字列値
   */
  onChange: (value: string) => void

  /**
   * フォーカス喪失時のコールバック関数
   * @param event フォーカス喪失イベント
   */
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void

  /** MUI sx propsによるカスタムスタイル */
  sx?: SxProps<Theme>

  /**
   * 必須項目として扱うかどうか
   * @default false
   */
  required?: boolean

  /**
   * 全幅で表示するかどうか
   * @default true
   */
  fullWidth?: boolean

  /**
   * MUI TextFieldのバリアント
   * @default "outlined"
   */
  variant?: 'outlined' | 'filled' | 'standard'

  /** エラー状態を表示するかどうか */
  error?: boolean

  /** エラーメッセージテキスト */
  helperText?: string

  /** input要素に適用する追加プロパティ */
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>

  /** DOM要素への参照（React 19のref as prop対応） */
  ref?: React.Ref<HTMLInputElement>
}

/**
 * 汎用テキスト入力コンポーネント
 *
 * MUI TextFieldをラップした統一的なテキスト入力UI。
 * React 19のref as prop機能により、シンプルで直感的なAPIを提供。
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

  /**
   * 入力値変更ハンドラー
   * @param {React.ChangeEvent<HTMLInputElement>} e - 変更イベント
   */
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