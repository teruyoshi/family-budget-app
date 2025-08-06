# CLAUDE.md

このファイルは、このリポジトリでコードを操作する際にClaude Code (claude.ai/code) にガイダンスを提供します。

## プロジェクト概要

家計簿管理のためのフルスタックWebアプリケーションです。収支管理、カテゴリ別予算設定、データ可視化機能を提供します。

## 技術スタック

- **フロントエンド**: React 19 + TypeScript + Vite
- **スタイリング**: Tailwind CSS + PostCSS
- **開発ツール**: ESLint, Prettier, Jest
- **バックエンド**: Go 1.21 + Gin + GORM
- **データベース**: MySQL 8.0
- **インフラ**: Docker + Docker Compose

## プロジェクト構造

```
family-budget-app/
├── .gitignore
├── .env.example          # 環境変数テンプレート
├── compose.yml           # Docker Compose設定
├── CLAUDE.md
├── README.md
├── .vscode/              # VS Code設定
│   └── settings.json     # Prettier自動フォーマット設定
├── frontend/             # React フロントエンド
│   ├── src/
│   │   ├── App.tsx       # メインアプリケーション
│   │   ├── main.tsx      # エントリーポイント
│   │   ├── setupTests.ts # テスト環境設定
│   │   └── assets/       # 静的アセット
│   ├── public/           # 公開ファイル
│   ├── package.json      # npm依存関係
│   ├── vite.config.ts    # Vite設定
│   ├── tailwind.config.js# Tailwind CSS設定
│   ├── postcss.config.js # PostCSS設定
│   ├── .prettierrc       # Prettier設定
│   ├── jest.config.js    # Jest設定
│   └── eslint.config.js  # ESLint設定
├── backend/              # Go言語バックエンド
│   ├── cmd/server/       # アプリケーションエントリーポイント
│   │   └── main.go       # メインサーバー
│   ├── internal/         # 内部パッケージ
│   │   ├── models/       # データモデル
│   │   │   └── models.go # User, Category, Transaction, Budget
│   │   ├── database/     # データベース接続・操作
│   │   │   └── database.go
│   │   ├── handlers/     # HTTPハンドラー
│   │   │   ├── health.go     # ヘルスチェック
│   │   │   └── categories.go # カテゴリAPI
│   │   └── middleware/   # ミドルウェア
│   │       └── cors.go   # CORS設定
│   ├── go.mod           # Go モジュール定義
│   └── go.sum           # 依存関係チェックサム
├── docker/              # Dockerファイル
│   ├── frontend/
│   │   └── Dockerfile   # React用コンテナ
│   └── backend/
│       └── Dockerfile   # Go用コンテナ
└── db/                  # データベース関連
    └── init.sql         # MySQL初期スキーマ
```

## 開発コマンド

### Docker Compose（推奨）
```bash
docker compose up -d          # 全サービス起動（バックグラウンド）
docker compose up             # 全サービス起動（ログ表示）
docker compose down           # 全サービス停止
docker compose logs frontend  # フロントエンドログ確認
docker compose logs backend   # バックエンドログ確認
```

### 個別開発
#### フロントエンド
```bash
cd frontend
npm install          # 依存関係のインストール
npm run dev          # 開発サーバー起動 (http://localhost:5173)
npm run build        # プロダクションビルド
npm run lint         # ESLintチェック
# npm test           # Jestテスト実行（未設定）
```

#### バックエンド
```bash
cd backend
go mod tidy                    # 依存関係の整理
go run cmd/server/main.go      # 開発サーバー起動 (http://localhost:8080)
go build -o bin/server cmd/server/main.go  # バイナリビルド
./bin/server                   # 本番環境起動
```

## Docker構成

### サービス一覧
- **frontend**: React開発サーバー (ポート5173)
- **backend**: Go API (ポート8080) 
- **db**: MySQL データベース (ポート3306)
- **phpmyadmin**: データベース管理UI (ポート8081)

### アクセスURL
- フロントエンド: http://localhost:5173
- バックエンドAPI: http://localhost:8080
- phpMyAdmin: http://localhost:8081 (root / root)

## 実装済み機能

### ✅ フロントエンド基盤
- **React 19 + TypeScript + Vite**: モダンな開発環境
- **Tailwind CSS**: ユーティリティファーストCSS
- **開発ツール**: ESLint + Prettier + Jest設定完了
- **VS Code統合**: 自動フォーマット設定
- **Docker対応**: 開発環境コンテナ化

### ✅ バックエンドAPI基盤
- **Go + Gin + GORM**: 高性能REST APIサーバー
- **MySQL接続**: GORM経由での型安全なデータベース操作
- **データモデル**: User, Category, Transaction, Budget定義済み
- **自動マイグレーション**: 起動時にスキーマ自動作成
- **初期データシード**: デフォルトカテゴリ自動投入
- **CORS対応**: フロントエンド連携設定完了

### ✅ 実装済みAPI
- `GET /api/health` - ヘルスチェック（データベース接続確認含む）
- `GET /api/categories` - カテゴリ一覧取得
- `POST /api/categories` - 新規カテゴリ作成
- `GET /api/categories/:id` - 特定カテゴリ取得
- `PUT /api/categories/:id` - カテゴリ更新
- `DELETE /api/categories/:id` - カテゴリ削除

### ✅ インフラ・DevOps
- **Docker Compose**: フルスタック開発環境（frontend, backend, db, phpMyAdmin）
- **マルチステージビルド**: 本番用最適化Dockerfileによるセキュアなコンテナ
- **phpMyAdmin**: データベース管理UI
- **環境変数管理**: .env.example テンプレート

## データベーススキーマ

### テーブル構造
- **users**: ユーザー管理 (id, name, email, timestamps)
- **categories**: 収支カテゴリ (id, name, type, color, description, timestamps)
- **transactions**: 取引記録 (id, user_id, category_id, amount, description, date, timestamps)  
- **budgets**: 月次予算 (id, user_id, category_id, amount, month, timestamps)

### 初期データ
- **支出カテゴリ**: 食費, 交通費, 娯楽費, 光熱費, 通信費, 医療費
- **収入カテゴリ**: 給与, 副収入

## 次のステップ（優先順）

### 🚧 フェーズ1: トランザクションAPI実装
1. **Transaction CRUD API**
   - `GET /api/transactions` - 取引一覧（フィルタ・ページネーション対応）
   - `POST /api/transactions` - 新規取引登録
   - `PUT /api/transactions/:id` - 取引更新
   - `DELETE /api/transactions/:id` - 取引削除

### 🚧 フェーズ2: フロントエンド家計簿UI
1. **基本コンポーネント**
   - TransactionForm - 取引入力フォーム
   - TransactionList - 取引履歴表示
   - CategorySelector - カテゴリ選択
   - DatePicker - 日付選択
   - AmountInput - 金額入力

2. **ページ実装**
   - Dashboard - 収支サマリー
   - Transactions - 取引管理
   - Categories - カテゴリ管理

### 🚧 フェーズ3: 高度な機能
1. **Budget API + UI** - 予算管理機能
2. **データ可視化** - Chart.js/Recharts使用
3. **ユーザー認証** - JWT実装
4. **レポート機能** - 月次/年次レポート

## 開発セットアップ

### 初回セットアップ
```bash
# リポジトリクローン後
cp .env.example .env        # 環境変数設定
docker compose up --build  # 全サービス起動
```

### 動作確認URL
- **フロントエンド**: http://localhost:5173
- **バックエンドAPI**: http://localhost:8080
- **API健康状態**: http://localhost:8080/api/health
- **phpMyAdmin**: http://localhost:8081 (root / root)