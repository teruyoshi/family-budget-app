/**
 * ページコンポーネント用の型定義
 *
 * 各ページコンポーネントで使用する共通的な型定義を管理します。
 * 将来的な拡張やリファクタリング時の型安全性を確保します。
 */

/**
 * 基本ページコンポーネントのProps型
 *
 * 全ページコンポーネントで共通して使用される可能性のあるプロパティ。
 * 将来的なレイアウト統一や共通機能追加時の拡張基盤として定義。
 */
export interface BasePageProps {
  /** ページのタイトル（将来的なヘルメット対応用） */
  title?: string
  /** ページの説明（メタ情報用） */
  description?: string
  /** クラス名（スタイリング拡張用） */
  className?: string
}

/**
 * 日付範囲フィルター用の型定義
 *
 * HistoryPage、ExpensePage、IncomePageで共通使用される
 * 期間フィルター機能の型定義。
 */
export interface DateRangeFilter {
  /** 開始日（YYYY-MM-DD形式） */
  startDate?: string
  /** 終了日（YYYY-MM-DD形式） */
  endDate?: string
}

/**
 * ページ表示設定用の型定義
 *
 * 各ページで共通して使用される表示設定オプション。
 */
export interface PageDisplaySettings {
  /** 1ページあたりの表示件数 */
  itemsPerPage?: number
  /** ソート順序 */
  sortOrder?: 'asc' | 'desc'
  /** ソート対象フィールド */
  sortBy?: string
}

/**
 * フィルター設定用の基本型
 *
 * 各ページで使用されるフィルター機能の基盤型定義。
 */
export interface BaseFilter {
  /** フィルター名 */
  name: string
  /** フィルター値 */
  value: string | number | boolean
  /** フィルターが有効かどうか */
  enabled: boolean
}

/**
 * 支出ページ専用の拡張フィルター型
 */
export interface ExpenseFilter extends BaseFilter {
  /** 支出カテゴリフィルター */
  categories?: string[]
  /** 金額範囲フィルター */
  amountRange?: {
    min?: number
    max?: number
  }
}

/**
 * 収入ページ専用の拡張フィルター型
 */
export interface IncomeFilter extends BaseFilter {
  /** 収入源フィルター */
  sources?: string[]
  /** 金額範囲フィルター */
  amountRange?: {
    min?: number
    max?: number
  }
}

/**
 * ページナビゲーション用の型定義
 *
 * 将来的なページネーション機能実装時の型安全性確保。
 */
export interface PageNavigation {
  /** 現在のページ番号 */
  currentPage: number
  /** 総ページ数 */
  totalPages: number
  /** 総アイテム数 */
  totalItems: number
  /** ページサイズ */
  pageSize: number
}

/**
 * ページ状態管理用の型定義
 *
 * 各ページで管理される状態の統一型定義。
 */
export interface PageState {
  /** ローディング状態 */
  isLoading: boolean
  /** エラー状態 */
  error?: string | null
  /** データ最終更新時刻 */
  lastUpdated?: Date
}

/**
 * 設定ページ用の設定カテゴリ型
 */
export type SettingsCategory = 'general' | 'appearance' | 'data' | 'account' | 'notifications'

/**
 * ページルート情報との連携型
 *
 * routes.ts で定義されたAppRouteとの型安全な連携を提供。
 */
export interface PageRouteInfo {
  /** ルートパス */
  path: string
  /** ページタイトル */
  title: string
  /** ページの説明 */
  description: string
  /** ナビゲーション表示対象かどうか */
  showInNavigation: boolean
}