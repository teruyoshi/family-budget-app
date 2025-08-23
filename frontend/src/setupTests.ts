import '@testing-library/jest-dom'
import { configure } from '@testing-library/react'

// テスト最適化設定をインポート
import './__tests__/optimization.setup'

// Testing Library の設定最適化
configure({
  // 非同期クエリのデフォルトタイムアウト延長（MUI対応）
  asyncUtilTimeout: 3000, // デフォルト1000ms→3000ms
  // DOM更新の待機時間調整
  computedStyleSupportsPseudoElements: false, // 疑似要素計算の無効化（パフォーマンス向上）
})
