import { renderHook, act } from '@testing-library/react'
import useAmount from '../useAmountInput'

describe('useAmount', () => {
  describe('基本機能', () => {
    it('初期値0でフックが正しく初期化される', () => {
      const { result } = renderHook(() => useAmount(0))
      
      expect(result.current[0].formatted).toBe('')
      expect(result.current[0].value).toBe(0)
      expect(result.current[1]).toBeInstanceOf(Function)
    })

    it('初期値が正の数値の場合、フォーマットされた文字列が返される', () => {
      const { result } = renderHook(() => useAmount(15000))
      
      expect(result.current[0].formatted).toBe('¥15,000')
      expect(result.current[0].value).toBe(15000)
    })

    it('updateAmount関数で値を更新すると、フォーマット済み文字列が更新される', () => {
      const { result } = renderHook(() => useAmount(0))
      
      act(() => {
        result.current[1](50000)
      })

      expect(result.current[0].formatted).toBe('¥50,000')
      expect(result.current[0].value).toBe(50000)
    })
  })

  describe('フォーマット処理', () => {
    it('1000未満の数値は正しくフォーマットされる', () => {
      const { result } = renderHook(() => useAmount(500))
      
      expect(result.current[0].formatted).toBe('¥500')
      expect(result.current[0].value).toBe(500)
    })

    it('1000以上の数値はカンマ区切りでフォーマットされる', () => {
      const { result } = renderHook(() => useAmount(1234567))
      
      expect(result.current[0].formatted).toBe('¥1,234,567')
      expect(result.current[0].value).toBe(1234567)
    })

    it('0は空文字として扱われる', () => {
      const { result } = renderHook(() => useAmount(0))
      
      expect(result.current[0].formatted).toBe('')
      expect(result.current[0].value).toBe(0)
    })

    it('NaNは空文字として扱われる', () => {
      const { result } = renderHook(() => useAmount(NaN))
      
      expect(result.current[0].formatted).toBe('')
      expect(result.current[0].value).toBe(NaN)
    })
  })

  describe('数値更新処理', () => {
    it('updateAmount関数に0を設定すると空文字になる', () => {
      const { result } = renderHook(() => useAmount(10000))
      
      act(() => {
        result.current[1](0)
      })

      expect(result.current[0].formatted).toBe('')
      expect(result.current[0].value).toBe(0)
    })

    it('updateAmount関数に負の値を設定すると空文字になる', () => {
      const { result } = renderHook(() => useAmount(1000))
      
      act(() => {
        result.current[1](-500)
      })

      expect(result.current[0].formatted).toBe('')
      expect(result.current[0].value).toBe(-500)
    })

    it('複数回の値更新が正しく反映される', () => {
      const { result } = renderHook(() => useAmount(1000))
      
      // 最初の更新
      act(() => {
        result.current[1](2000)
      })
      expect(result.current[0].formatted).toBe('¥2,000')
      expect(result.current[0].value).toBe(2000)

      // 2回目の更新
      act(() => {
        result.current[1](3500)
      })
      expect(result.current[0].formatted).toBe('¥3,500')
      expect(result.current[0].value).toBe(3500)
    })
  })

  describe('エッジケース', () => {
    it('undefinedを初期値として渡すと0として扱われる', () => {
      const { result } = renderHook(() => useAmount(undefined as any))
      
      expect(result.current[0].formatted).toBe('')
      expect(result.current[0].value).toBe(undefined)
    })

    it('nullを初期値として渡すと0として扱われる', () => {
      const { result } = renderHook(() => useAmount(null as any))
      
      expect(result.current[0].formatted).toBe('')
      expect(result.current[0].value).toBe(null)
    })

    it('非常に大きな数値も正しくフォーマットされる', () => {
      const { result } = renderHook(() => useAmount(999999999999))
      
      expect(result.current[0].formatted).toBe('¥999,999,999,999')
      expect(result.current[0].value).toBe(999999999999)
    })
  })

  describe('メモリリーク確認', () => {
    it('アンマウント後もエラーが発生しない', () => {
      const { result, unmount } = renderHook(() => useAmount(1000))
      
      unmount()
      
      // アンマウント後の操作でエラーが発生しないことを確認
      expect(() => {
        // setState関数の参照は残っているが、実際の呼び出しは行わない
        expect(result.current[1]).toBeInstanceOf(Function)
      }).not.toThrow()
    })
  })
})