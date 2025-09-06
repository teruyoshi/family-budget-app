import { render, screen, fireEvent, act } from '@testing-library/react'
import { useForm } from 'react-hook-form'
import { Box } from '@mui/material'
import ControlledAmountInput from '../ControlledAmountInput'
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
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <ControlledAmountInput
        control={control}
        name="amount"
        placeholder="金額を入力してください"
      />
      <button type="submit">Submit</button>
    </Box>
  )
}

describe('ControlledAmountInput', () => {
  it('プレースホルダーが表示される', () => {
    render(<TestFormWrapper />)
    expect(
      screen.getByPlaceholderText('金額を入力してください')
    ).toBeInTheDocument()
  })

  it('初期値が正しく表示される', () => {
    render(<TestFormWrapper defaultValues={{ amount: 1000 }} />)
    const input = screen.getByDisplayValue('¥1,000')
    expect(input).toBeInTheDocument()
  })

  it('ゼロの初期値は空文字で表示される', () => {
    render(<TestFormWrapper defaultValues={{ amount: 0 }} />)
    const input = screen.getByPlaceholderText('金額を入力してください')
    expect(input).toHaveValue('')
  })

  it('金額入力が正しく動作する', () => {
    render(<TestFormWrapper />)
    const input = screen.getByPlaceholderText('金額を入力してください')

    fireEvent.change(input, { target: { value: '5000' } })
    expect(screen.getByDisplayValue('¥5,000')).toBeInTheDocument()
  })

  it('数値以外の入力が正しく処理される', () => {
    render(<TestFormWrapper />)
    const input = screen.getByPlaceholderText('金額を入力してください')

    act(() => {
      fireEvent.change(input, { target: { value: 'abc' } })
    })
    // AmountInputが数値変換を処理するため、無効な値は元の値のまま
    expect(input).toHaveValue('')
  })

  it('大きな金額でもカンマ区切りが正しく動作する', () => {
    render(<TestFormWrapper />)
    const input = screen.getByPlaceholderText('金額を入力してください')

    fireEvent.change(input, { target: { value: '1234567' } })
    expect(screen.getByDisplayValue('¥1,234,567')).toBeInTheDocument()
  })

  it('フォーム送信時に正しい値が渡される', async () => {
    const mockSubmit = jest.fn()
    render(<TestFormWrapper onSubmit={mockSubmit} />)

    const input = screen.getByPlaceholderText('金額を入力してください')
    const submitButton = screen.getByText('Submit')

    await act(async () => {
      fireEvent.change(input, { target: { value: '3000' } })
    })

    await act(async () => {
      fireEvent.click(submitButton)
    })

    expect(mockSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        amount: 3000,
      }),
      expect.anything() // React Hook Formのイベント引数
    )
  })
})
