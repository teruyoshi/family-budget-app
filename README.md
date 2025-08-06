# Family Budget App

家計簿管理のためのモダンなフルスタックWebアプリケーション。収支管理、カテゴリ別予算設定、データ可視化機能を提供します。

## 🚀 特徴

- **モダンなUI/UX**: Material-UI (MUI) v6によるレスポンシブデザイン
- **型安全性**: TypeScript strict mode完全対応
- **高速開発**: Vite + HMRによる開発体験
- **コンテナ化**: Docker Compose完全対応
- **テスト駆動開発**: Jest + React Testing Library
- **コード品質**: ESLint + Prettier + 自動フォーマット

## 🛠 技術スタック

### フロントエンド
- **React 19** - 最新のReactフィーチャー対応
- **TypeScript** - 型安全性とコード品質
- **Vite** - 高速ビルドツール
- **Material-UI (MUI) v6** - Material Designコンポーネントライブラリ
- **Emotion** - CSS-in-JSスタイリングソリューション
- **Jest + React Testing Library** - コンポーネントテスト環境

### バックエンド
- **Go 1.21** - 高性能APIサーバー
- **Gin** - 軽量Webフレームワーク
- **GORM** - 型安全なORM
- **MySQL 8.0** - リレーショナルデータベース

### 開発・インフラ
- **Docker & Docker Compose** - コンテナ化開発環境
- **Jest + React Testing Library** - コンポーネントテスト（ハイブリッド配置戦略）
- **ESLint & Prettier** - コード品質・フォーマッティング
- **phpMyAdmin** - データベース管理UI

## 📦 プロジェクト構造

```
family-budget-app/
├── frontend/                   # React フロントエンド
│   ├── src/
│   │   ├── components/         # 再利用可能コンポーネント
│   │   │   └── common/         # 汎用コンポーネント (TextInput等)
│   │   │       ├── TextInput.tsx        # MUI TextFieldベース汎用入力
│   │   │       └── __tests__/           # 単体テスト
│   │   │           └── TextInput.test.tsx
│   │   ├── features/           # フィーチャーベース構成
│   │   │   └── expenses/       # 支出管理フィーチャー
│   │   │       └── components/
│   │   │           ├── ExpenseForm.tsx     # フォームコンポーネント
│   │   │           ├── ExpenseInput.tsx    # 入力コンポーネント
│   │   │           └── __tests__/          # テストディレクトリ
│   │   │               ├── ExpenseForm.test.tsx
│   │   │               ├── ExpenseInput.test.tsx
│   │   │               └── integration/     # 統合テスト
│   │   │                   └── expense-flow.test.tsx
│   │   ├── App.tsx             # メインアプリケーション
│   │   ├── App.test.tsx        # App単体テスト（co-located）
│   │   └── main.tsx            # エントリーポイント
│   ├── docs/                   # フロントエンド専用ドキュメント
│   ├── package.json            # 依存関係 (MUI, Emotion等)
│   └── README.md               # フロントエンド固有ドキュメント
├── backend/                    # Go バックエンド
│   ├── cmd/server/main.go      # メインサーバー
│   ├── internal/               # 内部パッケージ
│   │   ├── models/             # データモデル
│   │   ├── handlers/           # HTTPハンドラー
│   │   └── database/           # データベース操作
│   ├── go.mod                  # Go モジュール定義
│   └── go.sum                  # 依存関係チェックサム
├── docker/                     # Dockerファイル
├── compose.yml                 # Docker Compose設定
├── Makefile                    # 開発コマンド
├── CLAUDE.md                   # 開発ガイダンス
└── README.md                   # このファイル
```

## 🚀 クイックスタート

### 前提条件
- Docker & Docker Compose
- Git

### セットアップ

```bash
# リポジトリクローン
git clone <repository-url>
cd family-budget-app

# 環境変数設定
cp .env.example .env

# 全サービスビルド・起動
make up

# または直接Docker Composeを使用
docker compose up -d
```

### アクセスURL
- **フロントエンド**: http://localhost:5173
- **バックエンドAPI**: http://localhost:8080
- **API健康状態**: http://localhost:8080/api/health
- **phpMyAdmin**: http://localhost:8081 (root / root)

## 🔧 開発コマンド

### 基本操作
```bash
make help                       # 利用可能なコマンド一覧
make up                         # 全サービス起動（バックグラウンド）
make dev                        # 開発環境起動（ログ表示）
make down                       # 全サービス停止
make logs                       # 全サービスログ確認
```

