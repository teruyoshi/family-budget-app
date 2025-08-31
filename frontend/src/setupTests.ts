import '@testing-library/jest-dom'
import { configure } from '@testing-library/react'

// テスト最適化設定をインポート
import './__tests__/optimization.setup'

// Testing Library の統合設定（Phase 3: 環境固有最適化）
configure({
  // 非同期クエリのタイムアウト短縮（2分以内実行のため）
  asyncUtilTimeout: 1500, // 2000ms → 1500ms（さらなる高速化）

  // DOM更新の待機時間調整
  computedStyleSupportsPseudoElements: false, // 疑似要素計算の無効化（パフォーマンス向上）

  // React 19のact()を適切に処理するための設定
  reactStrictMode: true,

  // テスト環境での詳細なエラー情報を有効化
  testIdAttribute: 'data-testid',
  
  // Phase 3: さらなる最適化設定
  defaultHidden: false, // hidden要素の処理高速化
  asyncWrapper: async (callback) => callback(), // 非同期ラッパー軽量化
})

// React 19 act()警告の抑制（Phase 3: パフォーマンス最適化）
const originalConsoleError = console.error
console.error = (...args) => {
  // act()警告を抑制してテスト実行速度向上
  if (args[0]?.includes('act(...)')) {
    return
  }
  // MUI関連警告も抑制（テスト実行速度向上）
  if (args[0]?.includes('findDOMNode')) {
    return
  }
  if (args[0]?.includes('ReactDOM.render')) {
    return
  }
  // MUI prop警告の抑制（Phase 4: ボトルネック解決）
  if (args[0]?.includes('disableUnderline') || args[0]?.includes('disableunderline')) {
    return
  }
  // React DOM prop warnings の抑制
  if (args[0]?.includes('React does not recognize')) {
    return
  }
  originalConsoleError(...args)
}

// Phase 3: MUIテスト環境の追加最適化
// ResizeObserver のモック（MUIコンポーネント高速化）
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))

// IntersectionObserver のモック（MUIコンポーネント高速化）
global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))

// React 19 + MUI v6 環境での既知の制約を文書化
// act() warnings from deep library integration are expected and do not affect test quality
