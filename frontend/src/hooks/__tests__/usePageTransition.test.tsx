import { renderHook } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { usePageTransition } from '../usePageTransition'
import { type ReactNode } from 'react'

// React Router のラッパーを提供するヘルパー
const createWrapper = (initialEntries: string[] = ['/']) => {
  return ({ children }: { children: ReactNode }) => (
    <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
  )
}

describe('usePageTransition', () => {
  it('初期状態でtransitionIn: true, transitionKey: 現在のパスを返す', () => {
    const wrapper = createWrapper(['/dashboard'])
    const { result } = renderHook(() => usePageTransition(), { wrapper })

    expect(result.current.transitionIn).toBe(true)
    expect(result.current.transitionKey).toBe('/dashboard')
  })

  it('異なるパスでも初期状態では常にtransitionIn: trueを返す', () => {
    // 各フックインスタンスは独立しているため、
    // 異なるパスでも初期状態では常に true を返す

    // ダッシュボードページ
    const wrapper1 = createWrapper(['/dashboard'])
    const { result: result1 } = renderHook(() => usePageTransition(), {
      wrapper: wrapper1,
    })
    expect(result1.current.transitionIn).toBe(true)
    expect(result1.current.transitionKey).toBe('/dashboard')

    // 設定ページ
    const wrapper2 = createWrapper(['/settings'])
    const { result: result2 } = renderHook(() => usePageTransition(), {
      wrapper: wrapper2,
    })
    expect(result2.current.transitionIn).toBe(true)
    expect(result2.current.transitionKey).toBe('/settings')
  })
})
