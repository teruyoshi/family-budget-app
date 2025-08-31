# Repository Guidelines

本ドキュメントは、エージェント（AI支援）およびコントリビュータ向けの最小限の実務ガイドです。詳細は `docs-src/` 配下の各種ドキュメントを参照してください。

## プロジェクト構成
- フロントエンド: `frontend/`（React + TypeScript, Vite, Jest, Storybook）
- バックエンド: `backend/`（Go: Gin + GORM）
- ドキュメント: `docs-src/`（ADR/HowTo/設計/運用）
- ローカル実行: `compose.yml` と `docker/`
- 共通コマンド: `Makefile`

## 開発・品質の基本
- テスト: `make test`（フロントJest + バックエンド go test）
- Lint/Format: `make lint-frontend` / `make lint-backend` / `make format-frontend`
- 重要チェック: `make quality-check-frontend`

## コミット／プルリクエスト指針
- コミット規約: Conventional Commits（例: `feat: ...`, `fix: ...`, `docs: ...`, `perf: ...`）。Issue参照（例: `Issue #71`）。
- PR要件: 関連Issue、変更概要、必要なドキュメント更新（`docs-src/`）、品質チェック成功。
- AI支援時の署名: コミット・コメント・PR説明の末尾に必ず署名を付与。
  - 署名形式: `🤖 Generated with ChatGPT`

## エージェント向け補足
- ドキュメント・コメント・コミットは日本語で統一。
- 作業は「1タスク集中→完了→停止→指示待ち」。並行作業は避ける。
- 完了基準: `make test-frontend` 全通過 ＋ `make quality-check-frontend` 合格。
- 参考: 実行ガイドは `CLAUDE.md`、詳細は `docs-src/` を参照。

