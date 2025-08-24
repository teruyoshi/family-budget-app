import {
  type Control,
  Controller,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form'
import { Box } from '@mui/material'
import { AmountInput } from '@/components/ui'
import FormErrorMessage from './FormErrorMessage'

/**
 * コントロール済み金額入力のProps型定義
 */
export interface ControlledAmountInputProps<
  TFieldValues extends FieldValues = FieldValues,
> {
  /** react-hook-formのcontrolオブジェクト */
  control: Control<TFieldValues>
  /** フィールド名 */
  name: FieldPath<TFieldValues>
  /** 金額フィールドのプレースホルダー */
  placeholder: string
}

/**
 * react-hook-form連携金額入力コンポーネント
 *
 * フォーム内で使用される金額入力フィールド。
 * Controllerでラップしてバリデーション・エラー表示を自動化。
 * ジェネリック型対応で任意のフォーム型で利用可能。
 *
 * @example
 * ```tsx
 * // TransactionFormDataの場合
 * <ControlledAmountInput<TransactionFormData>
 *   control={control}
 *   name="amount"
 *   placeholder="支出金額を入力"
 * />
 *
 * // カスタムフォーム型の場合
 * interface CustomForm {
 *   price: number
 *   tax: number
 * }
 * <ControlledAmountInput<CustomForm>
 *   control={control}
 *   name="price"
 *   placeholder="価格を入力"
 * />
 * ```
 */
export default function ControlledAmountInput<
  TFieldValues extends FieldValues = FieldValues,
>({ control, name, placeholder }: ControlledAmountInputProps<TFieldValues>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
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
