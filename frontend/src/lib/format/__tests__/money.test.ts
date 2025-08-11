import {
  formatMoney,
  formatMoneyForInput,
  formatMoneyForDisplay,
  parseMoneyString,
} from '../money'

/**
 * 金額フォーマットライブラリのテスト
 *
 * 金額表示のフォーマット処理、パース処理、各種オプション対応を網羅的にテストします。
 */
describe('money formatting library', () => {
  describe('formatMoney', () => {
    describe('基本フォーマット', () => {
      it('正の整数を¥記号付きカンマ区切りでフォーマット', () => {
        expect(formatMoney(15000)).toBe('¥15,000')
        expect(formatMoney(1234567)).toBe('¥1,234,567')
        expect(formatMoney(500)).toBe('¥500')
      })

      it('ゼロを正しくフォーマット', () => {
        expect(formatMoney(0)).toBe('¥0')
      })

      it('負の値を正しくフォーマット', () => {
        expect(formatMoney(-1500)).toBe('¥-1,500')
        expect(formatMoney(-1234567)).toBe('¥-1,234,567')
      })

      it('小数点を含む値を正しくフォーマット', () => {
        expect(formatMoney(1500.75, { decimalPlaces: 2 })).toBe('¥1,500.75')
        expect(formatMoney(1000.5, { decimalPlaces: 1 })).toBe('¥1,000.5')
      })
    })

    describe('showSymbolオプション', () => {
      it('showSymbol: falseで¥記号なしでフォーマット', () => {
        expect(formatMoney(15000, { showSymbol: false })).toBe('15,000')
        expect(formatMoney(1234567, { showSymbol: false })).toBe('1,234,567')
      })

      it('showSymbol: trueで¥記号付きでフォーマット（デフォルト）', () => {
        expect(formatMoney(15000, { showSymbol: true })).toBe('¥15,000')
        expect(formatMoney(15000)).toBe('¥15,000')
      })
    })

    describe('emptyOnZeroオプション', () => {
      it('emptyOnZero: trueでゼロ値を空文字で返す', () => {
        expect(formatMoney(0, { emptyOnZero: true })).toBe('')
        expect(formatMoney(0, { emptyOnZero: false })).toBe('¥0')
      })

      it('emptyOnZero: falseでゼロ値を表示（デフォルト）', () => {
        expect(formatMoney(0)).toBe('¥0')
      })
    })

    describe('emptyOnNegativeオプション', () => {
      it('emptyOnNegative: trueで負値を空文字で返す', () => {
        expect(formatMoney(-1500, { emptyOnNegative: true })).toBe('')
        expect(formatMoney(-1500, { emptyOnNegative: false })).toBe('¥-1,500')
      })

      it('emptyOnNegative: falseで負値を表示（デフォルト）', () => {
        expect(formatMoney(-1500)).toBe('¥-1,500')
      })
    })

    describe('無効値の処理', () => {
      it('NaNを空文字で返す', () => {
        expect(formatMoney(NaN)).toBe('')
      })

      it('nullを空文字で返す', () => {
        expect(formatMoney(null as unknown as number)).toBe('')
      })

      it('undefinedを空文字で返す', () => {
        expect(formatMoney(undefined as unknown as number)).toBe('')
      })
    })
  })

  describe('formatMoneyForInput', () => {
    it('入力UI向けに正の値をフォーマット', () => {
      expect(formatMoneyForInput(15000)).toBe('¥15,000')
      expect(formatMoneyForInput(1234567)).toBe('¥1,234,567')
    })

    it('ゼロ値を空文字で返す（プレースホルダー表示用）', () => {
      expect(formatMoneyForInput(0)).toBe('')
    })

    it('負値を空文字で返す（入力制限）', () => {
      expect(formatMoneyForInput(-1500)).toBe('')
    })

    it('無効値を空文字で返す', () => {
      expect(formatMoneyForInput(NaN)).toBe('')
      expect(formatMoneyForInput(null as unknown as number)).toBe('')
    })
  })

  describe('formatMoneyForDisplay', () => {
    it('表示専用で正の値をフォーマット', () => {
      expect(formatMoneyForDisplay(15000)).toBe('¥15,000')
      expect(formatMoneyForDisplay(1234567)).toBe('¥1,234,567')
    })

    it('ゼロ値も表示（読み取り専用）', () => {
      expect(formatMoneyForDisplay(0)).toBe('¥0')
    })

    it('負値も表示（読み取り専用）', () => {
      expect(formatMoneyForDisplay(-1500)).toBe('¥-1,500')
    })

    it('showSymbolオプションが適用される', () => {
      expect(formatMoneyForDisplay(15000, { showSymbol: false })).toBe('15,000')
    })

    it('decimalPlacesオプションが適用される', () => {
      expect(formatMoneyForDisplay(1500.75, { decimalPlaces: 2 })).toBe(
        '¥1,500.75'
      )
    })

    it('無効値を空文字で返す', () => {
      expect(formatMoneyForDisplay(NaN)).toBe('')
    })
  })

  describe('parseMoneyString', () => {
    it('¥記号付き金額文字列から数値を抽出', () => {
      expect(parseMoneyString('¥15,000')).toBe(15000)
      expect(parseMoneyString('¥1,234,567')).toBe(1234567)
    })

    it('カンマ区切り文字列から数値を抽出', () => {
      expect(parseMoneyString('15,000')).toBe(15000)
      expect(parseMoneyString('1,500')).toBe(1500)
    })

    it('純粋な数値文字列から数値を抽出', () => {
      expect(parseMoneyString('15000')).toBe(15000)
      expect(parseMoneyString('500')).toBe(500)
    })

    it('混在文字列から数値のみを抽出', () => {
      expect(parseMoneyString('abc123def')).toBe(123)
      expect(parseMoneyString('price: ¥1,500 yen')).toBe(1500)
    })

    it('空文字・無効文字列で0を返す', () => {
      expect(parseMoneyString('')).toBe(0)
      expect(parseMoneyString('abc')).toBe(0)
      expect(parseMoneyString('¥')).toBe(0)
    })

    it('非文字列値で0を返す', () => {
      expect(parseMoneyString(null as unknown as string)).toBe(0)
      expect(parseMoneyString(undefined as unknown as string)).toBe(0)
      expect(parseMoneyString(123 as unknown as string)).toBe(0)
    })
  })

  describe('統合テスト', () => {
    it('formatとparseの往復変換が正しく動作', () => {
      const originalValue = 15000
      const formatted = formatMoney(originalValue)
      const parsed = parseMoneyString(formatted)
      expect(parsed).toBe(originalValue)
    })

    it('大きな数値での往復変換が正しく動作', () => {
      const originalValue = 1234567890
      const formatted = formatMoney(originalValue)
      const parsed = parseMoneyString(formatted)
      expect(parsed).toBe(originalValue)
    })
  })
})
