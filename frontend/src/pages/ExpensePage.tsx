import { Box, Grid, Paper, Typography } from '@mui/material'
import AppLayout from '@/components/layout_old/AppLayout'
import { ExpenseForm, TotalExpenseDisplay } from '@/features/expenses'
import { ExpenseHistory } from '@/features/history'
import { useBudgetManager } from '@/hooks/useBudgetManager'

/**
 * 支出管理ページコンポーネントのProps型定義
 *
 * 将来的な拡張を考慮した型定義（フィルター設定、期間指定等）
 */
export interface ExpensePageProps {
  /** 初期表示する期間フィルター（将来実装） */
  initialDateRange?: {
    startDate?: string
    endDate?: string
  }
  /** カテゴリフィルター（将来実装） */
  initialCategoryFilter?: string[]
}

/**
 * 支出管理専用ページコンポーネント
 *
 * 支出の登録・履歴表示・分析に特化したページです。
 * ダッシュボードから支出機能を分離し、より詳細な支出管理機能を提供します。
 *
 * @remarks
 * **主な機能:**
 * - 支出の新規登録（ExpenseForm）
 * - 支出合計金額の表示（TotalExpenseDisplay）
 * - 支出履歴の一覧表示（ExpenseHistory）
 * - 将来的な拡張: カテゴリフィルター、期間検索、グラフ表示等
 *
 * **UI構成:**
 * - ヘッダー: ページタイトル
 * - 左列: 支出登録フォーム + 合計表示
 * - 右列: 支出履歴一覧
 * - レスポンシブ: モバイルでは縦配置
 *
 * **ルーティング:**
 * - パス: /expenses
 * - React Router経由でアクセス
 *
 * @example
 * ```tsx
 * // 基本的な使用例
 * <Route path="/expenses" element={<ExpensePage />} />
 * ```
 *
 * @example
 * ```tsx
 * // 将来的な拡張例（初期フィルター付き）
 * <ExpensePage
 *   initialDateRange={{ startDate: '2024-01-01', endDate: '2024-12-31' }}
 *   initialCategoryFilter={['food', 'transport']}
 * />
 * ```
 */
export default function ExpensePage() {
  const [{ expenses, totalExpenseAmount }, { addExpense }] = useBudgetManager()

  return (
    <AppLayout maxWidth="lg">
      {/* ページヘッダー */}
      <Paper
        elevation={3}
        sx={{
          p: 3,
          mb: 4,
          backgroundColor: '#fff3e0', // 支出テーマ色（オレンジ系）
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: 'bold',
            color: '#e65100',
            textAlign: 'center',
            mb: 1,
          }}
        >
          支出管理
        </Typography>
        <Typography
          variant="body1"
          sx={{
            textAlign: 'center',
            color: '#bf360c',
          }}
        >
          支出の登録と履歴管理を行います
        </Typography>
      </Paper>

      {/* メインコンテンツ */}
      <Grid container spacing={4}>
        {/* 左列: 支出登録エリア */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Paper
            elevation={2}
            sx={{
              p: 3,
              mb: 3,
            }}
          >
            <Typography
              variant="h6"
              component="h2"
              sx={{
                mb: 3,
                fontWeight: 'bold',
                color: '#d84315',
              }}
            >
              新規支出登録
            </Typography>
            <ExpenseForm onSubmit={addExpense} />
          </Paper>

          {/* 支出合計表示 */}
          {totalExpenseAmount > 0 && (
            <Box sx={{ mt: 2 }}>
              <TotalExpenseDisplay totalAmount={totalExpenseAmount} />
            </Box>
          )}
        </Grid>

        {/* 右列: 支出履歴エリア */}
        <Grid size={{ xs: 12, md: 7 }}>
          <Paper
            elevation={2}
            sx={{
              p: 3,
            }}
          >
            <Typography
              variant="h6"
              component="h2"
              sx={{
                mb: 3,
                fontWeight: 'bold',
                color: '#d84315',
              }}
            >
              支出履歴
            </Typography>
            <ExpenseHistory expenses={expenses} />
          </Paper>
        </Grid>
      </Grid>

      {/* 将来的な拡張エリア（分析・グラフ等） */}
      {/* 
      <Paper elevation={2} sx={{ p: 3, mt: 4 }}>
        <Typography variant="h6" component="h2" sx={{ mb: 3 }}>
          支出分析
        </Typography>
        // グラフ・統計情報等の表示予定
      </Paper>
      */}
    </AppLayout>
  )
}
