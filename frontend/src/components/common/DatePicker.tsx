import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs, { Dayjs } from 'dayjs'
import 'dayjs/locale/ja'

dayjs.locale('ja')

interface DatePickerProps {
  value: string
  onChange: (date: string) => void
  label: string
  disabled?: boolean
}

/**
 * 日付選択コンポーネント
 *
 * MUI X DatePickerを使用したリッチな日付ピッカーです。
 * 日本語対応でカレンダーUIを提供し、より使いやすい日付選択を実現します。
 */
export default function DatePicker({ value, onChange, label, disabled = false }: DatePickerProps) {
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