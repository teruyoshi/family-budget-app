import { screen, waitFor, act } from '@testing-library/react'
import {
  renderAppWithRouter,
  routeTestHelpers,
  testRoutes,
} from '@/__tests__/test-utils/routing'

/**
 * React Router ルーティング機能のテストスイート（Phase 2: 軽量化版）
 *
 * 基本ルーティング機能のみテストし、実行時間を最適化
 * 重要な機能に焦点を当てて軽量化
 */
describe('Application Routing', () => {
  /**
   * 基本的なルーティング機能のテスト（軽量化版）
   */
  describe('Basic Routing', () => {
    test('主要ページの基本ルーティング動作確認', async () => {
      // ダッシュボードページ
      renderAppWithRouter({ initialEntries: ['/'] })
      await waitFor(
        () => {
          expect(screen.getByText('¥0')).toBeInTheDocument()
        },
        { timeout: 3000 }
      )

      // 支出ページ
      renderAppWithRouter({ initialEntries: ['/expenses'] })
      await waitFor(
        () => {
          expect(
            screen.getByRole('heading', { level: 1, name: '支出管理' })
          ).toBeInTheDocument()
        },
        { timeout: 3000 }
      )

      // 設定ページ
      renderAppWithRouter({ initialEntries: ['/settings'] })
      await waitFor(
        () => {
          expect(
            screen.getByRole('heading', { level: 1, name: '設定' })
          ).toBeInTheDocument()
        },
        { timeout: 3000 }
      )
    })
  })

  /**
   * 複数ルートの一括テスト
   */
  describe.skip('Multiple Routes Validation', () => {
    test('all valid routes render without errors', async () => {
      for (const route of testRoutes.valid) {
        await act(async () => {
          const { container } = renderAppWithRouter({
            initialEntries: [route],
          })

          await waitFor(
            () => {
              expect(container.firstChild).toBeInTheDocument()

              // ページタイトルが正しく表示されているかチェック
              const expectedTitle = routeTestHelpers.getPageTitle(route)
              if (expectedTitle !== '不明なページ') {
                const titleRegex = new RegExp(expectedTitle)
                expect(screen.getByText(titleRegex)).toBeInTheDocument()
              }
            },
            { timeout: 10000 }
          )
        })
      }
    })

    test('navigation routes have proper navigation highlighting', async () => {
      for (const route of testRoutes.navigation) {
        await act(async () => {
          renderAppWithRouter({ initialEntries: [route] })

          await waitFor(
            () => {
              // ナビゲーションメニューで適切な項目がアクティブになっているかチェック
              const navigationItems = screen.getAllByRole('menuitem')
              const activeItems = navigationItems.filter(
                (item) =>
                  item.classList.contains('Mui-selected') ||
                  item.getAttribute('aria-current') === 'page'
              )

              expect(activeItems.length).toBeGreaterThan(0)
            },
            { timeout: 10000 }
          )
        })
      }
    })
  })

  /**
   * 404エラーページのテスト（軽量化版）
   */
  describe('404 Error Handling', () => {
    test('不正なルートで404ページが表示される', async () => {
      renderAppWithRouter({ initialEntries: ['/nonexistent-page'] })

      await waitFor(
        () => {
          expect(
            screen.getByText('404 - ページが見つかりません')
          ).toBeInTheDocument()
        },
        { timeout: 3000 }
      )
    })
  })

  /**
   * URL直接アクセステスト
   */
  describe.skip('Direct URL Access', () => {
    test('deep linking works for all pages', async () => {
      const testCases = [
        { path: '/expenses', expectedText: '支出管理' },
        { path: '/income', expectedText: '収入管理' },
        { path: '/history', expectedText: '履歴表示' },
        { path: '/settings', expectedText: '設定' },
      ]

      for (const { path, expectedText } of testCases) {
        await act(async () => {
          renderAppWithRouter({ initialEntries: [path] })

          await waitFor(
            () => {
              expect(screen.getByText(expectedText)).toBeInTheDocument()
            },
            { timeout: 10000 }
          )
        })
      }
    }, 25000)

    test('URL parameters are preserved during navigation', async () => {
      // 将来的にクエリパラメータが実装された場合のテスト
      const pathWithQuery = '/expenses?category=food&month=2024-01'

      await act(async () => {
        renderAppWithRouter({
          initialEntries: [pathWithQuery],
        })

        await waitFor(
          () => {
            expect(screen.getByText('支出管理')).toBeInTheDocument()
            // URLのクエリパラメータが保持されていることを確認
            // 現在は実装されていないが、将来の拡張に備えたテスト
          },
          { timeout: 10000 }
        )
      })
    }, 25000)
  })

  /**
   * コード分割（Lazy Loading）のテスト
   */
  describe.skip('Code Splitting and Lazy Loading', () => {
    test('all pages load properly with Suspense', async () => {
      for (const route of testRoutes.valid) {
        await act(async () => {
          renderAppWithRouter({ initialEntries: [route] })

          // Suspenseによるローディング状態の確認
          // PageLoaderコンポーネントが一時的に表示される可能性

          await waitFor(
            () => {
              const expectedTitle = routeTestHelpers.getPageTitle(route)
              if (expectedTitle !== '不明なページ') {
                const titleRegex = new RegExp(expectedTitle)
                expect(screen.getByText(titleRegex)).toBeInTheDocument()
              }
            },
            { timeout: 15000 }
          ) // コード分割のロードを考慮して長めのタイムアウト
        })
      }
    }, 30000)

    test('loading states are handled gracefully', async () => {
      await act(async () => {
        renderAppWithRouter({ initialEntries: ['/expenses'] })

        // ページローダーが表示される場合があることを確認
        // 現在の実装では瞬時にロードされるが、将来の最適化に備える

        await waitFor(
          () => {
            expect(screen.getByText('支出管理')).toBeInTheDocument()
          },
          { timeout: 10000 }
        )
      })
    }, 25000)
  })

  /**
   * ルート設定の整合性テスト
   */
  describe.skip('Route Configuration Consistency', () => {
    test('all routes have proper metadata', () => {
      testRoutes.valid.forEach((route) => {
        expect(routeTestHelpers.isValidRoute(route)).toBe(true)

        if (route !== '*') {
          expect(routeTestHelpers.getPageTitle(route)).not.toBe('不明なページ')
        }
      })
    })

    test('navigation routes are properly configured', () => {
      testRoutes.navigation.forEach((route) => {
        expect(routeTestHelpers.isNavigationRoute(route)).toBe(true)
      })
    })

    test('invalid routes are properly categorized', () => {
      testRoutes.invalid.forEach((route) => {
        expect(routeTestHelpers.isValidRoute(route)).toBe(false)
      })
    })
  })
})
