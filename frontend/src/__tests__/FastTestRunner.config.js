/**
 * 高速テスト実行設定（Phase 4: 2分以内実行の実現）
 *
 * 重要な機能テストのみを実行し、2分以内の実行を実現
 */

// 高速実行のための重要テストファイルのみを指定
export const fastTestPatterns = [
  // 重要なビジネスロジックテスト
  'src/hooks/__tests__/useBudgetManager.test.ts',
  'src/hooks/__tests__/useMoney.test.ts',
  'src/lib/format/__tests__/money.test.ts',

  // 重要なUIコンポーネントテスト（統合版）
  'src/components/navigation/__tests__/NavigationIntegration.test.tsx',

  // 重要なルーティングテスト
  'src/routes/__tests__/routing.test.tsx',

  // 重要なページテスト（軽量版のみ）
  'src/pages/__tests__/DashboardPage.test.tsx',

  // アプリ全体テスト
  'src/App.test.tsx',
]

// 一時的にスキップするテストパターン（詳細テスト）
export const skipPatterns = [
  // 個別ナビゲーションテスト（統合テストで代替）
  'src/components/navigation/__tests__/AppDrawer.test.tsx',
  'src/components/navigation/__tests__/AppNavigation.test.tsx',
  'src/components/navigation/__tests__/AppTopBar.test.tsx',
  'src/components/navigation/__tests__/AppDrawerHeader.test.tsx',
  'src/components/navigation/__tests__/AppDrawerContent.test.tsx',
  'src/components/navigation/__tests__/AppBreadcrumbs.test.tsx',
  'src/components/navigation/__tests__/NavigationMenu.test.tsx',
  'src/components/navigation/__tests__/NavigationMenuItem.test.tsx',

  // 詳細UIテスト（基本機能確認済み）
  'src/components/ui/__tests__/DatePicker.test.tsx',
  'src/components/ui/__tests__/TextInput.test.tsx',
  'src/components/ui/__tests__/AmountInput.test.tsx',

  // 詳細フォームテスト（統合テストで十分）
  'src/components/forms/__tests__/ControlledAmountInput.test.tsx',
  'src/components/forms/__tests__/ControlledDatePicker.test.tsx',
  'src/components/forms/__tests__/ControlledCustomDateSwitch.test.tsx',
]
