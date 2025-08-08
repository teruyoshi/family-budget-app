# CLAUDE.md

このファイルは、Claude Code (claude.ai/code) 専用の開発ガイダンスです。

**最終更新**: 2024年8月（TypeDoc + Storybook統合完了）

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
make docs-frontend                # TypeDocドキュメント生成
make docs-serve-frontend          # TypeDocサーバー起動（ポート3001）
make storybook-frontend           # Storybookサーバー起動（ポート6006）
make generate-stories-frontend    # JSDocからストーリー自動生成
make docs-dev-frontend            # TypeDoc + Storybook 連携開発モード
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
- **TypeDoc（技術仕様書）**: http://localhost:3001
- **Storybook（コンポーネント）**: http://localhost:6006

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
├── scripts/
│   └── auto-generate-stories.cjs # Storybookストーリー自動生成
├── .storybook/                   # Storybook設定
├── docs/                        # TypeDoc生成ドキュメント
└── typedoc.json                 # TypeDoc設定
```

## 🔧 現在の設定情報
- **プロジェクト名**: FamilyBudgetApp (v0.3.0)
- **テスト状況**: 43テスト、10テストスイート全通過
- **主要機能**: 支出・収入登録、残高計算、日付グループ化履歴表示
- **UI改善**: 金額¥表示、右寄せ入力、日付セクション分け
- **ドキュメント**: TypeDoc + Storybook 連携統合、JSDoc自動ストーリー生成

## 📚 ドキュメント統合システム
- **TypeDoc**: 包括的な技術仕様書（JSDocコメント、型定義、アーキテクチャ）
- **Storybook**: インタラクティブなコンポーネントドキュメント
- **自動生成**: JSDocコメントからStorybookストーリーを自動作成
- **相互リンク**: TypeDoc ⟷ Storybook 間のクロスリファレンス

### ドキュメント更新フロー
1. コンポーネント開発・修正
2. `make generate-stories-frontend` でストーリー自動生成
3. `make docs-dev-frontend` で両システム起動・確認

## 🎨 コード規約
- **TypeScript**: strict mode、包括的JSDocコメント必須
- **MUI**: コンポーネント優先、sx propsスタイリング
- **パス**: `@/`エイリアスでsrcディレクトリ参照
- **エクスポート**: バレルエクスポート（index.ts）で再利用性向上
- **テスト**: 単体テスト重視（結合テスト最小化で高速化）
- **ドキュメント**: コンポーネント作成・修正時はJSDoc更新必須