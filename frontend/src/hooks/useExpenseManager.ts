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
 * 支出管理カスタムフック
 * 
 * 支出データと残金の状態管理、支出登録処理を提供します。
 * App.tsxから分離し、再利用可能な形で支出管理機能をカプセル化しています。
 * 
 * @param initialBalance 初期残金（デフォルト: 10000）
 * @returns 支出データ、残金、支出登録関数、合計支出額を含むオブジェクト
 */
export function useExpenseManager(initialBalance: number = 10000) {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [balance, setBalance] = useState<number>(initialBalance)

  /**
   * 新規支出登録ハンドラー
   * 新しい支出をリストの先頭に追加し、残金から支出分を減らします
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
    setBalance((prev) => prev - amount) // 残金から支出分を減らす
  }

  // 合計支出額の計算（リアルタイム更新）
  const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0)

  return {
    expenses,
    balance,
    addExpense,
    totalAmount,
  }
}