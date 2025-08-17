import { render, screen, fireEvent } from '@testing-library/react'
import TextInput from '../TextInput'
import type { TextInputProps } from '../TextInput'

/**
 * TextInputコンポーネントのテストセットアップ関数
 *
 * 共通のmockOnChangeとrenderロジックを提供し、テストコードの重複を削減。
 *
 * @param props - TextInputに渡すプロパティ
 * @returns テスト用のユーティリティオブジェクト
 */
function setupTextInput(props: Partial<TextInputProps> = {}) {
  const mockOnChange = jest.fn()
  const defaultProps: TextInputProps = {
    value: '',
    onChange: mockOnChange,
    placeholder: 'テキストを入力',
    ...props,
  }

  const renderResult = render(<TextInput {...defaultProps} />)

  return {
    mockOnChange,
    renderResult,
    props: defaultProps,
  }
}

describe('TextInput', () => {
  test('基本的なテキスト入力が動作する', () => {
    const { mockOnChange } = setupTextInput({ value: '' })

    const input = screen.getByPlaceholderText('テキストを入力')
    fireEvent.change(input, { target: { value: 'Hello World' } })

    expect(mockOnChange).toHaveBeenCalledWith('Hello World')
  })

  test('初期値が正しく表示される', () => {
    setupTextInput({ value: 'Initial Value' })

    const input = screen.getByDisplayValue('Initial Value')
    expect(input).toBeInTheDocument()
  })

  test('プレースホルダーが表示される', () => {
    setupTextInput({ value: '', placeholder: 'カスタムプレースホルダー' })

    const input = screen.getByPlaceholderText('カスタムプレースホルダー')
    expect(input).toBeInTheDocument()
  })

  test('required属性が設定される', () => {
    setupTextInput({ required: true })

    const input = screen.getByRole('textbox')
    expect(input).toBeRequired()
  })

  test('エラー状態が適切に設定される', () => {
    setupTextInput({
      error: true,
      helperText: 'エラーメッセージ',
    })

    const helperText = screen.getByText('エラーメッセージ')
    expect(helperText).toBeInTheDocument()
  })

  describe('入力タイプ', () => {
    test('email タイプが設定される', () => {
      setupTextInput({ type: 'email' })

      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('type', 'email')
    })

    test('password タイプが設定される', () => {
      setupTextInput({ type: 'password' })

      const input = screen.getByPlaceholderText('テキストを入力')
      expect(input).toHaveAttribute('type', 'password')
    })

    test('number タイプが設定される', () => {
      setupTextInput({ type: 'number' })

      const input = screen.getByRole('spinbutton')
      expect(input).toHaveAttribute('type', 'number')
    })
  })

  describe('フォーカス制御', () => {
    test('onBlurコールバックが呼ばれる', () => {
      const mockOnBlur = jest.fn()
      setupTextInput({ onBlur: mockOnBlur })

      const input = screen.getByRole('textbox')
      fireEvent.blur(input)

      expect(mockOnBlur).toHaveBeenCalled()
    })
  })
})
