import { render, screen } from '@testing-library/react'
import PageLoader from '../PageLoader'

describe('PageLoader', () => {
  it('読み込み中のメッセージを表示する', () => {
    render(<PageLoader />)
    expect(screen.getByText('読み込み中...')).toBeInTheDocument()
  })

  it('適切なセマンティクスを持つ', () => {
    render(<PageLoader />)
    const loadingText = screen.getByText('読み込み中...')
    expect(loadingText.tagName).toBe('H6')
  })

  it('中央揃えのレイアウトで表示される', () => {
    const { container } = render(<PageLoader />)
    const boxElement = container.firstChild as HTMLElement

    expect(boxElement).toHaveStyle({
      display: 'flex',
      'justify-content': 'center',
      'align-items': 'center',
    })
  })

  it('指定された高さを持つ', () => {
    const { container } = render(<PageLoader />)
    const boxElement = container.firstChild as HTMLElement

    expect(boxElement).toHaveStyle({
      height: '200px',
    })
  })
})
