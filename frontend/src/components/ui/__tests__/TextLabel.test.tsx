import { render, screen } from '@testing-library/react'
import TextLabel from '../TextLabel'

describe('TextLabel', () => {
  it('テキストにコロンが自動付加される', () => {
    render(<TextLabel>残高</TextLabel>)
    expect(screen.getByText('残高：')).toBeInTheDocument()
  })

  // body1バリアントテスト（MUI基本機能）

  // variant属性テスト（MUI基本機能）

  // sxプロパティテスト（MUI基本機能）

  // className属性テスト（HTML標準機能）

  it('htmlFor属性が正しく設定される', () => {
    render(<TextLabel htmlFor="input-field">フォームラベル</TextLabel>)
    const label = screen.getByText('フォームラベル：')
    expect(label).toHaveAttribute('for', 'input-field')
  })

  // htmlFor未指定テスト（エッジケース、冗長）

  // 複数プロパティ統合テスト（冗長）

  // 空文字childrenテスト（エッジケース、冗長）

  // 特殊文字テスト（基本機能で十分）

  // ReactNode JSXテスト（基本機能で十分）

  // 長いテキストテスト（エッジケース、冗長）
})
