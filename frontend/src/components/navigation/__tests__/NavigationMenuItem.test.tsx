import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { Dashboard as DashboardIcon } from '@mui/icons-material'
import NavigationMenuItem from '../NavigationMenuItem'
import type { RouteInfo } from '@/types'

const theme = createTheme()

// テスト用のルート情報
const mockRoute: RouteInfo = {
  path: '/',
  title: 'ダッシュボード',
  description: '家計簿の概要と主要機能へのアクセス',
  element: <div>Dashboard</div>,
  showInNavigation: true,
  icon: DashboardIcon,
}

const mockRouteWithoutIcon: RouteInfo = {
  path: '/settings',
  title: '設定',
  description: 'アプリケーションの設定管理',
  element: <div>Settings</div>,
  showInNavigation: true,
}

// テスト用のラッパーコンポーネント
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  </BrowserRouter>
)

// モックされた navigate 関数
const mockNavigate = jest.fn()
const mockOnDrawerClose = jest.fn()

// react-router-dom のモック
jest.mock('react-router-dom', () => {
  const mockUseLocation = jest.fn(() => ({ pathname: '/' }))
  return {
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
    useLocation: mockUseLocation,
  }
})

describe('NavigationMenuItem', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('基本的なレンダリングが正しく動作する', () => {
    render(
      <TestWrapper>
        <NavigationMenuItem
          route={mockRoute}
          isMobile={false}
          onDrawerClose={mockOnDrawerClose}
        />
      </TestWrapper>
    )

    expect(screen.getByText('ダッシュボード')).toBeInTheDocument()
    expect(screen.getByRole('menuitem')).toBeInTheDocument()
  })

  it('アイコンが正しく表示される', () => {
    render(
      <TestWrapper>
        <NavigationMenuItem
          route={mockRoute}
          isMobile={false}
          onDrawerClose={mockOnDrawerClose}
        />
      </TestWrapper>
    )

    // DashboardIcon が表示されることを確認
    const icon = screen.getByTestId('DashboardIcon')
    expect(icon).toBeInTheDocument()
  })

  it('アイコンがないルートでも正常に動作する', () => {
    render(
      <TestWrapper>
        <NavigationMenuItem
          route={mockRouteWithoutIcon}
          isMobile={false}
          onDrawerClose={mockOnDrawerClose}
        />
      </TestWrapper>
    )

    expect(screen.getByText('設定')).toBeInTheDocument()
    // アイコンが表示されないことを確認
    expect(screen.queryByTestId('SettingsIcon')).not.toBeInTheDocument()
  })

  it('クリック時にナビゲーション処理が実行される', async () => {
    const user = userEvent.setup()

    render(
      <TestWrapper>
        <NavigationMenuItem
          route={mockRoute}
          isMobile={false}
          onDrawerClose={mockOnDrawerClose}
        />
      </TestWrapper>
    )

    const menuItem = screen.getByRole('menuitem')
    await user.click(menuItem)

    expect(mockNavigate).toHaveBeenCalledWith('/')
    expect(mockOnDrawerClose).not.toHaveBeenCalled()
  })

  it('モバイル表示時のクリックでドロワーが閉じられる', async () => {
    const user = userEvent.setup()

    render(
      <TestWrapper>
        <NavigationMenuItem
          route={mockRoute}
          isMobile={true}
          onDrawerClose={mockOnDrawerClose}
        />
      </TestWrapper>
    )

    const menuItem = screen.getByRole('menuitem')
    await user.click(menuItem)

    expect(mockNavigate).toHaveBeenCalledWith('/')
    expect(mockOnDrawerClose).toHaveBeenCalled()
  })

  it('Enterキーでナビゲーション処理が実行される', async () => {
    const user = userEvent.setup()

    render(
      <TestWrapper>
        <NavigationMenuItem
          route={mockRoute}
          isMobile={false}
          onDrawerClose={mockOnDrawerClose}
        />
      </TestWrapper>
    )

    const menuItem = screen.getByRole('menuitem')
    await act(async () => {
      menuItem.focus()
      await user.keyboard('{Enter}')
    })

    expect(mockNavigate).toHaveBeenCalledWith('/')
  })

  it('スペースキーでナビゲーション処理が実行される', async () => {
    const user = userEvent.setup()

    render(
      <TestWrapper>
        <NavigationMenuItem
          route={mockRoute}
          isMobile={false}
          onDrawerClose={mockOnDrawerClose}
        />
      </TestWrapper>
    )

    const menuItem = screen.getByRole('menuitem')
    await act(async () => {
      menuItem.focus()
      await user.keyboard(' ')
    })

    expect(mockNavigate).toHaveBeenCalledWith('/')
  })

  it('アクティブなルートで正しいスタイルが適用される', () => {
    render(
      <TestWrapper>
        <NavigationMenuItem
          route={mockRoute}
          isMobile={false}
          onDrawerClose={mockOnDrawerClose}
        />
      </TestWrapper>
    )

    const menuItem = screen.getByRole('menuitem')
    expect(menuItem).toHaveClass('Mui-selected')
  })

  it('非アクティブなルートで正しいスタイルが適用される', () => {
    // 異なるルートでテスト
    const differentRoute = { ...mockRoute, path: '/expenses' as const }
    
    render(
      <TestWrapper>
        <NavigationMenuItem
          route={differentRoute}
          isMobile={false}
          onDrawerClose={mockOnDrawerClose}
        />
      </TestWrapper>
    )

    const menuItem = screen.getByRole('menuitem')
    expect(menuItem).not.toHaveClass('Mui-selected')
  })

  it('アクセシビリティ属性が正しく設定される', () => {
    render(
      <TestWrapper>
        <NavigationMenuItem
          route={mockRoute}
          isMobile={false}
          onDrawerClose={mockOnDrawerClose}
        />
      </TestWrapper>
    )

    const menuItem = screen.getByRole('menuitem')
    expect(menuItem).toHaveAttribute('aria-label', 'ダッシュボードページに移動')
  })

  it('複数のプロパティが同時に適用される', async () => {
    const user = userEvent.setup()

    render(
      <TestWrapper>
        <NavigationMenuItem
          route={mockRoute}
          isMobile={true}
          onDrawerClose={mockOnDrawerClose}
        />
      </TestWrapper>
    )

    expect(screen.getByText('ダッシュボード')).toBeInTheDocument()
    expect(screen.getByTestId('DashboardIcon')).toBeInTheDocument()

    const menuItem = screen.getByRole('menuitem')
    await user.click(menuItem)

    expect(mockNavigate).toHaveBeenCalledWith('/')
    expect(mockOnDrawerClose).toHaveBeenCalled()
  })
})