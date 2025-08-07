import { useState } from 'react'

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
 * 収入管理カスタムフック
 *
 * 収入データと残金の状態管理、収入登録処理を提供します。
 * 支出管理と対になる機能として、再利用可能な形で収入管理機能をカプセル化しています。
 *
 * @param initialBalance 初期残金（デフォルト: 0）
 * @returns [値オブジェクト, 操作関数オブジェクト] の形式で返す
 */
export function useIncomeManager(initialBalance: number = 0) {
  const [incomes, setIncomes] = useState<Income[]>([])
  const [balance, setBalance] = useState<number>(initialBalance)

  /**
   * 新規収入登録ハンドラー
   * 新しい収入をリストの先頭に追加し、残金に収入分を追加します
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
    setBalance((prev) => prev + amount) // 残金に収入分を追加
  }

  // 合計収入額の計算（リアルタイム更新）
  const totalAmount = incomes.reduce((sum, income) => sum + income.amount, 0)

  const values = {
    incomes,
    balance,
    totalAmount,
  }

  const actions = {
    addIncome,
  }

  return [values, actions] as const
}
