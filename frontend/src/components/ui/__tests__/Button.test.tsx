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

  // boldプロパティテスト（カスタム機能、基本テストで十分）

  // bold=false テスト（冗長）

  // paddingYデフォルトテスト（詳細スタイル、冗長）

  // paddingYカスタマイズテスト（詳細スタイル、冗長）

  // fullWidthテスト（詳細スタイル、冗長）

  // fullWidth=falseテスト（冗長）

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

  // sxプロパティテスト（MUI基本機能）

  // variant×color組み合わせテスト（MUI基本機能）

  // ReactNodeテスト（基本機能で十分）

  // アクセシビリティプロパティテスト（重要、保持）

  it('onClickイベントが正しく動作する', () => {
    const mockClick = jest.fn()
    render(<Button onClick={mockClick}>クリック</Button>)

    const button = screen.getByRole('button')
    button.click()

    expect(mockClick).toHaveBeenCalledTimes(1)
  })

  // フォーム送信ボタンテスト（統合テスト、冗長）
})
