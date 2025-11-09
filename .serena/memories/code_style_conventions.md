# コードスタイルと規約

## 言語・フレームワーク規約

### TypeScript
- **strict mode**: TypeScript厳格モード使用
- **簡潔なTSDoc**: 必要最小限のドキュメント
- **型安全性**: 型定義を厳密に行う

### React 19
- **ref as prop パターン**: React 19の新しいref渡しパターンを使用
- **forwardRef不使用**: 新しいref as propで代替
- **関数コンポーネント**: クラスコンポーネントは使用しない

### MUI v6
- **sx props**: スタイリングはsx propsを活用
- **slotProps**: コンポーネントカスタマイズにslotProps活用
- **テーマ統一**: Material-UIテーマシステム活用

### エクスポート規約
- **バレルエクスポート**: index.tsを使用した一括エクスポート
- **名前付きエクスポート**: デフォルトエクスポートよりも名前付きを優先

## プロジェクト規約

### 命名規則
- **コンポーネント**: PascalCase（例: `AppLayout`, `TransactionForm`）
- **ファイル名**: コンポーネントはPascalCase.tsx、その他はcamelCase
- **hooks**: useプレフィックス（例: `useBudgetManager`）

### ディレクトリ構造
```
src/
├── components/
│   ├── ui/          # 基本UIコンポーネント
│   ├── forms/       # フォーム関連
│   ├── navigation/  # ナビゲーション
│   └── layout/      # レイアウト
├── features/        # 機能別実装
├── pages/          # ページコンポーネント
├── hooks/          # カスタムフック
└── types/          # 型定義
```

### テスト規約
- **__tests__**: テストファイルは__tests__ディレクトリに配置
- **__stories__**: Storybookストーリーは__stories__ディレクトリに配置
- **.test.tsx**: テストファイルは.test.tsxまたは.test.ts拡張子

## パフォーマンス最適化
- **memo**: React.memoでコンポーネントメモ化
- **lazy**: React.lazyで動的インポート
- **useCallback**: 関数メモ化
- **useMemo**: 値メモ化

## 日本語統一方針
- **コメント**: 日本語で記述
- **ドキュメント**: 日本語で記述
- **コミットメッセージ**: 日本語で記述
- **変数名・関数名**: 英語（国際的標準に準拠）