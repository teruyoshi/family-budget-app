# CLAUDE.md

**二層ドキュメント化方針採用**：実行ガイド特化版

**最終更新**: 2025年8月24日

## 📋 プロジェクト概要

家計簿管理フルスタックWebアプリケーション
- **フロントエンド**: React 19 + TypeScript + Vite + MUI v6 + React Router v7
- **バックエンド**: Go 1.21 + Gin + GORM + MySQL 8.0
- **インフラ**: Docker Compose

## 🎯 Claude作業指示

### 基本方針
- **作業ディレクトリ**: `~/workspace/family-budget-app`
- **コンテナベース**: Makefile使用でDockerコンテナ内実行
- **🎯 必須作業フロー**: **1タスク集中→完了→停止→指示待ち**
  - TodoWrite使用でタスク管理
  - **複数タスクの並行作業は絶対禁止**
  - 1つのタスクが完了するまで他に手を出さない
  - 完了後は必ず停止してユーザーの指示を待つ

### 必須コマンド（Makefile使用）

#### 開発・テスト
```bash
make test-frontend               # フロントエンドテスト（全テスト実行）
make test-file FILE=ファイル名   # 特定のテストファイルのみ実行
make lint-frontend               # ESLintチェック
make format-frontend             # Prettierフォーマット
make quality-check-frontend      # 5段階統合品質チェック
```

#### コンテナ操作
```bash
make up                  # 全サービス起動
make dev                 # 開発環境（ログ表示）
make down                # 全サービス停止
```

### 作業完了基準
- **テスト通過**: `make test-frontend` で全テスト通過確認
- **品質チェック**: `make quality-check-frontend` でコード品質確認
- **Claude署名**: GitHubコメント・コミットメッセージに `🤖 Generated with [Claude Code](https://claude.ai/code)` 署名

### 開発環境URL
- **フロントエンド**: http://localhost:5173
- **バックエンドAPI**: http://localhost:8080  
- **Storybook**: http://localhost:6006

## 📁 現在のアーキテクチャ

**Phase 2: Directory Structure Migration 完了間近 (85%)**

- **コンポーネント総数**: 28コンポーネント（ui: 10, forms: 6, navigation: 10, layout: 2）
- **テスト状況**: 240テスト、25テストスイート全通過（継続的に保持）
- **主要機能**: React Router SPA、ページベース構造、コード分割、404対応

詳細なアーキテクチャは **[参照ドキュメント](docs-src/README.md)** を参照。

## 🎨 コード規約（簡潔版）

- **TypeScript**: strict mode、簡潔なTSDoc
- **React 19**: ref as prop パターン、forwardRef不使用
- **MUI**: sx props、slotProps活用
- **エクスポート**: バレルエクスポート（index.ts）使用

詳細な規約は **[品質ガイド](docs-src/quality/README.md)** を参照。

## 🚀 現在のタスク: Phase 2 残り作業 (15%)

- 🔄 **旧ディレクトリ削除**: common_old, layout_old, navigation_old 最終削除
- 🔄 **features/配下**: components_old ディレクトリの統合と削除
- 🔄 **最終検証**: 全テスト通過とビルド確認

## 📚 参照ドキュメント

詳細情報・背景知識・ガイドは以下を参照：
- **[参照ドキュメント概要](docs-src/README.md)** - 全体サイトマップ・運用方針
- **[オンボーディング](docs-src/onboarding/README.md)** - 環境構築・トラブル解決
- **[アーキテクチャ概要](docs-src/architecture/README.md)** - システム構成・設計制約
- **[テスト戦略](docs-src/testing/README.md)** - 品質基準・テスト実行戦略
- **[How-toガイド](docs-src/howto/README.md)** - 実践手順・開発ガイド
- **[品質規約](docs-src/quality/README.md)** - コード品質・パフォーマンス基準
- **[API仕様](docs-src/api/README.md)** - OpenAPI・クライアント生成
- **[リリース運用](docs-src/release/README.md)** - バージョニング・変更管理
- **[Mermaid図解](docs-src/diagrams/README.md)** - 視覚的設計資料・システム図解
- **[技術判断記録](docs-src/adr/README.md)** - ADR・意思決定履歴