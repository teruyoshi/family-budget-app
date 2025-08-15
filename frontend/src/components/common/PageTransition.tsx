import { ReactNode } from 'react'
import { Box, Fade, Slide } from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'

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
  /** 追加のTransitionProps */
  transitionProps?: Partial<TransitionProps>
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
 * - カスタマイズ可能なアニメーション時間
 * - パフォーマンス考慮（トランジション無効化オプション）
 * - アクセシビリティ対応（prefers-reduced-motion 考慮）
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
 * // スライドトランジション
 * <PageTransition type="slide" direction="left" duration={300}>
 *   <YourPageContent />
 * </PageTransition>
 * ```
 *
 * @example
 * ```tsx
 * // AppLayoutでの使用例
 * <AppLayout>
 *   <PageTransition>
 *     <Routes />
 *   </PageTransition>
 * </AppLayout>
 * ```
 */
export default function PageTransition({
  children,
  type = 'fade',
  duration = 250,
  direction = 'left',
  in: inProp = true,
  transitionProps = {},
}: PageTransitionProps) {
  // アクセシビリティ考慮: reduced-motion 設定チェック（テスト環境対応）
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false
  
  // reduced-motion設定時はアニメーション無効化
  if (prefersReducedMotion || type === 'none') {
    return <Box>{children}</Box>
  }

  // 共通のトランジションプロパティ
  const commonProps = {
    in: inProp,
    timeout: duration,
    ...transitionProps,
  }

  // トランジションタイプに応じたコンポーネント選択
  switch (type) {
    case 'slide':
      return (
        <Slide
          {...commonProps}
          direction={direction}
        >
          <Box>{children}</Box>
        </Slide>
      )
    
    case 'fade':
    default:
      return (
        <Fade {...commonProps}>
          <Box>{children}</Box>
        </Fade>
      )
  }
}

