import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs, { Dayjs } from 'dayjs'
import 'dayjs/locale/ja'

dayjs.locale('ja')

/**
 * 日付選択コンポーネントのProps型定義
 */
interface DatePickerProps {
  /** 現在の日付値（YYYY-MM-DD形式の文字列） */
  value: string
  /** 日付変更時のコールバック関数 */
  onChange: (date: string) => void
  /** 日付ピッカーのラベル */
  label: string
  /** 無効状態にするかどうか */
  disabled?: boolean
}

/**
 * 日付選択コンポーネント
 *
 * MUI X DatePickerを使用したリッチな日付ピッカーです。
 * 日本語対応でカレンダーUIを提供し、より使いやすい日付選択を実現します。
 *
 * @group 共通コンポーネント
 * @component
 * @param {DatePickerProps} props - コンポーネントのプロパティ
 * @param {string} props.value - 現在の日付値（YYYY-MM-DD形式の文字列）
 * @param {function} props.onChange - 日付変更時のコールバック関数
 * @param {string} props.label - 日付ピッカーのラベル
 * @param {boolean} props.disabled - 無効状態にするかどうか
 * @returns {JSX.Element} 日本語対応の日付選択コンポーネント
 *
 * @example
 * // 基本的な使用例
 * <DatePicker
 *   value={selectedDate}
 *   onChange={setSelectedDate}
 *   label="日付を選択"
 * />
 *
 * @example
 * // 無効状態で使用
 * <DatePicker
 *   value={date}
 *   onChange={setDate}
 *   label="日付"
 *   disabled={!useCustomDate}
 * />
 */
export default function DatePicker({
  value,
  onChange,
  label,
  disabled = false,
}: DatePickerProps) {
  /**
   * 日付変更ハンドラー
   * @param {Dayjs | null} newValue - 選択された日付（dayjsオブジェクト）
   */
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
