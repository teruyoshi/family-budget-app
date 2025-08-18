import { type Control, Controller, type FieldPath } from 'react-hook-form'
import { Box } from '@mui/material'
import { AmountInput } from '@/components/ui'
import FormErrorMessage from './FormErrorMessage'
import type { TransactionFormData } from '@/lib/validation/schemas'

/**
 * コントロール済み金額入力のProps型定義
 */
export interface ControlledAmountInputProps {
  /** react-hook-formのcontrolオブジェクト */
  control: Control<TransactionFormData>
  /** フィールド名 */
  name: FieldPath<TransactionFormData>
  /** 金額フィールドのプレースホルダー */
  placeholder: string
}

/**
 * react-hook-form連携金額入力コンポーネント
 *
 * フォーム内で使用される金額入力フィールド。
 * Controllerでラップしてバリデーション・エラー表示を自動化。
 *
 * @example
 * ```tsx
 * <ControlledAmountInput
 *   control={control}
 *   name="amount"
 *   placeholder="支出金額を入力"
 * />
 * ```
 */
export default function ControlledAmountInput({
  control,
  name,
  placeholder,
}: ControlledAmountInputProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
        <Box>
          <AmountInput
            value={typeof value === 'number' ? value : 0}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            error={!!error}
          />
          <FormErrorMessage error={error} />
        </Box>
      )}
    />
  )
}