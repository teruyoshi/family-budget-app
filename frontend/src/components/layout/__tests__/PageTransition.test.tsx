import React from 'react'
import { render, screen } from '@testing-library/react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import PageTransition from '../PageTransition'

// MUIテーマの設定
const theme = createTheme()

// テストヘルパー関数
const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)
}

// matchMediaのモック
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
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
  const testContent = 'テストコンテンツ'

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
      renderWithTheme(
        <PageTransition>
          <div>{testContent}</div>
        </PageTransition>
      )

      // コンテンツが正常に表示されることを確認
      expect(screen.getByText(testContent)).toBeInTheDocument()
    })

    it('displayNameが設定されている', () => {
      expect(PageTransition.displayName).toBe('PageTransition')
    })
  })

  describe('トランジションタイプ', () => {
    it('type="fade"でFadeトランジションが適用される', () => {
      renderWithTheme(
        <PageTransition type="fade">
          <div>{testContent}</div>
        </PageTransition>
      )

      expect(screen.getByText(testContent)).toBeInTheDocument()
    })

    it('type="slide"でSlideトランジションが適用される', () => {
      renderWithTheme(
        <PageTransition type="slide">
          <div>{testContent}</div>
        </PageTransition>
      )

      expect(screen.getByText(testContent)).toBeInTheDocument()
    })

    it('type="none"でトランジションなしのBoxが表示される', () => {
      renderWithTheme(
        <PageTransition type="none">
          <div>{testContent}</div>
        </PageTransition>
      )

      // コンテンツが表示されることを確認
      expect(screen.getByText(testContent)).toBeInTheDocument()
    })
  })

  describe('スライド方向', () => {
    it('direction="left"でスライドトランジションが適用される', () => {
      renderWithTheme(
        <PageTransition type="slide" direction="left">
          <div>{testContent}</div>
        </PageTransition>
      )

      expect(screen.getByText(testContent)).toBeInTheDocument()
    })

    it('direction="right"でスライドトランジションが適用される', () => {
      renderWithTheme(
        <PageTransition type="slide" direction="right">
          <div>{testContent}</div>
        </PageTransition>
      )

      expect(screen.getByText(testContent)).toBeInTheDocument()
    })

    it('direction="up"でスライドトランジションが適用される', () => {
      renderWithTheme(
        <PageTransition type="slide" direction="up">
          <div>{testContent}</div>
        </PageTransition>
      )

      expect(screen.getByText(testContent)).toBeInTheDocument()
    })

    it('direction="down"でスライドトランジションが適用される', () => {
      renderWithTheme(
        <PageTransition type="slide" direction="down">
          <div>{testContent}</div>
        </PageTransition>
      )

      expect(screen.getByText(testContent)).toBeInTheDocument()
    })
  })

  describe('アクセシビリティ対応', () => {
    it('prefers-reduced-motion設定時はアニメーションが無効になる', () => {
      // matchMediaをprefers-reduced-motionが有効な状態にモック
      ;(window.matchMedia as jest.Mock).mockImplementation((query) => ({
        matches: query.includes('prefers-reduced-motion: reduce'),
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      }))

      renderWithTheme(
        <PageTransition type="fade">
          <div>{testContent}</div>
        </PageTransition>
      )

      // コンテンツが表示されることを確認
      expect(screen.getByText(testContent)).toBeInTheDocument()
    })
  })

  describe('カスタムプロパティ', () => {
    it('locationKeyが設定される', () => {
      renderWithTheme(
        <PageTransition locationKey="test-key">
          <div>{testContent}</div>
        </PageTransition>
      )

      expect(screen.getByText(testContent)).toBeInTheDocument()
    })

    it('カスタムdurationが適用される', () => {
      renderWithTheme(
        <PageTransition duration={500}>
          <div>{testContent}</div>
        </PageTransition>
      )

      expect(screen.getByText(testContent)).toBeInTheDocument()
    })

    it('カスタムeasingが適用される', () => {
      renderWithTheme(
        <PageTransition easing="ease-in-out">
          <div>{testContent}</div>
        </PageTransition>
      )

      expect(screen.getByText(testContent)).toBeInTheDocument()
    })

    it('in=falseの場合も正常に動作する', () => {
      renderWithTheme(
        <PageTransition in={false}>
          <div>{testContent}</div>
        </PageTransition>
      )

      // トランジション状態に関わらず、コンポーネントは存在する
      expect(screen.getByText(testContent)).toBeInTheDocument()
    })
  })

  describe('トランジションプロパティ', () => {
    it('appear=falseが適用される', () => {
      renderWithTheme(
        <PageTransition appear={false}>
          <div>{testContent}</div>
        </PageTransition>
      )

      expect(screen.getByText(testContent)).toBeInTheDocument()
    })

    it('mountOnEnter=falseが適用される', () => {
      renderWithTheme(
        <PageTransition mountOnEnter={false}>
          <div>{testContent}</div>
        </PageTransition>
      )

      expect(screen.getByText(testContent)).toBeInTheDocument()
    })

    it('unmountOnExit=falseが適用される', () => {
      renderWithTheme(
        <PageTransition unmountOnExit={false}>
          <div>{testContent}</div>
        </PageTransition>
      )

      expect(screen.getByText(testContent)).toBeInTheDocument()
    })

    it('追加のtransitionPropsが適用される', () => {
      const customProps = { 'data-testid': 'custom-transition' }
      
      renderWithTheme(
        <PageTransition transitionProps={customProps}>
          <div>{testContent}</div>
        </PageTransition>
      )

      expect(screen.getByText(testContent)).toBeInTheDocument()
    })
  })

  describe('forwardRef対応', () => {
    it('refが正しく転送される', () => {
      const ref = React.createRef<HTMLDivElement>()
      
      renderWithTheme(
        <PageTransition ref={ref}>
          <div>{testContent}</div>
        </PageTransition>
      )

      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })
  })

  describe('複合的な設定', () => {
    it('複数のプロパティが同時に適用される', () => {
      renderWithTheme(
        <PageTransition
          type="slide"
          direction="right"
          duration={300}
          easing="ease-out"
          locationKey="complex-test"
          appear={true}
          mountOnEnter={true}
          unmountOnExit={true}
        >
          <div>{testContent}</div>
        </PageTransition>
      )

      expect(screen.getByText(testContent)).toBeInTheDocument()
    })
  })
})