# テストの効率的な実行方法

開発中のテスト実行を最適化する実践ガイド

## 🚀 基本的な実行方法

### 全テスト実行
```bash
make test-frontend        # 目標: 150テスト前後、1分以内（現在軽量化作業中）
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

### Jest設定最適化済み・軽量化方針
- **timeout設定**: 30秒（重いテスト対応、但し軽量化で不要になる予定）
- **React 19 act()警告**: 簡単な修正のみ実施、大規模修正は後回し
- **テスト数削減**: 重複テスト・過剰詳細テストを削除して高速化

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

#### テストが遅い（最優先対応課題）
```bash
# 特定ファイルのみ実行
make test-file FILE=問題のファイル.test.tsx

# 2024年12月優先: テスト軽量化で根本解決
# - 重複テストの特定・削除
# - 過剰詳細テストの削減
# - 実行昨1分以内を目標とする
```

#### React 19 act() 警告が出る（低優先対応）
- 現状: 大量のコンソール出力があるが機能的には問題なし
- 方針: 簡単に修正できる部分のみ対応、大規模修正は後回し
- 優先度: テスト実行時間短縮 > act()警告完全解決

#### TimeoutError
- Jest timeout 15秒に設定済み
- それでも発生する場合はテストロジック見直し

### デバッグ方法
```bash
# Jestデバッグモード
npm test -- --verbose --no-cache
```