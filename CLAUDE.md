# CLAUDE.md

このファイルは、このリポジトリでコードを操作する際にClaude Code (claude.ai/code) にガイダンスを提供します。

## プロジェクト概要

これは家計簿アプリケーションプロジェクトです。フロントエンドにReact + TypeScript + Vite、バックエンドにNode.js + Express（予定）を使用したフルスタックアプリケーションです。

## 技術スタック

- **フロントエンド**: React 19 + TypeScript + Vite
- **スタイリング**: Tailwind CSS
- **開発ツール**: ESLint, Vite HMR
- **バックエンド**: Node.js + Express + TypeScript（未実装）
- **データベース**: SQLite（開発用）/ PostgreSQL（本番用予定）

## プロジェクト構造

```
family-budget-app/
├── client/          # Reactフロントエンドアプリケーション
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── postcss.config.js
├── server/          # Node.js バックエンド（予定）
├── CLAUDE.md
└── README.md
```

## 開発コマンド

### Docker Compose（推奨）
```bash
docker-compose up -d          # 全サービス起動（バックグラウンド）
docker-compose up             # 全サービス起動（ログ表示）
docker-compose down           # 全サービス停止
docker-compose logs client    # フロントエンドログ確認
docker-compose logs server    # バックエンドログ確認
```

### 個別開発
#### フロントエンド
```bash
cd client
npm install          # 依存関係のインストール
npm run dev          # 開発サーバー起動 (http://localhost:3000)
npm run build        # プロダクションビルド
npm run lint         # ESLintチェック
```

#### バックエンド
```bash
cd server
npm install          # 依存関係のインストール
npm run dev          # 開発サーバー起動 (http://localhost:3001)
npm run build        # TypeScriptビルド
npm start            # 本番環境起動
```

## Docker構成

### サービス一覧
- **client**: React開発サーバー (ポート3000)
- **server**: Node.js/Express API (ポート3001) 
- **db**: PostgreSQL データベース (ポート5432)
- **pgadmin**: データベース管理UI (ポート5050)

### アクセスURL
- フロントエンド: http://localhost:3000
- バックエンドAPI: http://localhost:3001
- pgAdmin: http://localhost:5050 (admin@example.com / admin)

## 開発セットアップ

1. **フロントエンド**: 
   - Vite + React + TypeScript 構成完了
   - Tailwind CSS 設定済み（PostCSS経由）
   - Docker対応済み（ポート3000）

2. **バックエンド**: 
   - Node.js + Express + TypeScript 構成完了
   - CORS, dotenv 設定済み
   - Docker対応済み（ポート3001）

3. **データベース**:
   - PostgreSQL 15 Alpine
   - 初期スキーマ自動作成
   - pgAdmin管理ツール付属

## アーキテクチャノート

### 完了済み
- Docker Compose フルスタック構成
- React TypeScript + Tailwind CSS フロントエンド
- Node.js Express TypeScript バックエンド
- PostgreSQL データベース設計
- 基本的なAPI エンドポイント(/api/health, /api/test)

### データベーススキーマ
- users: ユーザー管理
- categories: 収支カテゴリ
- transactions: 取引記録
- budgets: 予算設定

### 次のステップ
1. フロントエンドとバックエンド API連携
2. ユーザー認証システム実装
3. 取引管理機能の実装
4. 予算管理機能の実装