import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs, { Dayjs } from 'dayjs'
import 'dayjs/locale/ja'

dayjs.locale('ja')

/**
 * 日付選択コンポーネントのProps型定義
 *
 * MUI DatePicker日本語対応版のプロパティ設定。
 * ISO 8601形式（YYYY-MM-DD）での日付管理を前提とします。
 */
export interface DatePickerProps {
  /**
   * 選択中の日付値
   * @example "2024-08-12" - ISO 8601形式の日付文字列
   * @remarks 内部でdayjsライブラリを使用してパース・フォーマット
   */
  value: string

  /**
   * 日付変更時のコールバック関数
   * @param date - 新しい日付文字列（YYYY-MM-DD形式）
   * @example
   * ```tsx
   * const [date, setDate] = useState('2024-01-01')
   * const handleChange = (newDate: string) => {
   *   setDate(newDate)
   *   // API送信やフォーム状態更新など
   * }
   * ```
   */
  onChange: (date: string) => void

  /**
   * 日付選択フィールドのラベル
   * @example "取引日" - フォームでの用途を示すラベル
   * @example "期間開始日" - 期間選択での開始日ラベル
   */
  label: string

  /**
   * 日付選択の無効状態
   * @defaultValue false
   * @example disabled={isSubmitting} - フォーム送信中の無効化
   */
  disabled?: boolean
}

/**
 * 日本語ローカライズ対応の日付選択コンポーネント
 *
 * MUI X DatePickerをベースとした日本語対応版。dayjs + AdapterDayjsを使用し、
 * 日本語フォーマット（YYYY年MM月DD日）での表示と、ISO 8601形式での値管理を両立。
 *
 * @remarks
 * - **ローカライズ**: 日本語曜日・月名表示対応
 * - **フォーマット**: 表示は「2024年08月12日」、値は"2024-08-12"
 * - **バリデーション**: MUI DatePickerの標準バリデーション機能を継承
 * - **アクセシビリティ**: キーボード操作・スクリーンリーダー対応済み
 * - **テーマ対応**: MUIテーマのカスタマイズを反映
 *
 * @example
 * ```tsx
 * // 基本的な使用例（取引日選択）
 * const [transactionDate, setTransactionDate] = useState('2024-08-12')
 * 
 * <DatePicker
 *   value={transactionDate}
 *   onChange={setTransactionDate}
 *   label="取引日"
 * />
 * ```
 *
 * @example
 * ```tsx
 * // フォーム統合での使用例
 * const [formData, setFormData] = useState({
 *   amount: 0,
 *   date: dayjs().format('YYYY-MM-DD'),
 *   description: ''
 * })
 *
 * <DatePicker
 *   value={formData.date}
 *   onChange={(newDate) => setFormData(prev => ({ ...prev, date: newDate }))}
 *   label="支出日"
 *   disabled={isSubmitting}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // 期間選択での使用例
 * const [startDate, setStartDate] = useState('2024-08-01')
 * const [endDate, setEndDate] = useState('2024-08-31')
 *
 * <>
 *   <DatePicker
 *     value={startDate}
 *     onChange={setStartDate}
 *     label="期間開始日"
 *   />
 *   <DatePicker
 *     value={endDate}
 *     onChange={setEndDate}
 *     label="期間終了日"
 *   />
 * </>
 * ```
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
