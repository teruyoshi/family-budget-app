# Makefile for Family Budget App

.PHONY: help up down build rebuild logs clean dev test test-file lint-file format-file format-check-file typecheck-file quality-check-file backend frontend db migrate lint lint-frontend lint-fix-frontend lint-backend format format-frontend build-frontend docs-frontend docs-clean-frontend docs-serve-frontend docs-stop-frontend docs-dev-frontend storybook-frontend storybook-stop-frontend generate-stories-frontend generate-stories-frontend-force format-check format-check-frontend npm-version-minor npm-version-patch npm-version-major test-coverage-frontend coverage-serve-frontend coverage-stop-frontend quality-check-frontend

# デフォルトターゲット
help:
	@echo "Available commands:"
	@echo "  make up         - 全サービス起動（バックグラウンド）"
	@echo "  make down       - 全サービス停止"
	@echo "  make build      - 全イメージをビルド"
	@echo "  make rebuild    - 全イメージを再ビルド（キャッシュなし）"
	@echo "  make logs       - 全サービスのログを表示"
	@echo "  make logs-f     - ログをフォロー（-f付き）"
	@echo "  make clean      - 停止・イメージ・ボリューム削除"
	@echo "  make dev        - 開発環境起動（ログ表示付き）"
	@echo "  make test       - 全テスト実行"
	@echo "  make test-frontend - フロントエンドテスト実行"
	@echo "  make test-file FILE=テストファイル名 - 特定のテストファイルのみ実行"
	@echo "  make test-backend  - バックエンドテスト実行"
	@echo ""
	@echo "Individual file quality checks:"
	@echo "  make lint-file FILE=ファイルパス - 特定ファイルのリント実行"
	@echo "  make format-file FILE=ファイルパス - 特定ファイルのフォーマット実行"
	@echo "  make format-check-file FILE=ファイルパス - 特定ファイルのフォーマットチェック"
	@echo "  make typecheck-file FILE=ファイルパス - 特定ファイルの型チェック"
	@echo "  make quality-check-file FILE=ファイルパス - 特定ファイルの品質確認統合"
	@echo "  make test-coverage-frontend - フロントエンドカバレッジテスト + ブラウザ表示 (http://localhost:8090)"
	@echo "  make coverage-serve-frontend - カバレッジレポートサーバー起動（バックグラウンド） (http://localhost:8090)"
	@echo "  make coverage-stop-frontend  - カバレッジレポートサーバー停止"
	@echo "  make quality-check-frontend  - フロントエンド品質確認統合（Prettier + ESLint + TypeScript + Jest + Build）"
	@echo "  make lint       - 全Lintチェック実行"
	@echo "  make lint-frontend - フロントエンドLintチェック実行"
	@echo "  make lint-fix-frontend - フロントエンドLint自動修正実行"
	@echo "  make lint-backend  - バックエンドLintチェック実行"
	@echo "  make format     - 全コードフォーマット実行"
	@echo "  make format-frontend - フロントエンドコードフォーマット実行"
	@echo "  make format-check   - 全コードフォーマットチェック実行"
	@echo "  make format-check-frontend - フロントエンドフォーマットチェック実行"
	@echo "  make build-frontend - フロントエンドビルド実行"
	@echo "  make docs-frontend  - フロントエンドドキュメント生成"
	@echo "  make docs-clean-frontend - フロントエンドドキュメント削除"
	@echo "  make docs-serve-frontend - フロントエンドドキュメントサーバー起動（バックグラウンド） (http://localhost:3001)"
	@echo "  make docs-stop-frontend  - フロントエンドドキュメントサーバー停止"
	@echo "  make storybook-frontend  - Storybookサーバー起動（バックグラウンド） (http://localhost:6006)"
	@echo "  make storybook-stop-frontend - Storybookサーバー停止"
	@echo "  make generate-stories-frontend       - JSDocからStorybookストーリー自動生成"
	@echo "  make generate-stories-frontend-force - JSDocからStorybookストーリー強制再生成"
	@echo "  make docs-dev-frontend   - TypeDoc + Storybook 両方起動（開発モード）"
	@echo "  make npm-install   - フロントエンドパッケージインストール"
	@echo "  make npm-install-package PKG=パッケージ名 - 新しいパッケージ追加"
	@echo "  make npm-version-minor  - マイナーバージョンを上げる"
	@echo "  make npm-version-patch  - パッチバージョンを上げる"
	@echo "  make npm-version-major  - メジャーバージョンを上げる"
	@echo ""
	@echo "Individual services:"
	@echo "  make backend    - バックエンドサービスのログ"
	@echo "  make frontend   - フロントエンドサービスのログ"
	@echo "  make db         - データベースサービスのログ"
	@echo "  make migrate    - データベースマイグレーション実行"

