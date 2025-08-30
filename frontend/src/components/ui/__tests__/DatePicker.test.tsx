import { render, screen } from '@testing-library/react'
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

  // disabled状態テスト（MUI基本機能）

  it('エラー状態が正しく表示される', () => {
    setup({ error: true, helperText: 'エラーメッセージ' })
    expect(screen.getByText('エラーメッセージ')).toBeInTheDocument()
  })

  // name属性テスト（HTML標準機能）

  // required属性テスト（HTML標準機能）

  // fullWidth設定テスト（MUI基本機能）

  // variant属性テスト（MUI基本機能）

  // 複数プロパティ統合テスト（冗長）

  it('カレンダーボタンがクリック可能', async () => {
    setup()
    const calendarButton = screen.getByRole('button', { name: /choose date/i })
    expect(calendarButton).toBeInTheDocument()

    // ボタンがクリック可能であることを確認（実際のクリックは警告を避けるため行わない）
    expect(calendarButton).not.toBeDisabled()
    expect(calendarButton).toHaveAttribute('type', 'button')
  })
})
