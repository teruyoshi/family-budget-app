import { render, screen } from '@testing-library/react'
import AppTitle from '../AppTitle'

describe('AppTitle', () => {
  it('デフォルトで「家計簿アプリ」テキストを表示する', () => {
    render(<AppTitle />)
    expect(screen.getByText('家計簿アプリ')).toBeInTheDocument()
  })

  it('カスタムタイトルを表示できる', () => {
    render(<AppTitle title="My Budget App" />)
    expect(screen.getByText('My Budget App')).toBeInTheDocument()
    expect(screen.queryByText('家計簿アプリ')).not.toBeInTheDocument()
  })

  it('空文字タイトルを渡した場合は空文字を表示する', () => {
    render(<AppTitle title="" />)
    const title = screen.getByRole('heading', { level: 1 })
    expect(title).toHaveTextContent('')
  })

  it('デフォルトでh1要素としてレンダリングされる', () => {
    render(<AppTitle />)
    const title = screen.getByRole('heading', { level: 1 })
    expect(title).toBeInTheDocument()
    expect(title).toHaveTextContent('家計簿アプリ')
  })

  it('noWrapプロパティが正しく適用される', () => {
    render(<AppTitle noWrap />)
    const title = screen.getByText('家計簿アプリ')
    expect(title).toHaveClass('MuiTypography-noWrap')
  })

  it('noWrapがfalseの場合はnoWrapクラスが適用されない', () => {
    render(<AppTitle noWrap={false} />)
    const title = screen.getByText('家計簿アプリ')
    expect(title).not.toHaveClass('MuiTypography-noWrap')
  })

  it('variantプロパティが正しく適用される', () => {
    render(<AppTitle variant="h3" />)
    const title = screen.getByText('家計簿アプリ')
    expect(title).toHaveClass('MuiTypography-h3')
  })

  it('componentプロパティでHTML要素を変更できる', () => {
    render(<AppTitle component="h2" />)
    const title = screen.getByRole('heading', { level: 2 })
    expect(title).toBeInTheDocument()
    expect(title).toHaveTextContent('家計簿アプリ')
  })

  it('sxプロパティでスタイルをカスタマイズできる', () => {
    render(<AppTitle sx={{ color: 'red', fontSize: '2rem' }} />)
    const title = screen.getByText('家計簿アプリ')
    expect(title).toHaveStyle({ color: 'rgb(255, 0, 0)', fontSize: '2rem' })
  })

  it('ナビゲーション用設定が正しく動作する', () => {
    render(
      <AppTitle
        title="Budget Manager"
        variant="h6"
        component="h1"
        noWrap
        sx={{ flexGrow: 1 }}
      />
    )
    const title = screen.getByRole('heading', { level: 1 })
    expect(title).toBeInTheDocument()
    expect(title).toHaveClass('MuiTypography-h6')
    expect(title).toHaveClass('MuiTypography-noWrap')
    expect(title).toHaveStyle({ flexGrow: '1' })
    expect(title).toHaveTextContent('Budget Manager')
  })

  it('複数のプロパティを同時に適用できる', () => {
    render(
      <AppTitle
        title="カスタムアプリ"
        variant="h2"
        component="h3"
        sx={{ textAlign: 'center' }}
      />
    )
    const title = screen.getByRole('heading', { level: 3 })
    expect(title).toBeInTheDocument()
    expect(title).toHaveClass('MuiTypography-h2')
    expect(title).toHaveStyle({ textAlign: 'center' })
    expect(title).toHaveTextContent('カスタムアプリ')
  })
})
