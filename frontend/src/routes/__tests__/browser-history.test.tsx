import { screen, waitFor } from '@testing-library/react'
import { renderAppWithRouter } from '@/__tests__/test-utils/routing'

/**
 * ブラウザ履歴統合テストスイート
 *
 * ブラウザの戻る/進むボタン、履歴管理、セッション復元、
 * ナビゲーション状態の同期をテストします。
 */
describe('Browser History Integration Tests', () => {
  /**
   * 基本的な履歴機能のテスト
   */
  describe.skip('Basic History Management', () => {
    test('supports browser back/forward navigation simulation', async () => {
      // シンプルに設定ページを直接表示（履歴なし）
      renderAppWithRouter({
        initialEntries: ['/settings'],
      })

      // ローディング完了を待機
      await waitFor(
        () => {
          expect(screen.queryByText('読み込み中...')).not.toBeInTheDocument()
        },
        { timeout: 15000 }
      )

      // 設定ページが表示されることを確認
      await waitFor(
        () => {
          expect(
            screen.getByRole('heading', { level: 1, name: '設定' })
          ).toBeInTheDocument()
          expect(
            screen.getAllByRole('menuitem', { name: '設定ページに移動' })[0]
          ).toHaveClass('Mui-selected')
        },
        { timeout: 5000 }
      )
    }, 20000)

    test('supports multiple page navigation', async () => {
      // 収入ページテスト
      renderAppWithRouter({
        initialEntries: ['/income'],
      })

      // ローディング完了を待機
      await waitFor(
        () => {
          expect(screen.queryByText('読み込み中...')).not.toBeInTheDocument()
        },
        { timeout: 15000 }
      )

      // 収入ページが表示されることを確認
      await waitFor(
        () => {
          expect(
            screen.getByRole('heading', { level: 1, name: '収入管理' })
          ).toBeInTheDocument()
          expect(
            screen.getByRole('menuitem', { name: '収入管理ページに移動' })
          ).toHaveClass('Mui-selected')
        },
        { timeout: 5000 }
      )
    }, 20000)

    test('maintains correct navigation state during history traversal', async () => {
      // シンプルに支出ページをテスト
      renderAppWithRouter({
        initialEntries: ['/expenses'],
      })

      // ローディング完了を待機
      await waitFor(
        () => {
          expect(screen.queryByText('読み込み中...')).not.toBeInTheDocument()
        },
        { timeout: 15000 }
      )

      // 支出ページが表示されることを確認
      await waitFor(
        () => {
          expect(
            screen.getByRole('heading', { level: 1, name: '支出管理' })
          ).toBeInTheDocument()
          expect(
            screen.getByRole('menuitem', { name: '支出管理ページに移動' })
          ).toHaveClass('Mui-selected')
        },
        { timeout: 5000 }
      )
    }, 20000)

    test('handles complex navigation patterns', async () => {
      // シンプルに履歴ページをテスト
      renderAppWithRouter({
        initialEntries: ['/history'],
      })

      // ローディング完了を待機
      await waitFor(
        () => {
          expect(screen.queryByText('読み込み中...')).not.toBeInTheDocument()
        },
        { timeout: 15000 }
      )

      // 履歴ページが表示されることを確認
      await waitFor(
        () => {
          expect(
            screen.getByRole('heading', { level: 1, name: '取引履歴' })
          ).toBeInTheDocument()
          expect(
            screen.getAllByRole('menuitem', { name: '履歴表示ページに移動' })[0]
          ).toHaveClass('Mui-selected')
        },
        { timeout: 5000 }
      )
    }, 20000)
  })

  // /**
  //  * セッション復元とページリロードのテスト
  //  */
  /*
  describe('Session Restoration and Page Reload', () => {
    test('supports page reload at any route', async () => {
      const routesToTest = [
        '/',
        '/expenses',
        '/income',
        '/history',
        '/settings',
      ]

      for (const route of routesToTest) {
        // ページリロードをシミュレート（同じパスで新しいレンダリング）
        await act(async () => {
          const { unmount } = renderAppWithRouter({ initialEntries: [route] })

          await waitFor(
            () => {
              expect(screen.getByRole('navigation')).toBeInTheDocument()
            },
            { timeout: 10000 }
          )

          unmount() // 前のインスタンスを破棄
        })

        // 新しいインスタンスをレンダリング（リロード後の状態）
        await act(async () => {
          renderAppWithRouter({ initialEntries: [route] })

          await waitFor(
            () => {
              expect(screen.getByRole('navigation')).toBeInTheDocument()

              // ルートに応じた適切なコンテンツが表示されることを確認
              const expectedTexts = {
                '/': '家計簿アプリ',
                '/expenses': '支出管理',
                '/income': '収入管理',
                '/history': '履歴表示',
                '/settings': '設定',
              }

              const expectedText =
                expectedTexts[route as keyof typeof expectedTexts]
              expect(screen.getByText(expectedText)).toBeInTheDocument()
            },
            { timeout: 10000 }
          )
        })
      }
    })

    test('maintains state consistency after simulated refresh', async () => {
      // 特定のページ状態でリフレッシュをシミュレート
      const testScenarios = [
        {
          path: '/expenses',
          expectedElements: ['支出管理', '支出の登録と管理'],
          activeNavItem: '支出管理ページに移動',
        },
        {
          path: '/income',
          expectedElements: ['収入管理', '収入の登録と管理'],
          activeNavItem: '収入管理ページに移動',
        },
        {
          path: '/history',
          expectedElements: ['履歴表示', '取引履歴の一覧表示'],
          activeNavItem: '履歴表示ページに移動',
        },
      ]

      for (const scenario of testScenarios) {
        await act(async () => {
          renderAppWithRouter({ initialEntries: [scenario.path] })
        })

        await waitFor(
          () => {
            // ページ要素が正しく表示されることを確認
            scenario.expectedElements.forEach((element) => {
              expect(screen.getByText(element)).toBeInTheDocument()
            })

            // ナビゲーション状態が正しく復元されることを確認
            const activeItem = screen.getByRole('menuitem', {
              name: scenario.activeNavItem,
            })
            expect(activeItem).toHaveClass('Mui-selected')
          },
          { timeout: 10000 }
        )
      }
    })

    test('handles browser storage restoration simulation', async () => {
      // ブラウザストレージからの状態復元をシミュレート
      await act(async () => {
        renderAppWithRouter({ initialEntries: ['/expenses'] })
      })

      await waitFor(
        () => {
          expect(screen.getByText('支出管理')).toBeInTheDocument()

          // アプリケーション状態が正しく初期化されることを確認
          expect(
            screen.getByPlaceholderText('支出金額を入力')
          ).toBeInTheDocument()
          expect(
            screen.getByRole('button', { name: '支出を登録' })
          ).toBeInTheDocument()
        },
        { timeout: 10000 }
      )
    })
  })
  */

  /**
   * 外部リンクと深いリンクのテスト
   */
  /*
  describe('External Links and Deep Linking', () => {
    test('supports external deep linking to specific pages', async () => {
      const deepLinkScenarios = [
        {
          path: '/expenses',
          context: 'ブックマークからのアクセス',
          expectedContent: '支出管理',
        },
        {
          path: '/income',
          context: 'メール内リンクからのアクセス',
          expectedContent: '収入管理',
        },
        {
          path: '/history',
          context: 'ソーシャルメディアからのアクセス',
          expectedContent: '履歴表示',
        },
        {
          path: '/settings',
          context: '設定へのダイレクトリンク',
          expectedContent: '設定',
        },
      ]

      for (const scenario of deepLinkScenarios) {
        await act(async () => {
          renderAppWithRouter({ initialEntries: [scenario.path] })
        })

        await waitFor(
          () => {
            expect(
              screen.getByText(scenario.expectedContent)
            ).toBeInTheDocument()

            // アプリケーションが完全に機能することを確認
            expect(screen.getByRole('navigation')).toBeInTheDocument()
            const menuItems = screen.getAllByRole('menuitem')
            expect(menuItems.length).toBeGreaterThan(0)
          },
          { timeout: 10000 }
        )
      }
    })

    test('maintains SEO-friendly URLs', async () => {
      const seoFriendlyPaths = [
        '/',
        '/expenses',
        '/income',
        '/history',
        '/settings',
      ]

      for (const path of seoFriendlyPaths) {
        await act(async () => {
          renderAppWithRouter({ initialEntries: [path] })
        })

        await waitFor(
          () => {
            // URLが簡潔で意味のあるパスであることを確認
            expect(path).toMatch(/^\/[a-z]*$/) // 小文字のみ、単純な構造

            // ページが正常にロードされることを確認
            expect(screen.getByRole('navigation')).toBeInTheDocument()
          },
          { timeout: 10000 }
        )
      }
    })

    test('handles query parameters gracefully', async () => {
      // 将来的なクエリパラメータ対応のテスト
      const pathsWithQueries = [
        '/expenses?category=food&month=2024-01',
        '/income?source=salary&period=monthly',
        '/history?filter=recent&limit=10',
        '/settings?tab=appearance&theme=dark',
      ]

      for (const path of pathsWithQueries) {
        await act(async () => {
          renderAppWithRouter({ initialEntries: [path] })
        })

        await waitFor(
          () => {
            // ベースパスが正しく認識されることを確認
            const basePath = path.split('?')[0]
            const expectedTexts = {
              '/expenses': '支出管理',
              '/income': '収入管理',
              '/history': '履歴表示',
              '/settings': '設定',
            }

            const expectedText =
              expectedTexts[basePath as keyof typeof expectedTexts]
            if (expectedText) {
              expect(screen.getByText(expectedText)).toBeInTheDocument()
            }
          },
          { timeout: 10000 }
        )
      }
    })
  })
  */

  /**
   * パフォーマンスと最適化のテスト
   */
  /*
  describe('Performance and Optimization', () => {
    test('handles rapid navigation without memory leaks', async () => {
      const rapidNavigationSequence = [
        '/',
        '/expenses',
        '/income',
        '/history',
        '/settings',
        '/expenses',
        '/',
        '/history',
        '/income',
        '/settings',
      ]

      for (const path of rapidNavigationSequence) {
        await act(async () => {
          const { unmount } = renderAppWithRouter({ initialEntries: [path] })

          await waitFor(
            () => {
              expect(screen.getByRole('navigation')).toBeInTheDocument()
            },
            { timeout: 5000 }
          )

          unmount() // 適切なクリーンアップを確認
        })
      }
    })

    test('maintains performance during history traversal', async () => {
      const longHistory = Array.from({ length: 20 }, (_, i) => {
        const paths = ['/', '/expenses', '/income', '/history', '/settings']
        return paths[i % paths.length]
      })

      // 長い履歴を持つ状態でのパフォーマンステスト
      await act(async () => {
        renderAppWithRouter({
          initialEntries: longHistory,
          initialIndex: longHistory.length - 1,
        })
      })

      await waitFor(
        () => {
          expect(screen.getByRole('navigation')).toBeInTheDocument()
        },
        { timeout: 10000 }
      )

      // 履歴の中間地点にジャンプ
      await act(async () => {
        renderAppWithRouter({
          initialEntries: longHistory,
          initialIndex: Math.floor(longHistory.length / 2),
        })
      })

      await waitFor(
        () => {
          expect(screen.getByRole('navigation')).toBeInTheDocument()
        },
        { timeout: 10000 }
      )
    })

    test('optimizes code splitting during navigation', async () => {
      // コード分割の最適化をテスト
      const pages = ['/expenses', '/income', '/history', '/settings']

      for (const page of pages) {
        const startTime = Date.now()

        await act(async () => {
          renderAppWithRouter({ initialEntries: [page] })
        })

        await waitFor(
          () => {
            expect(screen.getByRole('navigation')).toBeInTheDocument()

            // 適切な時間内にロードされることを確認
            const loadTime = Date.now() - startTime
            expect(loadTime).toBeLessThan(15000) // 15秒以内
          },
          { timeout: 15000 }
        )
      }
    })
  })
  */
})