# 全サービス起動（バックグラウンド）
up:
	docker compose up -d

# 全サービス停止
down:
	docker compose down

# 全イメージをビルド
build:
	docker compose build

# 全イメージを再ビルド（キャッシュなし）
rebuild:
	docker compose build --no-cache

# 全サービスのログを表示
logs:
	docker compose logs

# ログをフォロー（-f付き）
logs-f:
	docker compose logs -f

# 開発環境起動（ログ表示付き）
dev:
	docker compose up

# 完全なクリーンアップ
clean:
	docker compose down -v --rmi all
	docker system prune -f

# テスト実行
test:
	@echo "フロントエンドテストを実行中..."
	docker compose exec frontend npm run test:ci
	@echo "バックエンドテストを実行中..."
	docker compose exec backend go test ./...

# フロントエンドのみテスト実行
test-frontend:
	@echo "フロントエンドテストを実行中..."
	docker compose exec frontend npm run test:ci

# 特定のテストファイルのみ実行
test-file:
	@if [ -z "$(FILE)" ]; then echo "使用例: make test-file FILE=usePageTransition.test.tsx"; exit 1; fi
	@echo "特定のテストファイルを実行中: $(FILE)"
	docker compose exec frontend npm test -- --testPathPatterns=$(FILE) --watchAll=false

# 特定のファイルのみリント実行
lint-file:
	@if [ -z "$(FILE)" ]; then echo "使用例: make lint-file FILE=src/hooks/usePageTransition.ts"; exit 1; fi
	@echo "特定のファイルをリント中: $(FILE)"
	docker compose exec frontend npx eslint $(FILE)

# 特定のファイルのみフォーマット実行
format-file:
	@if [ -z "$(FILE)" ]; then echo "使用例: make format-file FILE=src/hooks/usePageTransition.ts"; exit 1; fi
	@echo "特定のファイルをフォーマット中: $(FILE)"
	docker compose exec frontend npx prettier --write $(FILE)

# 特定のファイルのフォーマットチェック
format-check-file:
	@if [ -z "$(FILE)" ]; then echo "使用例: make format-check-file FILE=src/hooks/usePageTransition.ts"; exit 1; fi
	@echo "特定のファイルのフォーマットをチェック中: $(FILE)"
	docker compose exec frontend npx prettier --check $(FILE)

# 特定のファイルの型チェック (プロジェクト設定使用)
typecheck-file:
	@if [ -z "$(FILE)" ]; then echo "使用例: make typecheck-file FILE=src/hooks/usePageTransition.ts"; exit 1; fi
	@echo "特定のファイルの型チェック中: $(FILE)"
	@echo "注意: プロジェクト全体の型チェックを実行しますが、指定ファイルのエラーを確認してください"
	docker compose exec frontend npm run typecheck

# 特定のファイルの品質確認統合
quality-check-file:
	@if [ -z "$(FILE)" ]; then echo "使用例: make quality-check-file FILE=src/hooks/usePageTransition.ts"; exit 1; fi
	@echo "========================================================"
	@echo "🔍 ファイル品質確認: $(FILE)"
	@echo "========================================================"
	@echo ""
	@echo "📐 1. Prettierフォーマットチェック..."
	@if $(MAKE) format-check-file FILE=$(FILE); then \
		echo "✅ フォーマット: 合格"; \
	else \
		echo "❌ フォーマット: 不合格"; \
		echo "💡 修正するには: make format-file FILE=$(FILE)"; \
		exit 1; \
	fi
	@echo ""
	@echo "🔧 2. ESLintチェック..."
	@if $(MAKE) lint-file FILE=$(FILE); then \
		echo "✅ ESLint: 合格"; \
	else \
		echo "❌ ESLint: 不合格"; \
		exit 1; \
	fi
	@echo ""
	@echo "🎯 3. TypeScriptチェック..."
	@if $(MAKE) typecheck-file FILE=$(FILE); then \
		echo "✅ TypeScript: 合格"; \
	else \
		echo "❌ TypeScript: 不合格"; \
		exit 1; \
	fi
	@echo ""
	@echo "🎉 ファイル品質確認完了: $(FILE)"

# バックエンドのみテスト実行
test-backend:
	@echo "バックエンドテストを実行中..."
	docker compose exec backend go test ./...

# Lint実行
lint:
	@echo "フロントエンドLintを実行中..."
	docker compose exec frontend npm run lint
	@echo "バックエンドLintを実行中..."
	docker compose exec backend go vet ./...
	docker compose exec backend golint ./...

# フロントエンドのみLint実行
lint-frontend:
	@echo "フロントエンドLintを実行中..."
	docker compose exec frontend npm run lint

# フロントエンドLint自動修正
lint-fix-frontend:
	@echo "フロントエンドLint自動修正を実行中..."
	docker compose exec frontend npm run lint -- --fix

