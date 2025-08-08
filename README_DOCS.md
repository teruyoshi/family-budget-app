# 📖 ドキュメント閲覧ガイド

家計簿アプリのTypeDocドキュメントの生成・閲覧方法について説明します。

## 🚀 ドキュメント生成・閲覧コマンド

### 1. ドキュメント生成
```bash
make docs-frontend
```

### 2. ドキュメントサーバー起動
```bash
make docs-serve-frontend
```
- サーバー起動後、ブラウザで http://localhost:3001 にアクセス
- Ctrl+C でサーバー停止

### 3. ドキュメント削除
```bash
make docs-clean-frontend
```

## 📁 ドキュメント構造

生成されるドキュメントには以下が含まれます：

- **Components**: 共通コンポーネント（AmountInput, DatePicker等）
- **Features**: 機能別コンポーネント（支出、収入、履歴、残高）
- **Hooks**: カスタムフック（useBudgetManager等）
- **Types**: TypeScript型定義とインターフェース

## 🎯 主要コンポーネント

### 🔧 共通コンポーネント
- `AmountInput` - 金額入力（¥フォーマット対応）
- `DatePicker` - 日付選択（MUI X DatePicker）
- `TransactionForm` - 取引フォーム（支出・収入共通）

### 💰 機能コンポーネント  
- `ExpenseForm/IncomeForm` - 支出・収入登録フォーム
- `HistoryList/HistoryItem` - 履歴表示（日付グループ化対応）
- `BalanceDisplay` - 残高表示

### 🎣 カスタムフック
- `useBudgetManager` - 統合家計簿管理フック

## 🌟 特徴

- 📝 日本語コメント完全対応
- 🏷️ TypeScript型安全性
- 📱 レスポンシブUI対応
- 🗓️ 日付管理機能
- 💱 金額フォーマット機能

---

詳細な使用方法やAPIについては、生成されたドキュメントをご覧ください。