import { TransactionForm } from '@/components/common_old'
import { type TransactionFormData } from '@/lib/validation/schemas'

/**
 * 支出登録フォームコンポーネントのProps型定義
 *
 * react-hook-form対応で、TransactionFormDataを受け取る形式に変更。
 */
export interface ExpenseFormProps {
  /**
   * フォーム送信時のコールバック関数
   * @param amount - バリデーション済み金額
   * @param date - 最終的な日付（カスタム日付使用時はdata.date、未使用時は今日の日付）
   */
  onSubmit?: (amount: number, date: string) => void

  /**
   * フォームの初期値（任意）
   * @defaultValue { amount: 0, date: 今日の日付, useCustomDate: false }
   */
  defaultValues?: Partial<TransactionFormData>
}

/**
 * TransactionFormを使用した支出登録フォームコンポーネント
 *
 * react-hook-form + zodバリデーション対応の支出入力フォーム。
 * TransactionFormをラップし、支出特有のUI設定（赤色テーマ）を適用。
 *
 * @remarks
 * - **バリデーション**: zodスキーマによる金額・日付の自動検証
 * - **日付ロジック**: カスタム日付未使用時は今日の日付を自動適用
 * - **UI**: エラー色（赤系）テーマで支出を視覚的に区別
 * - **互換性**: 既存のonSubmit(amount, date)形式を維持
 *
 * @example
 * ```tsx
 * // 基本的な使用例
 * <ExpenseForm
 *   onSubmit={(amount, date) => addExpense(amount, date)}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // 初期値を指定した使用例
 * <ExpenseForm
 *   defaultValues={{ amount: 3000, useCustomDate: true }}
 *   onSubmit={(amount, date) => {
 *     addExpense({
 *       amount,
 *       date,
 *       description: 'ランチ代',
 *       category: 'food'
 *     })
 *   }}
 * />
 * ```
 */
export default function ExpenseForm({
  onSubmit,
  defaultValues,
}: ExpenseFormProps) {
  const handleSubmit = (data: TransactionFormData) => {
    // カスタム日付使用時はdata.date、未使用時は今日の日付
    const finalDate = data.useCustomDate
      ? data.date
      : new Date().toLocaleDateString('sv-SE', { timeZone: 'Asia/Tokyo' })

    onSubmit?.(data.amount, finalDate)
  }

  return (
    <TransactionForm
      placeholder="支出金額を入力"
      buttonText="支出を登録"
      buttonColor="error"
      datePickerLabel="支出日付"
      defaultValues={defaultValues}
      onSubmit={handleSubmit}
    />
  )
}
