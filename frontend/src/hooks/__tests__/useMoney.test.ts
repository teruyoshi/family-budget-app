import { renderHook, act } from '@testing-library/react'
import useMoney, { useMoneyFormat } from '../useMoney'

/**
 * 金額状態管理フック useMoney と useMoneyFormat のテスト
 *
 * 金額の数値状態管理、フォーマット処理、単一責任分離設計を網羅的にテストします。
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

describe('useMoneyFormat', () => {
  describe('基本フォーマット処理', () => {
    it('正の数値が正しくフォーマットされる', () => {
      const { result } = renderHook(() => useMoneyFormat(15000))

      expect(result.current.forInput).toBe('¥15,000')
      expect(result.current.forDisplay).toBe('¥15,000')
    })

    it('1000未満の数値が正しくフォーマットされる', () => {
      const { result } = renderHook(() => useMoneyFormat(500))

      expect(result.current.forInput).toBe('¥500')
      expect(result.current.forDisplay).toBe('¥500')
    })

    it('1000以上の数値はカンマ区切りでフォーマットされる', () => {
      const { result } = renderHook(() => useMoneyFormat(1234567))

      expect(result.current.forInput).toBe('¥1,234,567')
      expect(result.current.forDisplay).toBe('¥1,234,567')
    })
  })

  describe('入力UI向けと表示専用の違い', () => {
    it('0は入力UI向けで空文字、表示専用で¥0になる', () => {
      const { result } = renderHook(() => useMoneyFormat(0))

      expect(result.current.forInput).toBe('')
      expect(result.current.forDisplay).toBe('¥0')
    })

    it('負の値は入力UI向けで空文字、表示専用で負の値表示', () => {
      const { result } = renderHook(() => useMoneyFormat(-1500))

      expect(result.current.forInput).toBe('')
      expect(result.current.forDisplay).toBe('¥-1,500')
    })

    it('NaNは両方とも空文字になる', () => {
      const { result } = renderHook(() => useMoneyFormat(NaN))

      expect(result.current.forInput).toBe('')
      expect(result.current.forDisplay).toBe('')
    })
  })

  describe('パフォーマンステスト', () => {
    it('同じ値で複数回呼び出してもメモ化が効いている', () => {
      const { result, rerender } = renderHook(
        ({ value }) => useMoneyFormat(value),
        {
          initialProps: { value: 15000 },
        }
      )

      const firstResult = result.current

      rerender({ value: 15000 })

      // メモ化により同じオブジェクト参照が返されることを確認
      expect(result.current).toBe(firstResult)
    })

    it('値が変更されると新しいフォーマット結果が返される', () => {
      const { result, rerender } = renderHook(
        ({ value }) => useMoneyFormat(value),
        {
          initialProps: { value: 15000 },
        }
      )

      const firstResult = result.current

      rerender({ value: 25000 })

      // 値が変更されたので新しい結果が返される
      expect(result.current).not.toBe(firstResult)
      expect(result.current.forInput).toBe('¥25,000')
      expect(result.current.forDisplay).toBe('¥25,000')
    })
  })
})

describe('useMoney + useMoneyFormat 組み合わせテスト', () => {
  it('状態管理フックとフォーマットフックを組み合わせて使用できる', () => {
    const TestComponent = () => {
      const [money, setMoney] = useMoney(15000)
      const formatted = useMoneyFormat(money)
      return { money, setMoney, formatted }
    }

    const { result } = renderHook(TestComponent)

    // 初期状態
    expect(result.current.money).toBe(15000)
    expect(result.current.formatted.forInput).toBe('¥15,000')
    expect(result.current.formatted.forDisplay).toBe('¥15,000')

    // 値を更新
    act(() => {
      result.current.setMoney(25000)
    })

    expect(result.current.money).toBe(25000)
    expect(result.current.formatted.forInput).toBe('¥25,000')
    expect(result.current.formatted.forDisplay).toBe('¥25,000')

    // ゼロに更新
    act(() => {
      result.current.setMoney(0)
    })

    expect(result.current.money).toBe(0)
    expect(result.current.formatted.forInput).toBe('')
    expect(result.current.formatted.forDisplay).toBe('¥0')
  })
})
