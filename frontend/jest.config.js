export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  setupFiles: ['<rootDir>/src/setupJest.ts'],
  // テスト実行時間の最適化（Phase 5: ボトルネック根本解決）
  testTimeout: 6000, // 8000 → 6000 (失敗テスト早期検出)

  // React 19 + Jest環境でのact()警告対策
  testEnvironmentOptions: {
    // JSDOMでのact()サポートを改善
    customExportConditions: [''],
    // React 19のConcurrent Features対応
    resources: 'usable',
    runScripts: 'dangerously',
  },

  // 並列実行最適化（Phase 5: 最大効率化）
  maxWorkers: '95%', // 90% → 95% (ほぼ全CPUリソース活用)
  maxConcurrency: 15, // 10 → 15 (並列テスト数増加)

  // キャッシュ最適化
  cache: true,
  cacheDirectory: '<rootDir>/node_modules/.cache/jest',
  clearMocks: true, // モック状態クリア高速化

  // Phase 5: テスト実行効率化
  bail: 5, // 5個失敗したら停止（早期障害検出）
  verbose: false, // 詳細出力を抑制して高速化

  // テストユーティリティファイルを除外
  testPathIgnorePatterns: [
    '/node_modules/',
    '/src/__tests__/FastTestRunner.config.js',
  ],

  // テストファイル検出パターン（テストユーティリティを除外）
  testMatch: [
    '**/__tests__/**/*.(test|spec).{js,jsx,ts,tsx}',
    '!**/test-utils/**',
    '!**/*.helper.{js,jsx,ts,tsx}',
  ],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(svg|png|jpg|jpeg|gif|ico|webp)$': 'identity-obj-proxy',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: {
          jsx: 'react-jsx',
          esModuleInterop: true,
          skipLibCheck: true,
          verbatimModuleSyntax: false,
          allowSyntheticDefaultImports: true,
          isolatedModules: true,
        },
      },
    ],
  },
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.(ts|tsx)',
    '<rootDir>/src/**/*.(test|spec).(ts|tsx)',
  ],

  // Phase 4: 2分以内実行のための高速モード設定
  testPathIgnorePatterns: [
    '/node_modules/',
    '.*_old/.*',
    'src/__tests__/optimization.setup.ts',
    // Phase 2で削除されたテストファイルのパターン
    'src/components/common_old/',
    'src/components/layout_old/',
    'src/components/navigation_old/',
    'src/features/*/components_old/',
    // Phase 4: 詳細テストの一時スキップ（高速化のため）
    ...(process.env.FAST_TEST === 'true'
      ? [
          'src/components/navigation/__tests__/AppDrawer.test.tsx',
          'src/components/navigation/__tests__/AppNavigation.test.tsx',
          'src/components/navigation/__tests__/AppTopBar.test.tsx',
          'src/components/navigation/__tests__/AppDrawerHeader.test.tsx',
          'src/components/navigation/__tests__/AppDrawerContent.test.tsx',
          'src/components/navigation/__tests__/AppBreadcrumbs.test.tsx',
          'src/components/navigation/__tests__/NavigationMenu.test.tsx',
          'src/components/navigation/__tests__/NavigationMenuItem.test.tsx',
          'src/components/ui/__tests__/DatePicker.test.tsx',
          'src/components/ui/__tests__/TextInput.test.tsx',
          'src/components/ui/__tests__/AmountInput.test.tsx',
          'src/components/forms/__tests__/ControlledAmountInput.test.tsx',
          'src/components/forms/__tests__/ControlledDatePicker.test.tsx',
          'src/components/forms/__tests__/ControlledCustomDateSwitch.test.tsx',
        ]
      : []),
  ].filter(Boolean),
  collectCoverageFrom: [
    'src/**/*.(ts|tsx)',
    '!src/**/*.d.ts',
    '!src/**/__stories__/**/*',
    '!src/**/*.stories.(ts|tsx)',
  ],
}
