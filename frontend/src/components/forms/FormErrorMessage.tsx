import { FormHelperText } from '@mui/material'
import type { FieldError } from 'react-hook-form'

/**
 * フォームエラーメッセージのProps
 */
export interface FormErrorMessageProps {
  /** react-hook-formのエラーオブジェクト */
  error?: FieldError
}

/**
 * フォームエラーメッセージ表示コンポーネント
 *
 * react-hook-formのエラーを受け取り、MUIのFormHelperTextで表示。
 * エラーがない場合は何も表示しない。
 *
 * @example
 * ```tsx
 * <FormErrorMessage error={fieldState.error} />
 * ```
 */
export default function FormErrorMessage({ error }: FormErrorMessageProps) {
  if (!error) return null

  return (
    <FormHelperText error sx={{ mt: 0.5, mx: 1.75 }}>
      {error.message}
    </FormHelperText>
  )
}