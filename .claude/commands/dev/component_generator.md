# Reactコンポーネント生成

**使用方法**: `/dev:component_generator <component_name> [component_type]`

## コンポーネント種類
- **common**: 汎用コンポーネント (デフォルト)
- **feature**: 機能特化コンポーネント
- **page**: ページコンポーネント
- **layout**: レイアウトコンポーネント

## 生成ファイル

### 基本セット
```
src/components/[type]/
├── ComponentName.tsx          # メインコンポーネント
├── index.ts                   # バレルエクスポート  
├── __tests__/
│   └── ComponentName.test.tsx # テストファイル
└── __stories__/
    └── ComponentName.stories.tsx # Storybookストーリー
```

### 機能コンポーネントの場合
```
src/features/[feature_name]/components/
├── ComponentName.tsx
├── types.ts                   # 型定義
├── hooks/
│   └── useComponentName.ts    # 専用フック
└── __tests__/
    ├── ComponentName.test.tsx
    └── useComponentName.test.ts
```

## テンプレート仕様

### TypeScript
- **strict mode**: 厳密な型チェック
- **Props interface**: 必須・オプション明確化
- **forwardRef**: DOM操作対応
- **Generic**: 再利用性向上

### テスト
- **React Testing Library**: 推奨テストライブラリ  
- **カバレッジ**: 90%以上目標
- **アクセシビリティ**: role・aria属性テスト

### Storybook
- **Controls**: プロパティ操作
- **Actions**: イベントハンドラー
- **Docs**: 自動ドキュメント生成
- **Accessibility**: アクセシビリティチェック

## 命名規則

### ファイル名
- **PascalCase**: `UserProfile.tsx`
- **camelCase**: hooks `useUserProfile.ts`
- **kebab-case**: stories `user-profile.stories.tsx`

### Props
- **Descriptive**: `isLoading` not `loading`
- **Consistent**: `onSubmit` not `handleSubmit`
- **Optional**: `title?` で明示

## 使用例

```bash
# 汎用ボタンコンポーネント
/dev:component_generator Button common

# ユーザープロファイル機能
/dev:component_generator UserProfile feature

# ダッシュボードページ  
/dev:component_generator Dashboard page
```