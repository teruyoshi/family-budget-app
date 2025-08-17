import { Box, Grid, Paper } from '@mui/material'
import AppTitle from '@/components/common/AppTitle'
import AppLayout from '@/components/layout/AppLayout'
import { BalanceDisplay } from '@/features/balance'
import { ExpenseForm, TotalExpenseDisplay } from '@/features/expenses'
import { IncomeForm, TotalIncomeDisplay } from '@/features/income'
import { ExpenseHistory, IncomeHistory } from '@/features/history'
import { useBudgetManager } from '@/hooks'

/**
 * ダッシュボードページコンポーネントのProps型定義
 *
 * 将来的な拡張を考慮した型定義ですが、現在は特別なpropsは不要です。
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DashboardPageProps {
  // 将来的な拡張用（例：初期表示設定、フィルター設定等）
}

/**
 * ダッシュボードページコンポーネント
 *
 * 家計簿アプリのメインダッシュボードとして機能し、収入・支出の登録・表示・集計を統合管理します。
 * React Router対応により、ルートパス（/）でアクセス可能なホームページとして動作します。
 *
 * @remarks
 * **主な機能:**
 * - 収入・支出データの状態管理（useBudgetManager）
 * - 新規収入・支出の追加処理
 * - 収入・支出履歴の表示（降順ソート）
 * - 合計収入・支出額の自動計算
 * - 残高表示の自動更新
 * - レスポンシブデザイン（MUI Container + Paper）
 *
 * **アーキテクチャ:**
 * - React Router: BrowserRouter による SPA ルーティング
 * - Container Component: アプリケーション状態を管理
 * - Feature-based Structure: income/expenses機能を統合
 * - Material Design: 一貫したUI/UX
 *
 * **レイアウト構成:**
 * - ヘッダー部分: アプリタイトル + 残高表示
 * - メイン部分: 支出入力フォーム（左）+ 収入入力フォーム（右）
 * - フッター部分: 支出履歴（左）+ 収入履歴（右）
 * - レスポンシブ: モバイルでは縦配置、デスクトップでは横配置
 *
 * @example
 * ```tsx
 * // 基本的な使用例（App.tsx内でのルーティング）
 * <Route path="/" element={<DashboardPage />} />
 * ```
 *
 * @example
 * ```tsx
 * // 将来的な拡張例（props付き）
 * <DashboardPage initialView="expenses" showTutorial={false} />
 * ```
 */
export default function DashboardPage() {
  const [
    { expenses, incomes, balance, totalExpenseAmount, totalIncomeAmount },
    { addExpense, addIncome },
  ] = useBudgetManager()

  return (
    <AppLayout>
      {/* ヘッダーセクション: タイトル + 残高表示 */}
      <Paper
        elevation={3}
        sx={{
          p: 4,
          mb: 4,
        }}
      >
        <AppTitle />
        <BalanceDisplay balance={balance} />

        {/* 入力フォームセクション: 支出 + 収入 */}
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ pr: { md: 2 } }}>
              <ExpenseForm onSubmit={addExpense} />
              {totalExpenseAmount > 0 && (
                <TotalExpenseDisplay totalAmount={totalExpenseAmount} />
              )}
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ pl: { md: 2 } }}>
              <IncomeForm onSubmit={addIncome} />
              {totalIncomeAmount > 0 && (
                <TotalIncomeDisplay totalAmount={totalIncomeAmount} />
              )}
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* 履歴セクション: 支出履歴 + 収入履歴 */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <ExpenseHistory expenses={expenses} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <IncomeHistory incomes={incomes} />
        </Grid>
      </Grid>
    </AppLayout>
  )
}
