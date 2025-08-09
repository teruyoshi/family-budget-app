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
 * 統合家計簿管理カスタムフック
 *
 * 収入・支出データと残高の状態管理を一元化します。
 * タプル形式で[値オブジェクト, 操作関数オブジェクト]を返します。
 *
 * @group カスタムフック
 * @returns 値オブジェクト（expenses, incomes, balance等）と操作関数（addExpense, addIncome）のタプル
 *
 * @example
 * ```typescript
 * const [values, actions] = useBudgetManager();
 *
 * // 支出登録
 * actions.addExpense(1000, '2024-01-01');
 *
 * // 収入登録
 * actions.addIncome(50000, '2024-01-01');
 *
 * // 残高確認
 * console.log(values.balance); // 49000
 * ```
 */
export function useBudgetManager() {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [incomes, setIncomes] = useState<Income[]>([])

  /**
   * 新規支出登録ハンドラー
   * 新しい支出をリストの先頭に追加し、日付を日本語フォーマットに変換します
   *
   * @param {number} amount - 支出金額（正の数値）
   * @param {string} date - 支出日付（YYYY-MM-DD形式）
   *
   * @example
   * ```typescript
   * addExpense(1500, '2024-01-15'); // 1500円の支出を登録
   * ```
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
   * 新しい収入をリストの先頭に追加し、日付を日本語フォーマットに変換します
   *
   * @param {number} amount - 収入金額（正の数値）
   * @param {string} date - 収入日付（YYYY-MM-DD形式）
   *
   * @example
   * ```typescript
   * addIncome(50000, '2024-01-01'); // 50000円の収入を登録
   * ```
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
