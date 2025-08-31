/**
 * テストテーマ設定（Phase 3: 環境固有最適化）
 *
 * MUIコンポーネントとReact 19の組み合わせでのテスト実行を
 * 大幅に高速化する最適化済みテーマ
 */
import { createTheme } from '@mui/material/styles'

// 軽量テストテーマ（Phase 3: アニメーション・エフェクト完全無効化）
export const lightweightTestTheme = createTheme({
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
