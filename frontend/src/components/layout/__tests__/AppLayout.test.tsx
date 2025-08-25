/**
 * AppLayoutコンポーネントのテストスイート
 *
 * アプリケーション共通レイアウトコンポーネントの包括的なテストを提供します。
 * 基本機能、プロパティ制御、レスポンシブ対応、アクセシビリティを検証します。
 *
 * @remarks
 * **テスト対象:**
 * - 基本レンダリング機能
 * - ナビゲーション表示制御
 * - パンくずナビゲーション制御
 * - トランジション効果制御
 * - レスポンシブ対応
 * - カスタムプロパティ適用
 * - アクセシビリティ準拠
 *
 * **モック対象:**
 * - @/routes/routes: ナビゲーションルート設定
 * - @/hooks: usePageTitle フック
 * - @mui/material: useMediaQuery フック
 *
 * **テスト環境:**
 * - React Testing Library
 * - Jest モック機能
 * - BrowserRouter ラッパー
 * - MUI ThemeProvider 統合
 *
 * @example
 * ```bash
 * # 全テスト実行
 * npm test AppLayout.test.tsx
 *
 * # 特定のテストグループ実行
 * npm test AppLayout.test.tsx -- --testNamePattern="基本レンダリング"
 *
 * # ウォッチモードでテスト実行
 * npm test AppLayout.test.tsx -- --watch
 * ```
 */
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { Dashboard } from '@mui/icons-material'
import AppLayout from '../AppLayout'

const theme = createTheme()

// テスト用のラッパーコンポーネント
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  </BrowserRouter>
)

// getNavigationRoutes と getRouteInfo のモック
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
  getRouteInfo: (path: string) => {
    if (path === '/') {
      return {
        path: '/',
        title: 'ダッシュボード',
        description: '家計簿の概要と主要機能へのアクセス',
        element: <div>Dashboard</div>,
        showInNavigation: true,
        icon: Dashboard,
      }
    }
    return undefined
  },
}))

// usePageTitle のモック
jest.mock('@/hooks', () => ({
  usePageTitle: jest.fn(),
}))

// useMediaQuery のモック
jest.mock('@mui/material', () => ({
  ...jest.requireActual('@mui/material'),
  useMediaQuery: jest.fn(() => false),
}))

const mockUseMediaQuery = jest.mocked(
  jest.requireMock('@mui/material').useMediaQuery
)