# バックエンドのみLint実行
lint-backend:
	@echo "バックエンドLintを実行中..."
	docker compose exec backend go vet ./...
	docker compose exec backend golint ./...

# フォーマット実行
format:
	@echo "フロントエンドコードをフォーマット中..."
	docker compose exec frontend npm run format

# フロントエンドのみフォーマット実行
format-frontend:
	@echo "フロントエンドコードをフォーマット中..."
	docker compose exec frontend npm run format

# フロントエンドビルド
build-frontend:
	@echo "フロントエンドをビルド中..."
	docker compose exec frontend npm run build

# フロントエンドドキュメント生成
docs-frontend:
	@echo "フロントエンドドキュメントを生成中..."
	docker compose exec frontend npm run docs

# フロントエンドドキュメント削除
docs-clean-frontend:
	@echo "フロントエンドドキュメントを削除中..."
	docker compose exec frontend npm run docs:clean

# フロントエンドドキュメントサーバー起動（バックグラウンド）
docs-serve-frontend:
	@echo "フロントエンドドキュメントサーバーをバックグラウンドで起動中..."
	@echo "ドキュメントは http://localhost:3001 で閲覧できます"
	@echo "停止する場合は: make docs-stop-frontend"
	docker compose exec -d frontend npm run docs:serve

# フロントエンドドキュメントサーバー停止
docs-stop-frontend:
	@echo "ドキュメントサーバーを停止中..."
	docker compose exec frontend pkill -f "serve docs"

# Storybookサーバー起動（バックグラウンド）
storybook-frontend:
	@echo "Storybookサーバーをバックグラウンドで起動中..."
	@echo "Storybookは http://localhost:6006 で閲覧できます"
	@echo "停止する場合は: make storybook-stop-frontend"
	docker compose exec -d frontend npm run storybook

# Storybookサーバー停止
storybook-stop-frontend:
	@echo "Storybookサーバーを停止中..."
	docker compose exec frontend pkill -f "storybook"

# JSDocからStorybookストーリー自動生成
generate-stories-frontend:
	@echo "JSDocコメントからStorybookストーリーを自動生成中..."
	docker compose exec frontend npm run generate-stories
	@echo "ストーリー生成が完了しました！"

# JSDocからStorybookストーリー強制再生成
generate-stories-frontend-force:
	@echo "JSDocコメントからStorybookストーリーを強制再生成中..."
	docker compose exec frontend npm run generate-stories:force
	@echo "ストーリー強制再生成が完了しました！"

# TypeDoc + Storybook 連携開発モード
docs-dev-frontend:
	@echo "==================================================="
	@echo "📚 ドキュメント開発モードを起動中..."
	@echo "==================================================="
	@echo "1. TypeDocドキュメント生成中..."
	$(MAKE) docs-frontend
	@echo "2. TypeDocサーバーをバックグラウンドで起動中..."
	$(MAKE) docs-serve-frontend
	@echo ""
	@echo "🎯 ドキュメント連携が完了しました！"
	@echo ""
	@echo "📖 TypeDoc（技術仕様書）: http://localhost:3001"
	@echo "🎨 Storybook（コンポーネント）: http://localhost:6006"
	@echo ""
	@echo "⚡ 両方でコンポーネントドキュメントを確認できます"
	@echo "⚡ StorybookからTypeDocへ、TypeDocからStorybookへリンク可能"
	@echo ""
	@echo "Storybookサーバーをバックグラウンドで起動中..."
	docker compose exec -d frontend npm run storybook

# フォーマットチェック実行
format-check:
	@echo "フロントエンドフォーマットをチェック中..."
	docker compose exec frontend npm run format:check

# フロントエンドのみフォーマットチェック実行
format-check-frontend:
	@echo "フロントエンドフォーマットをチェック中..."
	docker compose exec frontend npm run format:check

# フロントエンドパッケージインストール
npm-install:
	@echo "フロントエンドパッケージをインストール中..."
	docker compose exec frontend npm install

# フロントエンドパッケージ追加インストール
npm-install-package:
	@echo "パッケージ名を指定してください: make npm-install-package PKG=パッケージ名"
	@if [ -z "$(PKG)" ]; then echo "使用例: make npm-install-package PKG=lodash"; exit 1; fi
	docker compose exec frontend npm install $(PKG)

# 個別サービスのログ
backend:
	docker compose logs backend

frontend:
	docker compose logs frontend

db:
	docker compose logs db

# データベースマイグレーション
migrate:
	@echo "データベースマイグレーションを実行中..."
	docker compose exec backend go run cmd/server/main.go migrate

# サービス再起動
restart:
	docker compose restart

# 特定のサービスを再起動
restart-backend:
	docker compose restart backend

restart-frontend:
	docker compose restart frontend

