/**
 * 軽量テストユーティリティ（Phase 3: 環境固有最適化）
 *
 * MUIコンポーネントとReact 19の組み合わせでのテスト実行を
 * 大幅に高速化する最適化済みレンダリングヘルパー
 */
import { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { DateLocalizationProvider } from '@/components/provider'

// 軽量テストテーマ（Phase 3: アニメーション・エフェクト完全無効化）
const lightweightTestTheme = createTheme({
  // トランジション・アニメーション完全無効化
  transitions: {
    create: () => 'none',
    duration: {
      shortest: 0,
      shorter: 0,
      short: 0,
      standard: 0,
      complex: 0,
      enteringScreen: 0,
      leavingScreen: 0,
    },
  },

  // 全コンポーネントでRipple・アニメーション無効化
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
        disableTouchRipple: true,
        focusRipple: false,
      },
    },
    MuiButton: {
      defaultProps: {
        disableRipple: true,
        disableElevation: true,
      },
    },
    MuiIconButton: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiCheckbox: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiSwitch: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiTextField: {
      defaultProps: {
        InputProps: {
          disableUnderline: true,
        },
      },
    },
    // Paper・Card系のエレベーション無効化
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
    },
    MuiCard: {
      defaultProps: {
        elevation: 0,
      },
    },
    // Drawer系のトランジション無効化
    MuiDrawer: {
      defaultProps: {
        transitionDuration: 0,
      },
    },
  },
})

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
export { lightweightTestTheme }

// レガシーサポート（既存テストとの互換性）
export const TestWrapper = MinimalTestWrapper
