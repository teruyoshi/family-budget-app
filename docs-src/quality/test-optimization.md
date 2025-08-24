# テスト最適化ガイド

## 概要

フロントエンドテストのパフォーマンス向上とact()警告対策のガイドライン。

## 基本設定

### Jest最適化

```javascript
// jest.config.js
{
  testTimeout: 15000,    // MUI非同期処理対応
  maxWorkers: '50%',     // CPU効率化
  cache: true,           // キャッシュ有効化
}
```

### Testing Library設定

```javascript
// setupTests.ts
configure({
  asyncUtilTimeout: 3000, // MUI対応延長
  computedStyleSupportsPseudoElements: false, // パフォーマンス向上
})
```

## 最適化ヘルパー

### テーマ最適化

```typescript
// テストでのMUIアニメーション無効化
const testTheme = createTheme({
  transitions: { create: () => 'none' },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
        disableTouchRipple: true,
      },
    },
  },
})
```

### act()警告対策

```typescript
// ユーザーインタラクションをラップ
await act(async () => {
  await user.click(button)
})

// フォーム送信時
await act(async () => {
  await user.click(submitButton)
})
```

## プリセット活用

### 基本コンポーネント（UI/Forms）

- timeout: 10秒
- 最適化: 有効

### 複雑コンポーネント（Navigation/Layout）

- timeout: 15秒
- fakeTimers: 有効

### 統合テスト（Pages/Routes）

- timeout: 20秒
- realTimers: 使用

## ベストプラクティス

### 1. 適切なタイムアウト設定

- 基本: 10秒
- MUI多用: 15秒
- 統合テスト: 20秒

### 2. act()使用箇所

- ユーザーイベント（click, type, keyboard）
- フォーム送信・リセット
- 状態更新を伴う操作

### 3. 警告の扱い

- ユーザー操作: act()でラップして解消
- ライブラリ内部: 技術的制約として受容

## パフォーマンス指標

### 目標値

- 単体テスト: < 5秒/ファイル
- 統合テスト: < 15秒/ファイル
- 全体実行: < 2分

### 測定方法

```bash
npm test -- --verbose
npm test -- --coverage
```

## トラブルシューティング

### タイムアウトエラー

1. testTimeout値を確認
2. waitFor設定を確認
3. 非同期処理の適切な待機

### act()警告

1. ユーザーイベントをact()でラップ
2. テスト用テーマでRipple無効化
3. ライブラリ内部警告は受容

### メモリリーク

1. afterEachでクリーンアップ
2. モック関数のリセット
3. タイマーの適切な管理

---

_最新の設定は `src/__tests__/optimization.setup.ts` を参照_
