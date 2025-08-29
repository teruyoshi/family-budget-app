import { useState } from 'react'
import type { Expense, Income } from '@/types'

// 型エクスポート（_old ディレクトリ互換性のため）
export type { Expense, Income } from '@/types'

/**
 * 家計管理統合カスタムフック
 *
 * 収入・支出データと残高の状態管理を一元化し、家計簿アプリのコア機能を提供するビジネスロジックフック。
 * ReactのuseStateをベースとし、ローカルステートでのリアルタイム残高算出と履歴管理を実現します。
 *
 * @remarks
 * - **リアルタイム算出**: 支出・収入の追加に応じて自動で残高更新
 * - **日付フォーマット**: ISO 8601 → 日本語曜日付き形式へ変換
 * - **時系列順序**: 新しい記録を配列の先頭に配置（表示用）
 * - **ID生成**: Date.now()で一意性を保証（簡易実装）
 * - **単一責任**: データ操作と状態管理のみを担当
 * - **イミュータブル**: useStateでの状態更新は適切に実装
 *
 * @returns タプル形式で [values, actions] を返す
 * @returns values.expenses - 支出記録配列（新しい順）
 * @returns values.incomes - 収入記録配列（新しい順）
 * @returns values.balance - 現在の残高（収入合計 - 支出合計）
 * @returns values.totalExpenseAmount - 支出合計金額
 * @returns values.totalIncomeAmount - 収入合計金額
 * @returns actions.addExpense - 新しい支出記録を追加する関数
 * @returns actions.addIncome - 新しい収入記録を追加する関数
 *
 * @example
 * ```tsx
 * // 基本的な使用例（メインアプリ）
 * const [budgetData, budgetActions] = useBudgetManager()
 *
 * // 支出追加
 * budgetActions.addExpense(1500, '2024-08-12')
 *
 * // 収入追加
 * budgetActions.addIncome(250000, '2024-08-01')
 *
 * // 残高確認
 * console.log('現在の残高:', budgetData.balance) // 248500
 * ```
 *
 * @example
 * ```tsx
 * // コンポーネントでの実用例
 * function BudgetApp() {
 *   const [values, actions] = useBudgetManager()
 *
 *   return (
 *     <Container>
 *       <BalanceDisplay balance={values.balance} />
 *       <ExpenseForm onSubmit={actions.addExpense} />
 *       <IncomeForm onSubmit={actions.addIncome} />
 *       <ExpenseHistory expenses={values.expenses} />
 *       <IncomeHistory incomes={values.incomes} />
 *     </Container>
 *   )
 * }
 * ```
 *
 * @example
 * ```tsx
 * // 統計情報の活用例
 * const [values] = useBudgetManager()
 *
 * const monthlyExpense = values.totalExpenseAmount
 * const monthlyIncome = values.totalIncomeAmount
 * const savingsRate = ((monthlyIncome - monthlyExpense) / monthlyIncome) * 100
 *
 * return (
 *   <Stack spacing={2}>
 *     <TotalExpenseDisplay expense={values.totalExpenseAmount} />
 *     <TotalIncomeDisplay income={values.totalIncomeAmount} />
 *     <Typography>savings rate: {savingsRate.toFixed(1)}%</Typography>
 *   </Stack>
 * )
 * ```
 */
export function useBudgetManager() {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [incomes, setIncomes] = useState<Income[]>([])

  /**
   * 新規支出登録ハンドラー
   * @param amount 支出金額
   * @param date 支出日付（YYYY-MM-DD形式）
   */
  const addExpense = (amount: number, date: string) => {
    // 指定された日付を日本語フォーマットに変換
    const selectedDate = new Date(date)
    const dateStr = selectedDate
      .toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        weekday: 'short',
      })
      .replace(/(\d{4})\/(\d{2})\/(\d{2})\s(.+)/, '$1/$2/$3($4)')

    const newExpense: Expense = {
      id: Date.now().toString(),
      amount,
      timestamp: dateStr,
    }
    setExpenses((prev) => [newExpense, ...prev]) // 最新を先頭に表示
  }

  /**
   * 新規収入登録ハンドラー
   * @param amount 収入金額
   * @param date 収入日付（YYYY-MM-DD形式）
   */
  const addIncome = (amount: number, date: string) => {
    // 指定された日付を日本語フォーマットに変換
    const selectedDate = new Date(date)
    const dateStr = selectedDate
      .toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        weekday: 'short',
      })
      .replace(/(\d{4})\/(\d{2})\/(\d{2})\s(.+)/, '$1/$2/$3($4)')

    const newIncome: Income = {
      id: Date.now().toString(),
      amount,
      timestamp: dateStr,
    }
    setIncomes((prev) => [newIncome, ...prev]) // 最新を先頭に表示
  }

  // 合計支出額を計算（リアルタイム更新）
  const totalExpenseAmount = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  )

  // 合計収入額を計算（リアルタイム更新）
  const totalIncomeAmount = incomes.reduce(
    (sum, income) => sum + income.amount,
    0
  )

  // 現在の残高を計算（収入 - 支出）
  const balance = totalIncomeAmount - totalExpenseAmount

  const values = {
    expenses,
    incomes,
    balance,
    totalExpenseAmount,
    totalIncomeAmount,
  }

  const actions = {
    addExpense,
    addIncome,
  }

  return [values, actions] as const
}
