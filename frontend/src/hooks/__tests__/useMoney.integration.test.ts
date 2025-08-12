import { renderHook, act } from '@testing-library/react'
import useMoney from '../useMoney'
import useMoneyFormat from '../useMoneyFormat'

/**
 * Hooks統合テスト
 *
 * 複数のフックが組み合わせて使用される場合の動作を確認する統合テストです。
 * 単体テストでカバーできない、フック間の相互作用をテストします。
 */
describe('Hooks Integration Tests', () => {
  describe('useMoney + useMoneyFormat', () => {
    it('別ファイルのフックを組み合わせて使用できる', () => {
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

    it('フォーマット結果が状態変更に正しく追従する', () => {
      const TestComponent = () => {
        const [money, setMoney] = useMoney(0)
        const formatted = useMoneyFormat(money)
        return { money, setMoney, formatted }
      }

      const { result } = renderHook(TestComponent)

      // 初期状態（0）
      expect(result.current.formatted.forInput).toBe('')
      expect(result.current.formatted.forDisplay).toBe('¥0')

      // 正の値に更新
      act(() => {
        result.current.setMoney(12345)
      })

      expect(result.current.formatted.forInput).toBe('¥12,345')
      expect(result.current.formatted.forDisplay).toBe('¥12,345')

      // 負の値に更新
      act(() => {
        result.current.setMoney(-5000)
      })

      expect(result.current.formatted.forInput).toBe('')
      expect(result.current.formatted.forDisplay).toBe('¥-5,000')
    })

    it('大きな数値でのフォーマット更新が正しく動作する', () => {
      const TestComponent = () => {
        const [money, setMoney] = useMoney(0)
        const formatted = useMoneyFormat(money)
        return { money, setMoney, formatted }
      }

      const { result } = renderHook(TestComponent)

      // 大きな数値に更新
      act(() => {
        result.current.setMoney(1234567890)
      })

      expect(result.current.money).toBe(1234567890)
      expect(result.current.formatted.forInput).toBe('¥1,234,567,890')
      expect(result.current.formatted.forDisplay).toBe('¥1,234,567,890')
    })
  })
})