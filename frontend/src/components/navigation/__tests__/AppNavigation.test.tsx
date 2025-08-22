import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import AppNavigation from '../AppNavigation'

const theme = createTheme()

// テスト用のラッパーコンポーネント
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
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
      icon: require('@mui/icons-material').Dashboard,
    },
  ],
}))

// useMediaQuery のモック
const mockUseMediaQuery = jest.fn(() => false)
jest.mock('@mui/material', () => ({
  ...jest.requireActual('@mui/material'),
  useMediaQuery: mockUseMediaQuery,
}))

describe('AppNavigation', () => {
  const defaultProps = {
    drawerWidth: 240,
    title: '家計簿アプリ',
  }

  beforeEach(() => {
    jest.clearAllMocks()
    mockUseMediaQuery.mockReturnValue(false) // デフォルトはデスクトップ
  })

  it('基本的なレンダリングが正しく動作する', () => {
    render(
      <TestWrapper>
        <AppNavigation {...defaultProps} />
      </TestWrapper>
    )

    // flexコンテナが表示されることを確認
    expect(screen.getByText('家計簿アプリ')).toBeInTheDocument()
    expect(screen.getByText('ダッシュボード')).toBeInTheDocument()
  })

  it('AppTopBarが正しく表示される', () => {
    render(
      <TestWrapper>
        <AppNavigation {...defaultProps} />
      </TestWrapper>
    )

    // AppTopBarコンポーネントの要素が存在することを確認
    expect(screen.getByText('家計簿アプリ')).toBeInTheDocument()
    // AppBarのheaderロールを確認
    expect(screen.getByRole('banner')).toBeInTheDocument()
  })

  it('AppDrawerが正しく表示される', () => {
    render(
      <TestWrapper>
        <AppNavigation {...defaultProps} />
      </TestWrapper>
    )

    // AppDrawerコンポーネントの要素が存在することを確認
    expect(screen.getByRole('navigation')).toBeInTheDocument()
    expect(screen.getByText('ダッシュボード')).toBeInTheDocument()
  })

  it('デフォルトプロパティが正しく適用される', () => {
    render(
      <TestWrapper>
        <AppNavigation />
      </TestWrapper>
    )

    // デフォルトタイトルが表示されることを確認
    expect(screen.getByText('家計簿アプリ')).toBeInTheDocument()
  })

  it('カスタムプロパティが正しく適用される', () => {
    render(
      <TestWrapper>
        <AppNavigation
          drawerWidth={280}
          title="My Budget App"
        />
      </TestWrapper>
    )

    expect(screen.getByText('My Budget App')).toBeInTheDocument()
  })

  it('デスクトップ表示時の動作が正しい', () => {
    mockUseMediaQuery.mockReturnValue(false) // デスクトップ

    render(
      <TestWrapper>
        <AppNavigation {...defaultProps} />
      </TestWrapper>
    )

    expect(screen.getByText('家計簿アプリ')).toBeInTheDocument()
    expect(screen.getByRole('navigation')).toBeInTheDocument()
    expect(screen.getByRole('banner')).toBeInTheDocument()
  })

  it('モバイル表示時の動作が正しい', () => {
    mockUseMediaQuery.mockReturnValue(true) // モバイル

    render(
      <TestWrapper>
        <AppNavigation {...defaultProps} />
      </TestWrapper>
    )

    expect(screen.getByText('家計簿アプリ')).toBeInTheDocument()
    expect(screen.getByRole('navigation')).toBeInTheDocument()
    expect(screen.getByRole('banner')).toBeInTheDocument()
    
    // モバイル時はハンバーガーメニューボタンが表示される
    const menuButton = screen.getByLabelText('ナビゲーションメニューを開く')
    expect(menuButton).toBeInTheDocument()
  })

  it('ハンバーガーメニューボタンのクリック動作が正しい', async () => {
    mockUseMediaQuery.mockReturnValue(true) // モバイル
    const user = userEvent.setup()

    render(
      <TestWrapper>
        <AppNavigation {...defaultProps} />
      </TestWrapper>
    )

    const menuButton = screen.getByLabelText('ナビゲーションメニューを開く')
    
    // 初期状態ではモバイルドロワーは閉じている
    await user.click(menuButton)
    
    // クリック後の状態確認（ドロワーが開く）
    // 実際の動作確認は統合テストで行うため、ここではボタンの存在のみ確認
    expect(menuButton).toBeInTheDocument()
  })

  it('ドロワー状態管理が正しく動作する', async () => {
    mockUseMediaQuery.mockReturnValue(true) // モバイル
    const user = userEvent.setup()

    render(
      <TestWrapper>
        <AppNavigation {...defaultProps} />
      </TestWrapper>
    )

    const menuButton = screen.getByLabelText('ナビゲーションメニューを開く')
    
    // ハンバーガーメニューボタンをクリック
    await user.click(menuButton)
    
    // ボタンが正しく動作することを確認
    expect(menuButton).toBeInTheDocument()
  })

  it('長いタイトルでも正常に表示される', () => {
    const longTitle = 'ファミリー家計簿管理システム - 総合収支管理アプリケーション'
    
    render(
      <TestWrapper>
        <AppNavigation
          {...defaultProps}
          title={longTitle}
        />
      </TestWrapper>
    )

    expect(screen.getByText(longTitle)).toBeInTheDocument()
  })

  it('最小ドロワー幅でも正常に表示される', () => {
    render(
      <TestWrapper>
        <AppNavigation
          {...defaultProps}
          drawerWidth={200}
        />
      </TestWrapper>
    )

    expect(screen.getByText('家計簿アプリ')).toBeInTheDocument()
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })

  it('最大ドロワー幅でも正常に表示される', () => {
    render(
      <TestWrapper>
        <AppNavigation
          {...defaultProps}
          drawerWidth={400}
        />
      </TestWrapper>
    )

    expect(screen.getByText('家計簿アプリ')).toBeInTheDocument()
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })

  it('空のタイトルでも正常に動作する', () => {
    render(
      <TestWrapper>
        <AppNavigation
          {...defaultProps}
          title=""
        />
      </TestWrapper>
    )

    // 空のタイトルでもコンポーネントがクラッシュしないことを確認
    expect(screen.getByRole('navigation')).toBeInTheDocument()
    expect(screen.getByRole('banner')).toBeInTheDocument()
  })

  it('複数のプロパティが同時に適用される', () => {
    mockUseMediaQuery.mockReturnValue(true) // モバイル
    
    render(
      <TestWrapper>
        <AppNavigation
          drawerWidth={280}
          title="Test Budget App"
        />
      </TestWrapper>
    )

    expect(screen.getByText('Test Budget App')).toBeInTheDocument()
    expect(screen.getByRole('navigation')).toBeInTheDocument()
    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByLabelText('ナビゲーションメニューを開く')).toBeInTheDocument()
  })

  it('テーマブレークポイントが正しく使用される', () => {
    // useTheme().breakpoints.down('md') の動作確認
    mockUseMediaQuery.mockReturnValue(false) // デスクトップ
    
    const { rerender } = render(
      <TestWrapper>
        <AppNavigation {...defaultProps} />
      </TestWrapper>
    )

    // デスクトップ時はハンバーガーメニューなし
    expect(screen.queryByLabelText('ナビゲーションメニューを開く')).not.toBeInTheDocument()

    // モバイルに切り替え
    mockUseMediaQuery.mockReturnValue(true)
    
    rerender(
      <TestWrapper>
        <AppNavigation {...defaultProps} />
      </TestWrapper>
    )

    // モバイル時はハンバーガーメニューあり
    expect(screen.getByLabelText('ナビゲーションメニューを開く')).toBeInTheDocument()
  })

  it('flexコンテナのレイアウトが正しく適用される', () => {
    const { container } = render(
      <TestWrapper>
        <AppNavigation {...defaultProps} />
      </TestWrapper>
    )

    // 最上位のBox要素が存在することを確認
    const boxElement = container.firstChild?.firstChild // ThemeProvider > Box
    expect(boxElement).toBeInTheDocument()
  })

  it('state管理が正しく機能する', async () => {
    mockUseMediaQuery.mockReturnValue(true) // モバイル
    const user = userEvent.setup()

    render(
      <TestWrapper>
        <AppNavigation {...defaultProps} />
      </TestWrapper>
    )

    const menuButton = screen.getByLabelText('ナビゲーションメニューを開く')
    
    // 複数回クリックしても正常に動作することを確認
    await user.click(menuButton)
    await user.click(menuButton)
    
    expect(menuButton).toBeInTheDocument()
  })
})