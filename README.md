# Family Budget App

**家族向け家計管理のための現代的フルスタックWebアプリケーション**

## 🏠 対象ユーザー・利用シナリオ

- **家族利用**: 夫婦・親子での共同家計管理
- **個人利用**: 一人暮らしの支出管理・節約意識向上
- **計画的消費**: 家計状況を踏まえたリスク回避型予算決定

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
- **CI/CD自動化**: GitHub Actions による品質チェック自動化

## 🛠 技術スタック

- **フロントエンド**: React 19 + TypeScript + Vite + MUI v6
- **バックエンド**: Go 1.21 + Gin + GORM + MySQL 8.0
- **インフラ**: Docker Compose + GitHub Actions + Firebase Hosting
- **品質保証**: Jest + ESLint + Prettier + 5段階品質チェック

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

## 🛠 開発コマンド

```bash
# 環境管理
make up          # 全サービス起動
make dev         # 開発環境起動（ログ表示）
make down        # 全サービス停止

# 品質チェック
make test-frontend              # テスト実行
make quality-check-frontend     # 5段階品質チェック
make lint-frontend              # ESLintチェック
make format-frontend            # Prettierフォーマット
```




## 🚀 開発状況

**Phase 2: Directory Structure Migration (70%完了)**
- 28コンポーネントの機能別分離進行中
- 352テスト、33スイート全通過
- 残り作業: 旧ディレクトリ削除・最終検証

**次期計画**: フロントエンド品質向上 → バックエンド実装 → 初期バージョンリリース

## 📚 詳細ドキュメント

### 🎯 開発者向け
- **[開発者ガイド](CLAUDE.md)** - 必須コマンド・作業フロー・緊急時対応
- **[完全版プロジェクト要約](docs-src/project-summary.md)** - ユーザー視点・技術・運用の統合概要
- **[フロントエンド詳細](frontend/README.md)** - 技術スタック・アーキテクチャ・テスト戦略

### 📖 参照・保守
- **[参照ドキュメント](docs-src/README.md)** - アーキテクチャ・テスト・品質規約・保守ガイド

## 🐛 トラブルシューティング

```bash
make down && make up     # コンテナ再起動
make npm-install         # 依存関係再インストール
make logs                # ログ確認
```

## 📝 ライセンス

MIT License

## 🙋‍♂️ サポート

プロジェクト関連の質問や問題は、GitHubのIssueまでお願いします。