import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import DatePicker from '../DatePicker'
import { DateLocalizationProvider } from '@/components/provider'

const setup = (props = {}) => {
  const mockOnChange = jest.fn()
  const defaultProps = {
    label: 'テスト日付',
    onChange: mockOnChange,
    ...props,
  }

  const result = render(
    <DateLocalizationProvider>
      <DatePicker {...defaultProps} />
    </DateLocalizationProvider>
  )
  // MUI X DatePickerの隠された入力要素を取得
  const input = result.container.querySelector(
    'input[aria-hidden="true"]'
  ) as HTMLInputElement

  return {
    input,
    mockOnChange,
    ...result,
  }
}

describe('DatePicker', () => {
  it('ラベルが正しく表示される', () => {
    const { container } = setup({ label: '取引日' })
    const label = container.querySelector('label')
    expect(label).toHaveTextContent('取引日')
  })

  it('初期値が正しく表示される', () => {
    const { input } = setup({ value: '2024-08-17' })
    expect(input).toHaveValue('2024年08月17日')
  })

  it('DatePickerコンポーネントがレンダリングされる', () => {
    setup()
    expect(
      screen.getByRole('button', { name: /choose date/i })
    ).toBeInTheDocument()
  })

  it('disabled状態で入力が無効になる', () => {
    const { container } = setup({ disabled: true })
    const datePicker = container.querySelector('.MuiPickersInputBase-root')
    expect(datePicker).toHaveClass('Mui-disabled')
  })

  it('エラー状態が正しく表示される', () => {
    setup({ error: true, helperText: 'エラーメッセージ' })
    expect(screen.getByText('エラーメッセージ')).toBeInTheDocument()
  })

  it('name属性が正しく設定される', () => {
    const { input } = setup({ name: 'transactionDate' })
    expect(input).toHaveAttribute('name', 'transactionDate')
  })

  it('required属性が設定される', () => {
    const { input } = setup({ required: true })
    expect(input).toBeRequired()
  })

  it('fullWidth設定が適用される', () => {
    const { container } = setup({ fullWidth: true })
    const formControl = container.querySelector('.MuiFormControl-root')
    expect(formControl).toHaveClass('MuiFormControl-fullWidth')
  })

  it('variant属性が正しく適用される', () => {
    const { container } = setup({ variant: 'filled' })
    const input = container.querySelector('.MuiPickersInputBase-root')
    expect(input).toHaveClass('MuiPickersFilledInput-root')
  })

  it('複数のプロパティが同時に適用される', () => {
    const { input } = setup({
      value: '2024-12-25',
      required: true,
      error: true,
      helperText: '必須項目です',
      disabled: false,
    })

    expect(input).toHaveValue('2024年12月25日')
    expect(input).toBeRequired()
    expect(screen.getByText('必須項目です')).toBeInTheDocument()
    expect(input).not.toBeDisabled()
  })

  it('カレンダーボタンがクリック可能', async () => {
    setup()
    const calendarButton = screen.getByRole('button', { name: /choose date/i })
    expect(calendarButton).toBeInTheDocument()

    await userEvent.click(calendarButton)
    // カレンダーが開くことを確認（ポップアップが表示される）
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })
})
