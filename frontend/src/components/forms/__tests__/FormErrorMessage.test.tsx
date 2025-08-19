import { render, screen } from '@testing-library/react'
import type { FieldError } from 'react-hook-form'
import FormErrorMessage from '../FormErrorMessage'

describe('FormErrorMessage', () => {
  it('エラーがない場合は何も表示しない', () => {
    const { container } = render(<FormErrorMessage />)
    expect(container.firstChild).toBeNull()
  })

  it('エラーがundefinedの場合は何も表示しない', () => {
    const { container } = render(<FormErrorMessage error={undefined} />)
    expect(container.firstChild).toBeNull()
  })

  it('エラーメッセージを表示する', () => {
    const error: FieldError = {
      type: 'required',
      message: 'このフィールドは必須です',
    }

    render(<FormErrorMessage error={error} />)
    expect(screen.getByText('このフィールドは必須です')).toBeInTheDocument()
  })

  it('MUIのFormHelperTextが適切なプロパティで表示される', () => {
    const error: FieldError = {
      type: 'pattern',
      message: '正しい形式で入力してください',
    }

    render(<FormErrorMessage error={error} />)

    const helperText = screen.getByText('正しい形式で入力してください')
    expect(helperText).toBeInTheDocument()
    expect(helperText).toHaveClass('MuiFormHelperText-root')
    expect(helperText).toHaveClass('Mui-error')
  })

  it('複数の異なるエラータイプを表示できる', () => {
    const minLengthError: FieldError = {
      type: 'minLength',
      message: '3文字以上で入力してください',
    }

    const { rerender } = render(<FormErrorMessage error={minLengthError} />)
    expect(screen.getByText('3文字以上で入力してください')).toBeInTheDocument()

    const maxLengthError: FieldError = {
      type: 'maxLength',
      message: '10文字以下で入力してください',
    }

    rerender(<FormErrorMessage error={maxLengthError} />)
    expect(screen.getByText('10文字以下で入力してください')).toBeInTheDocument()
    expect(
      screen.queryByText('3文字以上で入力してください')
    ).not.toBeInTheDocument()
  })

  it('空文字のエラーメッセージでも表示される', () => {
    const error: FieldError = {
      type: 'custom',
      message: '',
    }

    const { container } = render(<FormErrorMessage error={error} />)
    const helperText = container.querySelector('.MuiFormHelperText-root')
    expect(helperText).toBeInTheDocument()
    expect(helperText).toHaveTextContent('')
  })
})
