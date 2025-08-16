import { Controller, type Control } from 'react-hook-form'
import { DatePicker } from '@/components/common'
import type { TransactionFormData } from '@/lib/validation/schemas'

/**
 * コントロール済み日付選択器のProps型定義
 */
export interface ControlledDatePickerProps {
  /** react-hook-formのcontrolオブジェクト */
  control: Control<TransactionFormData>
  /** 日付フィールドのラベル */
  label: string
}

/**
 * react-hook-form連携日付選択コンポーネント
 *
 * TransactionFormで使用される日付入力フィールドを管理。
 * Controllerで包装され、バリデーション・エラー表示を自動化。
 *
 * @component
 * @example
 * ```tsx
 * <ControlledDatePicker
 *   control={control}
 *   label="支出日付"
 * />
 * ```
 */
export default function ControlledDatePicker({
  control,
  label,
}: ControlledDatePickerProps) {
  return (
    <Controller
      name="date"
      control={control}
      render={({ field, fieldState }) => (
        <DatePicker
          {...field}
          label={label}
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
        />
      )}
    />
  )
}
