import { type Control, Controller, type FieldPath, type FieldValues } from 'react-hook-form'
import { FormControlLabel, Switch, Typography } from '@mui/material'

/**
 * カスタム日付使用スイッチのProps型定義
 */
export interface ControlledCustomDateSwitchProps<
  TFieldValues extends FieldValues = FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  /** react-hook-formのcontrolオブジェクト */
  control: Control<TFieldValues>
  /** フィールド名 */
  name: TFieldName
  /** スイッチのラベルテキスト */
  label?: string
}

/**
 * react-hook-form連携カスタム日付スイッチコンポーネント
 *
 * フォーム内で使用されるブール値のスイッチ入力フィールドを管理。
 * Controllerで包装され、バリデーション・フォーム状態と自動同期。
 * テンプレートリテラルを使用して任意のフォーム型と柔軟なフィールド名に対応。
 *
 * @example
 * ```tsx
 * // TransactionFormDataの場合
 * <ControlledCustomDateSwitch<TransactionFormData, 'useCustomDate'>
 *   control={control}
 *   name="useCustomDate"
 *   label="日付を指定する"
 * />
 * 
 * // カスタムフォーム型の場合
 * interface SettingsForm {
 *   enableNotifications: boolean
 *   autoSave: boolean
 * }
 * <ControlledCustomDateSwitch<SettingsForm, 'enableNotifications'>
 *   control={control}
 *   name="enableNotifications"
 *   label="通知を有効にする"
 * />
 * ```
 */
export default function ControlledCustomDateSwitch<
  TFieldValues extends FieldValues = FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  control,
  name,
  label = '日付を指定する',
}: ControlledCustomDateSwitchProps<TFieldValues, TFieldName>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControlLabel
          control={<Switch {...field} checked={field.value} color="primary" />}
          label={
            <Typography variant="body2" color="text.secondary">
              {label}
            </Typography>
          }
          sx={{ alignSelf: 'flex-start', mb: 0 }}
        />
      )}
    />
  )
}