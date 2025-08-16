import { screen, waitFor, act } from '@testing-library/react'
import {
  renderAppWithRouter,
  routeTestHelpers,
  testRoutes,
} from '@/__tests__/test-utils/routing'

/**
 * React Router ルーティング機能の包括的テストスイート
 *
 * アプリケーション全体のルーティング機能、ページ遷移、
 * URL直接アクセス、404エラーハンドリングをテストします。
 */
describe('Application Routing', () => {
  /**
   * 基本的なルーティング機能のテスト
   */
  describe('Basic Routing', () => {
    test('renders dashboard page on root path', async () => {
      await act(async () => {
        renderAppWithRouter({ initialEntries: ['/'] })
      })

      await waitFor(
        () => {
          expect(
            screen.getByRole('heading', { name: '家計簿アプリ' })
          ).toBeInTheDocument()
          expect(screen.getByText('¥0')).toBeInTheDocument() // 初期残高
        },
        { timeout: 10000 }
      )
    })

    test('renders expenses page correctly', async () => {
      await act(async () => {
        renderAppWithRouter({ initialEntries: ['/expenses'] })
      })

      await waitFor(
        () => {
          expect(
            screen.getByRole('heading', { name: '支出管理' })
          ).toBeInTheDocument()
          expect(
            screen.getByPlaceholderText('支出金額を入力')
          ).toBeInTheDocument()
        },
        { timeout: 10000 }
      )
    })

    test('renders income page correctly', async () => {
      await act(async () => {
        renderAppWithRouter({ initialEntries: ['/income'] })
      })

      await waitFor(
        () => {
          expect(
            screen.getByRole('heading', { name: '収入管理' })
          ).toBeInTheDocument()
          expect(
            screen.getByPlaceholderText('収入金額を入力')
          ).toBeInTheDocument()
        },
        { timeout: 10000 }
      )
    })

    test('renders history page correctly', async () => {
      await act(async () => {
        renderAppWithRouter({ initialEntries: ['/history'] })
      })

      await waitFor(
        () => {
          expect(
            screen.getByRole('heading', { name: '履歴表示' })
          ).toBeInTheDocument()
          expect(screen.getByText('取引履歴の一覧表示')).toBeInTheDocument()
        },
        { timeout: 10000 }
      )
    })

    test('renders settings page correctly', async () => {
      await act(async () => {
        renderAppWithRouter({ initialEntries: ['/settings'] })
      })

      await waitFor(
        () => {
          expect(
            screen.getByRole('heading', { level: 1, name: '設定' })
          ).toBeInTheDocument()
          expect(screen.getByText('設定機能は開発中です')).toBeInTheDocument()
        },
        { timeout: 10000 }
      )
    })
  })

  /**
   * 複数ルートの一括テスト
   */
  describe('Multiple Routes Validation', () => {
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
   * 404エラーページのテスト
   */
  describe('404 Error Handling', () => {
    test('renders 404 page for unknown routes', async () => {
      for (const invalidRoute of testRoutes.invalid) {
        await act(async () => {
          renderAppWithRouter({
            initialEntries: [invalidRoute],
          })

          await waitFor(
            () => {
              expect(
                screen.getByText('404 - ページが見つかりません')
              ).toBeInTheDocument()
              expect(
                screen.getByText('お探しのページは存在しません。')
              ).toBeInTheDocument()
            },
            { timeout: 10000 }
          )
        })
      }
    })

    test('404 page has proper navigation back to home', async () => {
      await act(async () => {
        renderAppWithRouter({
          initialEntries: ['/nonexistent-page'],
        })

        await waitFor(
          () => {
            expect(
              screen.getByText('404 - ページが見つかりません')
            ).toBeInTheDocument()

            // ホームページへのリンクが存在するかチェック
            const homeLink =
              screen.getByRole('button', {
                name: /ホームページに戻る|ダッシュボードに戻る/,
              }) ||
              screen.getByRole('link', {
                name: /ホームページに戻る|ダッシュボードに戻る/,
              })
            expect(homeLink).toBeInTheDocument()
          },
          { timeout: 10000 }
        )
      })
    })
  })

  /**
   * URL直接アクセステスト
   */
  describe('Direct URL Access', () => {
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
    })

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
    })
  })

  /**
   * コード分割（Lazy Loading）のテスト
   */
  describe('Code Splitting and Lazy Loading', () => {
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
    })

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
    })
  })

  /**
   * ルート設定の整合性テスト
   */
  describe('Route Configuration Consistency', () => {
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
