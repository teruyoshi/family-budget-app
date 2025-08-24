# Storybook自動ドキュメント生成

コンポーネントストーリー作成とドキュメント自動化

## 🚀 基本的な使い方

### Storybook起動
```bash
make storybook-frontend   # http://localhost:6006 で起動
make storybook-stop-frontend  # 停止
```

### ストーリーファイル作成
```typescript
// components/ui/NewComponent.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { NewComponent } from './NewComponent';

const meta: Meta<typeof NewComponent> = {
  title: 'UI/NewComponent',
  component: NewComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // プロパティを設定
  },
};

export const Variant: Story = {
  args: {
    // バリアント設定
  },
};
```

## 📝 TSDoc自動連携

### コンポーネントにTSDoc記述
```typescript
/**
 * 金額入力コンポーネント
 * 
 * @example
 * ```tsx
 * <AmountInput
 *   value={1000}
 *   onChange={(amount) => console.log(amount)}
 * />
 * ```
 */
export const AmountInput: React.FC<AmountInputProps> = ({ ... }) => {
  // 実装
};
```

### 自動ドキュメント生成
- **TSDoc → Storybook**: コンポーネントドキュメント自動生成
- **Props Table**: TypeScript型定義から自動生成
- **Usage Examples**: @exampleタグから使用例表示

## 🎨 ストーリー分類

### ディレクトリ構造
```
components/
├── ui/              # UI基本 → 'UI/' カテゴリ
├── forms/           # フォーム → 'Forms/' カテゴリ  
├── navigation/      # ナビ → 'Navigation/' カテゴリ
└── layout/          # レイアウト → 'Layout/' カテゴリ
```

### カテゴリ命名規則
- **UI**: 基本UIコンポーネント
- **Forms**: フォーム関連コンポーネント
- **Navigation**: ナビゲーション関連
- **Layout**: レイアウト関連

## ⚡ 最適化設定

### preview.ts最適化済み
- **テーマプロバイダー**: MUI統合
- **日付ローカライズ**: 日本語対応
- **パフォーマンス**: ビルド時間短縮

### 自動生成対象
- **Props Documentation**: 型定義から自動
- **Controls**: インタラクティブプロパティ操作
- **Actions**: イベントハンドラー自動ログ

## 🔧 新規コンポーネント追加手順

1. **コンポーネント作成**: TSDoc付きで実装
2. **ストーリー作成**: 上記テンプレートを使用
3. **テスト作成**: `__tests__/` に単体テスト
4. **確認**: Storybookでドキュメント確認

## 📊 統合ドキュメント

### 生成されるドキュメント
- **コンポーネント一覧**: カテゴリ別整理
- **使用例**: インタラクティブ操作可能
- **プロパティ仕様**: 型安全な仕様書
- **デザインシステム**: 統一されたUI指針