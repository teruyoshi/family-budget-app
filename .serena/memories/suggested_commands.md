# 推奨開発コマンド

## 必須コマンド（Makefile使用）

### 環境管理
```bash
make up                       # 全サービス起動
make dev                      # 開発環境起動（ログ表示）
make down                     # 全サービス停止
```

### 開発・テスト
```bash
make test-frontend            # フロントエンドテスト（全テスト実行）
make test-file FILE=ファイル名  # 特定のテストファイルのみ実行
make lint-frontend            # ESLintチェック
make format-frontend          # Prettierフォーマット
make quality-check-frontend   # 5段階統合品質チェック
```

## セットアップ
```bash
# リポジトリクローン
git clone <repository-url>
cd family-budget-app

# 環境変数設定
cp .env.example .env

# 全サービスビルド・起動
make up
```

## トラブルシューティング
```bash
make down && make up     # コンテナ再起動
make npm-install         # 依存関係再インストール
make logs                # ログ確認
```

## 作業完了基準
- **テスト通過**: `make test-frontend` で全テスト通過確認
- **品質チェック**: `make quality-check-frontend` でコード品質確認

## Linuxシステムコマンド
```bash
git                      # バージョン管理
ls                       # ディレクトリ一覧
cd                       # ディレクトリ移動
grep                     # テキスト検索
find                     # ファイル検索
```