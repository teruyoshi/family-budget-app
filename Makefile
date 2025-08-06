# Makefile for Family Budget App

.PHONY: help up down build rebuild logs clean dev test backend frontend db migrate lint lint-frontend lint-backend format format-frontend format-check format-check-frontend

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
	@echo "  make test-backend  - バックエンドテスト実行"
	@echo "  make lint       - 全Lintチェック実行"
	@echo "  make lint-frontend - フロントエンドLintチェック実行"
	@echo "  make lint-backend  - バックエンドLintチェック実行"
	@echo "  make format     - 全コードフォーマット実行"
	@echo "  make format-frontend - フロントエンドコードフォーマット実行"
	@echo "  make format-check   - 全コードフォーマットチェック実行"
	@echo "  make format-check-frontend - フロントエンドフォーマットチェック実行"
	@echo "  make npm-install   - フロントエンドパッケージインストール"
	@echo "  make npm-install-package PKG=パッケージ名 - 新しいパッケージ追加"
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
	docker compose exec frontend npm test
	@echo "バックエンドテストを実行中..."
	docker compose exec backend go test ./...

# フロントエンドのみテスト実行
test-frontend:
	@echo "フロントエンドテストを実行中..."
	docker compose exec frontend npm test

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