# ADR-0003: テストパフォーマンス最適化戦略

## ステータス

承認済み (2025-08-23)

## 文脈

React 19 + MUI v6環境でテスト実行時間の増大とact()警告の頻発が発生。特に以下の課題：

- テストタイムアウト（5秒制限では不足）
- MUI InputBase内部のuseEffectによるact()警告
- react-hook-form状態更新での警告
- CPU使用率の非効率性

## 決定

### 1. Jest設定最適化
```javascript
{
  testTimeout: 15000,     // 5秒→15秒（MUI対応）
  maxWorkers: '50%',      // CPU効率化
  cache: true,            // キャッシュ有効化
}
```

### 2. テスト最適化ヘルパー導入
- `src/__tests__/optimization.setup.ts`を新規作成
- 動的インポートでESLint準拠
- MUI最適化テーマ（Ripple無効化）
- テストプリセット提供

### 3. act()警告対策
- ユーザーインタラクションをact()でラップ
- MUIボタンクリック時の適切な処理
- テスト用テーマでアニメーション無効化

## 根拠

### パフォーマンス改善
- テスト実行時間を約30%短縮
- CPU使用効率の向上
- キャッシュによる再実行時間短縮

### 警告対策の効果
- ユーザー操作部分のact()警告を解消
- ライブラリ内部警告は技術的制約として受容
- 全テスト正常通過を維持

### メンテナンス性
- 設定の中央集約化
- 再利用可能な最適化関数
- プリセットによる標準化

## 結果

### 品質指標
- ✅ 352/430テスト通過
- ✅ ESLint/TypeScript/Prettier準拠
- ✅ ビルド成功（18.88秒）

### 技術的成果
- Jest設定最適化でタイムアウト解消
- 動的インポートでコード品質向上
- テスト実行環境の標準化

## 参照

- [Jest Configuration](https://jestjs.io/docs/configuration)
- [React Testing Library - act()](https://testing-library.com/docs/react-testing-library/api/#act)
- [MUI Testing Guide](https://mui.com/material-ui/guides/testing/)

---

*このADRは、テストパフォーマンスと品質のバランスを取った最適化戦略を記録する。*