import { type Control, Controller, type FieldPath, type FieldValues } from 'react-hook-form'
import { Box } from '@mui/material'
import { DatePicker } from '@/components/ui'
import FormErrorMessage from './FormErrorMessage'

/**
 * コントロール済み日付選択器のProps型定義
 */
export interface ControlledDatePickerProps<
  TFieldValues extends FieldValues = FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  /** react-hook-formのcontrolオブジェクト */
  control: Control<TFieldValues>
  /** フィールド名 */
  name: TFieldName
  /** 日付フィールドのラベル */
  label: string
}

/**
 * react-hook-form連携日付選択コンポーネント
 *
 * フォーム内で使用される日付入力フィールドを管理。
 * Controllerで包装され、バリデーション・エラー表示を自動化。
 * テンプレートリテラルを使用して任意のフォーム型と柔軟なフィールド名に対応。
 *
 * @example
 * ```tsx
 * // TransactionFormDataの場合
 * <ControlledDatePicker<TransactionFormData, 'date'>
 *   control={control}
 *   name="date"
 *   label="支出日付"
 * />
 * 
 * // カスタムフォーム型の場合
 * interface EventForm {
 *   eventDate: string
 *   registrationDeadline: string
 * }
 * <ControlledDatePicker<EventForm, 'eventDate'>
 *   control={control}
 *   name="eventDate"
 *   label="イベント開催日"
 * />
 * ```
 */
export default function ControlledDatePicker<
  TFieldValues extends FieldValues = FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  control,
  name,
  label,
}: ControlledDatePickerProps<TFieldValues, TFieldName>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Box>
          <DatePicker
            {...field}
            label={label}
            error={!!error}
          />
          <FormErrorMessage error={error} />
        </Box>
      )}
    />
  )
}
