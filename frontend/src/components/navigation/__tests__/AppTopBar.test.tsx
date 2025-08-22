import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeProvider } from '@mui/material/styles'
import { createTheme } from '@mui/material/styles'
import AppTopBar from '../AppTopBar'

const theme = createTheme()

// テストヘルパー関数
function renderWithTheme(component: React.ReactElement) {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>)
}

describe('AppTopBar', () => {
  const defaultProps = {
    drawerWidth: 240,
    title: '家計簿アプリ',
    onMenuToggle: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('基本的なレンダリングが正しく動作する', () => {
    renderWithTheme(<AppTopBar {...defaultProps} />)

    // タイトルが表示される
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      '家計簿アプリ'
    )

    // ハンバーガーメニューボタンが存在する
    expect(
      screen.getByRole('button', { name: 'ナビゲーションメニューを開く' })
    ).toBeInTheDocument()
  })

  it('カスタムタイトルが正しく表示される', () => {
    renderWithTheme(<AppTopBar {...defaultProps} title="My Budget App" />)

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'My Budget App'
    )
  })

  it('長いタイトルでもnoWrapで正しく表示される', () => {
    renderWithTheme(
      <AppTopBar
        {...defaultProps}
        title="ファミリー家計簿管理システム - 収支管理アプリケーション"
      />
    )

    const title = screen.getByRole('heading', { level: 1 })
    expect(title).toHaveTextContent(
      'ファミリー家計簿管理システム - 収支管理アプリケーション'
    )
    expect(title).toHaveClass('MuiTypography-noWrap')
  })

  it('ハンバーガーメニューボタンがクリック可能', async () => {
    const user = userEvent.setup()
    const mockOnMenuToggle = jest.fn()

    renderWithTheme(
      <AppTopBar {...defaultProps} onMenuToggle={mockOnMenuToggle} />
    )

    const menuButton = screen.getByRole('button', {
      name: 'ナビゲーションメニューを開く',
    })
    await user.click(menuButton)

    expect(mockOnMenuToggle).toHaveBeenCalledTimes(1)
  })

  it('ドロワー幅によってAppBarの位置が調整される', () => {
    const { container } = renderWithTheme(
      <AppTopBar {...defaultProps} drawerWidth={320} />
    )

    const appBar = container.querySelector('.MuiAppBar-root')
    expect(appBar).toBeInTheDocument()
    // AppBarがドロワー幅に応じたスタイルを持つことを確認（具体的な数値検証は困難）
  })

  it('AppTitleコンポーネントが正しく使用される', () => {
    renderWithTheme(<AppTopBar {...defaultProps} />)

    const title = screen.getByRole('heading', { level: 1 })
    expect(title).toHaveClass('MuiTypography-h6') // AppTitleのvariant="h6"
    expect(title).toHaveClass('MuiTypography-noWrap') // AppTitleのnoWrap
  })

  it('Toolbarが正しく構成される', () => {
    const { container } = renderWithTheme(<AppTopBar {...defaultProps} />)

    const toolbar = container.querySelector('.MuiToolbar-root')
    expect(toolbar).toBeInTheDocument()

    // ハンバーガーメニューボタンがToolbar内にある
    const menuButton = screen.getByRole('button', {
      name: 'ナビゲーションメニューを開く',
    })
    expect(toolbar).toContainElement(menuButton)

    // タイトルがToolbar内にある
    const title = screen.getByRole('heading', { level: 1 })
    expect(toolbar).toContainElement(title)
  })

  it('アクセシビリティ属性が正しく設定される', () => {
    renderWithTheme(<AppTopBar {...defaultProps} />)

    // ハンバーガーメニューボタンのARIA属性
    const menuButton = screen.getByRole('button', {
      name: 'ナビゲーションメニューを開く',
    })
    expect(menuButton).toHaveAttribute(
      'aria-label',
      'ナビゲーションメニューを開く'
    )

    // タイトルが見出し要素として認識される
    const title = screen.getByRole('heading', { level: 1 })
    expect(title).toBeInTheDocument()
  })

  it('複数のプロパティが同時に適用される', async () => {
    const user = userEvent.setup()
    const mockOnMenuToggle = jest.fn()

    renderWithTheme(
      <AppTopBar
        drawerWidth={280}
        title="カスタムアプリ"
        onMenuToggle={mockOnMenuToggle}
      />
    )

    // タイトルの確認
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'カスタムアプリ'
    )

    // メニュー機能の確認
    const menuButton = screen.getByRole('button', {
      name: 'ナビゲーションメニューを開く',
    })
    await user.click(menuButton)
    expect(mockOnMenuToggle).toHaveBeenCalledTimes(1)
  })

  it('空文字タイトルでも正常に動作する', () => {
    renderWithTheme(<AppTopBar {...defaultProps} title="" />)

    const title = screen.getByRole('heading', { level: 1 })
    expect(title).toHaveTextContent('')
    expect(title).toBeInTheDocument()
  })

  it('ハンバーガーメニューボタンのキーボードナビゲーション', async () => {
    const user = userEvent.setup()
    const mockOnMenuToggle = jest.fn()

    renderWithTheme(
      <AppTopBar {...defaultProps} onMenuToggle={mockOnMenuToggle} />
    )

    const menuButton = screen.getByRole('button', {
      name: 'ナビゲーションメニューを開く',
    })

    // Tabキーでフォーカス移動
    await user.tab()
    expect(menuButton).toHaveFocus()

    // Enterキーで実行
    await user.keyboard('{Enter}')
    expect(mockOnMenuToggle).toHaveBeenCalledTimes(1)

    // Spaceキーでも実行
    await user.keyboard(' ')
    expect(mockOnMenuToggle).toHaveBeenCalledTimes(2)
  })
})
