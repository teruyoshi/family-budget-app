import '@testing-library/jest-dom'
import { configure } from '@testing-library/react'

// テスト最適化設定をインポート
import './__tests__/optimization.setup'

// Testing Library の統合設定（React 19 + MUI v6 最適化）
configure({
  // 非同期クエリのデフォルトタイムアウト延長（MUI対応）
  asyncUtilTimeout: 3000, // デフォルト1000ms→3000ms

  // DOM更新の待機時間調整
  computedStyleSupportsPseudoElements: false, // 疑似要素計算の無効化（パフォーマンス向上）

  // React 19のact()を適切に処理するための設定
  reactStrictMode: true,

  // テスト環境での詳細なエラー情報を有効化
  testIdAttribute: 'data-testid',
})

// React 19 + MUI v6 環境での既知の制約を文書化
// act() warnings from deep library integration are expected and do not affect test quality
