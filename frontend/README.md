# フロントエンド - FamilyBudgetApp (v0.4.1)

**Phase 2: Directory Structure Migration 完了間近 (85%)**

React 19 + TypeScript + Viteで構築された現代的な家計簿アプリのフロントエンドです。コンポーネントベースアーキテクチャで再利用性と保守性を重視しています。

## 🚀 技術スタック

- **React 19** + **TypeScript** + **Vite** + **React Router v7**
- **Material-UI (MUI) v6** + **MUI X DatePickers** + **Emotion**
- **Jest** + **React Testing Library** + **Storybook v8**
- **react-hook-form** + **Zodバリデーション**

## 🏗 開発

```bash
# Docker環境（推奨） - Makefile使用
make test-frontend               # テスト実行（240テスト）
make test-file FILE=ファイル名    # 特定テストのみ実行
make lint-frontend               # ESLintチェック
make format-frontend             # Prettierフォーマット
make npm-install                 # 依存関係インストール
make quality-check-frontend      # 5段階品質チェック
make storybook-frontend          # Storybook起動（統合ドキュメント）
make test-coverage-open          # カバレッジレポート表示

# ローカル環境
npm run dev             # 開発サーバー (http://localhost:5173)
npm test                # テスト実行
npm run build           # プロダクションビルド
npm run storybook       # Storybook起動 (http://localhost:6006)
```

## 📁 アーキテクチャ構成（Phase 2対応）

```
src/
├── components/                      # 28コンポーネントの機能別分離
│   ├── ui/                      # UI基本コンポーネント（10個）
│   │   ├── AmountInput.tsx      # 金額入力（スタイル分離）
│   │   ├── AmountText.tsx       # 金額表示
│   │   ├── TextInput.tsx        # MUI TextField統合
│   │   ├── Button.tsx           # MUI Button統合
│   │   └── ...
│   ├── forms/                   # フォーム関連（6個）
│   │   ├── ControlledAmountInput.tsx    # react-hook-form連携
│   │   ├── TransactionForm.tsx          # 統合フォーム
│   │   └── ...
│   ├── navigation/              # ナビゲーション（10個）
│   │   ├── AppDrawer.tsx        # サイドドロワー
│   │   ├── AppTopBar.tsx        # トップバー
│   │   └── ...
│   ├── layout/                  # レイアウト（2個）
│   │   └── AppLayout.tsx        # メインレイアウト
│   └── provider/                # プロバイダー（2個）
│       └── DateLocalizationProvider.tsx
├── pages/                       # 5ページ + テスト
│   ├── DashboardPage.tsx    # ダッシュボード
│   ├── ExpensePage.tsx      # 支出管理
│   └── ...
├── routes/                      # ルーティング（React Router v7）
│   └── routes.tsx           # useRoutes + コード分割
├── hooks/                       # カスタムフック（5個）
│   ├── useBudgetManager.ts  # 統合家計簿管理
│   ├── useMoney.ts          # 金額状態管理
│   └── ...
├── lib/                         # ライブラリ
│   ├── format/money.ts      # 金額フォーマット
│   └── validation/schemas.ts # Zodスキーマ
├── types/                       # TypeScript型定義（7ファイル）
│   ├── components.ts        # コンポーネント型
│   ├── forms.ts             # フォーム型
│   └── ...
└── App.tsx                      # メインアプリ（useRoutes）
```

## 🧪 テスト戦略（240テスト + 25スイート）

### テスト構成
- **単体テスト**: __tests__/でco-locatedパターン
- **統合テスト**: ルーティング、データフロー統合テスト
- **Storybookテスト**: コンポーネントストーリー + ドキュメント
- **パフォーマンス最適化**: Jest timeout延長、act()警告解決、Ripple無効化

### テスト実行例
```bash
# 特定コンポーネントのテスト
make test-file FILE=AmountInput.test.tsx
make test-file FILE=TransactionForm.test.tsx

# 部分マッチで関連テスト実行
make test-file FILE="Money"          # 金額関連
make test-file FILE="Navigation"     # ナビ関連
make test-file FILE="Controlled"     # フォーム関連
```

## 📝 開発規約 & 品質保証

### コード品質
- **TypeScript strict mode** - 厳密な型チェック
- **MUI v6** - sx props + slotProps活用
- **React 19** - ref as propパターン（forwardRef不使用）
- **ESLint + Prettier** - 自動整形 + コード品質チェック

### 5段階品質チェック
1. **Prettier** - コードフォーマット
2. **ESLint** - コード品質・ベストプラクティス
3. **TypeScript** - 型チェック
4. **Jest** - テスト実行
5. **Vite Build** - プロダクションビルド確認

### アーキテクチャ原則
- **コンポーネント分離** - ui/forms/navigation/layoutで機能別分離
- **バレルエクスポート** - index.tsで統一インポート
- **型安全** - 7つの型定義ファイルで厳密管理
- **TSDoc** - @example中心の実用的ドキュメント

## 🔗 関連リソース

- **統合ドキュメント**: [Storybook](http://localhost:6006) - コンポーネントカタログ + 使用例
- **APIドキュメント**: [TypeDoc](./docs/index.html) - 型定義 + API仕様
- **テストカバレッジ**: [Coverage Report](./coverage/lcov-report/index.html)
- **用語集**: [docs-src/glossary.md](./docs-src/glossary.md) - ドメイン用語定義
- **品質ガイド**: [docs-src/quality/](./docs-src/quality/) - a11y/性能方針

詳細な実装例やベストプラクティスはStorybookやコード内TSDocコメントを参照してください。