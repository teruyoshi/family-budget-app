import { render, screen } from '@testing-library/react'
import TextLabel from '../TextLabel'

describe('TextLabel', () => {
  it('テキストにコロンが自動付加される', () => {
    render(<TextLabel>残高</TextLabel>)
    expect(screen.getByText('残高：')).toBeInTheDocument()
  })

  it('デフォルトでbody1バリアントが適用される', () => {
    render(<TextLabel>テストラベル</TextLabel>)
    const label = screen.getByText('テストラベル：')
    expect(label).toHaveClass('MuiTypography-body1')
  })

  it('variant属性が正しく適用される', () => {
    render(<TextLabel variant="h6">見出しラベル</TextLabel>)
    const label = screen.getByText('見出しラベル：')
    expect(label).toHaveClass('MuiTypography-h6')
  })

  it('sxプロパティでスタイルをカスタマイズできる', () => {
    render(
      <TextLabel sx={{ color: 'rgb(25, 118, 210)', fontWeight: 700 }}>
        カスタムラベル
      </TextLabel>
    )
    const label = screen.getByText('カスタムラベル：')
    expect(label).toHaveStyle({ color: 'rgb(25, 118, 210)', fontWeight: '700' })
  })

  it('className属性が正しく設定される', () => {
    render(<TextLabel className="custom-label">クラスラベル</TextLabel>)
    const label = screen.getByText('クラスラベル：')
    expect(label).toHaveClass('custom-label')
  })

  it('htmlFor属性が正しく設定される', () => {
    render(<TextLabel htmlFor="input-field">フォームラベル</TextLabel>)
    const label = screen.getByText('フォームラベル：')
    expect(label).toHaveAttribute('for', 'input-field')
  })

  it('htmlForが未指定の場合はfor属性が設定されない', () => {
    render(<TextLabel>通常ラベル</TextLabel>)
    const label = screen.getByText('通常ラベル：')
    expect(label).not.toHaveAttribute('for')
  })

  it('複数のプロパティが同時に適用される', () => {
    render(
      <TextLabel
        variant="subtitle1"
        className="form-label"
        htmlFor="username"
        sx={{ color: 'primary.main' }}
      >
        ユーザー名
      </TextLabel>
    )

    const label = screen.getByText('ユーザー名：')
    expect(label).toHaveClass('MuiTypography-subtitle1')
    expect(label).toHaveClass('form-label')
    expect(label).toHaveAttribute('for', 'username')
  })

  it('空のchildrenでもコロンが表示される', () => {
    render(<TextLabel>{''}</TextLabel>)
    expect(screen.getByText('：')).toBeInTheDocument()
  })

  it('数値や特殊文字を含むテキストでもコロンが付加される', () => {
    render(<TextLabel>支出額（円）</TextLabel>)
    expect(screen.getByText('支出額（円）：')).toBeInTheDocument()
  })

  it('ReactNodeとしてJSX要素を渡せる', () => {
    render(
      <TextLabel>
        <strong>重要</strong>項目
      </TextLabel>
    )
    // JSX要素が含まれていても適切にレンダリングされることを確認
    expect(screen.getByText('重要')).toBeInTheDocument()
    expect(screen.getByText('項目：')).toBeInTheDocument()
  })

  it('長いテキストでもコロンが正しく付加される', () => {
    const longText = 'これは非常に長いラベルテキストの例です'
    render(<TextLabel>{longText}</TextLabel>)
    expect(screen.getByText(`${longText}：`)).toBeInTheDocument()
  })
})
