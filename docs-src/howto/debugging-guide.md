# デバッグ・トラブルシューティングガイド

**目的**: 問題発生時の迅速な原因特定・解決支援

**適用範囲**:
- 対象: 開発環境問題・アプリケーションエラー・パフォーマンス問題
- 影響: 問題解決速度・開発継続性・ストレス軽減

## 🚨 緊急時の最短解決フロー

### ⚡ 1分でできる基本確認
```bash
# システム基本状況
make up                              # コンテナ起動確認
docker compose ps                    # サービス稼働状況
curl -I http://localhost:5173        # フロントエンド疎通
curl -I http://localhost:8080/health # バックエンド疎通

# 即座に解決する可能性が高い操作
make down && make up                 # 環境完全リセット（90%の問題解決）
```

### 🔍 5分でできる詳細診断
```bash
# ログ確認（問題箇所特定）
make dev                            # 全サービスログリアルタイム表示
docker compose logs frontend --tail=50
docker compose logs backend --tail=50
docker compose logs mysql --tail=20

# 基本的な修復試行
make npm-install                    # 依存関係修復
make quality-check-frontend         # 基本品質問題確認
```

## 🐛 問題種別別デバッグ戦略

### 1. 起動・環境問題

#### Docker・コンテナ問題
```bash
# 診断手順
docker compose ps                   # サービス状態確認
docker system df                    # ディスク使用量確認
docker compose logs SERVICE_NAME    # 特定サービスログ

# 解決手順
make down                          # サービス停止
docker system prune -f             # 不要リソース削除
docker volume prune -f             # 不要ボリューム削除（注意：データ消失）
make up                            # 環境再構築

# 重篤な場合
docker system reset                # Docker完全リセット（最終手段）
```

#### ポート競合問題
```bash
# ポート使用状況確認
lsof -i :5173                      # フロントエンドポート
lsof -i :8080                      # バックエンドポート  
lsof -i :3306                      # MySQLポート
lsof -i :6006                      # Storybookポート

# ポート解放
lsof -ti:5173 | xargs kill -9      # プロセス強制終了
# または
pkill -f "node.*5173"              # Node.jsプロセス終了
```

#### 依存関係問題
```bash
# 診断
npm ls --depth=0                   # 依存関係ツリー確認
npm audit                          # 脆弱性・依存問題確認

# 解決
rm -rf frontend/node_modules       # node_modules削除
rm frontend/package-lock.json      # lockファイル削除
make npm-install                   # 依存関係完全再構築

# 特定パッケージ問題
npm cache clean --force            # npmキャッシュクリア
```

### 2. アプリケーション・コード問題

#### React・フロントエンド問題
```bash
# リアルタイムデバッグ
make dev                           # 開発モードでログ確認
# ブラウザ開発者ツール: Console、Network、React DevTools

# コンポーネント単体確認
make storybook-frontend            # Storybookで分離確認
make test-file FILE=問題コンポーネント.test.tsx

# TypeScript型問題
npx tsc --noEmit                   # 型チェックのみ実行
make quality-check-file FILE=問題ファイル.tsx
```

#### API・バックエンド問題
```bash
# API疎通確認
curl -v http://localhost:8080/api/health
curl -X GET http://localhost:8080/api/transactions
curl -X POST http://localhost:8080/api/transactions \
  -H "Content-Type: application/json" \
  -d '{"amount":1000,"category":"test"}'

# データベース確認
docker compose exec mysql mysql -u root -p
# パスワード: root
mysql> USE family_budget;
mysql> SHOW TABLES;
mysql> SELECT * FROM transactions LIMIT 5;
```

#### テスト関連問題
```bash
# テスト詳細実行
make test-file FILE=失敗テスト.test.tsx -- --verbose
npm test -- --no-cache             # キャッシュなしテスト

# テスト環境問題
rm -rf frontend/coverage           # カバレッジファイル削除
npm test -- --clearCache           # Jestキャッシュクリア

# act()警告問題（解決済みパターン参照）
# src/__tests__/test-utils/optimization.setup.ts
```

### 3. パフォーマンス問題

