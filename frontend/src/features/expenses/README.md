# 支出管理機能

家計簿アプリの支出記録・管理に関するコンポーネント群です。

## アーキテクチャ

```
expenses/
├── components/          # 支出関連コンポーネント
│   ├── ExpenseForm.tsx     # 支出登録フォーム
│   ├── ExpenseForm.test.tsx # フォーム結合テスト
│   └── ExpenseInput.tsx    # 支出金額入力
└── README.md           # このファイル
```

## コンポーネント

### ExpenseForm

支出登録フォーム全体を管理するコンポーネントです。

#### 特徴
- 支出金額の入力と送信処理
- バリデーション（正の数値のみ）
- 送信後の入力フィールドクリア

#### Props
```tsx
interface ExpenseFormProps {
  onSubmit?: (amount: number) => void;
}
```

#### 使用例
```tsx
import ExpenseForm from './features/expenses/components/ExpenseForm';

function App() {
  const handleExpenseSubmit = (amount: number) => {
    console.log('支出登録:', amount);
    // API呼び出しなどの処理
  };

  return (
    <ExpenseForm onSubmit={handleExpenseSubmit} />
  );
}
```

### ExpenseInput

数値入力専用のコンポーネントです。支出金額の入力に特化しています。

#### 特徴
- 数値のみ入力可能（小数点を含む）
- 汎用的なTextInputコンポーネントを使用
- 支出に適したプレースホルダー

#### Props
```tsx
interface ExpenseInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}
```

#### 使用例
```tsx
import { useState } from 'react';
import ExpenseInput from './ExpenseInput';

function CustomForm() {
  const [amount, setAmount] = useState('');

  return (
    <ExpenseInput
      value={amount}
      onChange={setAmount}
      placeholder="金額を入力してください"
    />
  );
}
```

## テスト戦略

### ExpenseForm.test.tsx
結合テストファイルとして、フォーム全体の動作を検証しています。

#### テストケース
- 支出入力用のテキストボックス表示確認
- 支出登録ボタン表示確認

### TDD開発フロー
1. **Red**: テストを書いて失敗させる
2. **Green**: 最小限の実装でテストを通す
3. **Refactor**: コードの品質向上

## 数値バリデーション

ExpenseInputコンポーネントでは、正規表現を使用した入力制限を実装：

```tsx
const handleChange = (inputValue: string) => {
  // 数値のみ許可（小数点を含む）
  if (inputValue === '' || /^\d*\.?\d*$/.test(inputValue)) {
    onChange(inputValue);
  }
};
```

- 空文字または数値（小数点含む）のみ許可
- 不正な文字入力は無視

## 今後の拡張予定

- 支出カテゴリ選択機能
- 日付選択機能  
- 支出履歴表示機能
- 編集・削除機能