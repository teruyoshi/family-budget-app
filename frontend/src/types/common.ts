/**
 * 汎用型定義
 *
 * アプリケーション全体で使用される共通的な型定義を集約。
 * ビジネスロジックやコンポーネント間で再利用可能な基本型を提供します。
 */

/**
 * 基本エンティティ型
 *
 * ID と タイムスタンプを持つ基本的なデータ構造。
 * すべてのビジネスエンティティの基底型として使用します。
 */
export interface BaseEntity {
  /** 一意識別子 */
  id: string
  /** タイムスタンプ */
  timestamp: string
}

/**
 * 日付フォーマット型
 *
 * アプリケーション内で使用する日付表現形式。
 */
export type DateFormat = 'iso' | 'japanese'

/**
 * 通貨型
 *
 * 現在は日本円のみサポート。将来的な多通貨対応を想定した設計。
 */
export type Currency = 'JPY'

/**
 * 取引タイプ型
 *
 * 家計簿における取引の種別を表す。
 */
export type TransactionType = 'income' | 'expense'
