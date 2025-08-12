# アクセシビリティ ガイド

## 🎯 対応方針

### 準拠基準
- **WCAG 2.1 AA レベル準拠**
- **JIS X 8341-3:2016 対応**
- **セクション508準拠**（米国向け将来対応）

### 対象ユーザー
- **視覚障害**: スクリーンリーダー、拡大表示
- **聴覚障害**: 音声情報の視覚的代替
- **運動機能障害**: キーボードのみ操作
- **認知障害**: シンプル・一貫したUI

## ⌨️ キーボード操作

### 基本操作
- **Tab**: 次の操作可能要素へ
- **Shift + Tab**: 前の操作可能要素へ  
- **Enter**: ボタン・リンクの実行
- **Space**: チェックボックス・ボタンの切り替え
- **Escape**: モーダル・ドロップダウンを閉じる

### フォーカス管理
```tsx
// ✅ 良い例: フォーカス順序が論理的
<AmountInput tabIndex={1} />
<DatePicker tabIndex={2} />
<Button tabIndex={3}>登録</Button>

// ❌ 悪い例: tabIndexの乱用
<Button tabIndex={100}>送信</Button>
```

### 実装ルール
- **tabIndex=0**: 自然な順序で操作可能
- **tabIndex=-1**: プログラム的にのみフォーカス可能
- **tabIndex>0**: 使用禁止（順序が不自然になる）

## 📢 スクリーンリーダー対応

### aria-label 設定
```tsx
// ✅ 金額入力での適切なラベル
<AmountInput
  aria-label="支出金額入力フィールド、現在の値: ¥15,000"
  value={15000}
/>

// ✅ 状態を含む動的ラベル
<Button
  aria-label={`残高表示: ${balance >= 0 ? '黒字' : '赤字'} ¥${Math.abs(balance)}`}
>
  残高: ¥{balance}
</Button>
```

### セマンティックHTML
```tsx
// ✅ 適切な見出し構造
<h1>家計簿管理</h1>
  <h2>収支入力</h2>
    <h3>支出登録</h3>
    <h3>収入登録</h3>
  <h2>履歴表示</h2>

// ✅ リスト構造
<ul role="list" aria-label="支出履歴">
  <li role="listitem">
    <time dateTime="2025-08-12">2025年8月12日</time>
    <span aria-label="支出金額">¥1,500</span>
  </li>
</ul>
```

### ライブリージョン
```tsx
// ✅ エラーメッセージの動的通知
<div aria-live="polite" aria-atomic="true">
  {error && (
    <span role="alert" aria-label="エラー">
      {error.message}
    </span>
  )}
</div>

// ✅ 残高変更の通知
<div aria-live="polite" aria-label="残高更新通知">
  {isBalanceUpdated && `残高が更新されました: ¥${newBalance}`}
</div>
```

## 🎨 視覚的アクセシビリティ

### 色・コントラスト
- **テキスト**: 背景との比率 4.5:1 以上
- **大きなテキスト**: 背景との比率 3:1 以上
- **色以外の情報**: アイコン・パターンでも状態表現

```tsx
// ✅ 色だけでなくアイコンでも状態表現
<Box sx={{ 
  color: balance >= 0 ? 'success.main' : 'error.main',
  '&::before': {
    content: balance >= 0 ? '"↗"' : '"↘"',
    marginRight: 1
  }
}}>
  残高: ¥{balance}
</Box>
```

### フォントサイズ・間隔
- **最小フォントサイズ**: 14px（本文）
- **行間**: 1.5em 以上
- **クリック領域**: 最小 44×44px
- **要素間隔**: 8px 以上

### ダークモード対応
```tsx
// 将来的な実装例
const theme = useTheme();
<AmountText 
  sx={{ 
    color: theme.palette.mode === 'dark' 
      ? 'grey.100' 
      : 'grey.900' 
  }}
/>
```

## 🔧 実装チェックリスト

### 開発時
- [ ] **キーボードのみ**で全機能操作可能
- [ ] **スクリーンリーダー**で内容が理解可能
- [ ] **色覚異常**でも情報が伝わる
- [ ] **拡大表示200%**でもレイアウト崩れなし
- [ ] **フォーカス表示**が明確に見える

### コンポーネント必須
- [ ] `aria-label` または `aria-labelledby` 設定
- [ ] `role` 属性の適切な使用
- [ ] エラー時の `aria-invalid="true"`
- [ ] 必須項目の `required` 属性
- [ ] 状態変更時の `aria-live` 通知

### テスト項目
- [ ] **axe-core** 自動テスト通過
- [ ] **Lighthouse Accessibility** スコア 90以上
- [ ] **スクリーンリーダー**実機テスト
- [ ] **キーボード操作**実機テスト

## 🛠️ 開発ツール

### 自動テスト
```bash
# Storybook a11y addon（開発時）
npm run storybook

# axe-core CLI（CI）
npm run test:a11y

# Lighthouse CI（パフォーマンス+a11y）
npm run lighthouse:ci
```

### 手動テスト
```bash
# スクリーンリーダー（macOS）
# VoiceOverを有効にしてテスト

# キーボードナビゲーション
# マウスを使わずにすべての機能をテスト

# 色覚シミュレート
# Chrome DevTools > Rendering > Emulate vision deficiencies
```

## 📋 エラーパターンと対処

### よくある問題
1. **フォーカスが見えない**
   ```tsx
   // ❌ 悪い例
   button { outline: none; }
   
   // ✅ 良い例  
   button:focus-visible { 
     outline: 2px solid theme.palette.primary.main;
     outlineOffset: 2px;
   }
   ```

2. **aria-labelが動的でない**
   ```tsx
   // ❌ 悪い例: 静的なラベル
   <input aria-label="金額" />
   
   // ✅ 良い例: 状態を反映
   <input aria-label={`金額入力、現在の値: ${formattedValue}`} />
   ```

3. **色のみで情報伝達**
   ```tsx
   // ❌ 悪い例: 赤色のみでエラー表現
   <Text color="error">入力エラー</Text>
   
   // ✅ 良い例: アイコン+テキストも追加
   <Box>
     <ErrorIcon aria-hidden="true" />
     <Text color="error">入力エラー: 金額が必要です</Text>
   </Box>
   ```

## 🎯 品質目標

### 定量目標
- **Lighthouse Accessibility**: 95点以上
- **axe-core violations**: 0件
- **WCAG準拠**: AA レベル 100%
- **キーボード操作率**: 100%

### 定性目標
- **スクリーンリーダーテスト**: 月1回実施
- **ユーザビリティテスト**: 障害当事者参加
- **継続改善**: チームメンバー全員がa11y理解

---

## 📚 参考資料

- [WCAG 2.1 Understanding](https://www.w3.org/WAI/WCAG21/Understanding/)
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [axe Rules](https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md)
- [MUI Accessibility](https://mui.com/base-ui/getting-started/accessibility/)

> 💡 **重要**: アクセシビリティは「追加機能」ではなく「基本要件」です。
> すべてのユーザーが平等にサービスを利用できるよう、設計段階から考慮しましょう。