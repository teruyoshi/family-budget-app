# オンボーディング & 実行プレイブック

**目的**: 新規参加者やAIが最短で動かせる状態に到達

**適用範囲**:
- 対象: Frontend/Backend/共通環境
- 影響: 開発環境構築・初回実行・トラブル回避

**更新方針**:
- 変更があったら開発チーム誰でも更新
- 最低レビュー: 1名（実行確認必須）
- Freshness: 30日毎に動作検証

## ⚡ ワンコマンド起動

### 前提ツール（バージョン固定）
```bash
node --version    # v20.x.x
go version       # go1.21.x
docker --version # 24.x.x
make --version   # 4.x
```

### 最短起動手順
```bash
# 1. リポジトリクローン・移動
git clone https://github.com/teruyoshi/family-budget-app.git
cd family-budget-app

# 2. 全サービス起動（Docker環境）
make up          # MySQL + Frontend + Backend起動

# 3. 初回依存関係インストール
make npm-install # フロントエンド依存関係

# 4. 動作確認
make test-frontend     # テスト実行（240テスト）
```

### アクセス確認
- **フロントエンド**: http://localhost:5173
- **バックエンドAPI**: http://localhost:8080
- **phpMyAdmin**: http://localhost:8081 (root/root)
- **Storybook**: `make storybook-frontend` → http://localhost:6006

## 🔧 開発環境セットアップ

### コンテナ環境（推奨）
```bash
make dev                    # 開発環境（ログ表示）
make frontend-shell         # フロントエンドコンテナ接続
make backend-shell          # バックエンドコンテナ接続
make down                   # 全サービス停止
```

### ローカル環境
```bash
cd frontend
npm install
npm run dev                 # http://localhost:5173

cd ../backend
go mod tidy
go run cmd/server/main.go   # http://localhost:8080
```

## 🚀 よく使うコマンド

### 開発・テスト
```bash
make test-frontend               # 全テスト実行
make test-file FILE=ファイル名   # 特定ファイルテスト
make quality-check-frontend      # 5段階品質チェック
make lint-fix-frontend           # コード自動修正
```

### データ・環境
```bash
make reset-dev                   # 開発DB完全リセット
make seed-dev                    # サンプルデータ投入
```

### ビルド・デプロイ
```bash
make test-frontend && make quality-check-frontend  # リリース前チェック
npm run build                    # プロダクションビルド
```

## 🛠 トラブルシューティング

### よくあるエラーと対処

#### 1. Docker起動失敗
```bash
# エラー: port already in use
make down                        # 既存コンテナ停止
docker system prune -f           # 不要コンテナ削除
make up                          # 再起動
```

#### 2. フロントエンドビルドエラー
```bash
# エラー: node_modules corruption
rm -rf frontend/node_modules frontend/package-lock.json
make npm-install                 # 依存関係再インストール
```

#### 3. テスト失敗
```bash
# 特定テストのみ実行して詳細確認
make test-file FILE=失敗テスト.test.tsx

# テストキャッシュクリア
cd frontend && npm test -- --clearCache
```

#### 4. データベース接続エラー
```bash
# MySQL コンテナ状態確認
docker compose ps
docker compose logs mysql

# DB完全リセット
make down
docker volume prune -f           # ボリューム削除
make up
```

#### 5. ポート競合
```bash
# 使用中ポート確認
lsof -ti:5173 | xargs kill -9    # フロントエンド
lsof -ti:8080 | xargs kill -9    # バックエンド
lsof -ti:3306 | xargs kill -9    # MySQL
```

### 環境固有の問題

#### WSL2 (Windows)
```bash
# ファイル監視問題
echo 'fs.inotify.max_user_watches=524288' | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```

#### Apple Silicon (M1/M2)
```bash
# Docker platform指定
docker compose --platform linux/amd64 up
```

## 📊 動作確認チェックリスト

### ✅ 初期セットアップ確認
- [ ] `make up` でエラーなく起動
- [ ] http://localhost:5173 でフロントエンド表示
- [ ] http://localhost:8080/health でAPI疎通確認
- [ ] `make test-frontend` で全テスト通過

### ✅ 開発フロー確認
- [ ] コード修正→保存で自動リロード
- [ ] `make test-file FILE=サンプル.test.tsx` で個別テスト実行
- [ ] `make quality-check-frontend` で品質チェック通過

### ✅ トラブル対応確認
- [ ] `make down && make up` で環境リセット
- [ ] エラーログ確認方法理解
- [ ] 基本的な Docker コマンド理解

## 🔗 次のステップ

初期セットアップ完了後の学習パス:
1. **[アーキテクチャ概要](../architecture/README.md)** - システム全体理解
2. **[テスト戦略](../testing/README.md)** - テストのルール・実行方法
3. **[How-toガイド](../howto/README.md)** - 具体的な開発手順
4. **[品質規約](../quality/README.md)** - コード品質基準