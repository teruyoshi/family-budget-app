/**
 * Jest テスト環境のセットアップファイル
 *
 * React Router Dom のテストに必要なpolyfillやグローバル設定を提供します。
 */

// TextEncoder/TextDecoder polyfill for React Router Dom
// Node.js環境（Jest）では利用できないWeb APIをpolyfillで補完
import { TextEncoder, TextDecoder } from 'util'

global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder as any

// URLSearchParams polyfill
if (!global.URLSearchParams) {
  global.URLSearchParams = class URLSearchParams {
    private params: Map<string, string> = new Map()

    constructor(init?: string | URLSearchParams | string[][] | Record<string, string>) {
      if (typeof init === 'string') {
        if (init.startsWith('?')) {
          init = init.slice(1)
        }
        init.split('&').forEach(pair => {
          const [key, value] = pair.split('=')
          if (key) {
            this.params.set(decodeURIComponent(key), decodeURIComponent(value || ''))
          }
        })
      }
    }

    get(name: string): string | null {
      return this.params.get(name) || null
    }

    set(name: string, value: string): void {
      this.params.set(name, value)
    }

    toString(): string {
      const pairs: string[] = []
      this.params.forEach((value, key) => {
        pairs.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      })
      return pairs.join('&')
    }
  } as any
}

// URL polyfill
if (!global.URL) {
  global.URL = class URL {
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
  } as any
}