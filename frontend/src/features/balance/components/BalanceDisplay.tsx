import { Box } from '@mui/material'
import TextLabel from '../../../components/common/TextLabel'
import AmountText from '../../../components/common/AmountText'

/**
 * 残高表示コンポーネントのProps型定義
 *
 * 現在の家計残高を中央揃えで表示するコンポーネント用のプロパティ設定。
 * メインダッシュボードや概要ページでの重要指標表示に使用されます。
 */
export interface BalanceDisplayProps {
  /**
   * 表示する残高金額
   * @example 25000 - プラス残高（緑色表示）
   * @example -15000 - マイナス残高（赤字状態）
   * @example 0 - ゼロ残高
   * @remarks 収入合計 - 支出合計で算出される数値
   */
  balance: number
}

/**
 * 家計残高中央表示コンポーネント
 *
 * メインダッシュボードでの残高状態表示を目的とした重要指標コンポーネント。
 * TextLabelとAmountTextを組み合わせ、「残高：¥XX,XXX」形式で中央揃え表示。
 * 残高のプラス・マイナスに関わらず、緑色で統一した明るい表示を提供します。
 *
 * @remarks
 * - **色彩デザイン**: 残高の正負に関わらず緑色（success.main）で表示
 * - **中央揃え**: メインコンテンツでの目立ちやすさを考慮
 * - **コンポーネント組み合わせ**: TextLabel + AmountTextの再利用
 * - **アクセシビリティ**: ラベルと金額の関連性を保持
 * - **レスポンシブ**: モバイルでの表示も考慮済み
 * - **フォーマット**: lib/format/money.tsの統一フォーマットを使用
 *
 * @example
 * ```tsx
 * // メインダッシュボードでの基本使用
 * const { balance } = useBudgetManager()
 *
 * <Container>
 *   <BalanceDisplay balance={balance} />
 *   {/* 出力: "残高：¥25,000" (緑色、中央揃え) */}
 * </Container>
 * ```
 *
 * @example
 * ```tsx
 * // 概要ページレイアウトでの使用
 * <Box sx={{ mb: 4 }}>
 *   <BalanceDisplay balance={currentBalance} />
 *   <Stack direction="row" spacing={2} justifyContent="center">
 *     <TotalIncomeDisplay income={totalIncome} />
 *     <TotalExpenseDisplay expense={totalExpense} />
 *   </Stack>
 * </Box>
 * ```
 *
 * @example
 * ```tsx
 * // マイナス残高での表示例
 * <BalanceDisplay balance={-15000} />
 * {/* 出力: "残高：¥-15,000" (緑色ベースで表示) */}
 * ```
 */
export default function BalanceDisplay({ balance }: BalanceDisplayProps) {
  return (
    <Box
      sx={{
        textAlign: 'center',
        color: 'success.main',
        fontWeight: 'bold',
        mb: 3,
      }}
    >
      <TextLabel variant="h5" sx={{ display: 'inline' }}>
        残高
      </TextLabel>
      <AmountText amount={balance} variant="h5" sx={{ display: 'inline' }} />
    </Box>
  )
}
