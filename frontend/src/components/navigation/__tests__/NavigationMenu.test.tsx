import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import NavigationMenu from '../NavigationMenu'

const theme = createTheme()

// テスト用のラッパーコンポーネント
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  </BrowserRouter>
)

// モックされた関数
const mockOnDrawerClose = jest.fn()

// getNavigationRoutes のモック
jest.mock('@/routes/routes', () => ({
  getNavigationRoutes: () => [
    {
      path: '/',
      title: 'ダッシュボード',
      description: '家計簿の概要と主要機能へのアクセス',
      element: <div>Dashboard</div>,
      showInNavigation: true,
      icon: require('@mui/icons-material').Dashboard,
    },
    {
      path: '/expenses',
      title: '支出管理',
      description: '支出の登録と履歴管理',
      element: <div>Expenses</div>,
      showInNavigation: true,
      icon: require('@mui/icons-material').TrendingDown,
    },
    {
      path: '/income',
      title: '収入管理',
      description: '収入の登録と履歴管理',
      element: <div>Income</div>,
      showInNavigation: true,
      icon: require('@mui/icons-material').TrendingUp,
    },
  ],
}))

describe('NavigationMenu', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('基本的なレンダリングが正しく動作する', () => {
    render(
      <TestWrapper>
        <NavigationMenu
          isMobile={false}
          onDrawerClose={mockOnDrawerClose}
        />
      </TestWrapper>
    )

    // すべてのメニュー項目が表示されることを確認
    expect(screen.getByText('ダッシュボード')).toBeInTheDocument()
    expect(screen.getByText('支出管理')).toBeInTheDocument()
    expect(screen.getByText('収入管理')).toBeInTheDocument()
  })

  it('Listコンポーネントが正しく表示される', () => {
    render(
      <TestWrapper>
        <NavigationMenu
          isMobile={false}
          onDrawerClose={mockOnDrawerClose}
        />
      </TestWrapper>
    )

    // List要素が存在することを確認
    const list = screen.getByRole('list')
    expect(list).toBeInTheDocument()
  })

  it('すべてのメニュー項目がmenuitem roleを持つ', () => {
    render(
      <TestWrapper>
        <NavigationMenu
          isMobile={false}
          onDrawerClose={mockOnDrawerClose}
        />
      </TestWrapper>
    )

    // 3つのmenuitem roleが存在することを確認
    const menuItems = screen.getAllByRole('menuitem')
    expect(menuItems).toHaveLength(3)
  })

  it('各メニュー項目に正しいpropsが渡される', () => {
    render(
      <TestWrapper>
        <NavigationMenu
          isMobile={true}
          onDrawerClose={mockOnDrawerClose}
        />
      </TestWrapper>
    )

    // メニュー項目が存在することを確認
    const menuItems = screen.getAllByRole('menuitem')
    expect(menuItems).toHaveLength(3)

    // 各項目がクリック可能であることを確認
    menuItems.forEach((item) => {
      expect(item).toBeEnabled()
    })
  })

  it('モバイルプロパティが正しく子コンポーネントに渡される', async () => {
    const user = userEvent.setup()

    render(
      <TestWrapper>
        <NavigationMenu
          isMobile={true}
          onDrawerClose={mockOnDrawerClose}
        />
      </TestWrapper>
    )

    // 最初のメニュー項目をクリック
    const firstMenuItem = screen.getAllByRole('menuitem')[0]
    await user.click(firstMenuItem)

    // モバイル表示時はドロワーが閉じられることを確認
    // NavigationMenuItemのテストで詳細は確認されているため、
    // ここでは基本的な動作のみチェック
    expect(mockOnDrawerClose).toHaveBeenCalled()
  })

  it('非モバイル表示でドロワーが閉じられない', async () => {
    const user = userEvent.setup()

    render(
      <TestWrapper>
        <NavigationMenu
          isMobile={false}
          onDrawerClose={mockOnDrawerClose}
        />
      </TestWrapper>
    )

    // 最初のメニュー項目をクリック
    const firstMenuItem = screen.getAllByRole('menuitem')[0]
    await user.click(firstMenuItem)

    // 非モバイル表示時はドロワーが閉じられないことを確認
    expect(mockOnDrawerClose).not.toHaveBeenCalled()
  })

  it('空のナビゲーションルートでも正常に動作する', () => {
    // getNavigationRoutes を空配列を返すようにモック
    jest.mocked(require('@/routes/routes').getNavigationRoutes).mockReturnValue([])

    render(
      <TestWrapper>
        <NavigationMenu
          isMobile={false}
          onDrawerClose={mockOnDrawerClose}
        />
      </TestWrapper>
    )

    // Listコンポーネントは存在するが、メニュー項目は存在しない
    const list = screen.getByRole('list')
    expect(list).toBeInTheDocument()
    expect(screen.queryAllByRole('menuitem')).toHaveLength(0)
  })

  it('複数のプロパティが同時に適用される', () => {
    render(
      <TestWrapper>
        <NavigationMenu
          isMobile={true}
          onDrawerClose={mockOnDrawerClose}
        />
      </TestWrapper>
    )

    // 基本的な要素が存在することを確認
    expect(screen.getByRole('list')).toBeInTheDocument()
    expect(screen.getAllByRole('menuitem')).toHaveLength(3)
    expect(screen.getByText('ダッシュボード')).toBeInTheDocument()
    expect(screen.getByText('支出管理')).toBeInTheDocument()
    expect(screen.getByText('収入管理')).toBeInTheDocument()
  })

  it('メニュー項目の順序が正しく保持される', () => {
    render(
      <TestWrapper>
        <NavigationMenu
          isMobile={false}
          onDrawerClose={mockOnDrawerClose}
        />
      </TestWrapper>
    )

    const menuItems = screen.getAllByRole('menuitem')
    
    // aria-label属性で順序を確認
    expect(menuItems[0]).toHaveAttribute('aria-label', 'ダッシュボードページに移動')
    expect(menuItems[1]).toHaveAttribute('aria-label', '支出管理ページに移動')
    expect(menuItems[2]).toHaveAttribute('aria-label', '収入管理ページに移動')
  })

  it('各メニュー項目に一意のkeyが設定される', () => {
    render(
      <TestWrapper>
        <NavigationMenu
          isMobile={false}
          onDrawerClose={mockOnDrawerClose}
        />
      </TestWrapper>
    )

    // React の key プロパティは DOM に反映されないため、
    // 代わりに各項目が正しく個別に表示されることを確認
    const menuItems = screen.getAllByRole('menuitem')
    expect(menuItems).toHaveLength(3)
    
    // 重複がないことを確認するために、各項目のテキストが一意であることをチェック
    const texts = menuItems.map(item => item.textContent)
    const uniqueTexts = [...new Set(texts)]
    expect(uniqueTexts).toHaveLength(3)
  })
})