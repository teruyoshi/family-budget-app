import { Container, Paper, Grid, Typography, Box } from '@mui/material'
import { IncomeForm, TotalIncomeDisplay } from '@/features/income'
import { IncomeHistory } from '@/features/history'
import { useBudgetManager } from '@/hooks'

/**
 * 収入管理ページコンポーネントのProps型定義
 *
 * 将来的な拡張を考慮した型定義（フィルター設定、期間指定等）
 */
export interface IncomePageProps {
  /** 初期表示する期間フィルター（将来実装） */
  initialDateRange?: {
    startDate?: string
    endDate?: string
  }
  /** 収入源フィルター（将来実装） */
  initialSourceFilter?: string[]
}

/**
 * 収入管理専用ページコンポーネント
 *
 * 収入の登録・履歴表示・分析に特化したページです。
 * ダッシュボードから収入機能を分離し、より詳細な収入管理機能を提供します。
 *
 * @remarks
 * **主な機能:**
 * - 収入の新規登録（IncomeForm）
 * - 収入合計金額の表示（TotalIncomeDisplay）
 * - 収入履歴の一覧表示（IncomeHistory）
 * - 将来的な拡張: 収入源フィルター、期間検索、グラフ表示等
 *
 * **UI構成:**
 * - ヘッダー: ページタイトル
 * - 左列: 収入登録フォーム + 合計表示
 * - 右列: 収入履歴一覧
 * - レスポンシブ: モバイルでは縦配置
 *
 * **デザインテーマ:**
 * - カラー: グリーン系（収入のポジティブイメージ）
 * - レイアウト: ExpensePageと統一感のある構成
 *
 * **ルーティング:**
 * - パス: /income
 * - React Router経由でアクセス
 *
 * @example
 * ```tsx
 * // 基本的な使用例
 * <Route path="/income" element={<IncomePage />} />
 * ```
 *
 * @example
 * ```tsx
 * // 将来的な拡張例（初期フィルター付き）
 * <IncomePage 
 *   initialDateRange={{ startDate: '2024-01-01', endDate: '2024-12-31' }}
 *   initialSourceFilter={['salary', 'bonus', 'investment']}
 * />
 * ```
 */
export default function IncomePage(props: IncomePageProps = {}) {
  const [{ incomes, totalIncomeAmount }, { addIncome }] = useBudgetManager()

  return (
    <Container
      maxWidth="lg"
      sx={{
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        py: 4,
      }}
    >
      {/* ページヘッダー */}
      <Paper
        elevation={3}
        sx={{
          p: 3,
          mb: 4,
          backgroundColor: '#e8f5e8', // 収入テーマ色（グリーン系）
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: 'bold',
            color: '#2e7d32',
            textAlign: 'center',
            mb: 1,
          }}
        >
          収入管理
        </Typography>
        <Typography
          variant="body1"
          sx={{
            textAlign: 'center',
            color: '#1b5e20',
          }}
        >
          収入の登録と履歴管理を行います
        </Typography>
      </Paper>

      {/* メインコンテンツ */}
      <Grid container spacing={4}>
        {/* 左列: 収入登録エリア */}
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
                color: '#388e3c',
              }}
            >
              新規収入登録
            </Typography>
            <IncomeForm onSubmit={addIncome} />
          </Paper>

          {/* 収入合計表示 */}
          {totalIncomeAmount > 0 && (
            <Box sx={{ mt: 2 }}>
              <TotalIncomeDisplay totalAmount={totalIncomeAmount} />
            </Box>
          )}
        </Grid>

        {/* 右列: 収入履歴エリア */}
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
                color: '#388e3c',
              }}
            >
              収入履歴
            </Typography>
            <IncomeHistory incomes={incomes} />
          </Paper>
        </Grid>
      </Grid>

      {/* 将来的な拡張エリア（分析・グラフ等） */}
      {/* 
      <Paper elevation={2} sx={{ p: 3, mt: 4 }}>
        <Typography variant="h6" component="h2" sx={{ mb: 3 }}>
          収入分析
        </Typography>
        // グラフ・統計情報等の表示予定
        // - 月別収入推移
        // - 収入源別分析
        // - 予算達成率等
      </Paper>
      */}
    </Container>
  )
}