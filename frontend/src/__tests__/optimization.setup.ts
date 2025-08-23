/**
 * テスト最適化設定ファイル
 *
 * フロントエンドテストのパフォーマンス向上とタイムアウト対策を提供。
 * MUIコンポーネントテスト、非同期処理の最適化に特化。
 *
 * 注意: 警告の抑制は行いません。全ての警告・エラーは適切に表示され、
 * 開発者が問題を認識できるようにします。
 */

/**
 * グローバルなテスト最適化設定
 */
beforeAll(() => {
  // Jest タイマーの初期化
  jest.useFakeTimers({
    advanceTimers: true, // 自動的にタイマーを進める
  })
})

afterAll(() => {
  // テスト後のクリーンアップ
  jest.useRealTimers()
})

/**
 * 各テストファイルで使用可能な最適化ヘルパー
 */
export const testOptimization = {
  /**
   * MUIコンポーネント用の軽量テストテーマ
   * アニメーション無効化でテスト実行時間を短縮
   */
  createOptimizedTheme: async () => {
    const { createTheme } = await import('@mui/material/styles')

    return createTheme({
      transitions: {
        create: () => 'none', // 全アニメーション無効化
      },
      components: {
        MuiButton: {
          defaultProps: {
            disableRipple: true, // Ripple エフェクト無効
          },
        },
        MuiButtonBase: {
          defaultProps: {
            disableRipple: true,
            disableTouchRipple: true,
          },
        },
      },
    })
  },

  /**
   * 効率的な非同期テスト待機
   * MUIの非同期処理に最適化されたwaitFor設定
   */
  waitForOptions: {
    timeout: 5000, // MUI対応で5秒
    interval: 100, // チェック間隔
  },

  /**
   * テストデータの生成最適化
   * 大量データテスト用の軽量モック
   */
  createMockData: (count: number) => {
    return Array.from({ length: count }, (_, index) => ({
      id: `test-${index}`,
      title: `テストアイテム${index + 1}`,
      value: Math.random() * 1000,
    }))
  },

  /**
   * モック関数のバッチ作成
   * メモリ効率を考慮したモック管理
   */
  createMockBatch: (mockNames: string[]) => {
    const mocks = new Map<string, jest.Mock>()

    mockNames.forEach((name) => {
      mocks.set(name, jest.fn())
    })

    return {
      get: (name: string) => mocks.get(name),
      reset: () => mocks.forEach((mock) => mock.mockReset()),
      clear: () => mocks.forEach((mock) => mock.mockClear()),
    }
  },
}

/**
 * テストスイート別の最適化プリセット
 */
export const testPresets = {
  /**
   * 基本コンポーネント用（UI/Forms）
   */
  basicComponent: {
    timeout: 10000, // 10秒
    setupOptimization: true,
  },

  /**
   * 複雑なコンポーネント用（Navigation/Layout）
   */
  complexComponent: {
    timeout: 15000, // 15秒
    setupOptimization: true,
    useFakeTimers: true,
  },

  /**
   * 統合テスト用（Pages/Routes）
   */
  integration: {
    timeout: 20000, // 20秒
    setupOptimization: true,
    useFakeTimers: false, // 実際のタイマーを使用
  },

  /**
   * パフォーマンステスト用（大量データ）
   */
  performance: {
    timeout: 30000, // 30秒
    setupOptimization: false, // 実際のパフォーマンスを測定
    useFakeTimers: false,
  },
}
