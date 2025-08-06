# CLAUDE.md

このファイルは、このリポジトリでコードを操作する際にClaude Code (claude.ai/code) にガイダンスを提供します。

## プロジェクト概要

これは家計簿アプリケーションプロジェクトです。フロントエンドにReact + TypeScript + Vite、バックエンドにGo言語を使用したフルスタックアプリケーションです。

## 技術スタック

- **フロントエンド**: React 19 + TypeScript + Vite
- **スタイリング**: Tailwind CSS
- **開発ツール**: ESLint, Prettier, Jest, Vite HMR
- **バックエンド**: Go言語
- **データベース**: PostgreSQL 15

## プロジェクト構造

```
family-budget-app/
├── .gitignore
├── compose.yml           # Docker Compose設定（旧docker-compose.yml）
├── CLAUDE.md
├── README.md
├── client/               # Reactフロントエンドアプリケーション
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── .prettierrc       # Prettier設定
│   ├── jest.config.js    # Jest設定
│   └── src/setupTests.ts # テスト環境設定
├── server/               # Go言語バックエンド（未実装）
├── docker/               # Dockerファイル格納
│   └── client/
│       └── Dockerfile
└── db/                   # データベース関連
    └── init.sql          # PostgreSQL初期スキーマ
```

## 開発コマンド

### Docker Compose（推奨）
```bash
docker compose up -d          # 全サービス起動（バックグラウンド）
docker compose up             # 全サービス起動（ログ表示）
docker compose down           # 全サービス停止
docker compose logs client    # フロントエンドログ確認
docker compose logs server    # バックエンドログ確認
```

### 個別開発
#### フロントエンド
```bash
cd client
npm install          # 依存関係のインストール
npm run dev          # 開発サーバー起動 (http://localhost:5173)
npm run build        # プロダクションビルド
npm run lint         # ESLintチェック
# npm test           # Jestテスト実行（未設定）
```

#### バックエンド
```bash
cd server
go mod init family-budget-server  # Go モジュール初期化
go run main.go       # 開発サーバー起動 (http://localhost:8080)
go build             # バイナリビルド
./family-budget-server  # 本番環境起動
```

## Docker構成

### サービス一覧
- **client**: React開発サーバー (ポート5173)
- **server**: Go API (ポート8080) 
- **db**: PostgreSQL データベース (ポート5432)
- **pgadmin**: データベース管理UI (ポート5050)

### アクセスURL
- フロントエンド: http://localhost:5173
- バックエンドAPI: http://localhost:8080
- pgAdmin: http://localhost:5050 (admin@example.com / admin)

## 開発セットアップ

1. **フロントエンド**: 
   - Vite + React + TypeScript 構成完了
   - Tailwind CSS 設定済み（PostCSS経由）
   - 開発ツール: ESLint + Prettier + Jest
   - Docker対応済み（ポート5173）

2. **バックエンド**: 
   - Go言語バックエンド（未実装）
   - Docker対応予定（ポート8080）

3. **データベース**:
   - PostgreSQL 15 Alpine
   - 初期スキーマ自動作成
   - pgAdmin管理ツール付属

## アーキテクチャノート

### 完了済み
- Docker Compose フルスタック構成完了
- React TypeScript + Tailwind CSS フロントエンド構築
- Go言語バックエンド設計
- PostgreSQL データベース設計・初期スキーマ作成
- 基本的なAPI エンドポイント(/api/health, /api/test)実装
- 開発環境整備: ESLint + Prettier + Jest導入
- Dockerファイル整理とポート設定統一
- .gitignore設定とプロジェクト構造整理

### 現在の実装状況
- **インフラ**: Docker環境完全構築済み
- **フロントエンド**: React開発環境完備（テスト環境含む）
- **バックエンド**: Go言語移行中
- **データベース**: PostgreSQL + pgAdmin運用可能

### データベーススキーマ
- users: ユーザー管理
- categories: 収支カテゴリ
- transactions: 取引記録
- budgets: 予算設定

### 次のステップ
1. Go言語バックエンド実装
2. フロントエンド画面実装（家計簿UI作成）
3. バックエンドAPI実装（CRUD機能）
3. フロントエンド・バックエンドAPI連携
4. ユーザー認証システム実装
5. 取引管理機能の実装
6. 予算管理機能の実装
7. データ可視化（グラフ・チャート）機能