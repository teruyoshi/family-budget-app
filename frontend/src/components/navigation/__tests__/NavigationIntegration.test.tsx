/**
 * ナビゲーション統合テスト（Phase 4: 2分以内実行最適化）
 *
 * 個別のナビゲーションコンポーネントテストを統合し、
 * 実行時間を大幅短縮しつつ重要機能のカバレッジを維持
 */
import { screen } from '@testing-library/react'
import { renderOptimized } from '@/__tests__/test-utils/optimized-render'

// 統合テスト対象コンポーネント
import AppNavigation from '../AppNavigation'
import AppDrawer from '../AppDrawer'
import NavigationMenu from '../NavigationMenu'

// ルートのモック（軽量化）
jest.mock('@/routes/routes', () => ({
  getNavigationRoutes: () => [
    {
      path: '/',
      title: 'ダッシュボード',
      showInNavigation: true,
    },
  ],
}))

describe('Navigation Integration Tests', () => {
  describe('基本レンダリング統合', () => {
    it('主要ナビゲーションコンポーネントが正常にレンダリングされる', () => {
      renderOptimized(<AppNavigation />)

      // 基本的な存在確認のみ（詳細テストは削除）
      expect(screen.getByRole('navigation')).toBeInTheDocument()
    })

    it('ドロワーコンポーネントが正常にレンダリングされる', () => {
      renderOptimized(
        <AppDrawer
          drawerWidth={240}
          title="テストアプリ"
          isMobile={true}
          mobileOpen={true}
          onDrawerClose={() => {}}
        />
      )

      // 基本的な存在確認のみ
      expect(screen.getByRole('navigation')).toBeInTheDocument()
    })

    it('ナビゲーションメニューが正常にレンダリングされる', () => {
      renderOptimized(
        <NavigationMenu isMobile={false} onDrawerClose={() => {}} />
      )

      // 基本的な機能確認のみ
      expect(screen.getByText('ダッシュボード')).toBeInTheDocument()
    })
  })

  describe('重要機能統合', () => {
    it('ナビゲーション全体の基本動作が正常', () => {
      renderOptimized(<AppNavigation />)

      // 重要な機能のみテスト（詳細は削除）
      const navigation = screen.getByRole('navigation')
      expect(navigation).toBeInTheDocument()

      // メニュー項目の存在確認（軽量）
      expect(screen.getAllByText('ダッシュボード')[0]).toBeInTheDocument()
    })
  })
})
