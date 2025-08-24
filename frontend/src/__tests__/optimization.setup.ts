/**
 * テスト最適化設定ファイル
 *
 * React 19 + MUI v6 環境でのテストパフォーマンス向上とact()警告対策を提供。
 *
 * ## 主な機能
 * - Jest タイマー最適化
 * - MUI 最適化テーマ（動的インポート対応）
 * - テストデータ生成ヘルパー
 * - プリセット設定
 *
 * @example
 * ```typescript
 * // テスト用最適化テーマの使用
 * const theme = await testOptimization.createOptimizedTheme()
 * render(<ThemeProvider theme={theme}>{component}</ThemeProvider>)
 * ```
 *
 * @see {@link https://jestjs.io/docs/configuration | Jest Configuration}
 * @see {@link ../docs-src/quality/test-optimization.md | Test Optimization Guide}
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
   * MUIコンポーネント用の軽量テストテーマを動的に作成
   *
   * アニメーション・Rippleエフェクトを無効化してテスト実行時間を短縮。
   * ESLint準拠の動的インポートを使用。
   *
   * @returns MUI最適化テーマオブジェクト
   * @example
   * ```typescript
   * const theme = await testOptimization.createOptimizedTheme()
   * render(<ThemeProvider theme={theme}>{component}</ThemeProvider>)
   * ```
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
   * MUI非同期処理に最適化されたwaitFor設定
   *
   * @example
   * ```typescript
   * await waitFor(() => {
   *   expect(element).toBeInTheDocument()
   * }, testOptimization.waitForOptions)
   * ```
   */
  waitForOptions: {
    timeout: 5000, // MUI対応で5秒
    interval: 100, // チェック間隔100ms
  },

  /**
   * 軽量テストデータ生成
   *
   * 大量データテスト用の効率的なモックデータ作成
   *
   * @param count 生成するデータ数
   * @returns テストデータ配列
   * @example
   * ```typescript
   * const mockData = testOptimization.createMockData(100)
   * expect(mockData).toHaveLength(100)
   * ```
   */
  createMockData: (count: number) => {
    return Array.from({ length: count }, (_, index) => ({
      id: `test-${index}`,
      title: `テストアイテム${index + 1}`,
      value: Math.random() * 1000,
    }))
  },

  /**
   * メモリ効率的なモック関数バッチ管理
   *
   * 複数のモック関数を一括で作成・管理
   *
   * @param mockNames モック関数名の配列
   * @returns モック管理オブジェクト
   * @example
   * ```typescript
   * const mocks = testOptimization.createMockBatch(['onClick', 'onChange'])
   * expect(mocks.get('onClick')).toBeCalledTimes(1)
   * mocks.reset() // 全モックをリセット
   * ```
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
