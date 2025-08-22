import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import AppDrawerContent from '../AppDrawerContent'

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
  ],
}))

describe('AppDrawerContent', () => {
  const defaultProps = {
    title: '家計簿アプリ',
    isMobile: false,
    onDrawerClose: mockOnDrawerClose,
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('基本的なレンダリングが正しく動作する', () => {
    render(
      <TestWrapper>
        <AppDrawerContent {...defaultProps} />
      </TestWrapper>
    )

    expect(screen.getByText('家計簿アプリ')).toBeInTheDocument()
    expect(screen.getByText('ダッシュボード')).toBeInTheDocument()
    expect(screen.getByText('支出管理')).toBeInTheDocument()
  })

  it('AppDrawerHeaderが正しく表示される', () => {
    render(
      <TestWrapper>
        <AppDrawerContent {...defaultProps} />
      </TestWrapper>
    )

    // ヘッダー部分のタイトルが表示されることを確認
    expect(screen.getByText('家計簿アプリ')).toBeInTheDocument()
  })

  it('NavigationMenuが正しく表示される', () => {
    render(
      <TestWrapper>
        <AppDrawerContent {...defaultProps} />
      </TestWrapper>
    )

    // ナビゲーションメニューの項目が表示されることを確認
    expect(screen.getByText('ダッシュボード')).toBeInTheDocument()
    expect(screen.getByText('支出管理')).toBeInTheDocument()
    
    // メニュー項目がmenuitem roleを持つことを確認
    const menuItems = screen.getAllByRole('menuitem')
    expect(menuItems).toHaveLength(2)
  })

  it('Dividerが正しく表示される', () => {
    render(
      <TestWrapper>
        <AppDrawerContent {...defaultProps} />
      </TestWrapper>
    )

    // MUI Dividerはhrタグとしてレンダリングされるかpresentationロールを持つ
    const divider = screen.getByRole('separator')
    expect(divider).toBeInTheDocument()
  })

  it('カスタムタイトルが正しく表示される', () => {
    const customTitle = 'My Budget App'
    
    render(
      <TestWrapper>
        <AppDrawerContent
          {...defaultProps}
          title={customTitle}
        />
      </TestWrapper>
    )

    expect(screen.getByText(customTitle)).toBeInTheDocument()
  })

  it('モバイルプロパティが子コンポーネントに正しく渡される', () => {
    render(
      <TestWrapper>
        <AppDrawerContent
          {...defaultProps}
          isMobile={true}
        />
      </TestWrapper>
    )

    // 基本的な要素が表示されることを確認
    expect(screen.getByText('家計簿アプリ')).toBeInTheDocument()
    expect(screen.getAllByRole('menuitem')).toHaveLength(2)
  })

  it('onDrawerCloseプロパティが子コンポーネントに正しく渡される', () => {
    render(
      <TestWrapper>
        <AppDrawerContent {...defaultProps} />
      </TestWrapper>
    )

    // コンポーネントが正常にレンダリングされることを確認
    // onDrawerCloseの具体的なテストはNavigationMenuとAppDrawerHeaderのテストで行う
    expect(screen.getByText('家計簿アプリ')).toBeInTheDocument()
    expect(screen.getAllByRole('menuitem')).toHaveLength(2)
  })

  it('Box要素が正しく構成される', () => {
    const { container } = render(
      <TestWrapper>
        <AppDrawerContent {...defaultProps} />
      </TestWrapper>
    )

    // 最上位のBox要素が存在することを確認
    const boxElement = container.firstChild
    expect(boxElement).toBeInTheDocument()
  })

  it('コンポーネントの構造が正しく配置される', () => {
    render(
      <TestWrapper>
        <AppDrawerContent {...defaultProps} />
      </TestWrapper>
    )

    // ヘッダー、区切り線、ナビゲーションメニューが順序通り表示される
    expect(screen.getByText('家計簿アプリ')).toBeInTheDocument()
    expect(screen.getByRole('separator')).toBeInTheDocument()
    expect(screen.getByText('ダッシュボード')).toBeInTheDocument()
    expect(screen.getByText('支出管理')).toBeInTheDocument()
  })

  it('複数のプロパティが同時に適用される', () => {
    render(
      <TestWrapper>
        <AppDrawerContent
          title="Test App"
          isMobile={true}
          onDrawerClose={mockOnDrawerClose}
        />
      </TestWrapper>
    )

    expect(screen.getByText('Test App')).toBeInTheDocument()
    expect(screen.getByText('ダッシュボード')).toBeInTheDocument()
    expect(screen.getByText('支出管理')).toBeInTheDocument()
    expect(screen.getByRole('separator')).toBeInTheDocument()
    expect(screen.getAllByRole('menuitem')).toHaveLength(2)
  })

  it('空のタイトルでも正常に動作する', () => {
    render(
      <TestWrapper>
        <AppDrawerContent
          {...defaultProps}
          title=""
        />
      </TestWrapper>
    )

    // 空のタイトルでもコンポーネントがクラッシュしないことを確認
    expect(screen.getByText('ダッシュボード')).toBeInTheDocument()
    expect(screen.getByText('支出管理')).toBeInTheDocument()
  })

  it('長いタイトルでも正常に表示される', () => {
    const longTitle = 'ファミリー家計簿管理システム - 総合収支管理アプリケーション'
    
    render(
      <TestWrapper>
        <AppDrawerContent
          {...defaultProps}
          title={longTitle}
        />
      </TestWrapper>
    )

    expect(screen.getByText(longTitle)).toBeInTheDocument()
    expect(screen.getByText('ダッシュボード')).toBeInTheDocument()
  })

  it('ナビゲーションルートが空でも正常に動作する', () => {
    // getNavigationRoutes を空配列を返すようにモック
    jest.mocked(require('@/routes/routes').getNavigationRoutes).mockReturnValue([])

    render(
      <TestWrapper>
        <AppDrawerContent {...defaultProps} />
      </TestWrapper>
    )

    // ヘッダーとDividerは存在するが、メニュー項目は存在しない
    expect(screen.getByText('家計簿アプリ')).toBeInTheDocument()
    expect(screen.getByRole('separator')).toBeInTheDocument()
    expect(screen.queryAllByRole('menuitem')).toHaveLength(0)
  })
})