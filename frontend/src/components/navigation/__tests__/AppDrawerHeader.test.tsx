import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import AppDrawerHeader from '../AppDrawerHeader'

// テスト用の最適化テーマ（Ripple エフェクト無効化）
const theme = createTheme({
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true, // Ripple エフェクト無効化でact()警告を回避
        disableTouchRipple: true,
      },
    },
    MuiIconButton: {
      defaultProps: {
        disableRipple: true,
        disableTouchRipple: true,
      },
    },
  },
})

// テスト用のラッパーコンポーネント
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  </BrowserRouter>
)

// モックされた関数
const mockOnDrawerClose = jest.fn()

describe('AppDrawerHeader', () => {
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
        <AppDrawerHeader {...defaultProps} />
      </TestWrapper>
    )

    expect(screen.getByText('家計簿アプリ')).toBeInTheDocument()
  })

  it('Toolbarが正しく表示される', () => {
    const { container } = render(
      <TestWrapper>
        <AppDrawerHeader {...defaultProps} />
      </TestWrapper>
    )

    // MUI Toolbarクラスを持つ要素を確認
    const toolbar = container.querySelector('.MuiToolbar-root')
    expect(toolbar).toBeInTheDocument()
  })

  it('AppTitleが正しく表示される', () => {
    render(
      <TestWrapper>
        <AppDrawerHeader {...defaultProps} />
      </TestWrapper>
    )

    // AppTitleコンポーネントが表示するタイトルを確認
    expect(screen.getByText('家計簿アプリ')).toBeInTheDocument()
  })

  it('デスクトップ表示時はクローズボタンが表示されない', () => {
    render(
      <TestWrapper>
        <AppDrawerHeader {...defaultProps} isMobile={false} />
      </TestWrapper>
    )

    // クローズボタンが存在しないことを確認
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('モバイル表示時はクローズボタンが表示される', () => {
    render(
      <TestWrapper>
        <AppDrawerHeader {...defaultProps} isMobile={true} />
      </TestWrapper>
    )

    // クローズボタンが存在することを確認
    const closeButton = screen.getByRole('button')
    expect(closeButton).toBeInTheDocument()
  })

  it('モバイル時のクローズボタンに正しいaria-labelが設定される', () => {
    render(
      <TestWrapper>
        <AppDrawerHeader {...defaultProps} isMobile={true} />
      </TestWrapper>
    )

    const closeButton = screen.getByRole('button')
    expect(closeButton).toHaveAttribute('aria-label', 'ナビゲーションを閉じる')
  })

  it('クローズボタンクリック時にonDrawerCloseが呼ばれる', async () => {
    const user = userEvent.setup()

    render(
      <TestWrapper>
        <AppDrawerHeader {...defaultProps} isMobile={true} />
      </TestWrapper>
    )

    const closeButton = screen.getByRole('button')

    // MUIボタンのクリックイベントをact()でラップ
    await act(async () => {
      await user.click(closeButton)
    })

    expect(mockOnDrawerClose).toHaveBeenCalledTimes(1)
  })

  it('カスタムタイトルが正しく表示される', () => {
    const customTitle = 'My Budget App'

    render(
      <TestWrapper>
        <AppDrawerHeader {...defaultProps} title={customTitle} />
      </TestWrapper>
    )

    expect(screen.getByText(customTitle)).toBeInTheDocument()
  })

  it('長いタイトルが正しく表示される', () => {
    const longTitle =
      'ファミリー家計簿管理システム - 総合収支管理アプリケーション'

    render(
      <TestWrapper>
        <AppDrawerHeader {...defaultProps} title={longTitle} />
      </TestWrapper>
    )

    expect(screen.getByText(longTitle)).toBeInTheDocument()
  })

  it('空のタイトルでも正常に動作する', () => {
    const { container } = render(
      <TestWrapper>
        <AppDrawerHeader {...defaultProps} title="" />
      </TestWrapper>
    )

    // AppTitleコンポーネントが空の文字列でも動作することを確認
    const toolbar = container.querySelector('.MuiToolbar-root')
    expect(toolbar).toBeInTheDocument()
  })

  it('モバイル表示でクローズボタンのキーボード操作が正しく動作する', async () => {
    const user = userEvent.setup()

    render(
      <TestWrapper>
        <AppDrawerHeader {...defaultProps} isMobile={true} />
      </TestWrapper>
    )

    const closeButton = screen.getByRole('button')

    await act(async () => {
      closeButton.focus()
      await user.keyboard('{Enter}')
    })

    expect(mockOnDrawerClose).toHaveBeenCalledTimes(1)
  })

  it('複数のプロパティが同時に適用される', async () => {
    const user = userEvent.setup()

    const { container } = render(
      <TestWrapper>
        <AppDrawerHeader
          title="Test App"
          isMobile={true}
          onDrawerClose={mockOnDrawerClose}
        />
      </TestWrapper>
    )

    expect(screen.getByText('Test App')).toBeInTheDocument()
    expect(container.querySelector('.MuiToolbar-root')).toBeInTheDocument()

    const closeButton = screen.getByRole('button')
    expect(closeButton).toBeInTheDocument()

    // MUIボタンのクリックイベントをact()でラップ
    await act(async () => {
      await user.click(closeButton)
    })
    expect(mockOnDrawerClose).toHaveBeenCalledTimes(1)
  })

  it('Toolbarの構造が正しく配置される', () => {
    const { container } = render(
      <TestWrapper>
        <AppDrawerHeader {...defaultProps} isMobile={true} />
      </TestWrapper>
    )

    const toolbar = container.querySelector('.MuiToolbar-root')
    expect(toolbar).toBeInTheDocument()

    // タイトルとクローズボタンがツールバー内に存在
    expect(screen.getByText('家計簿アプリ')).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('デスクトップとモバイルの表示切り替えが正しく動作する', () => {
    const { rerender } = render(
      <TestWrapper>
        <AppDrawerHeader {...defaultProps} isMobile={false} />
      </TestWrapper>
    )

    // デスクトップ時はクローズボタンなし
    expect(screen.queryByRole('button')).not.toBeInTheDocument()

    // モバイルに切り替え
    rerender(
      <TestWrapper>
        <AppDrawerHeader {...defaultProps} isMobile={true} />
      </TestWrapper>
    )

    // モバイル時はクローズボタンあり
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('onDrawerClose関数が適切にバインドされる', async () => {
    const customOnDrawerClose = jest.fn()
    const user = userEvent.setup()

    render(
      <TestWrapper>
        <AppDrawerHeader
          {...defaultProps}
          isMobile={true}
          onDrawerClose={customOnDrawerClose}
        />
      </TestWrapper>
    )

    const closeButton = screen.getByRole('button')

    // MUIボタンのクリックイベントをact()でラップ
    await act(async () => {
      await user.click(closeButton)
    })

    expect(customOnDrawerClose).toHaveBeenCalledTimes(1)
    expect(mockOnDrawerClose).not.toHaveBeenCalled()
  })
})
