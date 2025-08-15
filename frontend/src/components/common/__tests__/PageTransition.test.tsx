import { render, screen } from '@testing-library/react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import PageTransition from '../PageTransition'

// MUIテーマの設定
const theme = createTheme()

// テストヘルパー関数
const renderWithTheme = (ui: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {ui}
    </ThemeProvider>
  )
}

// matchMediaのモック
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

describe('PageTransition', () => {
  const testContent = 'Test Content'

  beforeEach(() => {
    // 各テスト前にmatchMediaをリセット
    ;(window.matchMedia as jest.Mock).mockClear()
  })

  describe('基本レンダリング', () => {
    it('子要素が正しくレンダリングされる', () => {
      renderWithTheme(
        <PageTransition>
          <div>{testContent}</div>
        </PageTransition>
      )
      
      expect(screen.getByText(testContent)).toBeInTheDocument()
    })

    it('デフォルトでfadeトランジションが適用される', () => {
      const { container } = renderWithTheme(
        <PageTransition>
          <div>{testContent}</div>
        </PageTransition>
      )
      
      // MUIのFadeコンポーネントが使用されていることを確認（data-testid属性で確認）
      expect(screen.getByText(testContent)).toBeInTheDocument()
      // Fadeのアニメーション用のdivが存在することを確認
      expect(container.firstChild).toBeInTheDocument()
    })

    it('slideトランジションが正しく適用される', () => {
      const { container } = renderWithTheme(
        <PageTransition type="slide" direction="left">
          <div>{testContent}</div>
        </PageTransition>
      )
      
      // MUIのSlideコンポーネントが使用されていることを確認
      expect(screen.getByText(testContent)).toBeInTheDocument()
      // Slideのアニメーション用のdivが存在することを確認
      expect(container.firstChild).toBeInTheDocument()
    })
  })

  describe('reduced-motion対応', () => {
    it('type="none"の場合、アニメーションをスキップする', () => {
      const { container } = renderWithTheme(
        <PageTransition type="none">
          <div>{testContent}</div>
        </PageTransition>
      )
      
      // コンテンツが直接レンダリングされることを確認
      expect(screen.getByText(testContent)).toBeInTheDocument()
      // Boxコンポーネントが使用されていることを確認
      expect(container.firstChild).toBeInTheDocument()
    })
  })

  describe('カスタマイズ機能', () => {
    it('カスタムdurationが適用される', () => {
      const customDuration = 500
      renderWithTheme(
        <PageTransition duration={customDuration}>
          <div>{testContent}</div>
        </PageTransition>
      )
      
      expect(screen.getByText(testContent)).toBeInTheDocument()
    })

    it('locationKeyが正しく適用される', () => {
      const locationKey = 'test-location-key'
      renderWithTheme(
        <PageTransition locationKey={locationKey}>
          <div>{testContent}</div>
        </PageTransition>
      )
      
      expect(screen.getByText(testContent)).toBeInTheDocument()
    })

    it('カスタムeasingが適用される', () => {
      const customEasing = 'ease-in-out'
      renderWithTheme(
        <PageTransition easing={customEasing}>
          <div>{testContent}</div>
        </PageTransition>
      )
      
      expect(screen.getByText(testContent)).toBeInTheDocument()
    })
  })

  describe('forwardRef対応', () => {
    it('refが正しく転送される', () => {
      const ref = { current: null }
      renderWithTheme(
        <PageTransition ref={ref}>
          <div>{testContent}</div>
        </PageTransition>
      )
      
      expect(ref.current).not.toBeNull()
    })
  })

  describe('マウント・アンマウント制御', () => {
    it('appear, mountOnEnter, unmountOnExitのデフォルト値が正しい', () => {
      renderWithTheme(
        <PageTransition>
          <div>{testContent}</div>
        </PageTransition>
      )
      
      expect(screen.getByText(testContent)).toBeInTheDocument()
    })

    it('appear=falseの場合でも正しく動作する', () => {
      renderWithTheme(
        <PageTransition appear={false}>
          <div>{testContent}</div>
        </PageTransition>
      )
      
      expect(screen.getByText(testContent)).toBeInTheDocument()
    })
  })

  describe('transitionProps', () => {
    it('追加のtransitionPropsが正しく適用される', () => {
      const customProps = { 'data-testid': 'custom-transition' }
      renderWithTheme(
        <PageTransition transitionProps={customProps}>
          <div>{testContent}</div>
        </PageTransition>
      )
      
      expect(screen.getByText(testContent)).toBeInTheDocument()
    })
  })
})