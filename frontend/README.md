# 家計簿アプリ - フロントエンド

React + TypeScript + Viteで構築された家計簿管理アプリケーションのフロントエンドです。

## 🚀 技術スタック

- **React 19** - UIライブラリ
- **TypeScript** - 型安全な開発
- **Vite** - 高速ビルドツール
- **Material-UI (MUI)** - Reactコンポーネントライブラリ
- **Emotion** - CSS-in-JSスタイリング
- **Jest** - テスティングフレームワーク
- **React Testing Library** - コンポーネントテスト
- **ESLint** - コード品質
- **Prettier** - コードフォーマット

## 📁 プロジェクト構成

```
src/
├── components/          # 共通コンポーネント
│   └── common/         # 汎用的なUIコンポーネント
│       └── TextInput.tsx
├── features/           # 機能別ディレクトリ
│   └── expenses/       # 支出管理機能
│       └── components/ # 支出関連コンポーネント
│           ├── ExpenseForm.tsx
│           ├── ExpenseForm.test.tsx
│           └── ExpenseInput.tsx
├── App.tsx            # メインアプリケーション
├── App.test.tsx       # アプリケーションテスト
├── main.tsx           # エントリーポイント
└── setupTests.ts      # テスト設定
```

## 🏗 アーキテクチャ

### フィーチャーベース設計

機能ごとにディレクトリを分割し、関連するコンポーネント、テスト、型定義を集約しています。

### コンポーネント設計原則

- **Single Responsibility**: 各コンポーネントは単一の責任を持つ
- **Composition over Inheritance**: 合成によるコンポーネント設計
- **Reusability**: 共通コンポーネントの再利用

## 🧪 テスト戦略

### テストレベル

- **単体テスト**: 個別コンポーネントの動作確認
- **結合テスト**: コンポーネント間の連携確認
- **TDD**: テスト駆動開発による品質保証

### テストファイル配置

- 各コンポーネントと同じディレクトリに`*.test.tsx`として配置
- 機能単位でのテストファイル管理

## 🔧 開発コマンド

### 基本操作

```bash
# 依存関係インストール
npm install

# 開発サーバー起動
npm run dev

# ビルド
npm run build

# テスト実行
npm test

# Lintチェック
npm run lint

# プリビューサーバー起動
npm run preview
```

### Docker開発（推奨）

```bash
# プロジェクトルートから実行
make npm-install        # 依存関係インストール
make test-frontend      # テスト実行
make frontend           # ログ確認
```

## 📝 コンポーネントガイド

### TextInput

汎用的なテキスト入力コンポーネント（MUI TextFieldベース）

```tsx
import TextInput from '../components/common/TextInput'

;<TextInput
  type="text"
  placeholder="入力してください"
  value={value}
  onChange={handleChange}
  required
  variant="outlined"
/>
```

### ExpenseInput

数値のみ入力可能な支出専用入力コンポーネント

```tsx
import ExpenseInput from '../features/expenses/components/ExpenseInput'

;<ExpenseInput
  value={amount}
  onChange={setAmount}
  placeholder="支出金額を入力"
/>
```

### ExpenseForm

支出登録フォームコンポーネント

```tsx
import ExpenseForm from '../features/expenses/components/ExpenseForm'

;<ExpenseForm onSubmit={handleExpenseSubmit} />
```

## 🔍 開発ガイドライン

### コーディング規約

- TypeScriptの厳格な型チェックを有効化
- ESLint + Prettierによる自動フォーマット
- React Hooksの適切な使用
- MUI sx propsによる一貫したスタイリング

### ファイル命名規則

- コンポーネント: `PascalCase.tsx`
- テストファイル: `PascalCase.test.tsx`
- ユーティリティ: `camelCase.ts`

### インポート規則

```tsx
// 外部ライブラリ
import { useState } from 'react'

// 内部コンポーネント（相対パス）
import TextInput from '../components/common/TextInput'
```

## 🚀 新機能追加の流れ

1. **機能設計**: 要件定義と設計
2. **テスト作成**: TDDによるテストファースト開発
3. **コンポーネント実装**: テストを通すためのコード実装
4. **リファクタリング**: コード品質の向上
5. **ドキュメント更新**: 機能追加の文書化

## 🔗 関連リソース

- [プロジェクト全体のドキュメント](../CLAUDE.md)
- [Docker開発環境](../compose.yml)
- [バックエンドAPI](../backend/)
