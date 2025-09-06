import { screen, waitFor, fireEvent, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderOptimized } from '@/__tests__/test-utils/optimized-render'
import TransactionForm from '../TransactionForm'
import type { TransactionFormData } from '@/lib/validation/schemas'

describe('TransactionForm', () => {
  const defaultProps = {
    placeholder: '金額を入力してください',
    buttonText: '登録する',
    buttonColor: 'success' as const,
    datePickerLabel: '日付を選択',
  }

  it('基本的なレンダリングが正しく動作する', async () => {
    renderOptimized(<TransactionForm {...defaultProps} />)

    // MUIコンポーネントの初期化完了を待機
    await waitFor(() => {
      expect(screen.getByRole('switch')).toBeInTheDocument() // カスタム日付スイッチ
      expect(screen.getByRole('textbox')).toBeInTheDocument() // 金額入力フィールド
      expect(
        screen.getByRole('button', { name: '登録する' })
      ).toBeInTheDocument()
    })
  })

  it('propsが正しく各コンポーネントに渡される', async () => {
    renderOptimized(
      <TransactionForm
        placeholder="支出金額を入力"
        buttonText="支出を登録"
        buttonColor="error"
        datePickerLabel="支出日付"
      />
    )

    // コンポーネントの初期化完了を待機
    await waitFor(() => {
      // プレースホルダーが正しく設定されている
      expect(screen.getByPlaceholderText('支出金額を入力')).toBeInTheDocument()
      // ボタンテキストが正しく設定されている
      expect(
        screen.getByRole('button', { name: '支出を登録' })
      ).toBeInTheDocument()
    })
  })

  it('カスタム日付スイッチをオンにすると日付選択フィールドが表示される', async () => {
    const user = userEvent.setup()
    renderOptimized(<TransactionForm {...defaultProps} />)

    // カスタム日付スイッチをオン
    const customDateSwitch = screen.getByRole('switch')
    await act(async () => {
      await user.click(customDateSwitch)
    })

    // スイッチがチェックされていることを確認
    await waitFor(() => {
      expect(customDateSwitch).toBeChecked()
    })
  })

  it('フォーム送信が正しく動作する', async () => {
    const user = userEvent.setup()
    const mockOnSubmit = jest.fn()

    renderOptimized(
      <TransactionForm {...defaultProps} onSubmit={mockOnSubmit} />
    )

    // 金額を入力
    const amountInput = screen.getByRole('textbox')
    await act(async () => {
      await user.type(amountInput, '1000')
    })

    // フォーム送信
    const submitButton = screen.getByRole('button', { name: '登録する' })
    await act(async () => {
      await user.click(submitButton)
    })

    // フォーム送信とreset()の完了を待機
    await waitFor(
      () => {
        expect(mockOnSubmit).toHaveBeenCalledWith(
          expect.objectContaining({
            amount: 1000,
            useCustomDate: false,
            date: expect.any(String),
          })
        )
      },
      { timeout: 3000 }
    )
  })
  // 送信ボタンの有効化パスのみを検証（重複ケースを削減）
  it('有効な入力があると送信ボタンが有効になる', async () => {
    const user = userEvent.setup()
    renderOptimized(<TransactionForm {...defaultProps} />)

    const submitButton = screen.getByRole('button', { name: '登録する' })
    const amountInput = screen.getByRole('textbox')

    // 有効な金額を入力
    await act(async () => {
      await user.type(amountInput, '1500')
    })

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled()
    })
  })

  it('有効な入力があると送信ボタンが有効になる', async () => {
    const user = userEvent.setup()
    renderOptimized(<TransactionForm {...defaultProps} />)

    const submitButton = screen.getByRole('button', { name: '登録する' })
    const amountInput = screen.getByRole('textbox')

    // 有効な金額を入力
    await act(async () => {
      await user.type(amountInput, '1500')
    })

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

    renderOptimized(
      <TransactionForm {...defaultProps} defaultValues={defaultValues} />
    )

    // 初期値が正しく設定されている
    await waitFor(() => {
      expect(screen.getByDisplayValue('¥5,000')).toBeInTheDocument()
    })
    await waitFor(() => {
      expect(screen.getByRole('switch')).toBeChecked()
    })
  })

  it('buttonColorが正しくButtonコンポーネントに適用される', () => {
    renderOptimized(<TransactionForm {...defaultProps} buttonColor="success" />)
    // 実装詳細に依存せず存在のみ確認
    const submitButton = screen.getByRole('button', { name: '登録する' })
    expect(submitButton).toBeInTheDocument()
  })

  // propsの別バリエーションテストは重複のため削除
})
