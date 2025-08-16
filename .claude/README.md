# Claude Code 設定・コマンドガイド

この `.claude` ディレクトリには、家計簿アプリプロジェクト専用の Claude Code 設定とカスタムコマンドが含まれています。

## 📁 ディレクトリ構成

```
.claude/
├── README.md                    # このファイル
├── settings.json                # プロジェクト設定
└── commands/                    # カスタムスラッシュコマンド
    ├── github/
    │   └── create_branch.md     # GitHub Issue ブランチ作成
    ├── dev/
    │   └── component_generator.md # React コンポーネント生成
    ├── quality/
    │   └── code_review.md       # コード品質レビュー
    ├── docs/
    │   └── update_architecture.md # アーキテクチャ文書更新
    └── ddd-explan-custom.md     # DDD・クリーンアーキテクチャ解説
```

## 🎯 カスタムコマンド一覧

### GitHub連携
- `/github:create_branch <issue_number>` - Issue から適切なブランチを作成

### 開発支援  
- `/dev:component_generator <name> [type]` - React コンポーネント雛形生成
- `/quality:code_review [path]` - 包括的コード品質チェック

### ドキュメント生成
- `/docs:update_architecture [scope]` - アーキテクチャ文書自動更新
- `/ddd_explan_custom <要件名>` - DDD・クリーンアーキテクチャ FAQ 生成

## ⚙️ プロジェクト設定

### 許可ツール
Claude Code が使用可能なツール一覧：
- ファイル操作: `Read`, `Write`, `Edit`, `MultiEdit`
- 検索: `Glob`, `Grep`, `LS`
- 実行: `Bash`, `BashOutput`, `KillBash`
- 開発支援: `TodoWrite`, `Task`, `WebFetch`, `WebSearch`

### 除外パターン
以下のファイル・ディレクトリは Claude Code の処理対象外：
- `node_modules/`, `dist/`, `build/`, `coverage/`
- ログファイル、一時ファイル、OS固有ファイル
- Docker データ、IDE設定ファイル

### 品質基準
- **テストカバレッジ**: 90% 以上
- **Lint エラー**: 0 件
- **TypeScript エラー**: 0 件

## 🔧 使用方法

### 1. カスタムコマンド実行
Claude Code セッション内で `/` を入力するとコマンド一覧が表示されます。

```bash
# 例: Issue #25 からブランチ作成
/github:create_branch 25

# 例: ボタンコンポーネント生成  
/dev:component_generator Button common

# 例: コード品質チェック
/quality:code_review src/components
```

### 2. 設定カスタマイズ
`settings.json` を編集してプロジェクト固有設定を調整可能：

```json
{
  "customSettings": {
    "qualityGates": {
      "testCoverage": 95,  // カバレッジ基準変更
      "lintErrors": 0
    }
  }
}
```

### 3. 新規コマンド追加
`commands/` ディレクトリに Markdown ファイルを追加すると、自動でカスタムコマンドとして認識されます。

## 📋 ベストプラクティス

### コミット・PR作成
- Issue 番号ベースのブランチ命名
- Conventional Commits 形式のコミットメッセージ  
- Claude 署名の自動追加

### コード品質
- 定期的な `/quality:code_review` 実行
- テスト駆動開発（TDD）の推奨
- TypeScript strict mode の活用

### ドキュメント維持
- `/docs:update_architecture` での自動更新
- ADR（Architecture Decision Records）記録
- Storybook での UI ドキュメント化

## 🚀 効率的な開発フロー

1. **Issue 確認** → `/github:create_branch <issue_number>`
2. **機能実装** → `/dev:component_generator` でコンポーネント作成
3. **品質チェック** → `/quality:code_review` で検証  
4. **文書更新** → `/docs:update_architecture` で最新化
5. **PR作成** → Claude Code で自動PR作成・コメント

この設定により、Claude Code を活用した効率的で品質の高い開発が可能になります。