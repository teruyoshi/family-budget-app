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
- **📝 言語方針**: **日本語を使用すること** - コメント・ドキュメント・コミットメッセージは日本語で記述
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

**Phase 2: Directory Structure Migration (85%)**

- **コンポーネント総数**: 28コンポーネント（ui: 10, forms: 6, navigation: 10, layout: 2）
- **テスト状況**: 46テストファイル、CI最適化完了（Jest設定・GitHub Actions改善）
- **主要機能**: React Router SPA、ページベース構造、コード分割、404対応
- **最新完了**: NotFoundPage移行、AppLayoutテスト・ストーリー完成、プロジェクト日本語統一

詳細なアーキテクチャは **[参照ドキュメント](docs-src/README.md)** を参照。

## 🎨 コード規約（簡潔版）

- **TypeScript**: strict mode、簡潔なTSDoc
- **React 19**: ref as prop パターン、forwardRef不使用
- **MUI**: sx props、slotProps活用
- **エクスポート**: バレルエクスポート（index.ts）使用

詳細な規約は **[品質ガイド](docs-src/quality/README.md)** を参照。

## 🎯 完了タスク: Phase 2 & Phase 3 & Issue #71 全完了 ✅

### Phase 2 完了済み作業 ✅
- ✅ **ディレクトリ構造移行**: 28コンポーネント新構造完了
- ✅ **テスト・ストーリー整備**: 包括的なテストとStorybookストーリー作成
- ✅ **旧ファイル削除**: `*_old`ディレクトリと`index_old.ts`削除完了
- ✅ **プロジェクト日本語統一**: Storybookタイトル・HTML言語属性統一

### Phase 3 完了済み作業 ✅ 
- ✅ **Jest設定最適化**: testTimeout 6秒、maxWorkers 95%、キャッシュディレクトリ設定
- ✅ **GitHub Actions CI最適化**: タイムアウト8分、並列実行戦略準備
- ✅ **テスト環境改善**: 45テストファイル構成でCI安定実行
- ✅ **品質チェック**: ESLint・TypeScript・Prettier・ビルド全通過

### 🎯 Issue #71完了: テストスキップ解除戦略実装 ✅
- **Phase 1**: ページレベル統合テスト復活（7テスト、98秒実行）
- **Phase 2**: 基本ルーティングテスト復活（2テスト、14秒実行）
- **Phase 3**: Direct Accessテスト復活（1テスト、7秒実行）
- **Phase 4**: 高度な統合テスト復活（3テスト、軽量化実装）
- **復活テスト総数**: 13テスト追加、軽量化で実行時間最適化
- **技術改善**: renderUltraFast、重複要素対応、act()削除

### 🎯 最新テスト最適化成果（Issue #67 & #71完了）
- **実行時間**: 71秒（約1分12秒）- **34%高速化達成** ✅
- **テスト結果**: 414テスト（342通過、72スキップ）→ 13テスト復活で429テスト
- **カバレッジ品質**: 
  - Statements: **84.87%** (494/582)
  - Branches: **75.47%** (160/212)  
  - Functions: **66.85%** (119/178)
  - Lines: **86.23%** (451/523)

### プロジェクト最適化の最終成果
- **アーキテクチャ**: Phase 2ディレクトリ構造移行完了、旧ファイル完全削除
- **テストパフォーマンス**: Issue #67 & #71完了、軽量化戦略でテスト復活実現
- **品質維持**: 全体カバレッジ80%超、ESLint・TypeScript・ビルド全通過

**参考**: **[Issue #71](https://github.com/teruyoshi/family-budget-app/issues/71)** - テストスキップ解除戦略詳細

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