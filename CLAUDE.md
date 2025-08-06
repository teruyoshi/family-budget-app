# CLAUDE.md

このファイルは、このリポジトリでコードを操作する際にClaude Code (claude.ai/code) にガイダンスを提供します。

## プロジェクト概要

家計簿管理のためのフルスタックWebアプリケーションです。収支管理、カテゴリ別予算設定、データ可視化機能を提供します。

## 技術スタック

- **フロントエンド**: React 19 + TypeScript + Vite
- **スタイリング**: Material-UI (MUI) v6 + Emotion
- **コンポーネント**: MUI Material Components、sx props、テーマシステム
- **開発ツール**: ESLint, Prettier, Jest + React Testing Library
- **型システム**: TypeScript strict mode、type-only imports最適化
- **テスト戦略**: ハイブリッドテスト配置（単体テスト用__tests__、統合テスト用integration/）
- **バックエンド**: Go 1.21 + Gin + GORM
- **データベース**: MySQL 8.0
- **インフラ**: Docker + Docker Compose

## プロジェクト構造

```
family-budget-app/
├── .gitignore
├── .env.example          # 環境変数テンプレート
├── compose.yml           # Docker Compose設定
├── Makefile              # Docker Compose管理コマンド
├── CLAUDE.md
├── README.md
├── .vscode/              # VS Code設定
│   └── settings.json     # Prettier自動フォーマット設定
├── frontend/             # React フロントエンド
│   ├── src/
│   │   ├── App.tsx       # メインアプリケーション（MUI Container使用）
│   │   ├── App.test.tsx  # App.tsx単体テスト（co-located）
│   │   ├── main.tsx      # エントリーポイント
│   │   ├── setupTests.ts # テスト環境設定
│   │   ├── components/   # 再利用可能コンポーネント
│   │   │   └── common/   # 汎用コンポーネント
│   │   │       ├── TextInput.tsx # MUI TextFieldベース汎用入力
│   │   │       └── __tests__/    # 単体テスト
│   │   │           └── TextInput.test.tsx # TextInput包括テスト
│   │   ├── features/     # フィーチャーベース構成
│   │   │   └── expenses/ # 支出管理フィーチャー
│   │   │       └── components/
│   │   │           ├── ExpenseForm.tsx  # MUI Boxベース支出フォーム
│   │   │           ├── ExpenseInput.tsx # 数値入力特化コンポーネント
│   │   │           └── __tests__/       # テストディレクトリ
│   │   │               ├── ExpenseForm.test.tsx  # フォーム単体テスト
│   │   │               ├── ExpenseInput.test.tsx # 入力単体テスト
│   │   │               └── integration/          # 統合テスト
│   │   │                   └── expense-flow.test.tsx # フロー統合テスト
│   │   └── assets/       # 静的アセット
│   ├── public/           # 公開ファイル
│   ├── docs/             # フロントエンド専用ドキュメント
│   │   ├── COMPONENT_GUIDE.md # コンポーネント設計ガイド
│   │   └── DEVELOPMENT.md     # 開発ガイドライン
│   ├── package.json      # npm依存関係（MUI, Emotion含む）
│   ├── vite.config.ts    # Vite設定
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
└── docker/              # Dockerファイル
    ├── frontend/
    │   └── Dockerfile   # React用コンテナ
    └── backend/
        └── Dockerfile   # Go用コンテナ
```

## 開発コマンド

### Makefile（推奨）
```bash
make up                       # 全サービス起動（バックグラウンド）
make dev                      # 開発環境起動（ログ表示）
make down                     # 全サービス停止
make logs                     # 全サービスログ確認
make frontend                 # フロントエンドログ確認
make backend                  # バックエンドログ確認
make help                     # 利用可能なコマンド一覧
```

### Docker Compose（直接実行）
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
npm test             # Jestテスト実行（設定完了）
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
- **Material-UI (MUI) v6**: コンポーネントライブラリとテーマシステム
  - Emotionベースのスタイリングソリューション
  - sx propsによるコンポーネントレベルスタイリング
  - Material Design準拠のコンポーネント群
