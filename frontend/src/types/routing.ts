/**
 * ルーティング関連型定義
 *
 * React Routerとアプリケーションナビゲーションで使用される型定義を集約。
 * 型安全なルーティングとナビゲーション管理を提供します。
 */

import { type ComponentType, type ReactElement } from 'react'
import type { SvgIconProps } from '@mui/material'

/**
 * アプリケーション内の利用可能なルートパス
 *
 * @remarks
 * - 型安全なナビゲーションとルート管理を提供
 * - 全ページコンポーネント実装完了済み
 * - TypeScript の文字列リテラル型による厳密なパス管理
 */
export type AppRoute =
  | '/' // ダッシュボード（ホーム）- 実装済み
  | '/expenses' // 支出管理ページ - 実装済み
  | '/income' // 収入管理ページ - 実装済み
  | '/history' // 履歴表示ページ - 実装済み
  | '/settings' // 設定ページ - 実装済み（基盤のみ）

/**
 * ルート情報の型定義
 *
 * ルート設定、メタ情報、コンポーネントを一元管理する構造化されたルート情報。
 * コード分割とナビゲーション設定を統合した設計となっています。
 */
export interface RouteInfo {
  /** ルートパス */
  path: AppRoute | '*'
  /** ページタイトル */
  title: string
  /** ページの説明 */
  description: string
  /** レンダリングするコンポーネント */
  element: ReactElement
  /** ナビゲーションメニューでの表示有無 */
  showInNavigation: boolean
  /** ナビゲーション用アイコン */
  icon?: ComponentType<SvgIconProps>
}
