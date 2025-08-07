# Family Budget App

家計簿管理のためのモダンなフルスタックWebアプリケーション。収支管理、カテゴリ別予算設定、データ可視化機能を提供します。

## 🌐 デモサイト

**GitHub Pages デモ**: [https://username.github.io/family-budget-app/](https://username.github.io/family-budget-app/)

> ⚠️ **注意**: デモサイトのURLは、あなたのGitHubユーザー名に合わせて更新してください

### デモ機能
- ✅ 支出金額の入力と記録
- ✅ 支出履歴の一覧表示
- ✅ 合計支出額の自動計算
- ✅ レスポンシブデザイン
- ✅ リアルタイムUI更新

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
│   │   ├── components/common/  # 汎用コンポーネント
│   │   ├── features/expenses/  # 支出管理機能
│   │   └── App.tsx            # メインアプリ（詳細コメント付き）
│   └── README.md              # 簡潔な開発ガイド
├── backend/                    # Go バックエンド
│   ├── cmd/server/            # メインサーバー
│   └── internal/              # APIハンドラー・モデル
├── compose.yml                # Docker環境設定
├── Makefile                   # 開発コマンド
└── CLAUDE.md                  # Claude専用指示
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

# Lint・フォーマット実行
make lint                       # 全Lintチェック実行
make lint-frontend              # フロントエンドLintのみ
make lint-backend               # バックエンドLintのみ
make format-frontend            # フロントエンドコードフォーマット
make format-frontend-check      # フォーマットチェックのみ

# パッケージ管理
make npm-install                          # フロントエンド依存関係インストール
make npm-install-package PKG=react-router # 新パッケージ追加
make npm-version-minor                    # マイナーバージョンアップ
make npm-version-patch                    # パッチバージョンアップ
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
- **React 19 + TypeScript + Vite**: モダンな開発環境
- **Material-UI (MUI) v6**: 統一されたデザインシステム
- **包括的テスト環境**: 19テスト（5スイート）全通過
- **コード品質**: ESLint + Prettier自動整形
- **詳細なコード内ドキュメント**: 実装例・設計原則をコメントで提供

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
- **users**: ユーザー管理 (id, name, email, timestamps)
- **categories**: 収支カテゴリ (id, name, type, color, description, timestamps)
- **transactions**: 取引記録 (id, user_id, category_id, amount, description, date, timestamps)
- **budgets**: 月次予算 (id, user_id, category_id, amount, month, timestamps)

### 初期データ（GORM自動シード）
- **支出カテゴリ**: 食費、交通費、娯楽費、光熱費、通信費、医療費
- **収入カテゴリ**: 給与、副収入

## 🔌 実装済みAPI

### ヘルスチェック
- `GET /api/health` - ヘルスチェック（データベース接続確認含む）

### カテゴリ管理
- `GET /api/categories` - カテゴリ一覧取得
- `POST /api/categories` - 新規カテゴリ作成
- `GET /api/categories/:id` - 特定カテゴリ取得
- `PUT /api/categories/:id` - カテゴリ更新
- `DELETE /api/categories/:id` - カテゴリ削除

## 🗺 開発ロードマップ

### 🚧 フェーズ1: トランザクションAPI実装
**Transaction CRUD API**
- [ ] `GET /api/transactions` - 取引一覧（フィルタ・ページネーション対応）
- [ ] `POST /api/transactions` - 新規取引登録
- [ ] `PUT /api/transactions/:id` - 取引更新
- [ ] `DELETE /api/transactions/:id` - 取引削除

### 🚧 フェーズ2: フロントエンド家計簿UI
**基本コンポーネント**
- [ ] TransactionForm - 取引入力フォーム
- [ ] TransactionList - 取引履歴表示
- [ ] CategorySelector - カテゴリ選択
- [ ] DatePicker - 日付選択
- [ ] AmountInput - 金額入力

**ページ実装**
- [ ] Dashboard - 収支サマリー
- [ ] Transactions - 取引管理
- [ ] Categories - カテゴリ管理

### 🚧 フェーズ3: 高度な機能
- [ ] Budget API + UI - 予算管理機能
- [ ] データ可視化 - Chart.js/Recharts使用
- [ ] ユーザー認証 - JWT実装
- [ ] レポート機能 - 月次/年次レポート

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

## 📚 ドキュメント戦略

- **メインREADME**: プロジェクト概要・開発手順
- **frontend/README.md**: 簡潔な開発ガイド
- **コード内コメント**: 詳細な実装例・設計原則・使用方法
- **CLAUDE.md**: Claude専用作業指示

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