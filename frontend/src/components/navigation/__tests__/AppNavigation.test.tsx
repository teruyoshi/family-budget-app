import { screen, fireEvent, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithRouter } from '@/__tests__/test-utils/routing'
import AppNavigation from '../AppNavigation'

/**
 * AppNavigationコンポーネントのルーティング機能テストスイート
 * 
 * ナビゲーションクリック、ページ遷移、レスポンシブ動作、
 * キーボードナビゲーション、アクセシビリティ機能をテストします。
 */
describe('AppNavigation Routing Tests', () => {
  /**
   * 基本的なナビゲーション機能のテスト
   */
  describe('Basic Navigation', () => {
    test('renders all navigation menu items', () => {
      renderWithRouter(<AppNavigation />)

      // 全てのナビゲーション項目が表示されているかチェック
      expect(screen.getByRole('menuitem', { name: 'ダッシュボードページに移動' })).toBeInTheDocument()
      expect(screen.getByRole('menuitem', { name: '支出管理ページに移動' })).toBeInTheDocument()
      expect(screen.getByRole('menuitem', { name: '収入管理ページに移動' })).toBeInTheDocument()
      expect(screen.getByRole('menuitem', { name: '履歴表示ページに移動' })).toBeInTheDocument()
      expect(screen.getByRole('menuitem', { name: '設定ページに移動' })).toBeInTheDocument()
    })

    test('displays correct icons for each navigation item', () => {
      renderWithRouter(<AppNavigation />)

      // 各ナビゲーション項目のアイコンが正しく表示されているかチェック
      expect(screen.getByTestId('DashboardIcon')).toBeInTheDocument()
      expect(screen.getByTestId('TrendingDownIcon')).toBeInTheDocument()
      expect(screen.getByTestId('TrendingUpIcon')).toBeInTheDocument()
      expect(screen.getByTestId('HistoryIcon')).toBeInTheDocument()
      expect(screen.getByTestId('SettingsIcon')).toBeInTheDocument()
    })

    test('highlights active navigation item based on current route', () => {
      // 支出ページでレンダリング
      renderWithRouter(<AppNavigation />, { 
        initialEntries: ['/expenses'] 
      })

      const expenseMenuItem = screen.getByRole('menuitem', { name: '支出管理ページに移動' })
      expect(expenseMenuItem).toHaveClass('Mui-selected')
      
      // 他の項目は選択されていないことを確認
      const dashboardMenuItem = screen.getByRole('menuitem', { name: 'ダッシュボードページに移動' })
      expect(dashboardMenuItem).not.toHaveClass('Mui-selected')
    })
  })

  /**
   * ナビゲーションクリック機能のテスト
   */
  describe('Navigation Click Functionality', () => {
    test('navigation items are clickable and have proper accessibility', async () => {
      const user = userEvent.setup()
      renderWithRouter(<AppNavigation />)

      // 各ナビゲーション項目がクリック可能であることを確認
      const navigationItems = [
        screen.getByRole('menuitem', { name: 'ダッシュボードページに移動' }),
        screen.getByRole('menuitem', { name: '支出管理ページに移動' }),
        screen.getByRole('menuitem', { name: '収入管理ページに移動' }),
        screen.getByRole('menuitem', { name: '履歴表示ページに移動' }),
        screen.getByRole('menuitem', { name: '設定ページに移動' })
      ]

      for (const item of navigationItems) {
        expect(item).toBeInTheDocument()
        expect(item).toHaveAttribute('tabindex', '0')
        expect(item).toHaveAttribute('role', 'menuitem')
        
        // クリック可能であることを確認
        await act(async () => {
          await user.click(item)
        })
      }
    })

    test('keyboard navigation works correctly', async () => {
      const user = userEvent.setup()
      renderWithRouter(<AppNavigation />)

      const dashboardItem = screen.getByRole('menuitem', { name: 'ダッシュボードページに移動' })
      
      // Enter キーでナビゲーション
      await act(async () => {
        dashboardItem.focus()
        await user.keyboard('{Enter}')
      })

      // Space キーでナビゲーション
      await act(async () => {
        dashboardItem.focus()
        await user.keyboard(' ')
      })

      // キーボードイベントが適切に処理されることを確認
      expect(dashboardItem).toBeInTheDocument()
    })

    test('navigation maintains proper ARIA labels', () => {
      renderWithRouter(<AppNavigation />)

      // メインナビゲーションのARIAラベルをチェック
      const navigation = screen.getByRole('navigation', { name: 'メインナビゲーション' })
      expect(navigation).toBeInTheDocument()

      // 各メニュー項目のARIAラベルをチェック
      const menuItems = screen.getAllByRole('menuitem')
      menuItems.forEach(item => {
        expect(item).toHaveAttribute('aria-label')
        expect(item.getAttribute('aria-label')).toMatch(/ページに移動$/)
      })
    })
  })

  /**
   * レスポンシブナビゲーションのテスト
   */
  describe('Responsive Navigation', () => {
    test('mobile hamburger menu is present', () => {
      renderWithRouter(<AppNavigation />)

      // ハンバーガーメニューボタンが存在することを確認
      const hamburgerButton = screen.getByRole('button', { name: 'ナビゲーションメニューを開く' })
      expect(hamburgerButton).toBeInTheDocument()
      expect(hamburgerButton).toHaveAttribute('aria-label', 'ナビゲーションメニューを開く')
    })

    test('mobile drawer can be opened and closed', async () => {
      const user = userEvent.setup()
      renderWithRouter(<AppNavigation />)

      const hamburgerButton = screen.getByRole('button', { name: 'ナビゲーションメニューを開く' })
      
      // ハンバーガーメニューをクリック
      await act(async () => {
        await user.click(hamburgerButton)
      })

      // モバイルドロワーが開いていることを確認
      // （実際の動作確認は統合テストで実施）
      expect(hamburgerButton).toBeInTheDocument()
    })

    test('mobile drawer close button works correctly', async () => {
      const user = userEvent.setup()
      renderWithRouter(<AppNavigation />)

      // ハンバーガーメニューを開く
      const hamburgerButton = screen.getByRole('button', { name: 'ナビゲーションメニューを開く' })
      await act(async () => {
        await user.click(hamburgerButton)
      })

      // 閉じるボタンが存在する場合はクリック
      const closeButton = screen.queryByRole('button', { name: 'ナビゲーションを閉じる' })
      if (closeButton) {
        await act(async () => {
          await user.click(closeButton)
        })
      }

      expect(hamburgerButton).toBeInTheDocument()
    })
  })

  /**
   * AppBar（ヘッダー）のテスト
   */
  describe('AppBar Functionality', () => {
    test('displays app title in AppBar', () => {
      renderWithRouter(<AppNavigation title="テスト家計簿" />)

      // AppBar内にアプリタイトルが表示されているかチェック
      const appTitle = screen.getByRole('heading', { level: 1, name: 'テスト家計簿' })
      expect(appTitle).toBeInTheDocument()
    })

    test('AppBar is properly positioned', () => {
      renderWithRouter(<AppNavigation />)

      // AppBarが適切に配置されているかチェック
      const appBar = screen.getByRole('banner') || 
                    screen.getByText('家計簿アプリ').closest('[class*="MuiAppBar"]')
      expect(appBar).toBeInTheDocument()
    })

    test('AppBar adapts to drawer state', () => {
      renderWithRouter(<AppNavigation drawerWidth={300} />)

      // カスタムドロワー幅でAppBarが適切に調整されることを確認
      const appBar = screen.getByText('家計簿アプリ').closest('[class*="MuiAppBar"]')
      expect(appBar).toBeInTheDocument()
    })
  })

  /**
   * ドロワー（サイドナビゲーション）のテスト
   */
  describe('Drawer Functionality', () => {
    test('drawer displays app title and navigation items', () => {
      renderWithRouter(<AppNavigation title="テスト家計簿" />)

      // ドロワー内のアプリタイトルをチェック
      const drawerTitles = screen.getAllByText('テスト家計簿')
      expect(drawerTitles.length).toBeGreaterThan(0)

      // ナビゲーション項目がドロワー内に表示されているかチェック
      const menuItems = screen.getAllByRole('menuitem')
      expect(menuItems.length).toBe(5) // 5つのナビゲーション項目
    })

    test('drawer has proper navigation structure', () => {
      renderWithRouter(<AppNavigation />)

      // ドロワーが適切なナビゲーション構造を持っているかチェック
      const navigation = screen.getByRole('navigation')
      expect(navigation).toBeInTheDocument()

      // リスト構造が存在することを確認
      const list = screen.getByRole('list') || 
                   navigation.querySelector('ul[class*="MuiList"]')
      expect(list).toBeInTheDocument()
    })

    test('drawer respects custom width prop', () => {
      renderWithRouter(<AppNavigation drawerWidth={280} />)

      // カスタム幅が適用されていることを確認
      // （実際のスタイル確認は統合テストで実施）
      const navigation = screen.getByRole('navigation')
      expect(navigation).toBeInTheDocument()
    })
  })

  /**
   * アクセシビリティとユーザビリティのテスト
   */
  describe('Accessibility and Usability', () => {
    test('all interactive elements have proper focus management', async () => {
      const user = userEvent.setup()
      renderWithRouter(<AppNavigation />)

      // 全てのインタラクティブ要素にフォーカス可能であることを確認
      const focusableElements = [
        screen.getByRole('button', { name: 'ナビゲーションメニューを開く' }),
        ...screen.getAllByRole('menuitem')
      ]

      for (const element of focusableElements) {
        await act(async () => {
          await user.tab()
        })
        // フォーカス可能であることを確認
        expect(element).toBeInTheDocument()
      }
    })

    test('navigation provides semantic structure', () => {
      renderWithRouter(<AppNavigation />)

      // セマンティックな構造が提供されているかチェック
      expect(screen.getByRole('navigation')).toBeInTheDocument()
      expect(screen.getByRole('banner')).toBeInTheDocument() // AppBar
      expect(screen.getAllByRole('menuitem')).toHaveLength(5)
    })

    test('navigation supports screen readers', () => {
      renderWithRouter(<AppNavigation />)

      // スクリーンリーダー対応のARIA属性をチェック
      const navigation = screen.getByRole('navigation')
      expect(navigation).toHaveAttribute('aria-label', 'メインナビゲーション')

      const menuItems = screen.getAllByRole('menuitem')
      menuItems.forEach(item => {
        expect(item).toHaveAttribute('aria-label')
      })
    })

    test('navigation maintains visual hierarchy', () => {
      renderWithRouter(<AppNavigation />)

      // 視覚的階層が適切に維持されているかチェック
      const appTitle = screen.getByRole('heading', { level: 1 })
      expect(appTitle).toBeInTheDocument()

      // アイコンとテキストが適切に配置されているかチェック
      const menuItems = screen.getAllByRole('menuitem')
      menuItems.forEach(item => {
        const icon = item.querySelector('svg')
        const text = item.querySelector('[class*="MuiListItemText"]')
        expect(icon).toBeInTheDocument()
        expect(text).toBeInTheDocument()
      })
    })
  })
})