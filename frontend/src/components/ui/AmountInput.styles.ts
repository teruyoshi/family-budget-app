import type { SxProps, Theme } from '@mui/material'

/**
 * AmountInputコンポーネントのスタイル定義
 *
 * 金額入力フィールドの視覚的表現とユーザビリティを向上させるスタイル設定。
 */
export const amountInputStyles = {
  /**
   * 金額入力フィールドのベーススタイル
   *
   * ## スタイル特徴
   * - 入力値は右寄せで数値の桁を把握しやすく配置
   * - プレースホルダーは中央揃えで使いやすさを配慮
   * - 透明度調整で未入力状態を明確に表示
   */
  inputField: {
    '& .MuiInputBase-input': {
      // 金額表示は右寄せで数値の桁を把握しやすく
      textAlign: 'right',
      '&::placeholder': {
        // プレースホルダーは中央揃えで視覚的バランスを保つ
        textAlign: 'center',
        // 未入力状態を明確にする透明度設定
        opacity: 0.6,
      },
    },
  } satisfies SxProps<Theme>,
} as const