### 開発・テスト
```bash
# テスト実行
make test                       # 全テスト実行
make test-frontend              # フロントエンドテストのみ
make test-backend               # バックエンドテストのみ

# Lint実行
make lint                       # 全Lintチェック実行
make lint-frontend              # フロントエンドLintのみ
make lint-backend               # バックエンドLintのみ

# パッケージ管理
make npm-install                # フロントエンド依存関係インストール
make npm-install-package PKG=react-router  # 新パッケージ追加
```

### デバッグ・ログ確認
```bash
make frontend                   # フロントエンドログ確認
make backend                    # バックエンドログ確認
make frontend-shell             # フロントエンドコンテナ接続
make backend-shell              # バックエンドコンテナ接続
```

## 🏗 実装済み機能

### ✅ フロントエンド
- React 19 + TypeScript + Vite開発環境
- Material-UI (MUI) v6完全対応
- sx propsによるコンポーネントレベルスタイリング
- Jest + React Testing Libraryテスト環境（ハイブリッド配置戦略）
  - 19テスト（5テストスイート）全通過
  - 単体テスト：__tests__/ディレクトリ
  - 統合テスト：integration/サブディレクトリ
  - co-located：シンプルなコンポーネント
- ESLint + Prettier + 自動フォーマット
- フィーチャーベースディレクトリ構成

### ✅ バックエンド
- Go + Gin REST APIサーバー
- GORM自動マイグレーション
- MySQL接続・初期データシード
- カテゴリ管理API (CRUD)
- ヘルスチェックエンドポイント

### ✅ インフラ・DevOps
- Docker Compose全サービス構成
- Makefile開発コマンド体系
- phpMyAdminデータベース管理UI
- マルチステージビルド最適化

## 📊 データベーススキーマ

### テーブル構造
- **users**: ユーザー管理
- **categories**: 収支カテゴリ
- **transactions**: 取引記録
- **budgets**: 月次予算

### 初期データ
- **支出カテゴリ**: 食費、交通費、娯楽費、光熱費、通信費、医療費
- **収入カテゴリ**: 給与、副収入

## 🗺 ロードマップ

### 🚧 フェーズ1: トランザクション機能
- [ ] Transaction CRUD API実装
- [ ] 取引履歴UI開発
- [ ] フィルタ・ページネーション

### 🚧 フェーズ2: 家計簿UI強化
- [ ] ダッシュボード（収支サマリー）
- [ ] カテゴリ管理画面
- [ ] レスポンシブデザイン対応

### 🚧 フェーズ3: 高度な機能
- [ ] 予算管理機能
- [ ] データ可視化（Chart.js/Recharts）
- [ ] ユーザー認証（JWT）
- [ ] 月次/年次レポート

## 🤝 開発ガイドライン

### コード規約
- TypeScript strict mode必須
- Material-UI コンポーネント優先使用
- sx propsによるスタイリング
- type-only imports最適化

### 開発フロー
1. **Feature Branch**: 機能ごとにブランチ作成
2. **TDD**: テスト駆動開発推奨
3. **Lint**: コミット前の品質チェック必須
4. **Docker**: 全開発作業はコンテナ内実行

### テスト戦略
- **単体テスト**: Jest + React Testing Library（__tests__/ディレクトリ）
- **統合テスト**: フィーチャーフロー（integration/サブディレクトリ）
- **co-locatedテスト**: シンプルなコンポーネント（*.test.tsx）
- **MUI適応テスト**: 数値型フィールド、非同期状態管理対応
- **結合テスト**: APIエンドポイント
- **E2Eテスト**: 将来実装予定

## 📚 ドキュメント

- `CLAUDE.md` - 開発者向けガイダンス
- `frontend/README.md` - フロントエンド固有ドキュメント
- `frontend/docs/` - コンポーネントガイド・開発ガイドライン

## 🐛 トラブルシューティング

### よくある問題

**コンテナが起動しない**
```bash
make down && make clean  # 完全クリーンアップ
make build && make up    # 再ビルド・起動
```

**フロントエンド依存関係エラー**
```bash
make npm-install  # パッケージ再インストール
```

**データベース接続エラー**
```bash
make db           # データベースログ確認
make status       # サービス状態確認
```

## 📝 ライセンス

MIT License

## 🙋‍♂️ サポート

プロジェクト関連の質問や問題は、GitHubのIssueまでお願いします。