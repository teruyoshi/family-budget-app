import { forwardRef, type ReactNode } from 'react'
import { Box, Fade, Slide, useMediaQuery, useTheme } from '@mui/material'

/**
 * ページトランジションコンポーネントのProps型定義
 */
export interface PageTransitionProps {
  /** アニメーション対象の子要素 */
  children: ReactNode
  /** トランジションタイプ */
  type?: 'fade' | 'slide' | 'none'
  /** アニメーション時間（ミリ秒） */
  duration?: number
  /** スライド方向（type='slide'の場合） */
  direction?: 'left' | 'right' | 'up' | 'down'
  /** トランジション有効フラグ */
  in?: boolean
  /** カスタムイージング関数 */
  easing?: string
  /** 初期レンダリング時にもアニメーションを実行するか */
  appear?: boolean
  /** 要素がマウントされる際にアニメーションを実行するか */
  mountOnEnter?: boolean
  /** 要素がアンマウントされる際にアニメーションを実行するか */
  unmountOnExit?: boolean
  /** ルートの変更を識別するためのキー */
  locationKey?: string
  /** 追加のTransitionProps */
  transitionProps?: Record<string, unknown>
}

/**
 * ページ間遷移用のトランジションコンポーネント
 *
 * React Router のページ切り替え時にスムーズなアニメーション効果を提供します。
 * MUI の Transition コンポーネントを使用して、設定可能な遷移効果を実現。
 *
 * @remarks
 * **主な機能:**
 * - フェードイン/アウト効果
 * - スライドトランジション（上下左右対応）
 * - カスタマイズ可能なアニメーション時間・イージング
 * - SSR対応（安全なメディアクエリ処理）
 * - アクセシビリティ対応（prefers-reduced-motion 考慮）
 * - マウント・アンマウント制御（appear, mountOnEnter, unmountOnExit）
 * - ルーティング統合（locationKey サポート）
 *
 * **アニメーションタイプ:**
 * - fade: フェードイン/アウト（デフォルト）
 * - slide: スライド遷移
 * - none: アニメーション無し（パフォーマンス重視）
 *
 * **使用場面:**
 * - ページ間遷移の品質向上
 * - ナビゲーション操作の視覚的フィードバック
 * - ユーザーエクスペリエンス向上
 *
 * @example
 * ```tsx
 * // 基本的なフェードトランジション
 * <PageTransition>
 *   <YourPageContent />
 * </PageTransition>
 * ```
 *
 * @example
 * ```tsx
 * // 高度な設定のスライドトランジション
 * <PageTransition
 *   type="slide"
 *   direction="left"
 *   duration={300}
 *   easing="ease-in-out"
 *   appear
 *   mountOnEnter
 *   unmountOnExit
 * >
 *   <YourPageContent />
 * </PageTransition>
 * ```
 *
 * @example
 * ```tsx
 * // React Routerでの使用例（位置付きコンテナ推奨）
 * <Box sx={{ position: 'relative', overflow: 'hidden' }}>
 *   <PageTransition locationKey={location.key}>
 *     <Routes />
 *   </PageTransition>
 * </Box>
 * ```
 */
const PageTransition = forwardRef<HTMLDivElement, PageTransitionProps>(
  (
    {
      children,
      type = 'fade',
      duration = 250,
      direction = 'left',
      in: inProp = true,
      easing,
      appear = true,
      mountOnEnter = true,
      unmountOnExit = true,
      locationKey,
      transitionProps = {},
    },
    ref
  ) => {
    const theme = useTheme()

    // SSR安全なメディアクエリ使用（noSsr: trueでクライアントサイド限定）
    const prefersReducedMotion = useMediaQuery(
      '(prefers-reduced-motion: reduce)',
      {
        noSsr: true,
      }
    )

    // reduced-motion設定時はアニメーション無効化（即座にレンダリング）
    if (prefersReducedMotion || type === 'none') {
      return (
        <Box ref={ref} key={locationKey}>
          {children}
        </Box>
      )
    }

    // 共通のトランジションプロパティ（テーマのイージング使用可能）
    const commonProps = {
      in: inProp,
      timeout: duration,
      appear,
      mountOnEnter,
      unmountOnExit,
      easing: easing || theme.transitions.easing.easeInOut,
      ...transitionProps,
    }

    // スライドトランジション（早期リターン）
    if (type === 'slide') {
      return (
        <Slide key={locationKey} {...commonProps} direction={direction}>
          <Box ref={ref}>{children}</Box>
        </Slide>
      )
    }

    // フェードトランジション（デフォルト）
    return (
      <Fade key={locationKey} {...commonProps}>
        <Box ref={ref}>{children}</Box>
      </Fade>
    )
  }
)

PageTransition.displayName = 'PageTransition'

export default PageTransition