- **TypeScript最適化**: type-only imports、strict mode設定
- **開発ツール**: ESLint + Prettier + Jest設定完了、Makefileベースlint実行
- **テスト環境**: Jest + React Testing Library完全対応
  - ハイブリッドテスト配置戦略（単体・統合テスト分離）
  - 全テストスイート通過（19テスト、5テストスイート）
  - MUI特化のテスト最適化（数値型対応、非同期状態管理）
- **VS Code統合**: 自動フォーマット設定
- **Docker対応**: 開発環境コンテナ化

### ✅ バックエンドAPI基盤
- **Go + Gin + GORM**: 高性能REST APIサーバー
- **MySQL接続**: GORM経由での型安全なデータベース操作
- **データモデル**: User, Category, Transaction, Budget定義済み
- **GORM自動マイグレーション**: 起動時にモデルからスキーマ自動生成
- **初期データシード**: バックエンドコードからデフォルトカテゴリ自動投入
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
- **Makefile管理**: Docker Composeコマンドの簡単実行
- **マルチステージビルド**: 本番用最適化Dockerfileによるセキュアなコンテナ
- **phpMyAdmin**: データベース管理UI（ポート8081）
- **GORM運用**: SQLファイル不要、コードベースでのスキーマ管理

## データベーススキーマ

### テーブル構造
- **users**: ユーザー管理 (id, name, email, timestamps)
- **categories**: 収支カテゴリ (id, name, type, color, description, timestamps)
- **transactions**: 取引記録 (id, user_id, category_id, amount, description, date, timestamps)  
- **budgets**: 月次予算 (id, user_id, category_id, amount, month, timestamps)

### 初期データ（GORM自動シード）
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
make build && make up       # 全サービスビルド・起動
# または
docker compose up --build  # 直接実行
```

### 動作確認URL
- **フロントエンド**: http://localhost:5173
- **バックエンドAPI**: http://localhost:8080
- **API健康状態**: http://localhost:8080/api/health
- **phpMyAdmin**: http://localhost:8081 (root / root)

## Claude開発作業指示

### 基本作業方針
- **作業ディレクトリ**: 必ずプロジェクトルート (`/home/teruyoshi/workspace/family-budget-app`) で作業する
- **コンテナベース開発**: フロントエンドの作業はすべてMakefileを使用してDocker容器内で実行する
- **タスク管理**: Todo機能を使用して一つのタスクに集中し、完了次第作業を停止して指示を仰ぐ

### Docker開発コマンド（Makefile使用）

#### テスト実行
```bash
make test-frontend        # フロントエンドテストのみ実行
make test-backend         # バックエンドテストのみ実行
make test                 # 全テスト実行
```

#### Lint実行
```bash
make lint-frontend        # フロントエンドLintチェックのみ実行
make lint-backend         # バックエンドLintチェックのみ実行
make lint                 # 全Lintチェック実行
```

#### パッケージ管理
```bash
make npm-install                          # package.jsonの依存関係インストール
make npm-install-package PKG=react-router # 新しいパッケージ追加
```

#### 開発・デバッグ
```bash
make frontend-shell       # フロントエンドコンテナに接続
make backend-shell        # バックエンドコンテナに接続
make frontend             # フロントエンドログ確認
make backend              # バックエンドログ確認
```

### TDD開発フロー
1. **Red**: テスト書いて失敗を確認 → `make test-frontend`
2. **Green**: 最小限の実装でテスト通す → `make test-frontend`
3. **Refactor**: リファクタリング → `make test-frontend`

### テスト配置戦略
- **co-located**: 単純なコンポーネントのテスト（App.test.tsx等）
- **__tests__ディレクトリ**: 複雑なコンポーネントの単体テスト
- **integration/**: フィーチャー統合テスト（フロー・ワークフロー）
- **MUI対応**: 数値型フィールド、非同期更新に対応したテスト実装

### 作業完了の判断基準
- 一つのTodoタスクが完了したら必ず作業を停止
- ユーザーからの次の指示を待つ
- コミット前に必ずテストが通ることを確認