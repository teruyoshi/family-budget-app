import { TextField } from '@mui/material'
import type { SxProps, Theme, TextFieldProps } from '@mui/material'

/**
 * 数値入力コンポーネントのProps
 */
export interface NumberInputProps {
  /** 現在の値 */
  value?: string | number
  /** 変更時のコールバック */
  onChange?: TextFieldProps['onChange']
  /** フィールドラベル */
  label?: string
  /** MUIスタイル設定 */
  sx?: SxProps<Theme>
  /** DOM要素への参照（React 19準拠） */
  ref?: React.Ref<HTMLInputElement>
  /** MUI TextFieldのslotProps */
  slotProps?: TextFieldProps['slotProps']
}

/**
 * 数値入力コンポーネント
 *
 * MUI TextFieldのtype="number"版。
 * シンプルな数値入力機能を提供。
 *
 * @example
 * <NumberInput
 *   value="100"
 *   onChange={handleChange}
 *   label="数量"
 *   slotProps={{
 *     input: { step: 0.1, min: 0, max: 100 }
 *   }}
 * />
 */
function NumberInput({ value, onChange, label, sx, ref, slotProps }: NumberInputProps) {
  return (
    <TextField
      ref={ref}
      type="number"
      label={label}
      value={value}
      onChange={onChange}
      sx={sx}
      slotProps={{
        input: {
          inputMode: 'numeric' as const,
          ...slotProps?.input,
        },
        ...slotProps,
      }}
    />
  )
}

export default NumberInput