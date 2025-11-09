# タスク完了時の必須ワークフロー

## 作業完了基準
タスク完了時は以下の手順を必ず実行すること：

### 1. テスト実行
```bash
make test-frontend
```
- 全テストが通過することを確認
- 失敗した場合は修正が必要

### 2. 品質チェック（5段階統合チェック）
```bash
make quality-check-frontend
```

**チェック内容**:
1. **Prettier** - コードフォーマット統一
2. **ESLint** - 標準設定ベース最小カスタマイズ
3. **TypeScript** - strict mode厳格型チェック
4. **Jest** - 自動テスト実行
5. **Vite Build** - プロダクションビルド確認

### 3. 個別チェックコマンド（必要に応じて）
```bash
make lint-frontend      # ESLintチェック
make format-frontend    # Prettierフォーマット
```

## コミットメッセージ規約
### Claude署名必須
```
<コミットメッセージ>

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

### 言語規約
- **コミットメッセージ**: 日本語で記述
- **コメント**: 日本語で記述
- **ドキュメント**: 日本語で記述

## 作業フロー原則
### 必須作業フロー
**1タスク集中→完了→停止→指示待ち**
- TodoWrite使用でタスク管理
- **複数タスクの並行作業は絶対禁止**
- 1つのタスクが完了するまで他に手を出さない
- 完了後は必ず停止してユーザーの指示を待つ

## トラブルシューティング
### 問題発生時の対処
**即座にアクセス**: **[緊急デバッグガイド](docs-src/howto/debugging-guide.md)**
- 1分で基本確認
- 5分で詳細診断

### よくある問題の解決
```bash
make down && make up     # コンテナ再起動
make npm-install         # 依存関係再インストール
make logs                # ログ確認
```

## 品質基準
- **全テスト通過**: 429テスト全通過必須
- **カバレッジ維持**: Statements 80%以上維持
- **ESLint・TypeScript**: エラー0件
- **ビルド成功**: プロダクションビルド成功