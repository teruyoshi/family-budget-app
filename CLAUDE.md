# CLAUDE.md

このファイルは、Claude Code (claude.ai/code) 専用の開発ガイダンスです。

**最終更新**: 2025年8月12日（AI自動ドキュメンテーション運用開始）

## 📋 プロジェクト概要

家計簿管理フルスタックWebアプリケーション
- **フロントエンド**: React 19 + TypeScript + Vite + MUI v6
- **バックエンド**: Go 1.21 + Gin + GORM + MySQL 8.0
- **インフラ**: Docker Compose

## 🎯 Claude作業指示

### 基本方針
- **作業ディレクトリ**: `~/workspace/family-budget-app`
- **コンテナベース**: Makefile使用でDockerコンテナ内実行
- **🎯 必須作業フロー**: **1タスク集中→完了→停止→指示待ち**
  - TodoWrite使用でタスク管理
  - **複数タスクの並行作業は絶対禁止**
  - 1つのタスクが完了するまで他に手を出さない
  - 完了後は必ず停止してユーザーの指示を待つ

### 必須コマンド（Makefile使用）

#### 開発・テスト
```bash
make test-frontend        # フロントエンドテスト
make test-backend         # バックエンドテスト  
make lint-frontend        # ESLintチェック
make format-frontend      # Prettierフォーマット
make npm-install          # 依存関係インストール
make test-coverage-open   # テストカバレッジをブラウザで表示
make quality-check        # 統合品質チェック（lint+format+test）
```

#### ドキュメント・Storybook
```bash
make storybook-frontend           # Storybookサーバー起動（ポート6006）
make storybook-stop-frontend      # Storybookサーバー停止
```

#### コンテナ操作
```bash
make up                   # 全サービス起動
make dev                  # 開発環境（ログ表示）
make down                 # 全サービス停止
make frontend-shell       # フロントエンドコンテナ接続
make backend-shell        # バックエンドコンテナ接続
```

### 作業完了基準
- **テスト通過**: コミット前に `make test-frontend` で全テスト通過確認
- **品質チェック**: `make lint-frontend` でコード品質確認
- **AI自動ドキュメンテーション**: コンポーネント作成・修正時に TSDoc・用語集を自動更新
- **Claude署名**: GitHubコメント・コミットメッセージに `🤖 Generated with [Claude Code](https://claude.ai/code)` 署名

### 開発環境URL
- **フロントエンド**: http://localhost:5173
- **バックエンドAPI**: http://localhost:8080  
- **phpMyAdmin**: http://localhost:8081 (root/root)
- **Storybook（統合ドキュメント）**: http://localhost:6006

## 📁 現在のアーキテクチャ

```
frontend/
├── src/
│   ├── components/common/        # 汎用コンポーネント（JSDoc完備）
│   │   ├── __stories__/         # Storybookストーリーファイル
│   │   ├── AmountInput.tsx      # 金額入力（¥フォーマット対応）
│   │   ├── AmountText.tsx       # 金額表示（lib/format統一化済み）
│   │   ├── AppTitle.tsx         # アプリタイトル
│   │   ├── DatePicker.tsx       # 日付選択
│   │   ├── TextInput.tsx        # テキスト入力
│   │   ├── TextLabel.tsx        # ラベル表示
│   │   └── TransactionForm.tsx  # 取引フォーム統合
│   ├── features/
│   │   ├── balance/             # 残高表示機能
│   │   │   └── components/
│   │   │       ├── __stories__/ # Storybookストーリーファイル
│   │   │       └── BalanceDisplay.tsx
│   │   ├── expenses/            # 支出管理機能
│   │   │   └── components/
│   │   │       ├── __stories__/ # Storybookストーリーファイル
│   │   │       ├── ExpenseForm.tsx
│   │   │       ├── ExpenseInput.tsx
│   │   │       └── TotalExpenseDisplay.tsx
│   │   ├── income/              # 収入管理機能
│   │   │   └── components/
│   │   │       ├── __stories__/ # Storybookストーリーファイル
│   │   │       ├── IncomeForm.tsx
│   │   │       ├── IncomeInput.tsx
│   │   │       └── TotalIncomeDisplay.tsx
│   │   └── history/             # 履歴表示機能
│   │       ├── __stories__/     # Storybookストーリーファイル
│   │       ├── ExpenseHistory.tsx
│   │       ├── IncomeHistory.tsx
│   │       └── common/          # 履歴共通コンポーネント
│   │           ├── __stories__/ # Storybookストーリーファイル
│   │           ├── HistoryItem.tsx
│   │           └── HistoryList.tsx    # 日付グループ化対応
│   ├── hooks/
│   │   ├── useBudgetManager.ts  # 統合家計簿管理フック
│   │   ├── useMoney.ts          # 金額状態管理（単一責任分離済み）
│   │   ├── useMoneyFormat.ts    # 金額フォーマット専用フック
│   │   └── __tests__/           # フックテスト（単体・統合分離）
│   ├── lib/
│   │   └── format/
│   │       ├── money.ts         # 金額フォーマットライブラリ（MAX_SAFE_INTEGER対応）
│   │       └── __tests__/
│   │           └── money.test.ts # 金額フォーマットテスト（115テスト通過）
│   └── App.tsx                  # メインアプリ
├── .storybook/                   # Storybook設定
├── docs/                        # TypeDoc生成ドキュメント
├── coverage/                    # テストカバレッジレポート（gitignore対象）
└── typedoc.json                 # TypeDoc設定
```

