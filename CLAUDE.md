# CLAUDE.md

このファイルは、Claude Code (claude.ai/code) 専用の開発ガイダンスです。

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
- フロントエンド: http://localhost:5173
- バックエンドAPI: http://localhost:8080  
- phpMyAdmin: http://localhost:8081 (root/root)

## 📁 現在のアーキテクチャ

```
frontend/src/
├── components/common/        # 汎用コンポーネント
│   ├── AmountInput.tsx      # 金額入力（¥フォーマット対応）
│   ├── AmountText.tsx       # 金額表示
│   ├── AppTitle.tsx         # アプリタイトル
│   ├── TextInput.tsx        # テキスト入力
│   └── TextLabel.tsx        # ラベル表示
├── features/
│   ├── balance/             # 残高表示機能
│   │   └── components/BalanceDisplay.tsx
│   ├── expenses/            # 支出管理機能
│   │   └── components/
│   │       ├── ExpenseForm.tsx
│   │       ├── ExpenseInput.tsx
│   │       └── TotalExpenseDisplay.tsx
│   ├── income/              # 収入管理機能
│   │   └── components/
│   │       ├── IncomeForm.tsx
│   │       ├── IncomeInput.tsx
│   │       └── TotalIncomeDisplay.tsx
│   └── history/             # 履歴表示機能
│       ├── ExpenseHistory.tsx
│       ├── IncomeHistory.tsx
│       └── common/          # 履歴共通コンポーネント
│           ├── HistoryItem.tsx
│           └── HistoryList.tsx    # 日付グループ化対応
├── hooks/
│   └── useBudgetManager.ts  # 統合家計簿管理フック
└── App.tsx                  # メインアプリ
```

## 🔧 現在の設定情報
- **プロジェクト名**: FamilyBudgetApp (v0.3.0)
- **テスト状況**: 43テスト、10テストスイート全通過
- **主要機能**: 支出・収入登録、残高計算、日付グループ化履歴表示
- **UI改善**: 金額¥表示、右寄せ入力、日付セクション分け

## 🎨 コード規約
- TypeScript strict mode
- MUIコンポーネント優先、sx propsスタイリング
- `@/`パスエイリアスでsrcディレクトリ参照
- バレルエクスポート（index.ts）で再利用性向上
- 単体テスト重視（結合テスト最小化で高速化）