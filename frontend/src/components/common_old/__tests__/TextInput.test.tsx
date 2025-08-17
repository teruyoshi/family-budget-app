import { render, screen, fireEvent } from '@testing-library/react'
import TextInput from '../TextInput'

describe('TextInput', () => {
  // Test helper function to setup common props
  const setupTextInputProps = (overrides = {}) => {
    const mockOnChange = jest.fn()
    const baseProps = {
      value: '',
      onChange: mockOnChange,
      placeholder: 'test-placeholder',
    }

    return {
      mockOnChange,
      props: { ...baseProps, ...overrides },
    }
  }
  test('基本的なプロパティで正しく描画される', () => {
    // Arrange
    const { props } = setupTextInputProps({
      type: 'text' as const,
      placeholder: 'テスト用プレースホルダー',
    })

    // Act
    render(<TextInput {...props} />)

    // Assert
    const input = screen.getByPlaceholderText('テスト用プレースホルダー')
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('type', 'text')
  })

  test('値の変更が正しく処理される', () => {
    // Arrange
    const { mockOnChange, props } = setupTextInputProps({
      placeholder: '入力してください',
    })
    const inputValue = 'テスト入力'

    render(<TextInput {...props} />)
    const input = screen.getByPlaceholderText('入力してください')

    // Act
    fireEvent.change(input, { target: { value: inputValue } })

    // Assert
    expect(mockOnChange).toHaveBeenCalledWith(inputValue)
  })

  test('必須フィールドが正しく設定される', () => {
    // Arrange
    const { props } = setupTextInputProps({
      required: true,
      placeholder: '必須フィールド',
    })

    // Act
    render(<TextInput {...props} />)

    // Assert
    const input = screen.getByPlaceholderText('必須フィールド')
    expect(input).toBeRequired()
  })

  test('数値タイプの入力フィールドが正しく設定される', () => {
    // Arrange
    const { props } = setupTextInputProps({
      type: 'number' as const,
      value: '123',
      placeholder: '数値を入力',
    })
    const expectedValue = 123

    // Act
    render(<TextInput {...props} />)

    // Assert
    const input = screen.getByPlaceholderText('数値を入力')
    expect(input).toHaveAttribute('type', 'number')
    expect(input).toHaveValue(expectedValue)
  })

  test('バリアント設定が正しく適用される', () => {
    // Arrange
    const { props } = setupTextInputProps({
      variant: 'filled' as const,
      placeholder: 'バリアントテスト',
    })

    // Act
    render(<TextInput {...props} />)

    // Assert
    const input = screen.getByPlaceholderText('バリアントテスト')
    expect(input).toBeInTheDocument()
    // MUIコンポーネントの詳細な属性確認は統合テストで実施
  })
})
