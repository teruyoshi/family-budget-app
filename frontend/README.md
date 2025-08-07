# フロントエンド

React 19 + TypeScript + Viteで構築された家計簿アプリのフロントエンドです。

## 🚀 技術スタック

- **React 19** + **TypeScript** + **Vite**
- **Material-UI (MUI) v6** + **Emotion**
- **Jest** + **React Testing Library**

## 🏗 開発

```bash
# Docker環境（推奨）
make test-frontend      # テスト実行
make lint-frontend      # ESLintチェック
make format-frontend    # Prettierフォーマット
make npm-install        # 依存関係インストール

# ローカル環境
npm run dev             # 開発サーバー (http://localhost:5173)
npm test                # テスト実行
npm run build           # プロダクションビルド
```

## 📁 構成

```
src/
├── components/common/        # 汎用コンポーネント
│   └── TextInput.tsx        # MUI TextFieldベース
├── features/expenses/        # 支出管理機能
│   └── components/
│       ├── ExpenseForm.tsx  # フォーム
│       └── ExpenseInput.tsx # 数値入力
└── App.tsx                  # メインアプリ
```

## 🧪 テスト戦略

- **__tests__/**: 包括的テスト（19テスト、5スイート通過）
- **integration/**: 統合テスト
- **co-located**: シンプルテスト

## 📝 開発規約

- TypeScript strict mode
- MUIコンポーネント + sx props
- TDD開発フロー
- ESLint + Prettier自動整形

詳細な実装例やベストプラクティスはコード内のコメントを参照してください。