export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  setupFiles: ['<rootDir>/src/setupJest.ts'],
  // テスト実行時間の最適化（Phase 3: テスト削減後の最適値）
  testTimeout: 10000, // 15000 → 10000 (テスト削減により短縮可能)

  // React 19 + Jest環境でのact()警告対策
  testEnvironmentOptions: {
    // JSDOMでのact()サポートを改善
    customExportConditions: [''],
    // React 19のConcurrent Features対応
    resources: 'usable',
    runScripts: 'dangerously',
  },

  // 並列実行最適化（Phase 3: テスト数削減により安全に向上）
  maxWorkers: '75%', // 50% → 75% (テスト数削減により安全に向上)

  // キャッシュ最適化
  cache: true,
  cacheDirectory: '<rootDir>/node_modules/.cache/jest',
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
  // 不要なファイル除外を強化（Phase 3: 削除されたテストファイル対応）
  testPathIgnorePatterns: [
    '/node_modules/',
    '.*_old/.*',
    'src/__tests__/optimization.setup.ts',
    // Phase 2で削除されたテストファイルのパターン
    'src/components/common_old/',
    'src/components/layout_old/',
    'src/components/navigation_old/',
    'src/features/*/components_old/',
  ],
  collectCoverageFrom: [
    'src/**/*.(ts|tsx)',
    '!src/**/*.d.ts',
    '!src/**/__stories__/**/*',
    '!src/**/*.stories.(ts|tsx)',
  ],
}
