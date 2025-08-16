import type { ReactElement } from 'react'
import { render, type RenderOptions } from '@testing-library/react'
import { MemoryRouter, type MemoryRouterProps } from 'react-router-dom'
import { AppContent } from '@/App'

/**
 * ルーティングテスト用のテストユーティリティ
 *
 * React Router の MemoryRouter を使用したテスト環境を提供し、
 * ルーティング機能の包括的なテストを可能にします。
 */

/**
 * MemoryRouter でラップされたレンダリング関数のオプション
 */
export interface RenderWithRouterOptions
  extends Omit<RenderOptions, 'wrapper'> {
  /** 初期ルートパス */
  initialEntries?: MemoryRouterProps['initialEntries']
  /** 初期インデックス */
  initialIndex?: MemoryRouterProps['initialIndex']
}

/**
 * コンポーネントを MemoryRouter でラップしてレンダリング
 *
 * @param ui - レンダリングするコンポーネント
 * @param options - レンダリングオプション
 * @returns レンダリング結果とユーティリティ
 *
 * @example
 * ```tsx
 * // 特定のルートでページをテスト
 * const { getByText } = renderWithRouter(<MyComponent />, {
 *   initialEntries: ['/expenses']
 * })
 * ```
 */
export function renderWithRouter(
  ui: ReactElement,
  {
    initialEntries = ['/'],
    initialIndex = 0,
    ...renderOptions
  }: RenderWithRouterOptions = {}
) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <MemoryRouter initialEntries={initialEntries} initialIndex={initialIndex}>
        {children}
      </MemoryRouter>
    )
  }

  return {
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
    // 追加のユーティリティが必要な場合はここに追加
  }
}

/**
 * アプリ全体を MemoryRouter でラップしてレンダリング
 *
 * @param options - ルーターオプション
 * @returns レンダリング結果とユーティリティ
 *
 * @example
 * ```tsx
 * // 404ページのテスト
 * const { getByText } = renderAppWithRouter({
 *   initialEntries: ['/nonexistent-route']
 * })
 * expect(getByText('404')).toBeInTheDocument()
 * ```
 */
export function renderAppWithRouter({
  initialEntries = ['/'],
  initialIndex = 0,
}: {
  initialEntries?: MemoryRouterProps['initialEntries']
  initialIndex?: MemoryRouterProps['initialIndex']
} = {}) {
  return render(
    <MemoryRouter initialEntries={initialEntries} initialIndex={initialIndex}>
      <AppContent />
    </MemoryRouter>
  )
}

/**
 * ページ遷移テスト用のヘルパー関数
 *
 * @param routes - テスト対象のルート配列
 * @returns ルートごとのテスト結果
 *
 * @example
 * ```tsx
 * // 複数ルートの一括テスト
 * const results = testMultipleRoutes(['/', '/expenses', '/income'])
 * results.forEach(result => {
 *   expect(result.container).toBeInTheDocument()
 * })
 * ```
 */
export function testMultipleRoutes(routes: string[]) {
  return routes.map((route) => ({
    route,
    ...renderAppWithRouter({ initialEntries: [route] }),
  }))
}

/**
 * ナビゲーション状態をモックする関数
 *
 * @param currentPath - 現在のパス
 * @returns モックされたナビゲーション状態
 */
export function mockNavigationState(currentPath: string) {
  return {
    pathname: currentPath,
    search: '',
    hash: '',
    state: null,
    key: 'test-key',
  }
}

/**
 * 遅延ロード（Suspense）対応のテストヘルパー
 *
 * @param renderFn - レンダリング関数
 * @returns Promise<レンダリング結果>
 *
 * @example
 * ```tsx
 * // コード分割されたページのテスト
 * const result = await renderWithSuspense(() =>
 *   renderAppWithRouter({ initialEntries: ['/expenses'] })
 * )
 * await waitFor(() => {
 *   expect(result.getByText('支出管理')).toBeInTheDocument()
 * })
 * ```
 */
export async function renderWithSuspense<T>(renderFn: () => T): Promise<T> {
  const result = renderFn()
  // Suspense の解決を待機（必要に応じて実装）
  return Promise.resolve(result)
}

/**
 * ルート情報の検証用ヘルパー
 */
export const routeTestHelpers = {
  /**
   * 有効なルートパスかチェック
   */
  isValidRoute: (path: string): boolean => {
    const validRoutes = ['/', '/expenses', '/income', '/history', '/settings']
    return validRoutes.includes(path)
  },

  /**
   * ナビゲーション表示対象のルートかチェック
   */
  isNavigationRoute: (path: string): boolean => {
    // '*' (404) は非表示
    return path !== '*'
  },

  /**
   * ページタイトルを取得
   */
  getPageTitle: (path: string): string => {
    const titles: Record<string, string> = {
      '/': 'ダッシュボード',
      '/expenses': '支出管理',
      '/income': '収入管理',
      '/history': '履歴表示',
      '/settings': '設定',
    }
    return titles[path] || '不明なページ'
  },
}

/**
 * テスト用のルートデータ
 */
export const testRoutes = {
  /** 全ての有効なルート */
  valid: ['/', '/expenses', '/income', '/history', '/settings', '*'] as const,

  /** 無効なルート（404になるべき） */
  invalid: ['/nonexistent', '/abc', '/settings/invalid'],

  /** ナビゲーションに表示されるルート */
  navigation: ['/', '/expenses', '/income', '/history', '/settings'],
} as const

/**
 * テストユーティリティファイル用のダミーテスト
 * Jestがテストファイルと認識するのを防ぐため
 */
describe('routing test utilities', () => {
  test('should export test utilities correctly', () => {
    expect(renderWithRouter).toBeDefined()
    expect(renderAppWithRouter).toBeDefined()
    expect(testMultipleRoutes).toBeDefined()
    expect(routeTestHelpers).toBeDefined()
    expect(testRoutes).toBeDefined()
  })
})
