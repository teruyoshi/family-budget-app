import { Controller, type Control } from 'react-hook-form'
import { AmountInput } from '@/components/common'
import type { TransactionFormData } from '@/lib/validation/schemas'

/**
 * コントロール済み金額入力のProps型定義
 */
export interface ControlledAmountInputProps {
  /** react-hook-formのcontrolオブジェクト */
  control: Control<TransactionFormData>
  /** 金額フィールドのプレースホルダー */
  placeholder: string
}

/**
 * react-hook-form連携金額入力コンポーネント
 *
 * TransactionFormで使用される金額入力フィールドを管理。
 * Controllerで包装され、バリデーション・エラー表示を自動化。
 *
 * @component
 * @example
 * ```tsx
 * <ControlledAmountInput
 *   control={control}
 *   placeholder="支出金額を入力"
 * />
 * ```
 */
export default function ControlledAmountInput({
  control,
  placeholder,
}: ControlledAmountInputProps) {
  return (
    <Controller
      name="amount"
      control={control}
      render={({ field, fieldState }) => (
        <AmountInput
          {...field}
          placeholder={placeholder}
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
        />
      )}
    />
  )
}
