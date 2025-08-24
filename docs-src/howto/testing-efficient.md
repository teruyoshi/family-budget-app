# テストの効率的な実行方法

開発中のテスト実行を最適化する実践ガイド

## 🚀 基本的な実行方法

### 全テスト実行
```bash
make test-frontend        # 240テスト、25スイート実行
```

### 特定ファイルのみ実行（推奨）
```bash
# 開発中は特定ファイルのみ実行で効率化
make test-file FILE=AmountInput.test.tsx
make test-file FILE=TransactionForm.test.tsx
make test-file FILE=useMoney.test.ts
```

### 部分マッチでグループ実行
```bash
make test-file FILE="Money"       # 金額関連テスト
make test-file FILE="Navigation"  # ナビゲーション関連
make test-file FILE="Controlled"  # フォーム関連
```

## ⚡ パフォーマンス最適化

### Jest設定最適化済み
- **timeout延長**: 15秒（重いテスト対応）
- **act()警告解決**: React状態更新の適切なラップ
- **Ripple無効化**: MUIアニメーション無効化で高速化

### 効率的な開発フロー
1. **コード修正**
2. **特定ファイルテスト**: `make test-file FILE=対象ファイル`
3. **修正完了後に全テスト**: `make test-frontend`

## 🔍 カバレッジ確認

```bash
make test-coverage-open   # ブラウザでカバレッジ表示
```

カバレッジレポート: `frontend/coverage/lcov-report/index.html`

## 📊 テスト種別

### 単体テスト
- **コンポーネント**: UI動作・プロパティ・状態管理
- **フック**: カスタムフック・状態変更・副作用
- **ライブラリ**: フォーマット・バリデーション機能

### 統合テスト
- **ルーティング**: ページ遷移・URL同期
- **データフロー**: コンポーネント間データ連携

## 🛠 トラブルシューティング

### よくある問題

#### テストが遅い
```bash
# 特定ファイルのみ実行
make test-file FILE=問題のファイル.test.tsx
```

#### act() 警告が出る
- 既存コードで解決済み
- 新規コンポーネントは既存パターンを参照

#### TimeoutError
- Jest timeout 15秒に設定済み
- それでも発生する場合はテストロジック見直し

### デバッグ方法
```bash
# Jestデバッグモード
npm test -- --verbose --no-cache
```