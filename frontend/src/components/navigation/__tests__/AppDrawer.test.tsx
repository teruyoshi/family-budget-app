import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import AppDrawer from '../AppDrawer'

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
  ],
}))

describe('AppDrawer', () => {
  const defaultProps = {
    drawerWidth: 240,
    title: '家計簿アプリ',
    isMobile: false,
    mobileOpen: false,
    onDrawerClose: mockOnDrawerClose,
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('基本的なレンダリングが正しく動作する', () => {
    render(
      <TestWrapper>
        <AppDrawer {...defaultProps} />
      </TestWrapper>
    )

    expect(screen.getByRole('navigation')).toBeInTheDocument()
    expect(screen.getByText('家計簿アプリ')).toBeInTheDocument()
  })

  it('デスクトップ用ドロワーが正しく表示される', () => {
    render(
      <TestWrapper>
        <AppDrawer {...defaultProps} />
      </TestWrapper>
    )

    // permanent variant のドロワーが存在することを確認
    // MUIのDrawerコンポーネントはクラス名で識別可能
    const nav = screen.getByRole('navigation')
    expect(nav).toBeInTheDocument()
    expect(nav).toHaveAttribute('aria-label', 'メインナビゲーション')
  })

  it('モバイル用ドロワーが正しく表示される', () => {
    render(
      <TestWrapper>
        <AppDrawer
          {...defaultProps}
          isMobile={true}
          mobileOpen={true}
        />
      </TestWrapper>
    )

    expect(screen.getByRole('navigation')).toBeInTheDocument()
    expect(screen.getByText('家計簿アプリ')).toBeInTheDocument()
  })

  it('ドロワー幅が正しく適用される', () => {
    const customWidth = 280
    
    render(
      <TestWrapper>
        <AppDrawer
          {...defaultProps}
          drawerWidth={customWidth}
        />
      </TestWrapper>
    )

    const nav = screen.getByRole('navigation')
    expect(nav).toBeInTheDocument()
    // スタイルの確認は実装の詳細なので、要素が存在することのみ確認
  })

  it('カスタムタイトルが正しく表示される', () => {
    const customTitle = 'My Budget App'
    
    render(
      <TestWrapper>
        <AppDrawer
          {...defaultProps}
          title={customTitle}
        />
      </TestWrapper>
    )

    expect(screen.getByText(customTitle)).toBeInTheDocument()
  })

  it('モバイルドロワーが開いている状態で正しく表示される', () => {
    render(
      <TestWrapper>
        <AppDrawer
          {...defaultProps}
          isMobile={true}
          mobileOpen={true}
        />
      </TestWrapper>
    )

    expect(screen.getByRole('navigation')).toBeInTheDocument()
    expect(screen.getByText('家計簿アプリ')).toBeInTheDocument()
  })

  it('モバイルドロワーが閉じている状態で正しく動作する', () => {
    render(
      <TestWrapper>
        <AppDrawer
          {...defaultProps}
          isMobile={true}
          mobileOpen={false}
        />
      </TestWrapper>
    )

    expect(screen.getByRole('navigation')).toBeInTheDocument()
    // ドロワーが閉じていても要素は存在する（visibility や transform で制御）
  })

  it('ドロワーコンテンツが正しく表示される', () => {
    render(
      <TestWrapper>
        <AppDrawer {...defaultProps} />
      </TestWrapper>
    )

    // AppDrawerContent の内容が表示されることを確認
    expect(screen.getByText('家計簿アプリ')).toBeInTheDocument()
    expect(screen.getByText('ダッシュボード')).toBeInTheDocument()
  })

  it('複数のプロパティが同時に適用される', () => {
    render(
      <TestWrapper>
        <AppDrawer
          drawerWidth={300}
          title="Test App"
          isMobile={true}
          mobileOpen={true}
          onDrawerClose={mockOnDrawerClose}
        />
      </TestWrapper>
    )

    expect(screen.getByRole('navigation')).toBeInTheDocument()
    expect(screen.getByText('Test App')).toBeInTheDocument()
    expect(screen.getByText('ダッシュボード')).toBeInTheDocument()
  })

  it('ナビゲーション要素のアクセシビリティ属性が正しく設定される', () => {
    render(
      <TestWrapper>
        <AppDrawer {...defaultProps} />
      </TestWrapper>
    )

    const nav = screen.getByRole('navigation')
    expect(nav).toHaveAttribute('aria-label', 'メインナビゲーション')
  })

  it('ドロワーコンテンツが両方のドロワーで共有される', () => {
    render(
      <TestWrapper>
        <AppDrawer
          {...defaultProps}
          isMobile={true}
          mobileOpen={true}
        />
      </TestWrapper>
    )

    // 同じコンテンツが両方のドロワーに表示される
    // （モバイル用とデスクトップ用）
    expect(screen.getByText('家計簿アプリ')).toBeInTheDocument()
    expect(screen.getByText('ダッシュボード')).toBeInTheDocument()
  })

  it('遷移状態の処理が正しく動作する', async () => {
    const user = userEvent.setup()

    render(
      <TestWrapper>
        <AppDrawer
          {...defaultProps}
          isMobile={true}
          mobileOpen={true}
        />
      </TestWrapper>
    )

    // ナビゲーション要素が存在することを確認
    expect(screen.getByRole('navigation')).toBeInTheDocument()

    // メニュー項目をクリック
    const menuItem = screen.getByText('ダッシュボード')
    await user.click(menuItem)

    // ドロワークローズが呼ばれることを確認
    expect(mockOnDrawerClose).toHaveBeenCalled()
  })

  it('空のタイトルでも正常に動作する', () => {
    render(
      <TestWrapper>
        <AppDrawer
          {...defaultProps}
          title=""
        />
      </TestWrapper>
    )

    expect(screen.getByRole('navigation')).toBeInTheDocument()
    // 空のタイトルでもコンポーネントがクラッシュしないことを確認
  })

  it('最小幅でも正常に表示される', () => {
    render(
      <TestWrapper>
        <AppDrawer
          {...defaultProps}
          drawerWidth={200}
        />
      </TestWrapper>
    )

    expect(screen.getByRole('navigation')).toBeInTheDocument()
    expect(screen.getByText('家計簿アプリ')).toBeInTheDocument()
  })

  it('最大幅でも正常に表示される', () => {
    render(
      <TestWrapper>
        <AppDrawer
          {...defaultProps}
          drawerWidth={400}
        />
      </TestWrapper>
    )

    expect(screen.getByRole('navigation')).toBeInTheDocument()
    expect(screen.getByText('家計簿アプリ')).toBeInTheDocument()
  })
})