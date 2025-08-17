/**
 * フォーム関連型定義
 *
 * react-hook-form + zodバリデーションで使用されるフォームデータ型を集約。
 * zodスキーマから生成される型安全な定義を提供します。
 */

import { z } from 'zod'
import {
  amountInputSchema,
  datePickerSchema,
  transactionFormSchema,
} from '@/lib/validation/schemas'

/**
 * 取引フォームデータ型定義
 *
 * react-hook-form のフォームデータ型として使用。
 * zodスキーマから自動生成される型安全な定義です。
 */
export type TransactionFormData = z.infer<typeof transactionFormSchema>

/**
 * 金額入力データ型定義
 *
 * AmountInputコンポーネント用の型定義。
 */
export type AmountInputData = z.infer<typeof amountInputSchema>

/**
 * 日付選択データ型定義
 *
 * DatePickerコンポーネント用の型定義。
 */
export type DatePickerData = z.infer<typeof datePickerSchema>