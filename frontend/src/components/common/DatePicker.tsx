import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs, { Dayjs } from 'dayjs'
import 'dayjs/locale/ja'

dayjs.locale('ja')

/**
 * 日付選択コンポーネントのProps型定義
 */
export interface DatePickerProps {
  /** 日付値（YYYY-MM-DD形式） */
  value: string
  /** 日付変更時のコールバック */
  onChange: (date: string) => void
  /** ラベルテキスト */
  label: string
  /** 無効状態 */
  disabled?: boolean
}

/**
 * 日本語対応の日付選択コンポーネント
 *
 * @component
 * @example
 * <DatePicker
 *   value="2024-01-01"
 *   onChange={setDate}
 *   label="日付選択"
 * />
 */
export default function DatePicker({
  value,
  onChange,
  label,
  disabled = false,
}: DatePickerProps) {
  /** 日付変更ハンドラー */
  const handleChange = (newValue: Dayjs | null) => {
    if (newValue) {
      onChange(newValue.format('YYYY-MM-DD'))
    }
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ja">
      <MuiDatePicker
        label={label}
        value={value ? dayjs(value) : null}
        onChange={handleChange}
        format="YYYY年MM月DD日"
        disabled={disabled}
        slotProps={{
          textField: {
            fullWidth: true,
            sx: { mb: 2 },
          },
        }}
      />
    </LocalizationProvider>
  )
}
