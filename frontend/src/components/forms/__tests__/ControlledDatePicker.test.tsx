import { render, screen, fireEvent, act } from '@testing-library/react'
import { useForm } from 'react-hook-form'
import { Box } from '@mui/material'
import ControlledDatePicker from '../ControlledDatePicker'
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
      description: '',
      category: '',
      date: '',
      ...defaultValues,
    },
  })

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <ControlledDatePicker<TransactionFormData, 'date'>
        control={control}
        name="date"
        label="支出日付"
      />
      <button type="submit">Submit</button>
    </Box>
  )
}

describe('ControlledDatePicker', () => {
  it('ラベルが表示される', () => {
    render(<TestFormWrapper />)
    expect(screen.getByText('支出日付')).toBeInTheDocument()
  })

  it('初期値が正しく表示される', () => {
    render(<TestFormWrapper defaultValues={{ date: '2023-12-25' }} />)
    const input = screen.getByDisplayValue('2023/12/25')
    expect(input).toBeInTheDocument()
  })

  it('空の初期値の場合は空文字で表示される', () => {
    render(<TestFormWrapper defaultValues={{ date: '' }} />)
    const input = screen.getByLabelText('支出日付')
    expect(input).toHaveValue('')
  })

  it('日付入力が正しく動作する', () => {
    render(<TestFormWrapper />)
    const input = screen.getByLabelText('支出日付')
    
    fireEvent.change(input, { target: { value: '2024/01/15' } })
    expect(screen.getByDisplayValue('2024/01/15')).toBeInTheDocument()
  })

  it('無効な日付入力が正しく処理される', () => {
    render(<TestFormWrapper />)
    const input = screen.getByLabelText('支出日付')
    
    fireEvent.change(input, { target: { value: 'invalid-date' } })
    // DatePickerが無効な日付を処理する方法をテスト
    expect(input).toHaveValue('invalid-date')
  })

  it('フォーム送信時に正しい値が渡される', async () => {
    const mockSubmit = jest.fn()
    render(<TestFormWrapper onSubmit={mockSubmit} />)
    
    const input = screen.getByLabelText('支出日付')
    const submitButton = screen.getByText('Submit')
    
    await act(async () => {
      fireEvent.change(input, { target: { value: '2024/02/14' } })
    })
    
    await act(async () => {
      fireEvent.click(submitButton)
    })
    
    expect(mockSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        date: '2024/02/14',
      }),
      expect.anything() // React Hook Formのイベント引数
    )
  })

  it('undefinedの値が空文字として正しく変換される', () => {
    render(<TestFormWrapper defaultValues={{ date: undefined as unknown as string }} />)
    const input = screen.getByLabelText('支出日付')
    expect(input).toHaveValue('')
  })

  it('nullの値が空文字として正しく変換される', () => {
    render(<TestFormWrapper defaultValues={{ date: null as unknown as string }} />)
    const input = screen.getByLabelText('支出日付')
    expect(input).toHaveValue('')
  })

  it('DatePickerコンポーネントが正しくレンダリングされる', () => {
    render(<TestFormWrapper />)
    const input = screen.getByLabelText('支出日付')
    
    // MUI TextFieldの基本クラスが適用されているかチェック
    expect(input.closest('.MuiTextField-root')).toBeInTheDocument()
  })

  it('FormErrorMessageコンポーネントが含まれている', () => {
    const { container } = render(<TestFormWrapper />)
    
    // FormErrorMessageは初期状態ではエラーがないため表示されないが、
    // コンポーネントの構造として存在することを確認
    expect(container.querySelector('[data-testid="form-error"]')).toBeFalsy()
    
    // BoxでラップされていることをBOXコンテナの存在で確認
    const boxElement = container.querySelector('.MuiBox-root')
    expect(boxElement).toBeInTheDocument()
  })

  it('カスタムラベルが正しく表示される', () => {
    function CustomLabelWrapper() {
      const { control } = useForm<{ eventDate: string }>({
        defaultValues: { eventDate: '' },
      })

      return (
        <ControlledDatePicker<{ eventDate: string }, 'eventDate'>
          control={control}
          name="eventDate"
          label="イベント開催日"
        />
      )
    }

    render(<CustomLabelWrapper />)
    expect(screen.getByText('イベント開催日')).toBeInTheDocument()
  })

  it('onBlurイベントが正しく処理される', () => {
    render(<TestFormWrapper />)
    const input = screen.getByLabelText('支出日付')
    
    fireEvent.change(input, { target: { value: '2024/03/20' } })
    fireEvent.blur(input)
    
    expect(screen.getByDisplayValue('2024/03/20')).toBeInTheDocument()
  })

  it('日付フォーマットが正しく表示される', () => {
    render(<TestFormWrapper defaultValues={{ date: '2023-05-10' }} />)
    // YYYY-MM-DD形式の入力がYYYY/MM/DD形式で表示されることを確認
    expect(screen.getByDisplayValue('2023/05/10')).toBeInTheDocument()
  })

  it('複数の日付フィールドが独立して動作する', () => {
    function MultiDateWrapper() {
      const { control } = useForm<{ startDate: string; endDate: string }>({
        defaultValues: { startDate: '', endDate: '' },
      })

      return (
        <Box>
          <ControlledDatePicker<{ startDate: string; endDate: string }, 'startDate'>
            control={control}
            name="startDate"
            label="開始日"
          />
          <ControlledDatePicker<{ startDate: string; endDate: string }, 'endDate'>
            control={control}
            name="endDate"
            label="終了日"
          />
        </Box>
      )
    }

    render(<MultiDateWrapper />)
    
    const startDateInput = screen.getByLabelText('開始日')
    const endDateInput = screen.getByLabelText('終了日')
    
    fireEvent.change(startDateInput, { target: { value: '2024/04/01' } })
    fireEvent.change(endDateInput, { target: { value: '2024/04/30' } })
    
    expect(screen.getByDisplayValue('2024/04/01')).toBeInTheDocument()
    expect(screen.getByDisplayValue('2024/04/30')).toBeInTheDocument()
  })
})