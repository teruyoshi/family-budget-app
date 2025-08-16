import { renderHook } from '@testing-library/react'
import useMoneyFormat from '../useMoneyFormat'

/**
 * 金額フォーマットフック useMoneyFormat のテスト
 *
 * 金額のフォーマット処理、メモ化最適化、用途別フォーマットを網羅的にテストします。
 */
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
