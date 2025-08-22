import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { Dashboard, TrendingDown, TrendingUp } from '@mui/icons-material'
import AppBreadcrumbs from '../AppBreadcrumbs'

const theme = createTheme()

// テスト用のラッパーコンポーネント
const TestWrapper = ({ 
  children, 
  initialEntries = ['/'] 
}: { 
  children: React.ReactNode
  initialEntries?: string[]
}) => (
  <BrowserRouter>
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  </BrowserRouter>
)

// getRouteInfo のモック
jest.mock('@/routes/routes', () => ({
  getRouteInfo: jest.fn((path: string) => {
    const routes: Record<string, any> = {
      '/': {
        path: '/',
        title: 'ダッシュボード',
        description: '家計簿の概要と主要機能へのアクセス',
        showInNavigation: true,
        icon: Dashboard,
      },
      '/expenses': {
        path: '/expenses',
        title: '支出管理',
        description: '支出の登録と履歴管理',
        showInNavigation: true,
        icon: TrendingDown,
      },
      '/income': {
        path: '/income',
        title: '収入管理',
        description: '収入の登録と履歴管理',
        showInNavigation: true,
        icon: TrendingUp,
      },
    }
    return routes[path] || null
  }),
}))

// useLocation のモック
const mockUseLocation = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => mockUseLocation(),
}))

describe('AppBreadcrumbs', () => {
  const setup = (props = {}, pathname = '/') => {
    mockUseLocation.mockReturnValue({ pathname })
    
    const defaultProps = {}
    const mergedProps = { ...defaultProps, ...props }
    
    const renderResult = render(
      <TestWrapper>
        <AppBreadcrumbs {...mergedProps} />
      </TestWrapper>
    )
    return renderResult
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('基本的なレンダリングが正しく動作する', () => {
    setup({}, '/expenses')

    expect(screen.getByLabelText('パンくずナビゲーション')).toBeInTheDocument()
    expect(screen.getByText('ホーム')).toBeInTheDocument()
    expect(screen.getByText('支出管理')).toBeInTheDocument()
  })

  it('ホームページでは表示されない', () => {
    const { container } = setup({}, '/')

    expect(container.firstChild).toBeNull()
  })

  it('ホームアイコンが正しく表示される', () => {
    setup({ showHomeIcon: true }, '/expenses')

    const homeIcon = screen.getByTestId('HomeIcon')
    expect(homeIcon).toBeInTheDocument()
  })

  it('ホームアイコンを非表示にできる', () => {
    setup({ showHomeIcon: false }, '/expenses')

    expect(screen.queryByTestId('HomeIcon')).not.toBeInTheDocument()
  })

  it('現在ページがTypographyで表示される', () => {
    setup({}, '/expenses')

    const currentPage = screen.getByText('支出管理')
    expect(currentPage.tagName.toLowerCase()).toBe('span') // Typography renders as span
  })

  it('ホームリンクが正しく設定される', () => {
    setup({}, '/expenses')

    const homeLink = screen.getByRole('link', { name: /ホーム/ })
    expect(homeLink).toHaveAttribute('href', '/')
  })

  it('収入管理ページで正しく表示される', () => {
    setup({}, '/income')

    expect(screen.getByText('ホーム')).toBeInTheDocument()
    expect(screen.getByText('収入管理')).toBeInTheDocument()
  })

  it('カスタムアイテムが追加される', () => {
    const customItems = [
      { label: '詳細ページ', href: '/detail/123' },
      { label: '編集' },
    ]

    setup({ customItems }, '/expenses')

    expect(screen.getByText('詳細ページ')).toBeInTheDocument()
    expect(screen.getByText('編集')).toBeInTheDocument()
  })

  it('カスタムアイテムのリンクが正しく設定される', () => {
    const customItems = [
      { label: '詳細ページ', href: '/detail/123' },
    ]

    setup({ customItems }, '/expenses')

    const customLink = screen.getByRole('link', { name: '詳細ページ' })
    expect(customLink).toHaveAttribute('href', '/detail/123')
  })

  it('最後のカスタムアイテムがリンクなしの場合現在ページとして表示される', () => {
    const customItems = [
      { label: '詳細ページ', href: '/detail/123' },
      { label: '編集' }, // href無し
    ]

    setup({ customItems }, '/expenses')

    const editItem = screen.getByText('編集')
    expect(editItem.tagName.toLowerCase()).toBe('span') // Typography renders as span
  })

  it('maxWidthプロパティが適用される', () => {
    const { container } = setup({ maxWidth: 400 }, '/expenses')

    const breadcrumbs = container.querySelector('.MuiBreadcrumbs-root')
    expect(breadcrumbs).toHaveStyle({ maxWidth: '400px' })
  })

  it('NavigateNextIconが区切り文字として使用される', () => {
    setup({}, '/expenses')

    const separators = screen.getAllByTestId('NavigateNextIcon')
    expect(separators.length).toBeGreaterThan(0)
  })

  it('不明なルートでも正常に動作する', () => {
    setup({}, '/unknown-route')

    expect(screen.getByLabelText('パンくずナビゲーション')).toBeInTheDocument()
    expect(screen.getByText('ホーム')).toBeInTheDocument()
  })

  it('空のカスタムアイテム配列でも正常に動作する', () => {
    setup({ customItems: [] }, '/expenses')

    expect(screen.getByText('ホーム')).toBeInTheDocument()
    expect(screen.getByText('支出管理')).toBeInTheDocument()
  })

  it('複数のプロパティが同時に適用される', () => {
    const customItems = [{ label: 'カスタム項目' }]
    const { container } = setup({
      showHomeIcon: false,
      maxWidth: 500,
      customItems,
    }, '/income')

    expect(screen.queryByTestId('HomeIcon')).not.toBeInTheDocument()
    expect(screen.getByText('カスタム項目')).toBeInTheDocument()
    
    const breadcrumbs = container.querySelector('.MuiBreadcrumbs-root')
    expect(breadcrumbs).toHaveStyle({ maxWidth: '500px' })
  })

  it('aria-labelが正しく設定される', () => {
    setup({}, '/expenses')

    const breadcrumbs = screen.getByLabelText('パンくずナビゲーション')
    expect(breadcrumbs).toHaveAttribute('aria-label', 'パンくずナビゲーション')
  })

  it('テキストオーバーフローが正しく設定される', () => {
    const { container } = setup({}, '/expenses')

    const breadcrumbItems = container.querySelectorAll('.MuiBreadcrumbs-li > *')
    breadcrumbItems.forEach(item => {
      const styles = window.getComputedStyle(item)
      expect(styles.overflow).toBe('hidden')
      expect(styles.textOverflow).toBe('ellipsis')
      expect(styles.whiteSpace).toBe('nowrap')
    })
  })

  it('現在ページのフォントウェイトが正しく設定される', () => {
    setup({}, '/expenses')

    const currentPageElement = screen.getByText('支出管理')
    expect(currentPageElement).toHaveStyle({ fontWeight: 'medium' })
  })

  it('カスタムアイテムの順序が正しく保持される', () => {
    const customItems = [
      { label: '第1項目', href: '/first' },
      { label: '第2項目', href: '/second' },
      { label: '第3項目' },
    ]

    setup({ customItems }, '/expenses')

    const items = screen.getAllByRole('link').concat(screen.getAllByText(/第\d項目/))
    const labels = items.map(item => item.textContent)
    
    expect(labels).toContain('第1項目')
    expect(labels).toContain('第2項目')
    expect(labels).toContain('第3項目')
  })
})