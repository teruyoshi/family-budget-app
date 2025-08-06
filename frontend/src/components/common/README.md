# 共通コンポーネント

フロントエンド全体で再利用可能な汎用コンポーネントを格納しています。

## TextInput

### 概要
汎用的なテキスト入力コンポーネントです。一貫したスタイルとバリデーション機能を提供します。

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| type | string | No | 'text' | input要素のtype属性 |
| placeholder | string | No | undefined | プレースホルダーテキスト |
| value | string | Yes | - | 入力値 |
| onChange | (value: string) => void | Yes | - | 値変更時のコールバック |
| className | string | No | '' | 追加のCSSクラス |
| required | boolean | No | false | 必須入力フラグ |

### 使用例

```tsx
import { useState } from 'react';
import TextInput from './TextInput';

function ExampleForm() {
  const [name, setName] = useState('');

  return (
    <TextInput
      type="text"
      placeholder="お名前を入力"
      value={name}
      onChange={setName}
      required
      className="mb-4"
    />
  );
}
```

### スタイル
- Tailwind CSSを使用した統一されたデザイン
- フォーカス時のblue-500リング表示
- レスポンシブ対応（w-full）
- カスタムクラス追加可能

### アクセシビリティ
- `forwardRef`によるref転送対応
- 適切なaria属性の設定
- キーボードナビゲーション対応