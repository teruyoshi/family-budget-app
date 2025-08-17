import { Box, Chip, Grid, Paper, Typography } from '@mui/material'
import AppLayout from '@/components/layout/AppLayout'
import { ExpenseHistory, IncomeHistory } from '@/features/history'
import { useBudgetManager } from '@/hooks'
import { formatMoney } from '@/lib/format'

/**
 * 履歴表示ページコンポーネントのProps型定義
 *
 * 将来的な拡張を考慮した型定義（フィルター設定、期間指定等）
 */
export interface HistoryPageProps {
  /** 初期表示する期間フィルター（将来実装） */
  initialDateRange?: {
    startDate?: string
    endDate?: string
  }
  /** 初期表示タブ（将来実装） */
  initialTab?: 'all' | 'expenses' | 'incomes'
}

/**
 * 履歴表示専用ページコンポーネント
 *
 * 全ての取引履歴（収入・支出）を統合的に表示・管理するページです。
 * ダッシュボードから履歴表示機能を分離し、より詳細な履歴分析機能を提供します。
 *
 * @remarks
 * **主な機能:**
 * - 収入・支出の統合履歴表示
 * - 取引合計・収支バランスの表示
 * - 並列表示による比較分析
 * - 将来的な拡張: 期間フィルター、検索機能、エクスポート等
 *
 * **UI構成:**
 * - ヘッダー: ページタイトル + 統計サマリー
 * - 左列: 支出履歴
 * - 右列: 収入履歴
 * - レスポンシブ: モバイルでは縦配置
 *
 * **デザインテーマ:**
 * - カラー: ニュートラル系（情報表示重視）
 * - レイアウト: 比較分析しやすい並列表示
 *
 * **ルーティング:**
 * - パス: /history
 * - React Router経由でアクセス
 *
 * @example
 * ```tsx
 * // 基本的な使用例
 * <Route path="/history" element={<HistoryPage />} />
 * ```
 *
 * @example
 * ```tsx
 * // 将来的な拡張例（初期設定付き）
 * <HistoryPage
 *   initialDateRange={{ startDate: '2024-01-01', endDate: '2024-12-31' }}
 *   initialTab="expenses"
 * />
 * ```
 */
export default function HistoryPage() {
  const [
    { expenses, incomes, balance, totalExpenseAmount, totalIncomeAmount },
  ] = useBudgetManager()

  const totalTransactions = expenses.length + incomes.length

  return (
    <AppLayout maxWidth="lg">
      {/* ページヘッダー */}
      <Paper
        elevation={3}
        sx={{
          p: 3,
          mb: 4,
          backgroundColor: '#f3e5f5', // 履歴テーマ色（パープル系）
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: 'bold',
            color: '#6a1b9a',
            textAlign: 'center',
            mb: 2,
          }}
        >
          取引履歴
        </Typography>
        <Typography
          variant="body1"
          sx={{
            textAlign: 'center',
            color: '#4a148c',
            mb: 3,
          }}
        >
          全ての収入・支出履歴を一覧表示します
        </Typography>

        {/* 統計サマリー */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 3,
            flexWrap: 'wrap',
          }}
        >
          <Chip
            label={`総取引数: ${totalTransactions}件`}
            variant="outlined"
            sx={{
              fontWeight: 'bold',
              borderColor: '#6a1b9a',
              color: '#6a1b9a',
            }}
          />
          <Chip
            label={`総収入: ${formatMoney(totalIncomeAmount)}円`}
            variant="outlined"
            sx={{
              fontWeight: 'bold',
              borderColor: '#388e3c',
              color: '#388e3c',
            }}
          />
          <Chip
            label={`総支出: ${formatMoney(totalExpenseAmount)}円`}
            variant="outlined"
            sx={{
              fontWeight: 'bold',
              borderColor: '#d84315',
              color: '#d84315',
            }}
          />
          <Chip
            label={`残高: ${formatMoney(balance)}円`}
            variant="filled"
            sx={{
              fontWeight: 'bold',
              backgroundColor: balance >= 0 ? '#e8f5e8' : '#ffebee',
              color: balance >= 0 ? '#2e7d32' : '#c62828',
            }}
          />
        </Box>
      </Paper>

      {/* メインコンテンツ */}
      <Grid container spacing={4}>
        {/* 左列: 支出履歴エリア */}
        <Grid size={{ xs: 12, md: 6 }}>
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
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              支出履歴
              <Chip
                label={`${expenses.length}件`}
                size="small"
                sx={{
                  backgroundColor: '#fff3e0',
                  color: '#e65100',
                  fontWeight: 'bold',
                }}
              />
            </Typography>
            <ExpenseHistory expenses={expenses} />
          </Paper>
        </Grid>

        {/* 右列: 収入履歴エリア */}
        <Grid size={{ xs: 12, md: 6 }}>
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
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              収入履歴
              <Chip
                label={`${incomes.length}件`}
                size="small"
                sx={{
                  backgroundColor: '#e8f5e8',
                  color: '#2e7d32',
                  fontWeight: 'bold',
                }}
              />
            </Typography>
            <IncomeHistory incomes={incomes} />
          </Paper>
        </Grid>
      </Grid>

      {/* 将来的な拡張エリア（フィルター・検索・エクスポート等） */}
      {/* 
      <Paper elevation={2} sx={{ p: 3, mt: 4 }}>
        <Typography variant="h6" component="h2" sx={{ mb: 3 }}>
          履歴分析・操作
        </Typography>
        // 以下の機能を追加予定:
        // - 期間フィルター
        // - カテゴリ・収入源フィルター
        // - キーワード検索
        // - CSV/PDFエクスポート
        // - 月次・年次サマリー
        // - グラフ・チャート表示
      </Paper>
      */}
    </AppLayout>
  )
}