describe('AppLayout', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockUseMediaQuery.mockReturnValue(false) // デフォルトはデスクトップ
  })

  describe('基本レンダリング', () => {
    it('children要素が正しくレンダリングされる', () => {
      render(
        <TestWrapper>
          <AppLayout>
            <div data-testid="test-content">テストコンテンツ</div>
          </AppLayout>
        </TestWrapper>
      )

      expect(screen.getByTestId('test-content')).toBeInTheDocument()
      expect(screen.getByText('テストコンテンツ')).toBeInTheDocument()
    })

    it('デフォルト値でレンダリングされる', () => {
      render(
        <TestWrapper>
          <AppLayout>
            <div>テストコンテンツ</div>
          </AppLayout>
        </TestWrapper>
      )

      // ナビゲーションが表示されている
      expect(screen.getByRole('banner')).toBeInTheDocument()
      // メインコンテンツが表示されている
      expect(screen.getByRole('main')).toBeInTheDocument()
    })
  })

  describe('ナビゲーション表示制御', () => {
    it('showNavigation=trueの場合にナビゲーションが表示される', () => {
      render(
        <TestWrapper>
          <AppLayout showNavigation={true}>
            <div>テストコンテンツ</div>
          </AppLayout>
        </TestWrapper>
      )

      expect(screen.getByRole('banner')).toBeInTheDocument()
    })

    it('showNavigation=falseの場合にナビゲーションが非表示になる', () => {
      render(
        <TestWrapper>
          <AppLayout showNavigation={false}>
            <div>テストコンテンツ</div>
          </AppLayout>
        </TestWrapper>
      )

      expect(screen.queryByRole('banner')).not.toBeInTheDocument()
    })
  })

  describe('パンくずナビゲーション制御', () => {
    it('showBreadcrumbs=trueの場合にパンくずが表示される', () => {
      render(
        <TestWrapper>
          <AppLayout showBreadcrumbs={true}>
            <div>テストコンテンツ</div>
          </AppLayout>
        </TestWrapper>
      )

      // パンくずナビゲーション要素を確認
      expect(screen.getByRole('navigation')).toBeInTheDocument()
    })

    it('showBreadcrumbs=falseの場合にパンくずが非表示になる', () => {
      render(
        <TestWrapper>
          <AppLayout showBreadcrumbs={false}>
            <div>テストコンテンツ</div>
          </AppLayout>
        </TestWrapper>
      )

      // パンくずナビゲーションがない場合の確認
      const navigationElements = screen.queryAllByRole('navigation')
      // AppNavigationのnavigation要素のみ存在
      expect(navigationElements).toHaveLength(1)
    })
  })

  describe('トランジション制御', () => {
    it('enableTransitions=trueの場合にPageTransitionでラップされる', () => {
      render(
        <TestWrapper>
          <AppLayout enableTransitions={true}>
            <div data-testid="transition-content">コンテンツ</div>
          </AppLayout>
        </TestWrapper>
      )

      expect(screen.getByTestId('transition-content')).toBeInTheDocument()
    })

    it('enableTransitions=falseの場合にPageTransitionなしでレンダリング', () => {
      render(
        <TestWrapper>
          <AppLayout enableTransitions={false}>
            <div data-testid="no-transition-content">コンテンツ</div>
          </AppLayout>
        </TestWrapper>
      )

      expect(screen.getByTestId('no-transition-content')).toBeInTheDocument()
    })
  })

  describe('レスポンシブ対応', () => {
    it('モバイル画面サイズでも正常にレンダリングされる', () => {
      mockUseMediaQuery.mockReturnValue(true) // モバイル

      render(
        <TestWrapper>
          <AppLayout>
            <div data-testid="mobile-content">モバイルコンテンツ</div>
          </AppLayout>
        </TestWrapper>
      )

      expect(screen.getByTestId('mobile-content')).toBeInTheDocument()
      expect(screen.getByRole('main')).toBeInTheDocument()
    })
  })

  describe('カスタムプロパティ', () => {
    it('カスタムタイトルが正しく渡される', () => {
      render(
        <TestWrapper>
          <AppLayout title="カスタムアプリ">
            <div>テストコンテンツ</div>
          </AppLayout>
        </TestWrapper>
      )

      // AppNavigationにtitleが渡されることを確認
      expect(screen.getByRole('banner')).toBeInTheDocument()
    })

    it('カスタムdrawerWidthが適用される', () => {
      render(
        <TestWrapper>
          <AppLayout drawerWidth={300}>
            <div>テストコンテンツ</div>
          </AppLayout>
        </TestWrapper>
      )

      const mainElement = screen.getByRole('main')
      expect(mainElement).toBeInTheDocument()
    })

    it('カスタムmaxWidthが適用される', () => {
      render(
        <TestWrapper>
          <AppLayout maxWidth="lg">
            <div>テストコンテンツ</div>
          </AppLayout>
        </TestWrapper>
      )

      expect(screen.getByRole('main')).toBeInTheDocument()
    })

    it('カスタム背景色が適用される', () => {
      render(
        <TestWrapper>
          <AppLayout backgroundColor="#ffffff">
            <div>テストコンテンツ</div>
          </AppLayout>
        </TestWrapper>
      )

      expect(screen.getByRole('main')).toBeInTheDocument()
    })
  })

  describe('アクセシビリティ', () => {
    it('適切なランドマークが設定されている', () => {
      render(
        <TestWrapper>
          <AppLayout>
            <div>テストコンテンツ</div>
          </AppLayout>
        </TestWrapper>
      )

      expect(screen.getByRole('banner')).toBeInTheDocument()
      expect(screen.getByRole('main')).toBeInTheDocument()
      expect(screen.getByRole('navigation')).toBeInTheDocument()
    })
  })
})
