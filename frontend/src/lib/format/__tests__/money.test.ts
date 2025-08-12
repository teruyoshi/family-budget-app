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
        [15000, { showSymbol: true }, '¥15,000'],
        [15000, { showSymbol: false }, '15,000'],
        [0, { emptyOnZero: true }, ''],
        [0, { emptyOnZero: false }, '¥0'],
        [-1500, { emptyOnNegative: true }, ''],
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

    describe('MAX_SAFE_INTEGER を超える値のエラー処理', () => {
      it('MAX_SAFE_INTEGERを超える正の値でエラーを投げる', () => {
        const unsafeValue = Number.MAX_SAFE_INTEGER + 1
        expect(() => formatMoney(unsafeValue)).toThrow(
          '金額の値が大きすぎます。MAX_SAFE_INTEGER'
        )
      })

      it('MAX_SAFE_INTEGERを超える負の値でエラーを投げる', () => {
        const unsafeValue = -(Number.MAX_SAFE_INTEGER + 1)
        expect(() => formatMoney(unsafeValue)).toThrow(
          '金額の値が大きすぎます。MAX_SAFE_INTEGER'
        )
      })

      it('景の桁(11111111111111111)でエラーを投げる', () => {
        const keino = Number('11111111111111111')
        expect(() => formatMoney(keino)).toThrow(
          '金額の値が大きすぎます。MAX_SAFE_INTEGER'
        )
      })

      it('MAX_SAFE_INTEGERちょうどの値は正常に処理される', () => {
        const safeValue = Number.MAX_SAFE_INTEGER
        expect(() => formatMoney(safeValue)).not.toThrow()
        expect(formatMoney(safeValue)).toBe('¥9,007,199,254,740,991')
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

    it('MAX_SAFE_INTEGERを超える値でエラーを投げる', () => {
      const unsafeValue = Number.MAX_SAFE_INTEGER + 1
      expect(() => formatMoneyForInput(unsafeValue)).toThrow(
        '金額の値が大きすぎます。MAX_SAFE_INTEGER'
      )
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

    it('MAX_SAFE_INTEGERを超える値でエラーを投げる', () => {
      const unsafeValue = Number.MAX_SAFE_INTEGER + 1
      expect(() => formatMoneyForDisplay(unsafeValue)).toThrow(
        '金額の値が大きすぎます。MAX_SAFE_INTEGER'
      )
    })
  })

  describe('parseMoneyString', () => {
    describe('基本パース処理', () => {
      it.each([
        ['¥15,000', 15000],
        ['¥1,234,567', 1234567],
        ['15,000', 15000],
        ['1,500', 1500],
        ['15000', 15000],
        ['500', 500],
      ])('"%s" -> %p', (input, expected) => {
        expect(parseMoneyString(input)).toBe(expected)
      })
    })

    describe('文字列が含まれる場合は文字列が無視される', () => {
      it.each([
        ['abc123def', 123], // 文字列部分は無視、数値のみ抽出
        ['price: ¥1,500 yen', 1500], // 前後の文字列は無視、金額のみ抽出
      ])('"%s" -> %p (数値のみ抽出)', (input, expected) => {
        expect(parseMoneyString(input)).toBe(expected)
      })
    })

    describe('無効な入力の処理', () => {
      it.each([
        ['', 0], // 空文字
        ['abc', 0], // 文字列のみ
        ['¥', 0], // 記号のみ
      ])('"%s" -> %p', (input, expected) => {
        expect(parseMoneyString(input)).toBe(expected)
      })

      it('非文字列値で0を返す', () => {
        expect(parseMoneyString(null as unknown as string)).toBe(0)
        expect(parseMoneyString(undefined as unknown as string)).toBe(0)
        expect(parseMoneyString(123 as unknown as string)).toBe(0)
      })
    })

    describe('MAX_SAFE_INTEGER を超える値のエラー処理', () => {
      it('MAX_SAFE_INTEGERを超える文字列でエラーを投げる', () => {
        const unsafeString = '9007199254740992' // MAX_SAFE_INTEGER + 1
        expect(() => parseMoneyString(unsafeString)).toThrow(
          '金額の値が大きすぎます。MAX_SAFE_INTEGER'
        )
      })

      it('景の桁(11111111111111111)文字列でエラーを投げる', () => {
        const keinoString = '11111111111111111'
        expect(() => parseMoneyString(keinoString)).toThrow(
          '金額の値が大きすぎます。MAX_SAFE_INTEGER'
        )
      })

      it('¥記号付き景の桁文字列でエラーを投げる', () => {
        const keinoStringWithSymbol = '¥11,111,111,111,111,111'
        expect(() => parseMoneyString(keinoStringWithSymbol)).toThrow(
          '金額の値が大きすぎます。MAX_SAFE_INTEGER'
        )
      })

      it('MAX_SAFE_INTEGERちょうどの文字列は正常に処理される', () => {
        const safeString = '9007199254740991' // MAX_SAFE_INTEGER
        expect(() => parseMoneyString(safeString)).not.toThrow()
        expect(parseMoneyString(safeString)).toBe(Number.MAX_SAFE_INTEGER)
      })
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

    it('景の桁(11111111111111111)以上の値は事前にエラーで防止', () => {
      // 以前は精度落ちによるバグが発生していたが、現在はMAX_SAFE_INTEGERチェックで事前にエラーを投げる
      const keinoInputValue = '11111111111111111'
      const keinoValue = Number(keinoInputValue)

      // formatMoney段階でエラーが投げられ、精度落ちバグを事前防止
      expect(() => formatMoney(keinoValue)).toThrow(
        '金額の値が大きすぎます。MAX_SAFE_INTEGER'
      )

      // parseMoneyStringでも数値変換後にMAX_SAFE_INTEGERチェックでエラーを投げる
      expect(() => parseMoneyString(keinoInputValue)).toThrow(
        '金額の値が大きすぎます。MAX_SAFE_INTEGER'
      )
    })
  })
})
