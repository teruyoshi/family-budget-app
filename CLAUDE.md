# CLAUDE.md

このファイルは、Claude Code (claude.ai/code) 専用の開発ガイダンスです。

**最終更新**: 2025年8月（JSDoc + Storybook Docs統合完了）

## 📋 プロジェクト概要

家計簿管理フルスタックWebアプリケーション
- **フロントエンド**: React 19 + TypeScript + Vite + MUI v6
- **バックエンド**: Go 1.21 + Gin + GORM + MySQL 8.0
- **インフラ**: Docker Compose

## 🎯 Claude作業指示

### 基本方針
- **作業ディレクトリ**: `~/workspace/family-budget-app`
- **コンテナベース**: Makefile使用でDockerコンテナ内実行
- **タスク管理**: TodoWrite使用、1タスク集中→完了→停止→指示待ち

### 必須コマンド（Makefile使用）

#### 開発・テスト
```bash
make test-frontend        # フロントエンドテスト
make test-backend         # バックエンドテスト  
make lint-frontend        # ESLintチェック
make format-frontend      # Prettierフォーマット
make npm-install          # 依存関係インストール
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
- **🛑 重要: 1つのTodoタスク完了→必ず停止**
- 次の指示を待つ
- コミット前テスト確認必須

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
│   │   ├── AmountText.tsx       # 金額表示
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
│   │   └── useBudgetManager.ts  # 統合家計簿管理フック
│   └── App.tsx                  # メインアプリ
├── .storybook/                   # Storybook設定
├── docs/                        # TypeDoc生成ドキュメント
└── typedoc.json                 # TypeDoc設定
```

## 🔧 現在の設定情報
- **プロジェクト名**: FamilyBudgetApp (v0.3.0)
- **テスト状況**: 43テスト、10テストスイート全通過
- **主要機能**: 支出・収入登録、残高計算、日付グループ化履歴表示
- **UI改善**: 金額¥表示、右寄せ入力、日付セクション分け
- **ドキュメント**: JSDoc + Storybook Docs統合、react-docgen-typescript自動反映

## 📚 ドキュメントシステム（JSDoc + Storybook）
- **Storybook**: 唯一の統合ドキュメントプラットフォーム
- **JSDoc → docgen**: TypeScript型定義とJSDocを自動的にStorybookに反映
- **react-docgen-typescript**: Props型情報とJSDocコメントの自動抽出
- **インタラクティブ**: 実際のコンポーネント操作とドキュメントが統合

### JSDoc記述ルール（docgen最適化）
1. **コンポーネント直前**: JSDocはコンポーネント定義の直前に配置
2. **Props型export**: interface/type定義は必ずexportする
3. **詳細説明**: 各プロパティに用途・制約・例を明記
4. **@example追加**: JSXコードブロックで実用例を提供
5. **@component/@remarks**: コンポーネントの特徴・注意点を記述

### ドキュメント更新フロー
1. コンポーネント開発・修正時にJSDoc更新（Props型はexport必須）
2. 手動でStorybookストーリーファイル作成（*.stories.tsx）
3. `make storybook-frontend` でドキュメント確認（JSDoc自動反映）

## 🎨 コード規約
- **TypeScript**: strict mode、包括的JSDocコメント必須
- **MUI**: コンポーネント優先、sx propsスタイリング
- **パス**: `@/`エイリアスでsrcディレクトリ参照
- **エクスポート**: バレルエクスポート（index.ts）で再利用性向上
- **テスト**: 単体テスト重視（結合テスト最小化で高速化）
- **ドキュメント**: コンポーネント作成・修正時はJSDoc更新必須

## 🤖 AI活用：JSDoc保守プロンプト

セッション開始時にAIに渡すプロンプト：

```
あなたはこのセッションのJSDoc保守担当エンジニアです。
目的：JSDocをprops直前に追加/更新し、Storybook Docs（docgen）に正しく出るように整備する。

ルール:
- すべての公開コンポーネントに説明（概要/remarks）を付与
- Propsは各プロパティ直前にJSDoc（説明、必要なら@param、制約）を記述
- 使用例(@example)は1つ以上（JSXで）
- Props型定義は必ずexportする
- 不明点は必ず質問。推測で省略しない
- テストファイル（`**.test.tsx`、`**.spec.tsx`、`**.test.ts`、`**.spec.ts`）は対象外

出力:
- 変更差分に対するコード（JSDoc入り）を返す
- インデント・改行は整形する
```