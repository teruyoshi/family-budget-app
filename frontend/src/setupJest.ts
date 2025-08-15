/**
 * Jest テスト環境のセットアップファイル
 *
 * React Router Dom のテストに必要なWeb APIのpolyfillを提供します。
 * Node.js環境（Jest）では利用できないブラウザ専用APIを補完し、
 * React Routerが正常にテスト環境で動作するよう環境を整備します。
 *
 * @remarks
 * このファイルの役割:
 * 1. TextEncoder/TextDecoder: 文字エンコーディング用Web API（React Router内部で使用）
 * 2. URLSearchParams: URL検索パラメータ操作API（React Routerのルーティングで使用）  
 * 3. URL: URL解析・操作API（React Routerのナビゲーションで使用）
 *
 * これらのpolyfillにより、React Router Domが Jest テスト環境で
 * "TextEncoder is not defined" 等のエラーを発生させることなく動作します。
 */

// TextEncoder/TextDecoder polyfill for React Router Dom
// Node.js環境（Jest）では利用できないWeb APIをNode.js util モジュールで補完
import { TextEncoder, TextDecoder } from 'util'

/**
 * TextEncoderの型定義
 * Node.js の TextEncoder を Web API 互換の型として設定
 */
interface WebTextEncoder {
  readonly encoding: string
  encode(input?: string): Uint8Array
}

/**
 * TextDecoderの型定義  
 * Node.js の TextDecoder を Web API 互換の型として設定
 */
interface WebTextDecoder {
  readonly encoding: string
  readonly fatal: boolean
  readonly ignoreBOM: boolean
  decode(input?: BufferSource, options?: TextDecodeOptions): string
}

// グローバル環境にTextEncoder/TextDecoderを正しい型で設定
global.TextEncoder = TextEncoder as unknown as { new(): WebTextEncoder }
global.TextDecoder = TextDecoder as unknown as { new(label?: string, options?: TextDecoderOptions): WebTextDecoder }

/**
 * URLSearchParams polyfill implementation
 * 
 * React Router DomがURL検索パラメータを解析・操作する際に使用するWeb APIの代替実装。
 * Jest環境では URLSearchParams が未定義の場合があるため、最小限の互換実装を提供します。
 *
 * @remarks
 * 実装されている機能:
 * - 文字列形式（"key=value&key2=value2"）からのパラメータ解析
 * - get(): 指定キーの値取得
 * - set(): キー・値の設定
 * - toString(): パラメータ文字列への変換
 * 
 * React Routerのクエリパラメータ操作に必要な最小限のAPIのみ実装しています。
 */
interface URLSearchParamsLike {
  get(name: string): string | null
  set(name: string, value: string): void
  toString(): string
}

if (!global.URLSearchParams) {
  global.URLSearchParams = class URLSearchParams implements URLSearchParamsLike {
    private params: Map<string, string> = new Map()

    /**
     * URLSearchParamsコンストラクタ
     * @param init - 初期化用の文字列またはパラメータオブジェクト
     * 
     * @example
     * ```typescript
     * new URLSearchParams("key1=value1&key2=value2")
     * new URLSearchParams("?key1=value1&key2=value2") // ? プレフィックス対応
     * ```
     */
    constructor(init?: string | URLSearchParams | string[][] | Record<string, string>) {
      if (typeof init === 'string') {
        // "?" プレフィックスの除去
        if (init.startsWith('?')) {
          init = init.slice(1)
        }
        // "key=value&key=value" 形式の解析
        init.split('&').forEach(pair => {
          const [key, value] = pair.split('=')
          if (key) {
            this.params.set(decodeURIComponent(key), decodeURIComponent(value || ''))
          }
        })
      }
    }

    /**
     * 指定されたキーの値を取得
     * @param name - 取得するパラメータ名
     * @returns パラメータ値、存在しない場合は null
     */
    get(name: string): string | null {
      return this.params.get(name) || null
    }

    /**
     * パラメータの設定
     * @param name - パラメータ名
     * @param value - パラメータ値
     */
    set(name: string, value: string): void {
      this.params.set(name, value)
    }

    /**
     * パラメータをクエリ文字列形式に変換
     * @returns "key1=value1&key2=value2" 形式の文字列
     */
    toString(): string {
      const pairs: string[] = []
      this.params.forEach((value, key) => {
        pairs.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      })
      return pairs.join('&')
    }
  } as { new(init?: string | URLSearchParams | string[][] | Record<string, string>): URLSearchParamsLike }
}

/**
 * URL polyfill implementation
 * 
 * React Router DomがURL解析・操作を行う際に使用するWeb APIの代替実装。
 * Jest環境でのテスト実行時に URL クラスが未定義の場合の fallback を提供します。
 *
 * @remarks
 * この実装の目的:
 * - React Router内部でのURL解析エラーを防止
 * - テスト環境での基本的なURLプロパティアクセスを可能にする
 * - 実際のルーティングテストではMemoryRouterを使用するため、最小限の実装で十分
 * 
 * 実装されているプロパティ:
 * - href, origin, protocol, host, hostname, port: URL構成要素
 * - pathname, search, hash: ルーティングで使用される部分
 * - searchParams: URLSearchParamsインスタンス
 * 
 * @example
 * ```typescript
 * // Jest環境でのURL操作
 * const url = new URL('http://localhost:3000/dashboard?tab=expenses#section1')
 * console.log(url.pathname) // '/dashboard'  
 * console.log(url.search)   // '?tab=expenses'
 * ```
 */
interface URLLike {
  readonly href: string
  readonly origin: string
  readonly protocol: string
  readonly host: string
  readonly hostname: string
  readonly port: string
  readonly pathname: string
  readonly search: string
  readonly hash: string
  readonly searchParams: URLSearchParams
}

if (!global.URL) {
  global.URL = class URL implements URLLike {
    href: string
    origin: string
    protocol: string
    host: string
    hostname: string
    port: string
    pathname: string
    search: string
    hash: string
    searchParams: URLSearchParams

    /**
     * URLコンストラクタ
     * @param url - 解析対象のURL文字列
     * @param base - ベースURL（相対URL解決用、現在は未実装）
     * 
     * @remarks
     * テスト環境用の簡易実装のため、固定値を返します。
     * 実際のルーティングテストでは MemoryRouter を使用するため、
     * この実装はReact Router内部の初期化エラー防止が主目的です。
     */
    constructor(url: string, base?: string) {
      this.href = url
      this.origin = 'http://localhost:3000'
      this.protocol = 'http:'
      this.host = 'localhost:3000'
      this.hostname = 'localhost'
      this.port = '3000'
      this.pathname = '/'
      this.search = ''
      this.hash = ''
      this.searchParams = new URLSearchParams()
    }
  } as { new(url: string, base?: string): URLLike }
}