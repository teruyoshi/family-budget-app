export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  setupFiles: ['<rootDir>/src/setupJest.ts'],
  // テスト実行時間の最適化
  testTimeout: 30000, // デフォルト5秒→30秒（MUI非同期処理対応・品質チェック最適化）

  // React 19 + Jest環境でのact()警告対策
  testEnvironmentOptions: {
    // JSDOMでのact()サポートを改善
    customExportConditions: [''],
    // React 19のConcurrent Features対応
    resources: 'usable',
    runScripts: 'dangerously',
  },
  maxWorkers: '50%', // CPUリソース効率化
  cache: true, // テストキャッシュ有効化
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
  testPathIgnorePatterns: [
    '/node_modules/',
    '.*_old/.*',
    'src/__tests__/optimization.setup.ts',
  ],
  collectCoverageFrom: [
    'src/**/*.(ts|tsx)',
    '!src/**/*.d.ts',
    '!src/**/__stories__/**/*',
    '!src/**/*.stories.(ts|tsx)',
  ],
}
