import { type Control, Controller } from 'react-hook-form'
import { FormControlLabel, Switch, Typography } from '@mui/material'
import type { TransactionFormData } from '@/lib/validation/schemas'

/**
 * カスタム日付使用スイッチのProps型定義
 */
export interface ControlledCustomDateSwitchProps {
  /** react-hook-formのcontrolオブジェクト */
  control: Control<TransactionFormData>
}

/**
 * react-hook-form連携カスタム日付スイッチコンポーネント
 *
 * TransactionFormで使用される日付指定トグルスイッチを管理。
 * Controllerで包装され、フォーム状態と自動同期されます。
 *
 * @component
 * @example
 * ```tsx
 * <ControlledCustomDateSwitch control={control} />
 * ```
 */
export default function ControlledCustomDateSwitch({
  control,
}: ControlledCustomDateSwitchProps) {
  return (
    <Controller
      name="useCustomDate"
      control={control}
      render={({ field }) => (
        <FormControlLabel
          control={<Switch {...field} checked={field.value} color="primary" />}
          label={
            <Typography variant="body2" color="text.secondary">
              日付を指定する
            </Typography>
          }
          sx={{ alignSelf: 'flex-start', mb: 0 }}
        />
      )}
    />
  )
}
