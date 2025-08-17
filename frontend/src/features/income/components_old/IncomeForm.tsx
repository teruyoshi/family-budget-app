import { TransactionForm } from '@/components/common_old'
import { type TransactionFormData } from '@/lib/validation/schemas'

/**
 * 収入登録フォームコンポーネントのProps型定義
 *
 * react-hook-form対応で、TransactionFormDataを受け取る形式に変更。
 */
export interface IncomeFormProps {
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
 * TransactionFormを使用した収入登録フォームコンポーネント
 *
 * react-hook-form + zodバリデーション対応の収入入力フォーム。
 * TransactionFormをラップし、収入特有のUI設定（緑色テーマ）を適用。
 *
 * @remarks
 * - **バリデーション**: zodスキーマによる金額・日付の自動検証
 * - **日付ロジック**: カスタム日付未使用時は今日の日付を自動適用
 * - **UI**: サクセス色（緑系）テーマで収入を視覚的に区別
 * - **互換性**: 既存のonSubmit(amount, date)形式を維持
 *
 * @example
 * ```tsx
 * // 基本的な使用例
 * <IncomeForm
 *   onSubmit={(amount, date) => addIncome(amount, date)}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // 初期値を指定した使用例（給与入力）
 * <IncomeForm
 *   defaultValues={{ amount: 250000, useCustomDate: true }}
 *   onSubmit={(amount, date) => {
 *     addIncome({
 *       amount,
 *       date,
 *       description: '給与収入',
 *       source: 'salary'
 *     })
 *   }}
 * />
 * ```
 */
export default function IncomeForm({
  onSubmit,
  defaultValues,
}: IncomeFormProps) {
  const handleSubmit = (data: TransactionFormData) => {
    // カスタム日付使用時はdata.date、未使用時は今日の日付
    const finalDate = data.useCustomDate
      ? data.date
      : new Date().toLocaleDateString('sv-SE', { timeZone: 'Asia/Tokyo' })

    onSubmit?.(data.amount, finalDate)
  }

  return (
    <TransactionForm
      placeholder="収入金額を入力"
      buttonText="収入を登録"
      buttonColor="success"
      datePickerLabel="収入日付"
      defaultValues={defaultValues}
      onSubmit={handleSubmit}
    />
  )
}
