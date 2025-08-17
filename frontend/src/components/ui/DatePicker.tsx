import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs, { Dayjs } from 'dayjs'
import type { SxProps, Theme } from '@mui/material'

/**
 * 日付選択コンポーネント
 *
 * MUI X DatePickerをベースとした日本語対応の日付選択フィールド。
 * react-hook-form対応でISO 8601形式での日付管理。
 *
 * @example
 * ```tsx
 * <DatePicker
 *   value="2024-08-17"
 *   onChange={(date) => console.log(date)}
 *   label="取引日"
 * />
 * ```
 */
export interface DatePickerProps {
  /** 選択中の日付値（YYYY-MM-DD形式） */
  value?: string
  /** 日付変更時のコールバック関数 */
  onChange?: (date: string) => void
  /** 日付選択フィールドのラベル */
  label?: string
  /** MUIスタイル設定 */
  sx?: SxProps<Theme>
  /** 必須入力項目かどうか */
  required?: boolean
  /** 全幅表示するかどうか */
  fullWidth?: boolean
  /** MUI TextFieldのバリアント */
  variant?: 'outlined' | 'filled' | 'standard'
  /** エラー状態 */
  error?: boolean
  /** ヘルプテキスト */
  helperText?: string
  /** 日付選択の無効状態 */
  disabled?: boolean
  /** フィールド名（react-hook-form用） */
  name?: string
  /** フォーカス失ったときのコールバック */
  onBlur?: () => void
  /** DOM要素への参照 */
  ref?: React.Ref<HTMLInputElement>
}

function DatePicker(props: DatePickerProps) {
  const { 
    value, 
    onChange, 
    label, 
    disabled = false, 
    name, 
    error = false,
    ...textFieldProps 
  } = props

  const handleChange = (newValue: Dayjs | null) => {
    if (newValue) {
      onChange?.(newValue.format('YYYY-MM-DD'))
    }
  }

  return (
    <MuiDatePicker
      name={name}
      label={label}
      value={value ? dayjs(value) : null}
      onChange={handleChange}
      format="YYYY年MM月DD日"
      disabled={disabled}
      slotProps={{
        textField: {
          error,
          ...textFieldProps,
        },
      }}
    />
  )
}

export default DatePicker