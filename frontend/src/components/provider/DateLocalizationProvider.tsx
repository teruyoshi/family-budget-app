import { ReactNode } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import 'dayjs/locale/ja'

dayjs.locale('ja')

/**
 * 日付コンポーネント用ローカライゼーションプロバイダー
 *
 * MUI X DatePickerコンポーネント用の日本語ローカライゼーション設定。
 * アプリケーション全体またはDatePicker使用箇所で適用。
 */
export interface DateLocalizationProviderProps {
  children: ReactNode
}

function DateLocalizationProvider({ children }: DateLocalizationProviderProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ja">
      {children}
    </LocalizationProvider>
  )
}

export default DateLocalizationProvider