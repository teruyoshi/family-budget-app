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

  // プレースホルダー表示テスト（MUI基本機能）

  // required属性テスト（MUI基本機能）

  test('エラー状態が適切に設定される', () => {
    setupTextInput({
      error: true,
      helperText: 'エラーメッセージ',
    })

    const helperText = screen.getByText('エラーメッセージ')
    expect(helperText).toBeInTheDocument()
  })

  // 入力タイプテスト群（HTML標準機能、冗長）

  // フォーカス制御テスト（MUI標準動作、冗長）
})
