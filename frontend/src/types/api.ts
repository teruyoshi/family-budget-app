/**
 * API関連型定義
 *
 * 将来的なバックエンドAPI連携に備えた型定義を集約。
 * 現在はフロントエンドのみの実装ですが、拡張性を考慮した設計です。
 */

/**
 * API レスポンス基本型
 *
 * 標準的なAPIレスポンス構造を定義。
 */
export interface ApiResponse<T = unknown> {
  /** レスポンスデータ */
  data: T
  /** 成功フラグ */
  success: boolean
  /** エラーメッセージ（エラー時のみ） */
  message?: string
}

/**
 * API エラーレスポンス型
 *
 * エラー時のレスポンス構造を定義。
 */
export interface ApiError {
  /** エラーコード */
  code: string
  /** エラーメッセージ */
  message: string
  /** 詳細情報（オプション） */
  details?: unknown
}