restart-db:
	docker compose restart db

# サービス状態確認
status:
	docker compose ps

# データベースに接続
db-shell:
	docker compose exec db mysql -u root -p family_budget

# バックエンドサービスに接続
backend-shell:
	docker compose exec backend sh

# フロントエンドサービスに接続
frontend-shell:
	docker compose exec frontend sh

# バージョン管理
npm-version-minor:
	@echo "マイナーバージョンを上げています..."
	docker compose exec frontend npm version minor

npm-version-patch:
	@echo "パッチバージョンを上げています..."
	docker compose exec frontend npm version patch

npm-version-major:
	@echo "メジャーバージョンを上げています..."
	docker compose exec frontend npm version major

# カバレッジテスト実行 + ブラウザ表示
test-coverage-frontend:
	@echo "===================================================="
	@echo "📊 フロントエンドカバレッジテストを実行中..."
	@echo "===================================================="
	docker compose exec frontend npm run test:ci
	@echo ""
	@echo "🌐 カバレッジレポートサーバーを起動中..."
	@echo "📈 カバレッジレポート: http://localhost:8090"
	@echo "停止する場合は: make coverage-stop-frontend"
	@echo ""
	@pkill -f "python.*8090.*lcov-report" 2>/dev/null || true
	@python3 -m http.server 8090 --directory frontend/coverage/lcov-report &
	@echo "✅ カバレッジレポートがブラウザで表示できます！"

# カバレッジレポートサーバー起動（バックグラウンド）
coverage-serve-frontend:
	@echo "カバレッジレポートサーバーをバックグラウンドで起動中..."
	@echo "カバレッジレポート: http://localhost:8090"
	@echo "停止する場合は: make coverage-stop-frontend"
	@pkill -f "python.*8090.*lcov-report" 2>/dev/null || true
	@python3 -m http.server 8090 --directory frontend/coverage/lcov-report &

# カバレッジレポートサーバー停止
coverage-stop-frontend:
	@echo "カバレッジレポートサーバーを停止中..."
	@pkill -f "python.*8090.*lcov-report" 2>/dev/null || echo "サーバーは既に停止しています"

# フロントエンド品質確認統合（Prettier + ESLint + TypeScript + Jest + Build）
quality-check-frontend:
	@echo "========================================================"
	@echo "🔍 フロントエンド品質確認を開始します..."
	@echo "========================================================"
	@echo ""
	@echo "📐 1. Prettierフォーマットチェック実行中..."
	@echo "--------------------------------------------------------"
	@if docker compose exec frontend npm run format:check; then \
		echo "✅ Prettierフォーマットチェック: 合格"; \
	else \
		echo "❌ Prettierフォーマットチェック: 不合格"; \
		echo "💡 修正するには: make format-frontend"; \
		exit 1; \
	fi
	@echo ""
	@echo "🔧 2. ESLint静的解析実行中..."
	@echo "--------------------------------------------------------"
	@if docker compose exec frontend npm run lint; then \
		echo "✅ ESLint静的解析: 合格"; \
	else \
		echo "❌ ESLint静的解析: 不合格"; \
		echo "💡 修正可能なエラーは: docker compose exec frontend npm run lint -- --fix"; \
		exit 1; \
	fi
	@echo ""
	@echo "🎯 3. TypeScript型チェック実行中..."
	@echo "--------------------------------------------------------"
	@if docker compose exec frontend npm run typecheck; then \
		echo "✅ TypeScript型チェック: 合格"; \
	else \
		echo "❌ TypeScript型チェック: 不合格"; \
		echo "💡 型エラーを修正してください"; \
		exit 1; \
	fi
	@echo ""
	@echo "🧪 4. Jestテスト実行中..."
	@echo "--------------------------------------------------------"
	@if docker compose exec frontend npm run test:ci; then \
		echo "✅ Jestテスト: 合格"; \
	else \
		echo "❌ Jestテスト: 不合格"; \
		echo "💡 テストを修正してください"; \
		exit 1; \
	fi
	@echo ""
	@echo "🏗️  5. ビルドチェック実行中..."
	@echo "--------------------------------------------------------"
	@if docker compose exec frontend npm run build; then \
		echo "✅ ビルドチェック: 合格"; \
	else \
		echo "❌ ビルドチェック: 不合格"; \
		echo "💡 ビルドエラーを修正してください"; \
		exit 1; \
	fi
	@echo ""
	@echo "========================================================"
	@echo "🎉 フロントエンド品質確認が完了しました！"
	@echo "✅ Prettier: フォーマット適合"
	@echo "✅ ESLint: 静的解析合格"
	@echo "✅ TypeScript: 型チェック合格"
	@echo "✅ Jest: 全テスト合格"
	@echo "✅ Build: ビルド成功"
	@echo "========================================================"
