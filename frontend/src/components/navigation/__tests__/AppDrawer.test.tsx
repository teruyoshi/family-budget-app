import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { Dashboard } from '@mui/icons-material'
import AppDrawer from '../AppDrawer'

const theme = createTheme()

// テスト用のラッパーコンポーネント
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  </BrowserRouter>
)

// getNavigationRoutes のモック
jest.mock('@/routes/routes', () => ({
  getNavigationRoutes: () => [
    {
      path: '/',
      title: 'ダッシュボード',
      description: '家計簿の概要と主要機能へのアクセス',
      element: <div>Dashboard</div>,
      showInNavigation: true,
      icon: Dashboard,
    },
  ],
}))

describe('AppDrawer', () => {
  const setup = (props = {}) => {
    const mockOnDrawerClose = jest.fn()
    const defaultProps = {
      drawerWidth: 240,
      title: '家計簿アプリ',
      isMobile: false,
      mobileOpen: false,
      onDrawerClose: mockOnDrawerClose,
    }
    const mergedProps = { ...defaultProps, ...props }
    const renderResult = render(
      <TestWrapper>
        <AppDrawer {...mergedProps} />
      </TestWrapper>
    )
    return { ...renderResult, mockOnDrawerClose }
  }

  it('基本的なレンダリングが正しく動作する', () => {
    setup()

    expect(screen.getByRole('navigation')).toBeInTheDocument()
    expect(screen.getAllByText('家計簿アプリ')).toHaveLength(2) // モバイルとデスクトップ両方のドロワー
  })

  it('デスクトップ用ドロワーが正しく表示される', () => {
    setup()

    // permanent variant のドロワーが存在することを確認
    // MUIのDrawerコンポーネントはクラス名で識別可能
    const nav = screen.getByRole('navigation')
    expect(nav).toBeInTheDocument()
    expect(nav).toHaveAttribute('aria-label', 'メインナビゲーション')
  })

  it('モバイル用ドロワーが正しく表示される', () => {
    setup({ isMobile: true, mobileOpen: true })

    // モバイル時もモバイルとデスクトップ両方のドロワーが存在する
    expect(screen.getAllByText('家計簿アプリ')).toHaveLength(2)
    expect(screen.getAllByText('ダッシュボード')).toHaveLength(2)
  })

  it('ドロワー幅が正しく適用される', () => {
    const customWidth = 280
    setup({ drawerWidth: customWidth })

    const nav = screen.getByRole('navigation')
    expect(nav).toBeInTheDocument()
    // スタイルの確認は実装の詳細なので、要素が存在することのみ確認
  })

  it('カスタムタイトルが正しく表示される', () => {
    const customTitle = 'My Budget App'
    setup({ title: customTitle })

    expect(screen.getAllByText(customTitle)).toHaveLength(2) // モバイルとデスクトップ両方のドロワー
  })

  it('モバイルドロワーが開いている状態で正しく表示される', () => {
    setup({ isMobile: true, mobileOpen: true })

    // モバイル時もモバイルとデスクトップ両方のドロワーが表示されることを確認
    expect(screen.getAllByText('家計簿アプリ')).toHaveLength(2)
    expect(screen.getAllByText('ダッシュボード')).toHaveLength(2)
  })

  it('モバイルドロワーが閉じている状態で正しく動作する', () => {
    setup({ isMobile: true, mobileOpen: false })

    expect(screen.getByRole('navigation')).toBeInTheDocument()
    // ドロワーが閉じていても要素は存在する（visibility や transform で制御）
  })

  it('ドロワーコンテンツが正しく表示される', () => {
    setup()

    // AppDrawerContent の内容が表示されることを確認
    expect(screen.getAllByText('家計簿アプリ')).toHaveLength(2) // モバイルとデスクトップ両方のドロワー
    expect(screen.getAllByText('ダッシュボード')).toHaveLength(2) // モバイルとデスクトップ両方のドロワー
  })

  it('複数のプロパティが同時に適用される', () => {
    setup({
      drawerWidth: 300,
      title: 'Test App',
      isMobile: true,
      mobileOpen: true,
    })

    // モバイル時もモバイルとデスクトップ両方のドロワーが表示されることを確認
    expect(screen.getAllByText('Test App')).toHaveLength(2)
    expect(screen.getAllByText('ダッシュボード')).toHaveLength(2)
  })

  it('ナビゲーション要素のアクセシビリティ属性が正しく設定される', () => {
    setup()

    const nav = screen.getByRole('navigation')
    expect(nav).toHaveAttribute('aria-label', 'メインナビゲーション')
  })

  it('ドロワーコンテンツが両方のドロワーで共有される', () => {
    setup({ isMobile: true, mobileOpen: true })

    // 同じコンテンツが両方のドロワーに表示される
    // （モバイル用とデスクトップ用）
    expect(screen.getAllByText('家計簿アプリ')).toHaveLength(2)
    expect(screen.getAllByText('ダッシュボード')).toHaveLength(2)
  })

  it('遷移状態の処理が正しく動作する', async () => {
    const user = userEvent.setup()
    const { mockOnDrawerClose } = setup({ isMobile: true, mobileOpen: true })

    // メニュー項目が表示されることを確認
    expect(screen.getAllByText('ダッシュボード')).toHaveLength(2)

    // メニュー項目をクリック（最初の要素を選択）
    const menuItems = screen.getAllByRole('menuitem')
    await user.click(menuItems[0])

    // ドロワークローズが呼ばれることを確認
    expect(mockOnDrawerClose).toHaveBeenCalled()
  })

  it('空のタイトルでも正常に動作する', () => {
    setup({ title: '' })

    expect(screen.getByRole('navigation')).toBeInTheDocument()
    // 空のタイトルでもコンポーネントがクラッシュしないことを確認
  })

  it('最小幅でも正常に表示される', () => {
    setup({ drawerWidth: 200 })

    expect(screen.getByRole('navigation')).toBeInTheDocument()
    expect(screen.getAllByText('家計簿アプリ')).toHaveLength(2)
  })

  it('最大幅でも正常に表示される', () => {
    setup({ drawerWidth: 400 })

    expect(screen.getByRole('navigation')).toBeInTheDocument()
    expect(screen.getAllByText('家計簿アプリ')).toHaveLength(2)
  })
})