## 🔧 現在の設定情報
- **プロジェクト名**: FamilyBudgetApp (v0.3.1)
- **テスト状況**: 127テスト、14テストスイート全通過
- **主要機能**: 支出・収入登録、残高計算、日付グループ化履歴表示、AI自動ドキュメンテーション
- **ドキュメント**: TSDoc統一化、Storybookトレーサビリティ表、用語集自動更新、ADR自動生成
- **品質対策**: MAX_SAFE_INTEGER精度チェック、統合品質コマンド

## 🤖 AI自動ドキュメンテーション運用

### 基本方針
- **コンポーネント作成・編集時**: AI自律的にTSDoc・用語集・トレーサビリティ表を更新
- **管理可能性重視**: 複雑なドキュメントは簡潔化、困難なものは作成しない
- **段階的適用**: 重要コンポーネントから順次適用、完璧主義を避ける

### TSDoc統一化（完了）
- **形式**: @remarks, @example, @defaultValue を使用
- **Props型**: 必ずexportし、react-docgen-typescriptで自動抽出
- **品質管理**: eslint-plugin-tsdocで構文チェック（将来的に厳格化）

### Storybookトレーサビリティ表（主要コンポーネント適用済み）
- **連携表**: ADR・用語集・テスト・品質ガイドとの関連性を明示
- **適用範囲**: AmountInput, AmountText, TransactionForm等の重要コンポーネント
- **管理負荷**: 管理困難な複雑表は避け、シンプルな構成を維持

### 用語集自動更新（v1.2.0運用中）
- **新概念検出**: コンポーネント開発時に自動で用語追加
- **データモデル同期**: Mermaid図の自動更新
- **更新履歴**: バージョン管理で変更履歴を追跡

## 🎨 コード規約
- **TypeScript**: strict mode、包括的TSDocコメント必須
- **MUI**: コンポーネント優先、sx propsスタイリング
- **パス**: `@/`エイリアスでsrcディレクトリ参照
- **エクスポート**: バレルエクスポート（index.ts）で再利用性向上
- **テスト**: 単体テスト重視（結合テスト最小化で高速化）
- **精度対策**: 金額はMAX_SAFE_INTEGER範囲内チェック必須（lib/format/money.ts活用）

## 🔗 関連リソース
- **用語集**: [docs-src/glossary.md](frontend/docs-src/glossary.md) - v1.2.0（自動更新運用中）
- **ADR**: [docs-src/adr/](frontend/docs-src/adr/) - 技術判断記録（自動生成対応）
- **品質ガイド**: [docs-src/quality/](frontend/docs-src/quality/) - アクセシビリティ・パフォーマンス
- **PRテンプレート**: [.github/PULL_REQUEST_TEMPLATE.md](.github/PULL_REQUEST_TEMPLATE.md) - 品質チェックリスト

## 📈 完了済み主要機能
- ✅ **金額フォーマット統一化**: lib/format/money.ts による Single Source of Truth
- ✅ **フック分離**: useMoney（状態）+ useMoneyFormat（表示）の単一責任分離
- ✅ **精度対策**: MAX_SAFE_INTEGER チェックで景の桁バグ根本解決  
- ✅ **AI自動ドキュメンテーション**: TSDoc・用語集・ADRの運用体制確立