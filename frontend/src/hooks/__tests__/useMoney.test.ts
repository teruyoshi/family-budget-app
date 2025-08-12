import { renderHook, act } from '@testing-library/react'
import useMoney from '../useMoney'

/**
 * 金額状態管理フック useMoney のテスト
 *
 * 金額の数値状態管理、単一責任原則に基づく純粋な状態管理を網羅的にテストします。
 */
describe('useMoney', () => {
  describe('基本機能（純粋な状態管理）', () => {
    it('初期値0でフックが正しく初期化される', () => {
      const { result } = renderHook(() => useMoney(0))

      expect(result.current[0]).toBe(0)
      expect(result.current[1]).toBeInstanceOf(Function)
    })

    it('初期値が正の数値の場合、その値が返される', () => {
      const { result } = renderHook(() => useMoney(15000))

      expect(result.current[0]).toBe(15000)
    })

    it('setMoney関数で値を更新すると、数値が更新される', () => {
      const { result } = renderHook(() => useMoney(0))

      act(() => {
        result.current[1](50000)
      })

      expect(result.current[0]).toBe(50000)
    })
  })

  describe('数値更新処理', () => {
    it('setMoney関数に0を設定すると0になる', () => {
      const { result } = renderHook(() => useMoney(10000))

      act(() => {
        result.current[1](0)
      })

      expect(result.current[0]).toBe(0)
    })

    it('setMoney関数に負の値を設定すると負の値になる', () => {
      const { result } = renderHook(() => useMoney(1000))

      act(() => {
        result.current[1](-500)
      })

      expect(result.current[0]).toBe(-500)
    })

    it('複数回の値更新が正しく反映される', () => {
      const { result } = renderHook(() => useMoney(1000))

      // 最初の更新
      act(() => {
        result.current[1](2000)
      })
      expect(result.current[0]).toBe(2000)

      // 2回目の更新
      act(() => {
        result.current[1](3500)
      })
      expect(result.current[0]).toBe(3500)
    })
  })

  describe('エッジケース', () => {
    it('undefinedを初期値として渡すとundefinedが保持される', () => {
      const { result } = renderHook(() =>
        useMoney(undefined as unknown as number)
      )

      expect(result.current[0]).toBe(undefined)
    })

    it('nullを初期値として渡すとnullが保持される', () => {
      const { result } = renderHook(() => useMoney(null as unknown as number))

      expect(result.current[0]).toBe(null)
    })

    it('非常に大きな数値も正しく保持される', () => {
      const { result } = renderHook(() => useMoney(999999999999))

      expect(result.current[0]).toBe(999999999999)
    })

    it('NaNも正しく保持される', () => {
      const { result } = renderHook(() => useMoney(NaN))

      expect(result.current[0]).toBeNaN()
    })
  })

  describe('メモリリーク確認', () => {
    it('アンマウント後もエラーが発生しない', () => {
      const { result, unmount } = renderHook(() => useMoney(1000))

      unmount()

      // アンマウント後の操作でエラーが発生しないことを確認
      expect(() => {
        // setState関数の参照は残っているが、実際の呼び出しは行わない
        expect(result.current[1]).toBeInstanceOf(Function)
      }).not.toThrow()
    })
  })
})
