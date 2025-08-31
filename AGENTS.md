# Repository Guidelines

## プロジェクト構成とモジュール
- `frontend/`: React + TypeScript（Vite, Jest, Storybook）。ソースは `frontend/src/` 配下で機能別に配置：`components/`, `pages/`, `hooks/`, `routes/`, `lib/`, `types/`。
- `backend/`: Go（Gin + GORM）。エントリーポイントは `backend/cmd/server/main.go`、ハンドラは `backend/internal/handlers/`。
- `docker/` と `compose.yml`: フロントエンド・バックエンド・MySQL のローカル実行環境。
- `docs-src/`: 開発ドキュメント、ADR、ハウツー。設計メモや運用ガイドをここに集約。
- `Makefile`: 開発・テスト・品質チェックの共通コマンド。

## ビルド・テスト・開発
- `make up`: すべてのサービスをDockerで起動。
- `make dev`: ログ付きで起動（開発中に使用）。
- `make test`: フロントエンドJestとバックエンド`go test`を実行。
- `make test-frontend` | `make test-file FILE=...`: 全体または特定のJestファイルを実行。
- `make lint-frontend` | `make lint-backend`: ESLint（TS）と `go vet`/`golint`。
- `make format-frontend` | `make format-check`: Prettierの書き込み/チェック。
- `make build-frontend`: フロントエンドの本番ビルド。
- `make quality-check-frontend`: Prettier + ESLint + TypeScript + Jest + Build の統合品質チェック。

## コーディング規約と命名
- フォーマット: Prettier（`make format-frontend`）。未整形コードのコミット禁止。
- Lint: ESLint（Flat Config、import順序整理）。自動修正は `npm run lint -- --fix`。
- TypeScript: strict。公開APIは明示的な型を優先。
- React: コンポーネントはPascalCase（例: `AmountInput.tsx`）、フックは`use*`。
- Go: 慣用的命名、パッケージは小文字。`internal/` に handlers/models を配置。

## テスト方針
- フレームワーク: Jest + RTL（フロント）、`go test`（バックエンド）。
- ファイル命名: `*.test.tsx` または `__tests__/` 配下。統合は `routes/__tests__/`, `pages/__tests__/`。
- カバレッジ: `npm run test:ci`（`make test-coverage-frontend`）→ `frontend/coverage/lcov-report/index.html` を参照。

## ドキュメンテーション方針
- 二層ドキュメント化方針を採用：実行ガイドは `CLAUDE.md`、詳細設計やリファレンスは `docs-src/` に集約。

## 開発支援ドキュメント
- 全体・オンボーディング: `docs-src/project-summary.md`, `docs-src/README.md`, `docs-src/onboarding/README.md`
- 日常開発: `docs-src/howto/development-workflow.md`, `docs-src/howto/testing-efficient.md`, `docs-src/howto/code-quality.md`, `docs-src/architecture/README.md`
- リファレンス: `docs-src/testing/README.md`, `docs-src/quality/README.md`, `docs-src/adr/README.md`, `docs-src/api/README.md`, `docs-src/release/README.md`
- 保守: `docs-src/maintenance/README.md`, `docs-src/scripts/`

## コミット／プルリクエスト指針
- コミット規約: Conventional Commits（例: `feat: ...`, `fix: ...`, `docs: ...`, `perf: ...`）+ Issue参照（例: `Issue #71`）。命令形・スコープ明確に。原則、日本語で記述。
- PR要件: 関連Issueのリンク、変更概要、UI変更はBefore/Afterスクショ、必要なドキュメント更新（`docs-src/`）、`make quality-check-frontend` と `make test` の成功。
- AI支援時: コミット・コメント・PR説明には ChatGPT 署名を必ず付与（例: `🤖 Generated with ChatGPT`）。CLAUDE.mdの手順は踏襲しつつ、署名はChatGPTで統一。

## 環境・セキュリティのヒント
- フロントのAPI基点: `VITE_API_URL`（`compose.yml`で設定）。
- ヘルスチェック: `GET /api/health`（`http://localhost:8080`）。
- 迅速な診断: `make logs` / `make logs-f`。詳細は `docs-src/howto/` を参照。

## エージェント向け補足（CLAUDE.md準拠）
- ドキュメント・コメント・コミットは日本語で統一。
- 作業は「1タスク集中→完了→停止→指示待ち」。並行作業は避ける。
- 完了基準: `make test-frontend` 全通過 ＋ `make quality-check-frontend` 合格。問題時は `docs-src/howto/debugging-guide.md` を参照。

