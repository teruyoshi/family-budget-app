import { useLocation } from 'react-router-dom'

/**
 * React Router用のページトランジションフック
 *
 * 現在のルート変更を監視し、適切なトランジション状態を管理します。
 * useLocation と組み合わせて、ページ遷移時の自動アニメーション制御を実現。
 *
 * @returns トランジション制御オブジェクト
 *
 * @example
 * ```tsx
 * function App() {
 *   const { transitionIn, transitionKey } = usePageTransition()
 *
 *   return (
 *     <AppLayout>
 *       <PageTransition key={transitionKey} in={transitionIn}>
 *         <Routes />
 *       </PageTransition>
 *     </AppLayout>
 *   )
 * }
 * ```
 */
export function usePageTransition() {
  const location = useLocation()

  return {
    transitionIn: true,
    transitionKey: location.pathname,
  }
}
