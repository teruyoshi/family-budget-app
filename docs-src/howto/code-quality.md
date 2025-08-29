# 5段階品質チェックの使い方

統合品質保証システムの実践ガイド

## 🚀 基本的な実行方法

### 統合品質チェック（推奨）
```bash
make quality-check-frontend      # 5段階チェック一括実行
```

### 個別ファイルチェック
```bash
make quality-check-file FILE=AmountInput.tsx    # 特定ファイルのみ
```

## 📋 5段階チェック詳細

### 1. Prettier (コードフォーマット)
```bash
make format-frontend        # 自動整形実行
```
- **目的**: コードスタイル統一
- **対象**: .ts, .tsx, .js, .jsx, .json, .md
- **自動修正**: あり

### 2. ESLint (コード品質)
```bash
make lint-frontend          # 品質チェック
make lint-fix-frontend      # 自動修正
```
- **目的**: コード品質・ベストプラクティス
- **ルール**: React/TypeScript/Accessibility対応
- **自動修正**: 一部対応

### 3. TypeScript (型チェック)
```bash
npx tsc --noEmit          # 型チェックのみ
```
- **目的**: 型安全性確保
- **strict mode**: 有効
- **自動修正**: なし（手動修正必要）

### 4. Jest (テスト実行)
```bash
make test-frontend         # 全テスト実行
```
- **目的**: 機能動作保証
- **対象**: 240テスト、25スイート
- **自動修正**: なし（テスト修正必要）

### 5. Vite Build (プロダクションビルド)
```bash
npm run build             # ビルド実行
```
- **目的**: 本番環境デプロイ可能性確認
- **チェック**: バンドルサイズ・依存関係
- **自動修正**: なし（設定修正必要）

## ⚡ 効率的な品質管理

### 開発フロー（推奨）
1. **コード修正**
2. **個別チェック**: `make quality-check-file FILE=修正ファイル`
3. **問題修正**
4. **統合チェック**: `make quality-check-frontend`

### CI/CD連携
- **GitHub Actions**: 品質チェック自動実行
- **Pre-commit Hook**: コミット前自動チェック
- **Firebase Deploy**: ビルド成功時のみデプロイ

## 🛠 トラブルシューティング

### よくある問題と解決策

#### Prettier エラー
```bash
make format-frontend      # 自動修正で解決
```

#### ESLint エラー
```bash
make lint-fix-frontend    # 自動修正試行
# 手動修正が必要な場合はエラーメッセージに従う
```

#### TypeScript エラー
- **型定義不足**: `src/types/` に型定義追加
- **import エラー**: パス・バレルエクスポート確認
- **strict エラー**: null安全・型注釈追加

#### テストエラー
```bash
make test-file FILE=失敗テスト.test.tsx    # 個別実行で詳細確認
```

#### ビルドエラー
- **バンドルサイズ**: 不要依存関係削除
- **環境変数**: .env設定確認
- **パス解決**: vite.config.ts確認

## 📊 品質メトリクス

### 品質基準
- **Prettier**: 100% 自動整形
- **ESLint**: 0エラー、0警告
- **TypeScript**: 0エラー（strict mode）
- **Jest**: 100% テスト通過
- **Build**: 成功（サイズ制限内）

### 継続的改善
- **カバレッジ**: テストカバレッジ維持・向上
- **パフォーマンス**: バンドルサイズ監視
- **アクセシビリティ**: ESLintルール強化