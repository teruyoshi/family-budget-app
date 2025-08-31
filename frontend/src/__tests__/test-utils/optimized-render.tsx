/**
 * 軽量テストユーティリティ（Phase 3: 環境固有最適化）
 *
 * MUIコンポーネントとReact 19の組み合わせでのテスト実行を
 * 大幅に高速化する最適化済みレンダリングヘルパー
 */
import { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import { DateLocalizationProvider } from '@/components/provider'
import { lightweightTestTheme } from './test-theme.config'

// 最小限のプロバイダー（Phase 3: 必要最小限の機能のみ）
const MinimalTestWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>
    <ThemeProvider theme={lightweightTestTheme}>
      <DateLocalizationProvider>{children}</DateLocalizationProvider>
    </ThemeProvider>
  </BrowserRouter>
)

// 超軽量ラッパー（ルーターなし）
const UltraLightWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={lightweightTestTheme}>{children}</ThemeProvider>
)

// 最適化済みレンダリング関数
export const renderOptimized = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => {
  return render(ui, {
    wrapper: MinimalTestWrapper,
    ...options,
  })
}

// 超高速レンダリング（ルーターが不要なコンポーネント用）
export const renderUltraFast = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => {
  return render(ui, {
    wrapper: UltraLightWrapper,
    ...options,
  })
}

// 軽量テーマをエクスポート（既存テストでの利用用）
export { lightweightTestTheme } from './test-theme.config'

// レガシーサポート（既存テストとの互換性）
export const TestWrapper = MinimalTestWrapper
