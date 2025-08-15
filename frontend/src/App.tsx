import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Container, Paper, Grid, Box } from '@mui/material'
import AppTitle from '@/components/common/AppTitle'
import { BalanceDisplay } from '@/features/balance'
import { ExpenseForm, TotalExpenseDisplay } from '@/features/expenses'
import { IncomeForm, TotalIncomeDisplay } from '@/features/income'
import { ExpenseHistory, IncomeHistory } from '@/features/history'
import { useBudgetManager } from '@/hooks'

/**
 * ダッシュボードページコンポーネント
 *
 * 家計簿アプリのメインダッシュボードとして機能し、収入・支出の登録・表示・集計を統合管理します。
 * React Router対応により、ルートパス（/）でアクセス可能なホームページとして動作します。
 *
 * 主な機能:
 * - 収入・支出データの状態管理（useState）
 * - 新規収入・支出の追加処理
 * - 収入・支出履歴の表示（降順ソート）
 * - 合計収入・支出額の自動計算
 * - 残高表示の自動更新
 * - レスポンシブデザイン（MUI Container + Paper）
 *
 * アーキテクチャ:
 * - React Router: BrowserRouter による SPA ルーティング
 * - Container Component: アプリケーション状態を管理
 * - Feature-based Structure: income/expenses機能を統合
 * - Material Design: 一貫したUI/UX
 */
function DashboardPage() {
  const [
    { expenses, incomes, balance, totalExpenseAmount, totalIncomeAmount },
    { addExpense, addIncome },
  ] = useBudgetManager()

  return (
    <Container
      maxWidth="md"
      sx={{
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        py: 4,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          mb: 4,
        }}
      >
        <AppTitle />

        <BalanceDisplay balance={balance} />

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

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <ExpenseHistory expenses={expenses} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <IncomeHistory incomes={incomes} />
        </Grid>
      </Grid>
    </Container>
  )
}

/**
 * メインアプリケーションコンポーネント
 *
 * React Router による SPA ルーティングを提供し、
 * 各ページコンポーネントへの適切なルーティングを管理します。
 *
 * @remarks
 * - BrowserRouter: History API を使用したクライアントサイドルーティング
 * - 基本ルート構造: 現在はダッシュボードページのみ実装
 * - 将来的な拡張: /expenses, /income, /history, /settings ページ追加予定
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
