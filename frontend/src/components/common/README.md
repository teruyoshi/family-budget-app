# 共通コンポーネント

フロントエンド全体で再利用可能な汎用コンポーネントを格納しています。

## TextInput

### 概要

MUI TextFieldをベースとした汎用的なテキスト入力コンポーネントです。一貫したスタイルとバリデーション機能を提供します。

### Props

| Prop        | Type                                 | Required | Default    | Description              |
| ----------- | ------------------------------------ | -------- | ---------- | ------------------------ |
| type        | string                               | No       | 'text'     | input要素のtype属性      |
| placeholder | string                               | No       | undefined  | プレースホルダーテキスト |
| value       | string                               | Yes      | -          | 入力値                   |
| onChange    | (value: string) => void              | Yes      | -          | 値変更時のコールバック   |
| sx          | SxProps<Theme>                       | No       | undefined  | MUI sxプロップス         |
| required    | boolean                              | No       | false      | 必須入力フラグ           |
| fullWidth   | boolean                              | No       | true       | 全幅表示                 |
| variant     | 'outlined' \| 'filled' \| 'standard' | No       | 'outlined' | 表示バリエーション       |

### 使用例

```tsx
import { useState } from 'react'
import TextInput from './TextInput'

function ExampleForm() {
  const [name, setName] = useState('')

  return (
    <TextInput
      type="text"
      placeholder="お名前を入力"
      value={name}
      onChange={setName}
      required
      variant="outlined"
      sx={{ mb: 2 }}
    />
  )
}
```

### スタイル

- MUI TextFieldを使用した統一されたデザイン
- Material Designガイドラインに沿ったスタイル
- sx propsによる柔軟なカスタマイズ
- レスポンシブ対応（fullWidthプロップ）

### アクセシビリティ

- `forwardRef`によるref転送対応
- MUI標準のaria属性とキーボードナビゲーション
- WCAGガイドライン準拠