#### ビルド・実行速度問題
```bash
# ビルド解析
npm run build -- --analyze         # バンドル解析
make analyze-bundle                # サイズ可視化（将来実装）

# テスト実行時間
make test-frontend -- --verbose     # 詳細実行時間表示
make test-frontend -- --maxWorkers=2  # 並列数調整

# 開発サーバー最適化
# vite.config.ts の設定確認・調整
```

#### メモリ・リソース問題
```bash
# システムリソース確認
docker stats                       # コンテナリソース使用量
htop                              # システム全体リソース
free -h                           # メモリ使用状況

# メモリリーク調査
# Chrome DevTools: Memory tab
# React DevTools: Profiler
```

## 🔬 高度なデバッグテクニック

### 1. ログベースデバッグ

#### 構造化ログ確認
```bash
# JSON形式ログの整形表示
docker compose logs backend | jq '.'

# 特定レベルログ抽出
docker compose logs | grep "ERROR"
docker compose logs | grep "WARN"

# 時系列ログ追跡
docker compose logs --follow --timestamps
```

#### カスタムデバッグログ
```typescript
// 一時的なデバッグログ追加（本番前削除必須）
console.log('🐛 Debug:', { variable, state, props });
console.time('🚀 Performance');
// 処理
console.timeEnd('🚀 Performance');
```

### 2. React特化デバッグ

#### コンポーネント状態追跡
```javascript
// ブラウザコンソールでReactコンポーネント情報取得
$0.__reactInternalInstance          // 選択要素のReact情報
React.version                       // Reactバージョン確認
```

#### Hook デバッグ
```typescript
// カスタムフックの詳細デバッグ
import { useDebugValue } from 'react';

export const useMoney = (initialAmount: number) => {
  const [amount, setAmount] = useState(initialAmount);
  
  // React DevToolsで表示される情報
  useDebugValue(amount, amount => `¥${amount.toLocaleString()}`);
  
  return { amount, setAmount };
};
```

### 3. ネットワーク・API デバッグ

#### HTTP通信詳細確認
```bash
# リクエスト詳細ログ
curl -v -X POST http://localhost:8080/api/transactions \
  -H "Content-Type: application/json" \
  -d '{"amount":1000}' \
  > debug_request.log 2>&1

# プロキシ経由デバッグ（必要時）
# Charles Proxy, Fiddler等でHTTP通信キャプチャ
```

#### WebSocket・リアルタイム通信
```javascript
// WebSocket接続デバッグ（将来実装時）
const ws = new WebSocket('ws://localhost:8080/ws');
ws.onopen = () => console.log('🔌 WebSocket connected');
ws.onmessage = (event) => console.log('📨 Message:', event.data);
ws.onerror = (error) => console.error('❌ WebSocket error:', error);
```

## 📋 問題解決チェックリスト

### 🔴 緊急度高（サービス停止）
- [ ] コンテナ起動確認: `make up`
- [ ] 基本疎通確認: `curl localhost:5173`, `curl localhost:8080`
- [ ] ログ緊急確認: `make dev`
- [ ] 環境リセット: `make down && make up`

### 🟡 緊急度中（機能問題）
- [ ] 関連テスト実行: `make test-file FILE=問題箇所.test.tsx`
- [ ] コンポーネント分離確認: `make storybook-frontend`
- [ ] 品質チェック: `make quality-check-file FILE=問題ファイル`
- [ ] 依存関係確認: `make npm-install`

### 🟢 緊急度低（改善・最適化）
- [ ] 全体品質チェック: `make quality-check-frontend`
- [ ] パフォーマンス分析: ビルドサイズ・実行時間確認
- [ ] ドキュメント更新: 解決方法をドキュメントに追記
- [ ] 再発防止策: 自動化・テストケース追加検討

## 🎯 予防的デバッグ

### 定期的健康チェック
```bash
# 週次実行推奨
make quality-check-frontend         # 品質劣化確認
npm audit                          # 脆弱性確認
docker system df                   # ディスク使用量確認
git log --oneline -20              # 最近の変更影響確認
```

### 早期警告システム（将来実装）
```bash
make health-check                  # システム健康度確認
make performance-check             # パフォーマンス劣化検出
make security-check               # セキュリティ問題検出
```

このデバッグガイドにより、**迅速な問題特定**と**効率的な解決**が実現できます。