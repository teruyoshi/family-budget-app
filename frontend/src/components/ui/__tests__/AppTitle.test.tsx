import { render, screen } from '@testing-library/react'
import AppTitle from '../AppTitle'

describe('AppTitle', () => {
  it('デフォルトで「家計簿アプリ」テキストを表示する', () => {
    render(<AppTitle />)
    expect(screen.getByText('家計簿アプリ')).toBeInTheDocument()
  })

  it('デフォルトでh1要素としてレンダリングされる', () => {
    render(<AppTitle />)
    const title = screen.getByRole('heading', { level: 1 })
    expect(title).toBeInTheDocument()
    expect(title).toHaveTextContent('家計簿アプリ')
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

  it('複数のプロパティを同時に適用できる', () => {
    render(
      <AppTitle 
        variant="h2" 
        component="h3" 
        sx={{ textAlign: 'center' }} 
      />
    )
    const title = screen.getByRole('heading', { level: 3 })
    expect(title).toBeInTheDocument()
    expect(title).toHaveClass('MuiTypography-h2')
    expect(title).toHaveStyle({ textAlign: 'center' })
    expect(title).toHaveTextContent('家計簿アプリ')
  })
})