/**
 * フォームバリデーション用zodスキーマ定義
 *
 * react-hook-form + zodによる型安全なフォームバリデーション機能を提供。
 * 金額・日付・取引データの包括的な検証ロジックを統一管理します。
 */

import { z } from 'zod'

/**
 * 金額入力バリデーションスキーマ
 *
 * @remarks
 * - 正の数値のみ許可（ゼロ・負値は無効）
 * - MAX_SAFE_INTEGER範囲内チェック（精度保証）
 * - 小数点以下は整数に丸め
 */
export const amountSchema = z
  .number({
    message: '有効な数値を入力してください',
  })
  .positive('金額は正の数値を入力してください')
  .max(
    Number.MAX_SAFE_INTEGER,
    `金額は${Number.MAX_SAFE_INTEGER.toLocaleString()}円以下で入力してください`
  )
  .transform((val) => Math.round(val)) // 小数点以下切り捨て

/**
 * 日付バリデーションスキーマ
 *
 * @remarks
 * - YYYY-MM-DD形式の文字列
 * - 過去日付も許可（履歴登録対応）
 * - 未来日付制限は設けない（予定登録対応）
 */
export const dateSchema = z
  .string({
    message: '日付を選択してください',
  })
  .regex(/^\d{4}-\d{2}-\d{2}$/, '日付はYYYY-MM-DD形式で入力してください')
  .refine((dateStr) => {
    const date = new Date(dateStr)
    return (
      !isNaN(date.getTime()) && dateStr === date.toISOString().split('T')[0]
    )
  }, '有効な日付を入力してください')

/**
 * 取引フォームバリデーションスキーマ
 *
 * TransactionForm、ExpenseForm、IncomeForm共通のバリデーションルール。
 * 金額・日付・カスタム日付使用フラグの統合検証を提供します。
 */
export const transactionFormSchema = z.object({
  /**
   * 取引金額（正の数値、MAX_SAFE_INTEGER以下）
   */
  amount: amountSchema,

  /**
   * 取引日付（YYYY-MM-DD形式）
   */
  date: dateSchema,

  /**
   * カスタム日付使用フラグ
   * true: ユーザー指定日付使用
   * false: 今日の日付使用
   */
  useCustomDate: z.boolean(),
})

/**
 * 金額入力フィールド用スキーマ
 *
 * AmountInputコンポーネント単体でのバリデーション用。
 */
export const amountInputSchema = z.object({
  amount: amountSchema,
})

/**
 * 日付選択フィールド用スキーマ
 *
 * DatePickerコンポーネント単体でのバリデーション用。
 */
export const datePickerSchema = z.object({
  date: dateSchema,
})

/**
 * 取引フォームデータ型
 * 
 * transactionFormSchemaから推論される型定義
 */
export type TransactionFormData = z.infer<typeof transactionFormSchema>

/**
 * 金額入力データ型
 */
export type AmountInputData = z.infer<typeof amountInputSchema>

/**
 * 日付選択データ型
 */
export type DatePickerData = z.infer<typeof datePickerSchema>
