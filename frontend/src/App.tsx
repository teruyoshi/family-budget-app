import { Container, Paper, Grid, Box } from '@mui/material'
import AppTitle from '@/components/common/AppTitle'
import { BalanceDisplay } from '@/features/balance'
import {
  ExpenseForm,
  TotalExpenseDisplay,
  ExpenseHistory,
} from '@/features/expenses'
import {
  IncomeForm,
  TotalIncomeDisplay,
  IncomeHistory,
} from '@/features/income'
import { useExpenseManager, useIncomeManager } from '@/hooks'

/**
 * メインアプリケーションコンポーネント
 *
 * 家計簿アプリの中央ハブとして機能し、収入・支出の登録・表示・集計を統合管理します。
 * GitHub Pages デモ版として、インメモリストレージを使用しています。
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
 * - Container Component: アプリケーション状態を管理
 * - Feature-based Structure: income/expenses機能を統合
 * - Material Design: 一貫したUI/UX
 */
function App() {
  const [{ expenses, totalAmount: totalExpenseAmount }, { addExpense }] =
    useExpenseManager(10000)
  const [{ incomes, totalAmount: totalIncomeAmount }, { addIncome }] =
    useIncomeManager(0)

  // 実際の残高は収入から支出を引いたもの
  const actualBalance = 10000 + totalIncomeAmount - totalExpenseAmount

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

        <BalanceDisplay balance={actualBalance} />

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

export default App
