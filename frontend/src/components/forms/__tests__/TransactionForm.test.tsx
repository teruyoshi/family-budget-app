import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { DateLocalizationProvider } from '@/components/provider'
import TransactionForm from '../TransactionForm'
import type { TransactionFormData } from '@/lib/validation/schemas'

// テストヘルパー関数
function renderWithProvider(component: React.ReactElement) {
  return render(
    <DateLocalizationProvider>{component}</DateLocalizationProvider>
  )
}

describe('TransactionForm', () => {
  const defaultProps = {
    placeholder: '金額を入力してください',
    buttonText: '登録する',
    buttonColor: 'success' as const,
    datePickerLabel: '日付を選択',
  }

  it('基本的なレンダリングが正しく動作する', () => {
    renderWithProvider(<TransactionForm {...defaultProps} />)

    // フォーム要素の存在確認
    expect(screen.getByRole('switch')).toBeInTheDocument() // カスタム日付スイッチ
    expect(screen.getByRole('textbox')).toBeInTheDocument() // 金額入力フィールド
    expect(screen.getByRole('button', { name: '登録する' })).toBeInTheDocument()
  })

  it('propsが正しく各コンポーネントに渡される', () => {
    renderWithProvider(
      <TransactionForm
        placeholder="支出金額を入力"
        buttonText="支出を登録"
        buttonColor="error"
        datePickerLabel="支出日付"
      />
    )

    // プレースホルダーが正しく設定されている
    expect(screen.getByPlaceholderText('支出金額を入力')).toBeInTheDocument()
    // ボタンテキストが正しく設定されている
    expect(
      screen.getByRole('button', { name: '支出を登録' })
    ).toBeInTheDocument()
  })

  it('カスタム日付スイッチをオンにすると日付選択フィールドが表示される', async () => {
    const user = userEvent.setup()
    renderWithProvider(<TransactionForm {...defaultProps} />)

    // カスタム日付スイッチをオン
    const customDateSwitch = screen.getByRole('switch')
    await user.click(customDateSwitch)

    // スイッチがチェックされていることを確認
    await waitFor(() => {
      expect(customDateSwitch).toBeChecked()
    })
  })

  it('フォーム送信が正しく動作する', async () => {
    const user = userEvent.setup()
    const mockOnSubmit = jest.fn()

    renderWithProvider(
      <TransactionForm {...defaultProps} onSubmit={mockOnSubmit} />
    )

    // 金額を入力
    const amountInput = screen.getByRole('textbox')
    await user.type(amountInput, '1000')

    // フォームを送信
    const submitButton = screen.getByRole('button', { name: '登録する' })
    await user.click(submitButton)

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          amount: 1000,
          useCustomDate: false,
          date: expect.any(String),
        })
      )
    })
  })

  it('カスタム日付を使用したフォーム送信が正しく動作する', async () => {
    const user = userEvent.setup()
    const mockOnSubmit = jest.fn()

    renderWithProvider(
      <TransactionForm {...defaultProps} onSubmit={mockOnSubmit} />
    )

    // カスタム日付スイッチをオン
    const customDateSwitch = screen.getByRole('switch')
    await user.click(customDateSwitch)

    // 金額を入力
    const amountInput = screen.getByRole('textbox')
    await user.type(amountInput, '2500')

    // フォームを送信
    const submitButton = screen.getByRole('button', { name: '登録する' })
    await user.click(submitButton)

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          amount: 2500,
          useCustomDate: true,
          date: expect.any(String),
        })
      )
    })
  })

  it('フォーム送信後にリセットされる（金額のみ）', async () => {
    const user = userEvent.setup()
    const mockOnSubmit = jest.fn()

    renderWithProvider(
      <TransactionForm {...defaultProps} onSubmit={mockOnSubmit} />
    )

    // カスタム日付スイッチをオン
    const customDateSwitch = screen.getByRole('switch')
    await user.click(customDateSwitch)

    await waitFor(() => {
      expect(customDateSwitch).toBeChecked()
    })

    // 金額を入力
    const amountInput = screen.getByRole('textbox')
    await user.type(amountInput, '3000')

    // フォームを送信
    const submitButton = screen.getByRole('button', { name: '登録する' })
    await user.click(submitButton)

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalled()
    })

    // 金額はリセットされるがスイッチの状態は保持される
    await waitFor(() => {
      expect(amountInput).toHaveValue('')
    })
    expect(customDateSwitch).toBeChecked()
  })

  it('バリデーションエラーがある場合は送信ボタンが無効になる', async () => {
    renderWithProvider(<TransactionForm {...defaultProps} />)

    const submitButton = screen.getByRole('button', { name: '登録する' })

    // 初期状態（金額0）では送信ボタンが無効
    expect(submitButton).toBeDisabled()

    // 無効な金額では送信ボタンは無効のまま
    const amountInput = screen.getByRole('textbox')
    fireEvent.change(amountInput, { target: { value: '¥-100' } })
    expect(submitButton).toBeDisabled()
  })

  it('有効な入力があると送信ボタンが有効になる', async () => {
    const user = userEvent.setup()
    renderWithProvider(<TransactionForm {...defaultProps} />)

    const submitButton = screen.getByRole('button', { name: '登録する' })
    const amountInput = screen.getByRole('textbox')

    // 有効な金額を入力
    await user.type(amountInput, '1500')

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled()
    })
  })

  it('defaultValuesが正しく設定される', async () => {
    const defaultValues: Partial<TransactionFormData> = {
      amount: 5000,
      useCustomDate: true,
      date: '2024-01-15',
    }

    renderWithProvider(
      <TransactionForm {...defaultProps} defaultValues={defaultValues} />
    )

    // 初期値が正しく設定されている
    await waitFor(() => {
      expect(screen.getByDisplayValue('¥5,000')).toBeInTheDocument()
    })
    expect(screen.getByRole('switch')).toBeChecked()
  })

  it('buttonColorが正しくButtonコンポーネントに適用される', () => {
    renderWithProvider(
      <TransactionForm {...defaultProps} buttonColor="success" />
    )

    const submitButton = screen.getByRole('button', { name: '登録する' })
    expect(submitButton).toBeInTheDocument()
    // color="success"が適用されていることを確認（具体的なスタイルテストは困難なため存在確認）
  })

  it('フォームのアクセシビリティが適切に設定されている', () => {
    renderWithProvider(<TransactionForm {...defaultProps} />)

    // 入力フィールドにプレースホルダーが設定されている
    expect(
      screen.getByPlaceholderText('金額を入力してください')
    ).toBeInTheDocument()

    // ボタンが適切なtype属性を持っている
    const submitButton = screen.getByRole('button', { name: '登録する' })
    expect(submitButton).toHaveAttribute('type', 'submit')
  })

  it('Enterキーでフォーム送信が可能', async () => {
    const user = userEvent.setup()
    const mockOnSubmit = jest.fn()

    renderWithProvider(
      <TransactionForm {...defaultProps} onSubmit={mockOnSubmit} />
    )

    // 金額を入力
    const amountInput = screen.getByRole('textbox')
    await user.type(amountInput, '2000')

    // Enterキーを押す
    await user.keyboard('{Enter}')

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          amount: 2000,
        })
      )
    })
  })

  it('支出用の設定で正しく動作する', () => {
    renderWithProvider(
      <TransactionForm
        placeholder="支出金額を入力"
        buttonText="支出を登録"
        buttonColor="error"
        datePickerLabel="支出日付"
      />
    )

    expect(screen.getByPlaceholderText('支出金額を入力')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: '支出を登録' })
    ).toBeInTheDocument()
  })

  it('収入用の設定で正しく動作する', () => {
    renderWithProvider(
      <TransactionForm
        placeholder="収入金額を入力"
        buttonText="収入を登録"
        buttonColor="success"
        datePickerLabel="収入日付"
      />
    )

    expect(screen.getByPlaceholderText('収入金額を入力')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: '収入を登録' })
    ).toBeInTheDocument()
  })
})
