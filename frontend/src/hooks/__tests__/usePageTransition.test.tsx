import { renderHook } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { usePageTransition } from '../usePageTransition'
import { ReactNode } from 'react'

// React Router のラッパーを提供するヘルパー
const createWrapper = (initialEntries: string[] = ['/']) => {
  return ({ children }: { children: ReactNode }) => (
    <MemoryRouter initialEntries={initialEntries}>
      {children}
    </MemoryRouter>
  )
}

describe('usePageTransition', () => {
  it('初期状態でtransitionIn: true, transitionKey: 現在のパスを返す', () => {
    const wrapper = createWrapper(['/dashboard'])
    const { result } = renderHook(() => usePageTransition(), { wrapper })

    expect(result.current.transitionIn).toBe(true)
    expect(result.current.transitionKey).toBe('/dashboard')
  })
})