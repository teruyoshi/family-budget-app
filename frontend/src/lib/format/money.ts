/**
 * 金額フォーマットライブラリ
 *
 * アプリケーション全体で使用される金額表示フォーマット処理を提供します。
 * 統一されたフォーマット仕様により、一貫した金額表示を保証します。
 */

/**
 * 金額フォーマットオプション
 */
export interface MoneyFormatOptions {
  /** ¥記号を表示するかどうか（デフォルト: true） */
  showSymbol?: boolean
  /** ゼロ値を空文字で返すかどうか（デフォルト: false） */
  emptyOnZero?: boolean
  /** 負値を空文字で返すかどうか（デフォルト: false） */
  emptyOnNegative?: boolean
  /** 小数点以下の桁数（デフォルト: 0） */
  decimalPlaces?: number
}

/**
 * 数値が安全な整数の範囲内かどうかをチェック
 *
 * JavaScriptのNumber.MAX_SAFE_INTEGERを超える数値は精度が失われるため、
 * 金額処理では安全でない値として扱います。
 *
 * @param value チェック対象の数値
 * @throws {Error} 値がMAX_SAFE_INTEGERを超える場合
 *
 * @example
 * ```typescript
 * checkSafeInteger(9007199254740991)    // OK (MAX_SAFE_INTEGER)
 * checkSafeInteger(9007199254740992)    // Error: 値が大きすぎます
 * checkSafeInteger(11111111111111111)   // Error: 値が大きすぎます
 * ```
 *
 * @see https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER
 */
function checkSafeInteger(value: number): void {
  if (Math.abs(value) > Number.MAX_SAFE_INTEGER) {
    throw new Error(
      `金額の値が大きすぎます。MAX_SAFE_INTEGER (${Number.MAX_SAFE_INTEGER}) を超える値は精度が失われるためサポートしていません。入力値: ${value}`
    )
  }
}

/**
 * 金額を¥記号付きカンマ区切り形式にフォーマット
 *
 * 数値を日本円の表示形式（¥1,000）に変換します。
 * オプションにより表示動作をカスタマイズ可能です。
 *
 * @param value フォーマット対象の数値
 * @param options フォーマットオプション
 * @returns フォーマット済み金額文字列
 *
 * @example
 * ```typescript
 * formatMoney(15000)                    // "¥15,000"
 * formatMoney(15000, { showSymbol: false }) // "15,000"
 * formatMoney(0, { emptyOnZero: true })     // ""
 * formatMoney(-500, { emptyOnNegative: true }) // ""
 * formatMoney(1500.75, { decimalPlaces: 2 })   // "¥1,500.75"
 * ```
 */
export function formatMoney(
  value: number,
  options: MoneyFormatOptions = {}
): string {
  const {
    showSymbol = true,
    emptyOnZero = false,
    emptyOnNegative = false,
    decimalPlaces = 0,
  } = options

  // 無効値の処理
  if (isNaN(value) || value == null) return ''

  // 安全な整数範囲チェック
  checkSafeInteger(value)

  // ゼロ値の処理
  if (value === 0 && emptyOnZero) return ''

  // 負値の処理
  if (value < 0 && emptyOnNegative) return ''

  // 数値フォーマット（カンマ区切り）
  const formatted = value.toLocaleString('ja-JP', {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  })

  return showSymbol ? `¥${formatted}` : formatted
}

/**
 * 入力フォーム向け金額フォーマット
 *
 * 金額入力コンポーネント向けの専用フォーマット。
 * ゼロ・無効値・負値は空文字で返します（プレースホルダー表示のため）。
 *
 * @param value フォーマット対象の数値
 * @returns フォーマット済み金額文字列（入力UI向け）
 *
 * @example
 * ```typescript
 * formatMoneyForInput(15000)  // "¥15,000"
 * formatMoneyForInput(0)      // ""
 * formatMoneyForInput(-500)   // ""
 * formatMoneyForInput(NaN)    // ""
 * ```
 */
export function formatMoneyForInput(value: number): string {
  return formatMoney(value, {
    showSymbol: true,
    emptyOnZero: true,
    emptyOnNegative: true,
  })
}

/**
 * 表示専用金額フォーマット
 *
 * 読み取り専用の金額表示向けフォーマット。
 * ゼロや負値も含めて常に値を表示します。
 *
 * @param value フォーマット対象の数値
 * @param options カスタマイズオプション
 * @returns フォーマット済み金額文字列（表示専用）
 *
 * @example
 * ```typescript
 * formatMoneyForDisplay(15000)   // "¥15,000"
 * formatMoneyForDisplay(0)       // "¥0"
 * formatMoneyForDisplay(-500)    // "¥-500"
 * ```
 */
export function formatMoneyForDisplay(
  value: number,
  options: Pick<MoneyFormatOptions, 'showSymbol' | 'decimalPlaces'> = {}
): string {
  return formatMoney(value, {
    showSymbol: true,
    emptyOnZero: false,
    emptyOnNegative: false,
    ...options,
  })
}

/**
 * 金額の文字列から数値を抽出
 *
 * フォーマット済み金額文字列（¥1,000など）から数値を取得します。
 * 数値以外の文字（¥記号、カンマ等）は自動除去されます。
 *
 * @param moneyString 金額文字列
 * @returns 抽出された数値（無効な場合は0）
 *
 * @example
 * ```typescript
 * parseMoneyString("¥15,000")  // 15000
 * parseMoneyString("1,500")    // 1500
 * parseMoneyString("abc123")   // 123
 * parseMoneyString("")         // 0
 * ```
 */
export function parseMoneyString(moneyString: string): number {
  if (typeof moneyString !== 'string') return 0

  // 数値以外の文字を除去して数値化
  const numericValue = parseInt(moneyString.replace(/[^0-9]/g, ''), 10)
  return isNaN(numericValue) ? 0 : numericValue
}
