/**
 * 重要テスト設定（Phase 4: 2分以内実行の実現）
 *
 * ビジネスロジックと重要機能のみに絞った
 * 最小限のテストセットで2分以内実行を実現
 */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  setupFiles: ['<rootDir>/src/setupJest.ts'],

  // Phase 4: 超高速実行設定
  testTimeout: 5000, // 8秒 → 5秒（さらなる短縮）
  maxWorkers: '100%', // 90% → 100%（最大並列化）
  maxConcurrency: 20, // 10 → 20（並列数増加）

  // キャッシュ最適化
  cache: true,
  cacheDirectory: '<rootDir>/node_modules/.cache/jest',
  clearMocks: true,

  // React 19 + Jest環境でのact()警告対策
  testEnvironmentOptions: {
    customExportConditions: [''],
    resources: 'usable',
    runScripts: 'dangerously',
  },

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

  // Phase 4: 重要テストのみに限定
  testMatch: [
    // ビジネスロジックテスト（必須）
    '<rootDir>/src/hooks/__tests__/useBudgetManager.test.ts',
    '<rootDir>/src/hooks/__tests__/useMoney.test.ts',
    '<rootDir>/src/lib/format/__tests__/money.test.ts',

    // アプリケーション統合テスト（必須）
    '<rootDir>/src/App.test.tsx',

    // 軽量統合テスト（必須）
    '<rootDir>/src/components/navigation/__tests__/NavigationIntegration.test.tsx',

    // 重要ページテスト（最小限）
    '<rootDir>/src/pages/__tests__/DashboardPage.test.tsx',

    // ルーティングテスト（重要機能）
    '<rootDir>/src/routes/__tests__/routing.test.tsx',
  ],

  collectCoverageFrom: [
    'src/hooks/**/*.(ts|tsx)',
    'src/lib/**/*.(ts|tsx)',
    'src/routes/**/*.(ts|tsx)',
    'src/App.tsx',
    '!src/**/*.d.ts',
    '!src/**/__stories__/**/*',
    '!src/**/*.stories.(ts|tsx)',
  ],
}
