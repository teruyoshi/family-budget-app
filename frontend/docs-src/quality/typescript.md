# TypeScript設定・開発方針

## ステータス

✅ **運用中** (2025-08-17 Phase1基盤整備)

## 概要

家計簿アプリフロントエンドにおけるTypeScript開発の標準化方針とベストプラクティスを定義します。strict mode 100%対応による型安全性確保と開発効率の両立を実現しています。

## TypeScript設定詳細

### コンパイラ設定

**tsconfig.app.json（メインアプリケーション）**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",

    // strict mode設定（100%対応済み）
    "strict": true, // 全strictオプション有効
    "noUnusedLocals": true, // 未使用変数禁止
    "noUnusedParameters": true, // 未使用パラメータ禁止
    "noFallthroughCasesInSwitch": true, // switch文fallthrough禁止
    "noUncheckedSideEffectImports": true, // 副作用インポート検証

    // パスマッピング
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"] // srcディレクトリへのエイリアス
    }
  }
}
```

**tsconfig.test.json（テスト環境）**

```json
{
  "extends": "./tsconfig.app.json",
  "compilerOptions": {
    "types": ["jest", "@testing-library/jest-dom", "node"],
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "moduleResolution": "node" // テスト環境用設定
  }
}
```

### strict mode詳細

**有効化済みオプション（strict: true で自動有効）**

| オプション                     | 効果                        | 状況        |
| ------------------------------ | --------------------------- | ----------- |
| `noImplicitAny`                | 暗黙的any型禁止             | ✅ 適用済み |
| `noImplicitReturns`            | 戻り値型明示必須            | ✅ 適用済み |
| `noImplicitThis`               | this型明示必須              | ✅ 適用済み |
| `strictNullChecks`             | null/undefined厳格チェック  | ✅ 適用済み |
| `strictFunctionTypes`          | 関数型厳格チェック          | ✅ 適用済み |
| `strictBindCallApply`          | bind/call/apply厳格チェック | ✅ 適用済み |
| `strictPropertyInitialization` | プロパティ初期化チェック    | ✅ 適用済み |

## 開発方針・ベストプラクティス

### 1. 型定義の管理

**型定義の配置方針**

```typescript
// ✅ 推奨: 共通型は types/ ディレクトリで一元管理
import type { Expense, Income } from '@/types/business'
import type { TransactionFormData } from '@/types/forms'

// ❌ 非推奨: 各ファイルでの個別型定義（重複リスク）
interface LocalExpense { ... }
```

**export型の統一化**

```typescript
// ✅ 推奨: Props型は必ずexport
export interface AmountInputProps {
  amount: number
  currency?: Currency
}

// ✅ 推奨: type importで型専用インポート明示
import type { AmountInputProps } from '@/components/ui'
```

### 2. any型の使用制限

**禁止事項**

```typescript
// ❌ 禁止: 明示的any型の使用
const data: any = fetchData()

// ❌ 禁止: any型へのアサーション
const result = response as any
```

**例外的許可事項**

```typescript
// ✅ 許可: @ts-expect-error による意図的な型エラー回避
// Jest環境での必要なpolyfill設定時のみ
// @ts-expect-error - URLSearchParams polyfill for Jest environment
globalThis.URLSearchParams = URLSearchParams
```

### 3. 型安全なコンポーネント設計

**Props型定義**

```typescript
// ✅ 推奨: 詳細なTSDocコメント付きProps型
/**
 * 金額入力コンポーネントのProps型定義
 */
export interface AmountInputProps {
  /** 入力金額（正の数値のみ） */
  amount: number
  /** 通貨コード（デフォルト: JPY） */
  currency?: Currency
  /** エラー表示フラグ */
  error?: boolean
  /** エラーメッセージ */
  helperText?: string
  /** 入力変更時のコールバック */
  onChange: (amount: number) => void
}
```

**ジェネリック型の活用**

```typescript
// ✅ 推奨: 再利用可能なジェネリック型
interface FormControllerProps<T> {
  control: Control<T>
  name: keyof T
  render: (props: FieldRenderProps) => ReactElement
}
```

### 4. フック型安全性

**戻り値型の明示**

```typescript
// ✅ 推奨: 明確な戻り値型定義
export type UseMoneyReturn = [
  amount: number,
  setAmount: (amount: number) => void,
  formatAmount: (amount: number) => string,
]

export function useMoney(initialAmount = 0): UseMoneyReturn {
  // 実装...
}
```

### 5. zod連携での型安全性

**スキーマ型の自動生成**

```typescript
// ✅ 推奨: zodスキーマからの型生成
export const transactionFormSchema = z.object({
  amount: z.number().positive(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  useCustomDate: z.boolean(),
})

export type TransactionFormData = z.infer<typeof transactionFormSchema>
```

## 品質チェック・CI/CD統合

### 開発時のチェック

**make コマンドでの品質確認**

```bash
# TypeScript型チェック
make typecheck-file FILE=src/components/ui/AmountInput.tsx

# 統合品質チェック（TypeScript含む）
make quality-check-file FILE=src/components/ui/AmountInput.tsx
```

### CI/CD での自動チェック

**必須チェック項目**

1. `npm run typecheck` - 型エラーゼロ確認
2. `npm run lint` - ESLint（typescript-eslint含む）
3. `npm test` - 型安全なテスト実行

## 移行・リファクタリング指針

### Phase1での type/ ディレクトリ統合

**移行優先度**

1. ビジネスロジック型（Expense, Income等）
2. フォーム型（TransactionFormData等）
3. ルーティング型（AppRoute等）
4. 共通Props型

**zod連携での注意点**

```typescript
// ⚠️ 注意: zodスキーマとの依存関係を維持
// types/forms.ts への移行時はスキーマ定義は lib/validation/ に残す
export type TransactionFormData = z.infer<typeof transactionFormSchema>
```

## エラーハンドリング・トラブルシューティング

### よくある型エラーと対処法

**1. 暗黙的any型エラー**

```typescript
// ❌ エラー: Parameter 'event' implicitly has an 'any' type
const handleClick = (event) => { ... }

// ✅ 修正: 明示的な型指定
const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => { ... }
```

**2. null/undefined チェックエラー**

```typescript
// ❌ エラー: Object is possibly 'undefined'
const name = user.name.toUpperCase()

// ✅ 修正: オプショナルチェーン使用
const name = user.name?.toUpperCase()
```

**3. 戻り値型不整合エラー**

```typescript
// ❌ エラー: Function lacks ending return statement
function getAmount(type: string): number {
  if (type === 'income') return 1000
  // missing return for other cases
}

// ✅ 修正: 全パス対応
function getAmount(type: string): number {
  if (type === 'income') return 1000
  return 0
}
```

## 更新履歴

- **2025-08-17**: ドキュメント初版作成（Phase1基盤整備）
- TypeScript strict mode 100%対応完了
- types/ディレクトリ統合計画策定
- zod連携での型安全性確保方針確立

---

このドキュメントは家計簿アプリの TypeScript 開発における品質基準と効率的な開発フローを保証します。
