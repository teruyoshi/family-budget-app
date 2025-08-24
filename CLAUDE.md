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

### 🚨 問題発生時の対処
**即座にアクセス**: **[緊急デバッグガイド](docs-src/howto/debugging-guide.md)** - 1分で基本確認、5分で詳細診断

### 開発環境URL
- **フロントエンド**: http://localhost:5173
- **バックエンドAPI**: http://localhost:8080  
- **Storybook**: http://localhost:6006

## 📁 現在のアーキテクチャ

**Phase 2: Directory Structure Migration (70%)**

- **コンポーネント総数**: 28コンポーネント（ui: 10, forms: 6, navigation: 10, layout: 2）
- **テスト状況**: 352テスト、33スイート全通過（78スキップ含む）
- **主要機能**: React Router SPA、ページベース構造、コード分割、404対応

詳細なアーキテクチャは **[参照ドキュメント](docs-src/README.md)** を参照。

## 🎨 コード規約（簡潔版）

- **TypeScript**: strict mode、簡潔なTSDoc
- **React 19**: ref as prop パターン、forwardRef不使用
- **MUI**: sx props、slotProps活用
- **エクスポート**: バレルエクスポート（index.ts）使用

詳細な規約は **[品質ガイド](docs-src/quality/README.md)** を参照。

## 🎯 現在のタスク: Phase 2 残り作業 (30%)

### 即座に実行可能なタスク
- 🔄 **旧ディレクトリ削除**: 7箇所の*_oldディレクトリ削除
  - components/: common_old, layout_old, navigation_old  
  - features/: 4箇所のcomponents_old統合・削除
- 🔄 **最終検証**: 全テスト通過とビルド確認
- 🔄 **ドキュメント同期**: コードベース変更に伴うドキュメント更新

### Phase 2 完了判定基準
1. 全*_oldディレクトリが削除済み
2. `make test-frontend` 352テスト全通過
3. `make quality-check-frontend` 5段階チェック全通過
4. インポートエラー・参照エラー0件

**参考**: **[Phase 2移行ADR](docs-src/adr/0004-phase2-directory-structure-migration.md)** - 設計判断・完了条件詳細

## 📚 開発支援ドキュメント

### 🎯 全体理解・オンボーディング
- **[完全版プロジェクト要約](docs-src/project-summary.md)** - ユーザー視点・技術・運用の統合概要
- **[参照ドキュメント概要](docs-src/README.md)** - ドキュメント構造・ナビゲーション
- **[環境構築ガイド](docs-src/onboarding/README.md)** - セットアップ・初回起動・トラブル解決

### 🛠 日常開発で使用
- **[開発ワークフローガイド](docs-src/howto/development-workflow.md)** - 効率的な開発手順
- **[テスト効率化ガイド](docs-src/howto/testing-efficient.md)** - テスト実行・デバッグ最適化
- **[5段階品質チェック](docs-src/howto/code-quality.md)** - 品質チェックの使い方
- **[アーキテクチャ制約](docs-src/architecture/README.md)** - 禁止事項・必須ルール

### 📋 深いリファレンス
- **[テスト戦略詳細](docs-src/testing/README.md)** - カバレッジ目標・品質基準
- **[品質規約詳細](docs-src/quality/README.md)** - TypeScript・性能・a11y基準
- **[技術判断記録](docs-src/adr/README.md)** - 設計決定・技術選択の経緯
- **[API仕様](docs-src/api/README.md)** - OpenAPI・クライアント生成
- **[リリース運用](docs-src/release/README.md)** - バージョニング・デプロイ戦略

### 🔧 システム保守
- **[ドキュメント保守](docs-src/maintenance/README.md)** - 更新フロー・品質管理
- **[自動化スクリプト](docs-src/scripts/)** - ヘルスチェック・メトリクス更新