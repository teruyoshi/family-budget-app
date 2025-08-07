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

### TDD開発フロー
1. **Red**: テスト作成→失敗確認 (`make test-frontend`)
2. **Green**: 最小実装→テスト通過 (`make test-frontend`)  
3. **Refactor**: リファクタリング (`make test-frontend`)

### テスト配置戦略
- **co-located**: シンプル（`*.test.tsx`）
- **__tests__/**: 複雑コンポーネント単体テスト
- **integration/**: フィーチャー統合テスト
- **MUI対応**: 数値型フィールド、非同期状態管理

### 作業完了基準
- **🛑 重要: 1つのTodoタスク完了→必ず停止**
- 次の指示を待つ
- コミット前テスト確認必須

### 開発環境URL
- フロントエンド: http://localhost:5173
- バックエンドAPI: http://localhost:8080  
- phpMyAdmin: http://localhost:8081 (root/root)

### コード規約
- TypeScript strict mode
- MUIコンポーネント優先
- sx propsスタイリング
- type-only imports最適化

## 📁 重要なファイル構造

```
frontend/src/
├── components/common/        # 汎用コンポーネント
│   └── TextInput.tsx
├── features/expenses/        # 支出管理フィーチャー
│   └── components/
│       ├── ExpenseForm.tsx
│       ├── ExpenseInput.tsx
│       └── __tests__/        # テスト
└── App.tsx                   # メインアプリ

backend/internal/
├── models/models.go          # データモデル
├── handlers/                 # APIハンドラー
└── database/database.go      # DB操作
```

## 🔧 最新の設定情報
- **プロジェクト名**: FamilyBudgetApp (v0.1.0)
- **テスト状況**: 19テスト、5テストスイート全通過
- **Prettier**: セミコロンなし設定
- **ESLint**: テストファイル対応済み