/**
 * ページコンポーネント用バレルエクスポート
 *
 * 各ページコンポーネントを統一的にエクスポートし、
 * インポート文を簡潔化するためのエントリーポイントです。
 */

export { default as DashboardPage } from './DashboardPage'
export { default as ExpensePage } from './ExpensePage'
export { default as IncomePage } from './IncomePage'
export { default as HistoryPage } from './HistoryPage'
export { default as SettingsPage } from './SettingsPage'

export type { DashboardPageProps } from './DashboardPage'
export type { ExpensePageProps } from './ExpensePage'
export type { IncomePageProps } from './IncomePage'
export type { HistoryPageProps } from './HistoryPage'
export type { SettingsPageProps } from './SettingsPage'
