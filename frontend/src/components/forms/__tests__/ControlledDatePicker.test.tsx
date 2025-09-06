import { render, screen } from '@testing-library/react'
import { useForm } from 'react-hook-form'
import { Box } from '@mui/material'
import ControlledDatePicker from '../ControlledDatePicker'
import DateLocalizationProvider from '@/components/provider/DateLocalizationProvider'
import type { TransactionFormData } from '@/lib/validation/schemas'

// テスト用のフォームラッパーコンポーネント
function TestFormWrapper({
  defaultValues = {},
  onSubmit = jest.fn(),
}: {
  defaultValues?: Partial<TransactionFormData>
  onSubmit?: (data: TransactionFormData) => void
}) {
  const { control, handleSubmit } = useForm<TransactionFormData>({
    defaultValues: {
      amount: 0,
      date: '',
      useCustomDate: false,
      ...defaultValues,
    },
  })

  return (
    <DateLocalizationProvider>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <ControlledDatePicker control={control} name="date" label="支出日付" />
        <button type="submit">Submit</button>
      </Box>
    </DateLocalizationProvider>
  )
}

describe('ControlledDatePicker', () => {
  it('ラベルが表示される', () => {
    render(<TestFormWrapper />)
    expect(screen.getAllByText('支出日付')[0]).toBeInTheDocument()
  })

  it('カスタムラベルが正しく表示される', () => {
    function CustomLabelWrapper() {
      const { control } = useForm<{ eventDate: string }>({
        defaultValues: { eventDate: '' },
      })

      return (
        <DateLocalizationProvider>
          <ControlledDatePicker<{ eventDate: string }, 'eventDate'>
            control={control}
            name="eventDate"
            label="イベント開催日"
          />
        </DateLocalizationProvider>
      )
    }

    render(<CustomLabelWrapper />)
    expect(screen.getAllByText('イベント開催日')[0]).toBeInTheDocument()
  })

  it('複数の日付フィールドが独立して表示される', () => {
    function MultiDateWrapper() {
      const { control } = useForm<{ startDate: string; endDate: string }>({
        defaultValues: { startDate: '', endDate: '' },
      })

      return (
        <DateLocalizationProvider>
          <Box>
            <ControlledDatePicker<
              { startDate: string; endDate: string },
              'startDate'
            >
              control={control}
              name="startDate"
              label="開始日"
            />
            <ControlledDatePicker<
              { startDate: string; endDate: string },
              'endDate'
            >
              control={control}
              name="endDate"
              label="終了日"
            />
          </Box>
        </DateLocalizationProvider>
      )
    }

    render(<MultiDateWrapper />)

    expect(screen.getAllByText('開始日')[0]).toBeInTheDocument()
    expect(screen.getAllByText('終了日')[0]).toBeInTheDocument()
  })
})
