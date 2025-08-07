import { useState } from 'react'

/**
 * 支出データの型定義
 * アプリケーション全体で使用される支出レコードの構造を定義
 */
export interface Expense {
  id: string // 一意識別子（タイムスタンプベース）
  amount: number // 支出金額（正の数値）
  timestamp: string // 登録日時（日本時間フォーマット）
}

/**
 * 収入データの型定義
 * アプリケーション全体で使用される収入レコードの構造を定義
 */
export interface Income {
  id: string // 一意識別子（タイムスタンプベース）
  amount: number // 収入金額（正の数値）
  timestamp: string // 登録日時（日本時間フォーマット）
}

/**
 * 統合家計簿管理カスタムフック
 *
 * 収入・支出データと残高の状態管理、各種登録処理を一元化したフックです。
 * 従来の useExpenseManager と useIncomeManager を統合し、より効率的な状態管理を実現します。
 *
 * @returns [値オブジェクト, 操作関数オブジェクト] の形式で返す
 */
export function useBudgetManager() {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [incomes, setIncomes] = useState<Income[]>([])

  /**
   * 新規支出登録ハンドラー
   * 新しい支出をリストの先頭に追加します
   *
   * @param amount 支出金額
   */
  const addExpense = (amount: number) => {
    const newExpense: Expense = {
      id: Date.now().toString(),
      amount,
      timestamp: new Date().toLocaleString('ja-JP'),
    }
    setExpenses((prev) => [newExpense, ...prev]) // 最新を先頭に表示
  }

  /**
   * 新規収入登録ハンドラー
   * 新しい収入をリストの先頭に追加します
   *
   * @param amount 収入金額
   */
  const addIncome = (amount: number) => {
    const newIncome: Income = {
      id: Date.now().toString(),
      amount,
      timestamp: new Date().toLocaleString('ja-JP'),
    }
    setIncomes((prev) => [newIncome, ...prev]) // 最新を先頭に表示
  }

  // 合計支出額の計算（リアルタイム更新）
  const totalExpenseAmount = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  )

  // 合計収入額の計算（リアルタイム更新）
  const totalIncomeAmount = incomes.reduce(
    (sum, income) => sum + income.amount,
    0
  )

  // 実際の残高は収入から支出を引いたもの
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