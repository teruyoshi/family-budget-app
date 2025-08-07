import {
  Container,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Chip,
} from '@mui/material'
import { BalanceDisplay } from '@/features/balance'
import { ExpenseForm, TotalExpenseDisplay } from '@/features/expenses'
import { useExpenseManager } from '@/hooks'

/**
 * メインアプリケーションコンポーネント
 *
 * 家計簿アプリの中央ハブとして機能し、支出の登録・表示・集計を統合管理します。
 * GitHub Pages デモ版として、インメモリストレージを使用しています。
 *
 * 主な機能:
 * - 支出データの状態管理（useState）
 * - 新規支出の追加処理
 * - 支出履歴の表示（降順ソート）
 * - 合計支出額の自動計算
 * - レスポンシブデザイン（MUI Container + Paper）
 *
 * アーキテクチャ:
 * - Container Component: アプリケーション状態を管理
 * - Feature-based Structure: expenses機能を統合
 * - Material Design: 一貫したUI/UX
 */
function App() {
  const [{ expenses, balance, totalAmount }, { addExpense }] = useExpenseManager(10000)

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
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{
            textAlign: 'center',
            fontWeight: 'bold',
            mb: 3,
          }}
        >
          家計簿アプリ
        </Typography>

        <BalanceDisplay balance={balance} />

        <ExpenseForm onSubmit={addExpense} />

        {totalAmount > 0 && <TotalExpenseDisplay totalAmount={totalAmount} />}
      </Paper>

      {expenses.length > 0 && (
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography
            variant="h5"
            component="h2"
            gutterBottom
            sx={{ mb: 2, fontWeight: 'bold' }}
          >
            支出履歴
          </Typography>
          <List>
            {expenses.map((expense) => (
              <ListItem
                key={expense.id}
                sx={{
                  border: 1,
                  borderColor: 'divider',
                  borderRadius: 1,
                  mb: 1,
                }}
              >
                <ListItemText
                  primary={
                    <Typography variant="h6" color="text.primary">
                      ¥{expense.amount.toLocaleString()}
                    </Typography>
                  }
                  secondary={expense.timestamp}
                />
                <Chip label="支出" color="warning" size="small" />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Container>
  )
}

export default App
