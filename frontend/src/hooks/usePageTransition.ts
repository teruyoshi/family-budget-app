import { useLocation } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'

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
  const [transitionIn, setTransitionIn] = useState(true)
  const previousPathRef = useRef<string | null>(null)

  useEffect(() => {
    if (previousPathRef.current === null) {
      // 初回マウント時は前回のパスがないのでトランジションしない
      previousPathRef.current = location.pathname
      return
    }
    
    if (previousPathRef.current !== location.pathname) {
      // パスが変更された場合のみトランジション実行
      setTransitionIn(false)
      const timer = setTimeout(() => setTransitionIn(true), 50)
      previousPathRef.current = location.pathname
      return () => clearTimeout(timer)
    }
  }, [location.pathname])

  return {
    transitionIn,
    transitionKey: location.pathname,
  }
}
