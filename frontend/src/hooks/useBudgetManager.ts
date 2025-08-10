import { useState } from 'react'

/** 支出データの型定義 */
export interface Expense {
  id: string
  amount: number
  timestamp: string
}

/** 収入データの型定義 */
export interface Income {
  id: string
  amount: number
  timestamp: string
}

/**
 * 収入・支出データと残高の状態管理を一元化するカスタムフック
 *
 * @returns タプル形式で[値オブジェクト, 操作関数オブジェクト]を返す
 *
 * @example
 * const [values, actions] = useBudgetManager();
 * actions.addExpense(1000, '2024-01-01');
 * console.log(values.balance);
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
