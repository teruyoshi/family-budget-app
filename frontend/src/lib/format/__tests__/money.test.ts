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
      it.each([
        [15000, '¥15,000'],
        [1234567, '¥1,234,567'],
        [500, '¥500'],
        [0, '¥0'],
        [-1500, '¥-1,500'],
        [-1234567, '¥-1,234,567'],
      ])('値 %p -> %p', (input, expected) => {
        // Arrange
        const value = input
        // Act
        const actual = formatMoney(value)
        // Assert
        expect(actual).toBe(expected)
      })
    })

    describe('オプション', () => {
      it.each([
        [1500.75, { decimalPlaces: 2 }, '¥1,500.75'],
        [1000.5, { decimalPlaces: 1 }, '¥1,000.5'],
        [15000, { showSymbol: false }, '15,000'],
        [0, { emptyOnZero: true }, ''],
        [-1500, { emptyOnNegative: true }, ''],
        [15000, { showSymbol: true }, '¥15,000'],
        [0, { emptyOnZero: false }, '¥0'],
        [-1500, { emptyOnNegative: false }, '¥-1,500'],
      ] as const)('値 %p, opts %p -> %p', (input, opts, expected) => {
        expect(formatMoney(input, opts)).toBe(expected)
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
    it.each([
      ['¥15,000', 15000],
      ['¥1,234,567', 1234567],
      ['15,000', 15000],
      ['1,500', 1500],
      ['15000', 15000],
      ['500', 500],
      ['abc123def', 123],
      ['price: ¥1,500 yen', 1500],
      ['', 0],
      ['abc', 0],
      ['¥', 0],
    ])('"%s" -> %p', (input, expected) => {
      expect(parseMoneyString(input)).toBe(expected)
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

    it('景の桁(11111111111111111)の往復変換 - 精度制限によりサポート外', () => {
      // ESLintのno-loss-of-precision対応: 精度が失われる数値リテラルのため警告回避
      const originalInputValue = '11111111111111111'
      const originalValue = Number(originalInputValue)
      const formatted = formatMoney(originalValue)
      const parsed = parseMoneyString(formatted)

      // JavaScriptの数値精度制限により、景の桁以上は正確に表現できない
      // 画面入力での11111111111111111が表示で11,111,111,111,111,112になるバグを確認
      expect(formatted).toBe('¥11,111,111,111,111,112')
      expect(parsed).toBe(11111111111111112)

      // 元の文字列と異なることを確認（精度落ちが発生）
      expect(originalInputValue).not.toBe(String(originalValue))
      expect(originalInputValue).toBe('11111111111111111')
      expect(String(originalValue)).toBe('11111111111111112')
    })
  })
})
