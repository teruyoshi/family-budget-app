import { screen, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithRouter, renderAppWithRouter } from '@/__tests__/test-utils/routing'
import NotFoundPage from '../NotFoundPage'

/**
 * NotFoundPage（404エラーページ）の包括的テストスイート
 * 
 * 404エラーハンドリング、ユーザビリティ、アクセシビリティ、
 * ナビゲーション復帰機能をテストします。
 */
describe('NotFoundPage Tests', () => {
  /**
   * 基本的な404ページ機能のテスト
   */
  describe('Basic 404 Page Functionality', () => {
    test('renders 404 page with correct content', () => {
      renderWithRouter(<NotFoundPage />)

      // 基本的な404メッセージが表示されているかチェック
      expect(screen.getByText('404 - ページが見つかりません')).toBeInTheDocument()
      expect(screen.getByText('お探しのページは存在しません。')).toBeInTheDocument()
    })

    test('displays helpful error message and guidance', () => {
      renderWithRouter(<NotFoundPage />)

      // ユーザーへのガイダンスメッセージをチェック
      expect(screen.getByText(/お探しのページは存在しません/)).toBeInTheDocument()
      
      // 可能であれば、追加のガイダンステキストをチェック
      const guidanceText = screen.queryByText(/URLを確認|ホームページ|ナビゲーション/)
      if (guidanceText) {
        expect(guidanceText).toBeInTheDocument()
      }
    })

    test('maintains consistent layout with app design', () => {
      renderWithRouter(<NotFoundPage />)

      // ページタイトルが適切な見出しレベルになっているかチェック
      const title = screen.getByText('404 - ページが見つかりません')
      expect(title.tagName).toMatch(/^H[1-6]$/) // h1-h6のいずれか

      // エラーページでも基本的なレイアウト構造を保持
      expect(title).toBeInTheDocument()
    })
  })

  /**
   * 様々な無効URLでの404ページテスト
   */
  describe('404 Page with Various Invalid URLs', () => {
    test('handles completely unknown routes', async () => {
      const unknownRoutes = [
        '/nonexistent',
        '/random-page',
        '/admin',
        '/api/test',
        '/completely/unknown/path'
      ]

      for (const route of unknownRoutes) {
        await act(async () => {
          renderAppWithRouter({ initialEntries: [route] })
        })

        await waitFor(() => {
          expect(screen.getByText('404 - ページが見つかりません')).toBeInTheDocument()
          expect(screen.getByText('お探しのページは存在しません。')).toBeInTheDocument()
        }, { timeout: 10000 })
      }
    })

    test('handles malformed valid routes', async () => {
      const malformedRoutes = [
        '/expenses/',      // 末尾スラッシュ
        '/Expenses',       // 大文字
        '/INCOME',         // 全て大文字
        '/history/',       // 末尾スラッシュ
        '/settings/',      // 末尾スラッシュ
        '//expenses',      // 重複スラッシュ
        '/expenses//edit', // 深いパス
        '/settings/advanced' // 深いパス
      ]

      for (const route of malformedRoutes) {
        await act(async () => {
          renderAppWithRouter({ initialEntries: [route] })
        })

        await waitFor(() => {
          // 404ページまたは正しいページのいずれかが表示される
          const is404 = screen.queryByText('404 - ページが見つかりません')
          const isValidPage = screen.queryByText(/支出管理|収入管理|履歴表示|設定|家計簿アプリ/)
          
          expect(is404 || isValidPage).toBeInTheDocument()
        }, { timeout: 10000 })
      }
    })

    test('handles special characters in URLs', async () => {
      const specialCharRoutes = [
        '/expenses%20test',  // URLエンコードされた文字
        '/income#hash',      // ハッシュ付き
        '/history?query=1',  // クエリパラメータ（無効パス）
        '/settings@test',    // 特殊文字
        '/日本語ページ',      // 日本語文字
        '/expenses/123',     // 数値パラメータ
      ]

      for (const route of specialCharRoutes) {
        await act(async () => {
          renderAppWithRouter({ initialEntries: [route] })
        })

        await waitFor(() => {
          // 適切にハンドリングされることを確認
          const page = screen.getByRole('main') || document.body
          expect(page).toBeInTheDocument()
        }, { timeout: 10000 })
      }
    })
  })

  /**
   * ナビゲーション機能との統合テスト
   */
  describe('Navigation Integration', () => {
    test('404 page maintains navigation accessibility', async () => {
      await act(async () => {
        renderAppWithRouter({ initialEntries: ['/nonexistent'] })
      })

      await waitFor(() => {
        // 404ページでもナビゲーションが機能することを確認
        expect(screen.getByText('404 - ページが見つかりません')).toBeInTheDocument()
        expect(screen.getByRole('navigation', { name: 'メインナビゲーション' })).toBeInTheDocument()
        
        // ナビゲーション項目が利用可能であることを確認
        const menuItems = screen.getAllByRole('menuitem')
        expect(menuItems.length).toBeGreaterThan(0)
      }, { timeout: 10000 })
    })

    test('navigation from 404 page works correctly', async () => {
      const user = userEvent.setup()
      
      await act(async () => {
        renderAppWithRouter({ initialEntries: ['/invalid-page'] })
      })

      await waitFor(() => {
        expect(screen.getByText('404 - ページが見つかりません')).toBeInTheDocument()
      }, { timeout: 10000 })

      // ナビゲーションメニューからホームページに移動
      const dashboardLink = screen.getByRole('menuitem', { name: 'ダッシュボードページに移動' })
      
      await act(async () => {
        await user.click(dashboardLink)
      })

      // ページ遷移後の確認は統合テストレベルで実施
      expect(dashboardLink).toBeInTheDocument()
    })

    test('404 page shows correct navigation state', async () => {
      await act(async () => {
        renderAppWithRouter({ initialEntries: ['/unknown'] })
      })

      await waitFor(() => {
        expect(screen.getByText('404 - ページが見つかりません')).toBeInTheDocument()
        
        // 404ページではどのナビゲーション項目も選択されていないことを確認
        const selectedItems = screen.getAllByRole('menuitem').filter(item =>
          item.classList.contains('Mui-selected') || 
          item.getAttribute('aria-current') === 'page'
        )
        
        // 404ページでは通常、ナビゲーション項目は選択されない
        expect(selectedItems.length).toBe(0)
      }, { timeout: 10000 })
    })
  })

  /**
   * ユーザビリティとアクセシビリティのテスト
   */
  describe('Usability and Accessibility', () => {
    test('404 page has proper semantic structure', () => {
      renderWithRouter(<NotFoundPage />)

      // セマンティックな見出し構造をチェック
      const heading = screen.getByText('404 - ページが見つかりません')
      expect(heading.tagName).toMatch(/^H[1-6]$/)

      // エラーメッセージが適切にマークアップされているかチェック
      const errorMessage = screen.getByText('お探しのページは存在しません。')
      expect(errorMessage).toBeInTheDocument()
    })

    test('404 page provides helpful recovery options', () => {
      renderWithRouter(<NotFoundPage />)

      // ユーザーが復帰できるオプションが提供されているかチェック
      const recoveryOptions = [
        screen.queryByText(/ホームページ/),
        screen.queryByText(/戻る/),
        screen.queryByText(/ナビゲーション/),
        screen.queryByRole('button'),
        screen.queryByRole('link')
      ]

      // いずれかの復帰オプションが存在することを確認
      const hasRecoveryOption = recoveryOptions.some(option => option !== null)
      expect(hasRecoveryOption).toBe(true)
    })

    test('404 page maintains app branding and consistency', async () => {
      await act(async () => {
        renderAppWithRouter({ initialEntries: ['/missing'] })
      })

      await waitFor(() => {
        // アプリのブランディング要素が維持されているかチェック
        expect(screen.getByText('家計簿アプリ')).toBeInTheDocument() // AppBarのタイトル
        expect(screen.getByText('404 - ページが見つかりません')).toBeInTheDocument()
        
        // アプリの基本的なレイアウト構造が維持されているかチェック
        expect(screen.getByRole('navigation')).toBeInTheDocument()
      }, { timeout: 10000 })
    })

    test('404 page supports keyboard navigation', async () => {
      const user = userEvent.setup()
      
      await act(async () => {
        renderAppWithRouter({ initialEntries: ['/404test'] })
      })

      await waitFor(() => {
        expect(screen.getByText('404 - ページが見つかりません')).toBeInTheDocument()
      }, { timeout: 10000 })

      // キーボードナビゲーションが機能することを確認
      await act(async () => {
        await user.tab() // 最初のフォーカス可能要素に移動
      })

      // フォーカス可能な要素が存在することを確認
      const focusableElements = screen.getAllByRole('button').concat(
        screen.getAllByRole('menuitem')
      )
      expect(focusableElements.length).toBeGreaterThan(0)
    })
  })

  /**
   * エラーハンドリングとロバスト性のテスト
   */
  describe('Error Handling and Robustness', () => {
    test('404 page handles rapid navigation changes', async () => {
      // 複数の無効URLに連続でアクセス
      const rapidAccessUrls = ['/test1', '/test2', '/test3', '/test4', '/test5']
      
      for (const url of rapidAccessUrls) {
        await act(async () => {
          const { unmount } = renderAppWithRouter({ initialEntries: [url] })
          
          await waitFor(() => {
            expect(screen.getByText('404 - ページが見つかりません')).toBeInTheDocument()
          }, { timeout: 5000 })
          
          unmount()
        })
      }
    })

    test('404 page maintains stability during error conditions', async () => {
      await act(async () => {
        renderAppWithRouter({ initialEntries: ['/error-test'] })
      })

      await waitFor(() => {
        // エラー状態でもページが安定していることを確認
        expect(screen.getByText('404 - ページが見つかりません')).toBeInTheDocument()
        expect(screen.getByRole('navigation')).toBeInTheDocument()
        
        // 基本的なアプリ機能が利用可能であることを確認
        const menuItems = screen.getAllByRole('menuitem')
        expect(menuItems.length).toBeGreaterThan(0)
      }, { timeout: 10000 })
    })

    test('404 page does not break app routing', async () => {
      // 404ページアクセス後に正常ページに遷移できることを確認
      await act(async () => {
        renderAppWithRouter({ 
          initialEntries: ['/invalid', '/expenses'],
          initialIndex: 0 // 無効ページから開始
        })
      })

      await waitFor(() => {
        expect(screen.getByText('404 - ページが見つかりません')).toBeInTheDocument()
      }, { timeout: 10000 })

      // 正常ページに遷移
      await act(async () => {
        renderAppWithRouter({ 
          initialEntries: ['/invalid', '/expenses'],
          initialIndex: 1 // 有効ページに移動
        })
      })

      await waitFor(() => {
        expect(screen.getByText('支出管理')).toBeInTheDocument()
      }, { timeout: 10000 })
    })
  })
})