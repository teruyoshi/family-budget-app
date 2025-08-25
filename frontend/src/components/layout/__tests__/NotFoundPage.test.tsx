import { render, screen } from '@testing-library/react'
import NotFoundPage from '../NotFoundPage'

describe('NotFoundPage', () => {
  describe('基本レンダリング', () => {
    it('404エラーページが正しくレンダリングされる', () => {
      render(<NotFoundPage />)

      // タイトルが表示される
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
      expect(
        screen.getByText('404 - ページが見つかりません')
      ).toBeInTheDocument()

      // メッセージが表示される
      expect(
        screen.getByText('お探しのページは存在しません。')
      ).toBeInTheDocument()

      // ホームリンクが表示される
      expect(
        screen.getByRole('link', { name: 'ダッシュボードに戻る' })
      ).toBeInTheDocument()
    })
  })

  describe('リンク機能', () => {
    it('ダッシュボードリンクが正しいhref属性を持つ', () => {
      render(<NotFoundPage />)

      const homeLink = screen.getByRole('link', {
        name: 'ダッシュボードに戻る',
      })
      expect(homeLink).toHaveAttribute('href', '/')
    })

    it('リンクが適切なスタイルを持つ', () => {
      render(<NotFoundPage />)

      const homeLink = screen.getByRole('link', {
        name: 'ダッシュボードに戻る',
      })
      expect(homeLink).toHaveStyle({
        color: '#1976d2',
        textDecoration: 'none',
      })
    })
  })

  describe('スタイリング', () => {
    it('コンテナが適切なスタイルを持つ', () => {
      const { container } = render(<NotFoundPage />)
      const mainDiv = container.firstChild as HTMLElement

      expect(mainDiv).toHaveStyle({
        textAlign: 'center',
        padding: '2rem',
      })
    })
  })

  describe('アクセシビリティ', () => {
    it('適切な見出しレベルが設定されている', () => {
      render(<NotFoundPage />)

      const heading = screen.getByRole('heading', { level: 1 })
      expect(heading).toHaveTextContent('404 - ページが見つかりません')
    })

    it('リンクが適切にフォーカス可能', () => {
      render(<NotFoundPage />)

      const homeLink = screen.getByRole('link', {
        name: 'ダッシュボードに戻る',
      })
      homeLink.focus()
      expect(homeLink).toHaveFocus()
    })
  })

  describe('コンテンツ構造', () => {
    it('すべての必要な要素が存在する', () => {
      render(<NotFoundPage />)

      // 見出し
      expect(screen.getByRole('heading')).toBeInTheDocument()

      // 説明テキスト
      expect(
        screen.getByText('お探しのページは存在しません。')
      ).toBeInTheDocument()

      // ナビゲーションリンク
      expect(screen.getByRole('link')).toBeInTheDocument()
    })

    it('適切なDOM構造を持つ', () => {
      const { container } = render(<NotFoundPage />)

      // ルートdiv要素
      expect(container.firstChild).toBeInstanceOf(HTMLDivElement)

      // h1要素
      expect(container.querySelector('h1')).toBeInTheDocument()

      // p要素
      expect(container.querySelector('p')).toBeInTheDocument()

      // a要素
      expect(container.querySelector('a')).toBeInTheDocument()
    })
  })
})
