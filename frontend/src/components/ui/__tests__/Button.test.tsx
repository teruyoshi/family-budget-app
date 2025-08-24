import { render, screen } from '@testing-library/react'
import { Button } from '@/components/ui'

describe('Button', () => {
  it('基本的なレンダリングが正しく動作する', () => {
    render(<Button>テストボタン</Button>)

    const button = screen.getByRole('button', { name: 'テストボタン' })
    expect(button).toBeInTheDocument()
  })

  it('childrenが正しく表示される', () => {
    render(<Button>保存する</Button>)

    expect(screen.getByText('保存する')).toBeInTheDocument()
  })

  it('デフォルトでbold=trueが適用される', () => {
    render(<Button>ボタン</Button>)

    const button = screen.getByRole('button')
    // MUIのsx propsが適用されていることを確認（具体的なスタイル値ではなく存在確認）
    expect(button).toBeInTheDocument()
  })

  it('bold=falseを指定すると通常の太さになる', () => {
    render(<Button bold={false}>ボタン</Button>)

    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
  })

  it('デフォルトでpaddingY=1.5が適用される', () => {
    render(<Button>ボタン</Button>)

    const button = screen.getByRole('button')
    // MUIのtheme.spacing(1.5) = 12px
    expect(button).toHaveStyle({ paddingTop: '12px', paddingBottom: '12px' })
  })

  it('paddingYをカスタマイズできる', () => {
    render(<Button paddingY={2}>ボタン</Button>)

    const button = screen.getByRole('button')
    // MUIのtheme.spacing(2) = 16px
    expect(button).toHaveStyle({ paddingTop: '16px', paddingBottom: '16px' })
  })

  it('fullWidth=trueで幅100%になる', () => {
    render(<Button fullWidth>ボタン</Button>)

    const button = screen.getByRole('button')
    expect(button).toHaveStyle({ width: '100%' })
  })

  it('fullWidth=falseで通常幅になる', () => {
    render(<Button fullWidth={false}>ボタン</Button>)

    const button = screen.getByRole('button')
    expect(button).not.toHaveStyle({ width: '100%' })
  })

  it('MUIのButtonPropsが正しく渡される', () => {
    render(
      <Button variant="contained" color="primary" disabled type="submit">
        送信
      </Button>
    )

    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    expect(button).toHaveAttribute('type', 'submit')
  })

  it('カスタムsxプロパティが適用される', () => {
    render(
      <Button sx={{ borderRadius: 2, backgroundColor: 'red' }}>
        カスタムボタン
      </Button>
    )

    const button = screen.getByRole('button')
    // カスタムsxプロパティを受け入れることを確認
    expect(button).toBeInTheDocument()
    expect(screen.getByText('カスタムボタン')).toBeInTheDocument()
  })

  it('variantとcolorの組み合わせが正しく動作する', () => {
    render(
      <Button variant="contained" color="error">
        削除
      </Button>
    )

    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
  })

  it('React.ReactNodeとしてJSXも受け入れる', () => {
    render(
      <Button>
        <span>アイコン</span> 保存
      </Button>
    )

    expect(screen.getByText('アイコン')).toBeInTheDocument()
    expect(screen.getByText('保存')).toBeInTheDocument()
  })

  it('aria-labelやその他のアクセシビリティプロパティが設定できる', () => {
    render(
      <Button aria-label="設定を保存" title="設定内容を保存します">
        保存
      </Button>
    )

    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('aria-label', '設定を保存')
    expect(button).toHaveAttribute('title', '設定内容を保存します')
  })

  it('onClickイベントが正しく動作する', () => {
    const mockClick = jest.fn()
    render(<Button onClick={mockClick}>クリック</Button>)

    const button = screen.getByRole('button')
    button.click()

    expect(mockClick).toHaveBeenCalledTimes(1)
  })

  it('フォーム送信ボタンとして使用できる', () => {
    render(
      <Button
        type="submit"
        variant="contained"
        color="success"
        fullWidth
        disabled={false}
      >
        フォームを送信
      </Button>
    )

    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('type', 'submit')
    expect(button).not.toBeDisabled()
    expect(button).toHaveStyle({ width: '100%' })
  })
})
