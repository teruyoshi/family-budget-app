// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from 'eslint-plugin-storybook'

import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { globalIgnores } from 'eslint/config'
import eslintConfigPrettier from 'eslint-config-prettier'

export default tseslint.config(
  [
    globalIgnores(['dist', 'coverage', 'docs', 'storybook-static']),
    {
      files: ['**/*.{ts,tsx}'],
      extends: [
        js.configs.recommended,
        tseslint.configs.recommended,
        reactHooks.configs['recommended-latest'],
        reactRefresh.configs.vite,
        eslintConfigPrettier, // Prettier競合ルール無効化
      ],
      languageOptions: {
        ecmaVersion: 2020,
        globals: globals.browser,
      },
      rules: {
        // 品質向上ルール
        'no-console': ['warn', { allow: ['warn', 'error'] }], // console.log警告（warn・error許可）
        'prefer-const': 'error', // const推奨
        'no-unused-vars': 'off', // TypeScriptルールに委譲
        '@typescript-eslint/no-unused-vars': 'error',
        
        // import順序整理
        'sort-imports': ['error', {
          ignoreCase: false,
          ignoreDeclarationSort: true, // import-sortプラグインに委譲
          ignoreMemberSort: false,
          memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single']
        }],
      },
    },
    // Test files configuration
    {
      files: [
        '**/__tests__/**/*.{ts,tsx}',
        '**/*.test.{ts,tsx}',
        '**/*.spec.{ts,tsx}',
      ],
      languageOptions: {
        ecmaVersion: 2020,
        globals: {
          ...globals.browser,
          ...globals.jest,
        },
      },
      rules: {
        // Allow describe, test, it, expect globals in test files
        '@typescript-eslint/no-unused-expressions': 'off',
        // テストファイルでのconsole.log許可
        'no-console': 'off',
        // テストファイルでのimport順序チェック緩和
        'sort-imports': 'off',
      },
    },
    // Storybook files configuration
    {
      files: ['**/*.stories.{ts,tsx}'],
      rules: {
        // Storybookファイルでのconsole.log許可（action表示用）
        'no-console': 'off',
        // Storybookファイルでのimport順序チェック緩和
        'sort-imports': 'off',
      },
    },
  ],
  storybook.configs['flat/recommended']
)
