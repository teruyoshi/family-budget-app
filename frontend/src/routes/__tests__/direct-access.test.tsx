import { screen, waitFor, act } from '@testing-library/react'
import { renderAppWithRouter } from '@/__tests__/test-utils/routing'

/**
 * URL直接アクセス機能の包括的テストスイート
 *
 * ブラウザのアドレスバーからの直接アクセス、
 * ブックマーク、外部リンク、リロード対応をテストします。
 */
describe('Direct URL Access Tests', () => {
  /**
   * 基本的な直接アクセス機能のテスト
   */
  describe('Basic Direct Access', () => {
    test.skip('dashboard page loads correctly via direct URL access', async () => {
      renderAppWithRouter({ initialEntries: ['/'] })

      // ローディング完了を待機
      await waitFor(
        () => {
          expect(screen.queryByText('読み込み中...')).not.toBeInTheDocument()
        },
        { timeout: 15000 }
      )

      // ダッシュボードページが表示されることを確認
      await waitFor(
        () => {
          expect(screen.getByText('¥0')).toBeInTheDocument() // 初期残高表示
          expect(
            screen.getByPlaceholderText('支出金額を入力')
          ).toBeInTheDocument()
          expect(
            screen.getByPlaceholderText('収入金額を入力')
          ).toBeInTheDocument()
          expect(
            screen.getByRole('menuitem', { name: 'ダッシュボードページに移動' })
          ).toHaveClass('Mui-selected')
        },
        { timeout: 5000 }
      )
    }, 20000)

    test.skip('expenses page loads correctly via direct URL access', async () => {
      renderAppWithRouter({ initialEntries: ['/expenses'] })

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
            screen.getByPlaceholderText('支出金額を入力')
          ).toBeInTheDocument()
          expect(
            screen.getByRole('button', { name: '支出を登録' })
          ).toBeInTheDocument()
          expect(
            screen.getByRole('menuitem', { name: '支出管理ページに移動' })
          ).toHaveClass('Mui-selected')
        },
        { timeout: 5000 }
      )
    }, 20000)

    test('income page loads correctly via direct URL access', async () => {
      renderAppWithRouter({ initialEntries: ['/income'] })

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
            screen.getByPlaceholderText('収入金額を入力')
          ).toBeInTheDocument()
          expect(
            screen.getByRole('button', { name: '収入を登録' })
          ).toBeInTheDocument()
          expect(
            screen.getByRole('menuitem', { name: '収入管理ページに移動' })
          ).toHaveClass('Mui-selected')
        },
        { timeout: 5000 }
      )
    }, 20000)

    test('history page loads correctly via direct URL access', async () => {
      renderAppWithRouter({ initialEntries: ['/history'] })

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

    test('settings page loads correctly via direct URL access', async () => {
      renderAppWithRouter({ initialEntries: ['/settings'] })

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
          expect(screen.getByText('設定機能は開発中です')).toBeInTheDocument()
          expect(
            screen.getAllByRole('menuitem', { name: '設定ページに移動' })[0]
          ).toHaveClass('Mui-selected')
        },
        { timeout: 5000 }
      )
    }, 20000)
  })

  /**
   * ナビゲーション状態の確認テスト
   */
  describe.skip('Navigation State Consistency', () => {
    test('navigation highlights correct item for direct access', async () => {
      const testCases = [
        { path: '/', expectedActive: 'ダッシュボードページに移動' },
        { path: '/expenses', expectedActive: '支出管理ページに移動' },
        { path: '/income', expectedActive: '収入管理ページに移動' },
        { path: '/history', expectedActive: '履歴表示ページに移動' },
        { path: '/settings', expectedActive: '設定ページに移動' },
      ]

      for (const { path, expectedActive } of testCases) {
        await act(async () => {
          renderAppWithRouter({ initialEntries: [path] })
        })

        await waitFor(
          () => {
            // 重複要素を考慮してselectedクラスを持つ要素を確認
            const activeMenuItems = screen.getAllByRole('menuitem', {
              name: expectedActive,
            })
            const selectedItems = activeMenuItems.filter((item) =>
              item.classList.contains('Mui-selected')
            )
            expect(selectedItems.length).toBeGreaterThan(0)

            // 基本的なナビゲーション存在確認のみ（重複要素問題回避）
            expect(
              screen.getAllByRole('menuitem').length
            ).toBeGreaterThanOrEqual(5)
          },
          { timeout: 10000 }
        )
      }
    }, 25000)

    test('app layout is consistent across direct access', async () => {
      const paths = ['/', '/expenses', '/income', '/history', '/settings']

      for (const path of paths) {
        await act(async () => {
          renderAppWithRouter({ initialEntries: [path] })
        })

        await waitFor(
          () => {
            // 共通レイアウト要素が存在することを確認
            expect(
              screen.getByRole('navigation', { name: 'メインナビゲーション' })
            ).toBeInTheDocument()
            expect(
              screen.getByRole('button', {
                name: 'ナビゲーションメニューを開く',
              })
            ).toBeInTheDocument()

            // MUIコンテナが存在することを確認
            const container = screen
              .getByText(/家計簿アプリ|支出管理|収入管理|履歴表示|設定/)
              .closest('[class*="MuiContainer"]')
            expect(container).toBeInTheDocument()
          },
          { timeout: 10000 }
        )
      }
    }, 25000)
  })

  /**
   * ブラウザ機能との互換性テスト
   */
  describe.skip('Browser Compatibility', () => {
    test('handles page refresh simulation', async () => {
      // ページリロード相当のテスト（同じパスで再レンダリング）
      const testPaths = ['/expenses', '/income', '/history', '/settings']

      for (const path of testPaths) {
        // 初回レンダリング
        await act(async () => {
          const { unmount } = renderAppWithRouter({ initialEntries: [path] })

          await waitFor(
            () => {
              expect(screen.getByRole('navigation')).toBeInTheDocument()
            },
            { timeout: 10000 }
          )

          unmount()
        })

        // 再レンダリング（リロード相当）
        await act(async () => {
          renderAppWithRouter({ initialEntries: [path] })

          await waitFor(
            () => {
              expect(screen.getByRole('navigation')).toBeInTheDocument()
            },
            { timeout: 10000 }
          )
        })
      }
    }, 30000)

    test('supports browser back/forward button simulation', async () => {
      // 複数のページ遷移履歴をシミュレート
      const navigationHistory = ['/', '/expenses', '/income', '/history']

      await act(async () => {
        renderAppWithRouter({
          initialEntries: navigationHistory,
          initialIndex: navigationHistory.length - 1, // 最後のページから開始
        })
      })

      await waitFor(
        () => {
          // 最後のページ（履歴ページ）が表示されることを確認
          expect(screen.getByText('履歴表示')).toBeInTheDocument()
        },
        { timeout: 10000 }
      )

      // 異なるインデックスでの表示確認
      await act(async () => {
        renderAppWithRouter({
          initialEntries: navigationHistory,
          initialIndex: 1, // 支出ページ
        })
      })

      await waitFor(
        () => {
          expect(screen.getByText('支出管理')).toBeInTheDocument()
        },
        { timeout: 10000 }
      )
    }, 25000)

    test('handles deep linking with potential future query parameters', async () => {
      // 将来的なクエリパラメータ対応のテスト
      const pathsWithQuery = [
        '/expenses?category=food',
        '/income?source=salary',
        '/history?period=monthly',
        '/settings?tab=appearance',
      ]

      for (const path of pathsWithQuery) {
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
    }, 25000)
  })

  /**
   * パフォーマンスと最適化のテスト
   */
  describe.skip('Performance and Optimization', () => {
    test('lazy loaded pages render within acceptable time', async () => {
      const startTime = Date.now()

      await act(async () => {
        renderAppWithRouter({ initialEntries: ['/expenses'] })
      })

      await waitFor(
        () => {
          expect(screen.getByText('支出管理')).toBeInTheDocument()

          const loadTime = Date.now() - startTime
          // 15秒以内に読み込まれることを確認（Suspenseによる遅延ロードを考慮）
          expect(loadTime).toBeLessThan(15000)
        },
        { timeout: 15000 }
      )
    }, 25000)

    test('multiple direct accesses do not cause memory leaks', async () => {
      // 複数のページへの連続アクセスをシミュレート
      const pages = ['/', '/expenses', '/income', '/history', '/settings']

      for (let i = 0; i < 3; i++) {
        // 3回繰り返し
        for (const page of pages) {
          await act(async () => {
            const { unmount } = renderAppWithRouter({ initialEntries: [page] })

            await waitFor(
              () => {
                expect(screen.getByRole('navigation')).toBeInTheDocument()
              },
              { timeout: 10000 }
            )

            unmount() // 適切なクリーンアップを確認
          })
        }
      }
    }, 30000)

    test('code splitting works properly for direct access', async () => {
      // 各ページが個別にロードされることを確認
      const pages = ['/expenses', '/income', '/history', '/settings']

      for (const page of pages) {
        await act(async () => {
          renderAppWithRouter({ initialEntries: [page] })
        })

        await waitFor(
          () => {
            // ページが正常にロードされていることを確認
            expect(screen.getByRole('navigation')).toBeInTheDocument()

            // 対応するナビゲーション項目がアクティブになっていることを確認
            const activeItems = screen
              .getAllByRole('menuitem')
              .filter((item) => item.classList.contains('Mui-selected'))
            expect(activeItems.length).toBeGreaterThan(0)
          },
          { timeout: 15000 }
        )
      }
    }, 30000)
  })

  /**
   * エラー処理とフォールバック
   */
  describe.skip('Error Handling and Fallbacks', () => {
    test('graceful handling of malformed URLs', async () => {
      const malformedUrls = [
        '/expenses/', // 末尾スラッシュ
        '/Expenses', // 大文字
        '/expenses ', // 末尾スペース
        '//expenses', // 重複スラッシュ
      ]

      for (const url of malformedUrls) {
        await act(async () => {
          renderAppWithRouter({ initialEntries: [url] })
        })

        await waitFor(
          () => {
            // 404ページまたは適切なフォールバックが表示されることを確認
            const isNotFound =
              screen.queryByText('404 - ページが見つかりません')
            const isValidPage = screen.queryByText(
              /支出管理|収入管理|履歴表示|設定|家計簿アプリ/
            )

            expect(isNotFound || isValidPage).toBeInTheDocument()
          },
          { timeout: 10000 }
        )
      }
    })

    test('maintains app stability during error conditions', async () => {
      // エラー条件下でもアプリが安定していることを確認
      await act(async () => {
        renderAppWithRouter({ initialEntries: ['/nonexistent'] })
      })

      await waitFor(
        () => {
          // 404ページが表示されてもナビゲーションは機能する
          expect(
            screen.getByText('404 - ページが見つかりません')
          ).toBeInTheDocument()
          expect(screen.getByRole('navigation')).toBeInTheDocument()
        },
        { timeout: 10000 }
      )
    })
  })
})
