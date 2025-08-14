import js from '@eslint/js'
import globals from 'globals'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import tsdoc from 'eslint-plugin-tsdoc'

export default [
  js.configs.recommended,
  {
    files: ['src/**/*.{ts,tsx}'],
    excludes: [
      '**/*.test.{ts,tsx}',
      '**/*.stories.{ts,tsx}',
      '**/node_modules/**',
    ],

    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.es2022,
        ...globals.node,
      },
    },

    plugins: {
      '@typescript-eslint': tsPlugin,
      tsdoc,
    },

    rules: {
      // TSDoc基本ルール
      'tsdoc/syntax': 'error',

      // TypeScript + TSDoc統合ルール
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'warn',

      // カスタムTSDocルール（将来的に追加）
      // 'tsdoc/require-description': 'warn',      // 説明必須
      // 'tsdoc/require-example': 'warn',         // @example必須
      // 'tsdoc/require-param-description': 'warn' // @param説明必須
    },
  },

  // コンポーネント・フック専用の厳格ルール
  {
    files: [
      'src/components/**/*.{ts,tsx}',
      'src/hooks/*.ts',
      'src/lib/**/*.ts',
    ],
    rules: {
      'tsdoc/syntax': 'error',

      // 公開APIには詳細ドキュメント必須（将来的に有効化）
      // '@typescript-eslint/explicit-function-return-type': 'error',
      // 'tsdoc/require-description': 'error',
      // 'tsdoc/require-example': 'error'
    },
  },
]
