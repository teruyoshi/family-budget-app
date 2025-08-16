# ADR-0001: TSDoc記法への統一とドキュメント戦略の標準化

## ステータス

✅ **採択済み** (2025-08-12)

## コンテキスト

家計簿アプリのフロントエンドにおいて、JSDocとTypeScript型定義を使った自動ドキュメント生成システムを運用してきたが、以下の課題が発生している：

### 現在の課題

1. **記法の不統一**: JSDoc記法とTSDoc記法が混在
2. **保守負荷**: 重複する説明（README.md ↔ Storybook MDX ↔ TypeDoc）
3. **品質のバラツキ**: コンポーネントごとのドキュメント充実度が異なる
4. **スケーラビリティ**: チーム拡大時のドキュメント品質維持が困難

### 技術的背景

- **現在**: 18 Storybookストーリー、14 テストファイル、127テスト
- **TypeDoc**: react-docgen-typescript で JSDoc → Storybook自動反映
- **品質**: Single Source of Truth は維持されている
- **運用**: 手動更新中心でガバナンスが弱い

## 決定事項

### 1. TSDoc記法への完全移行

````typescript
// ✅ 新基準: TSDoc記法
/**
 * 金額入力専用コンポーネント
 *
 * @remarks
 * 数値入力を統一された金額表示フォーマットに自動変換します。
 * lib/format/money.ts との連携により、アプリ全体で一貫した金額処理を実現します。
 *
 * @example
 * ```tsx
 * <AmountInput
 *   value={amount}
 *   onChange={setAmount}
 *   placeholder="金額を入力してください"
 * />
 * ```
 */

// ❌ 旧基準: JSDoc記法
/**
 * 金額入力専用コンポーネント
 *
 * 数値入力を金額表示に自動変換する特殊なテキスト入力コンポーネント。
 *
 * @component
 * @example
 * <AmountInput value={amount} onChange={setAmount} />
 */
````

### 2. Props型定義の標準化

```typescript
// ✅ 必須形式
export interface AmountInputProps {
  /**
   * 現在の金額（数値）
   * @defaultValue 0
   * @remarks MAX_SAFE_INTEGER未満の正の整数のみ許可
   */
  value: number

  /**
   * 金額変更時のコールバック関数
   * @param value - 入力された数値（検証済み）
   */
  onChange: (value: number) => void
}
```

### 3. ドキュメント構成の標準化

```
docs-src/                    # ← ソース一元化
├── glossary.md             # ドメインモデル・用語集
├── quality/                # 品質方針
│   ├── accessibility.md
│   ├── performance.md
│   └── i18n.md
├── adr/                    # 設計判断記録
│   └── *.md
└── overview.mdx            # プロジェクト概要

src/
├── **/*.stories.mdx        # Autodocs + 設計判断
└── **/*.tsx               # TSDoc完備
```

### 4. 自動化ルール

- **Lint**: eslint-plugin-jsdoc + @typescript-eslint でTSDoc検証
- **CI**: TypeDoc生成 → GitHub Pages 公開
- **PR**: ドキュメント更新チェックリスト必須
- **品質ゲート**: TSDoc未記述でCI失敗

## 根拠

### ✅ メリット

1. **TypeScript完全統合**: TSDoc公式記法でツールサポート最適
2. **保守負荷削減**: 重複説明の排除、自動生成範囲拡大
3. **品質安定化**: Lint + CIで品質強制、チーム拡大対応
4. **開発体験向上**: IDEでのTypeScript + TSDocホバー情報

### ⚠️ デメリット・リスク

1. **移行コスト**: 既存JSDoc → TSDoc書き換え（18コンポーネント）
2. **学習コスト**: チーム全員のTSDoc記法習得
3. **ツール依存**: TypeDocプラグイン・eslint設定の複雑化

### 📊 代替案検討

- **A案**: 現状維持（JSDoc記法継続）
  - ❌ スケーラビリティ問題未解決
- **B案**: すべてMDXに移管
  - ❌ TypeScript型情報との乖離リスク
- **C案**: TSDoc統一（採択）
  - ✅ TypeScript + 自動生成の恩恵最大化

## 影響範囲

### 即座に影響する範囲

- `src/components/common/` (7コンポーネント)
- `src/features/*/components/` (11コンポーネント)
- `src/hooks/` (4カスタムフック)
- `src/lib/format/` (1ライブラリ)

### 段階的に影響する範囲

- Storybook設定 (react-docgen-typescript)
- TypeDoc設定 (TSDocプラグイン)
- CI/CD (eslint-plugin-jsdoc導入)
- 開発フロー (PR template更新)

### 影響しない範囲

- 既存のStorybookストーリー構成
- テストコード (127テスト)
- 実装ロジック

## 実装計画

### Phase 1: 基盤整備 (Week 1)

- [ ] eslint-plugin-jsdoc + TSDocプラグイン導入
- [ ] TypeDoc設定のTSDoc最適化
- [ ] CI品質ゲート追加
- [ ] PRテンプレート更新

### Phase 2: 既存コード移行 (Week 2-3)

- [ ] `lib/format/money.ts` TSDoc化（完了）
- [ ] `hooks/` TSDoc化 (4ファイル)
- [ ] `components/common/` TSDoc化 (7ファイル)
- [ ] `features/` TSDoc化 (11ファイル)

### Phase 3: 運用定着 (Week 4-)

- [ ] チーム向けTSDoc研修
- [ ] 新規開発でのTSDoc遵守
- [ ] 月次品質レビュー制度

## 成功指標

### 定量指標

- **TSDoc準拠率**: 100% (全公開API)
- **Lint violations**: 0件 (TSDoc関連)
- **TypeDoc生成成功率**: 100%
- **PR品質チェック**: 漏れ0件

### 定性指標

- **開発者体験**: IDEでの型情報+説明表示
- **新規参加者**: オンボーディング時間短縮
- **保守負荷**: 重複説明管理からの解放

## 承認・レビュー

### 意思決定者

- **技術リード**: [承認済み]
- **フロントエンド開発チーム**: [承認済み]
- **プロダクトオーナー**: [承認済み]

### レビュー予定

- **1ヶ月後**: Phase 2完了時点での効果測定
- **3ヶ月後**: 運用定着・品質指標達成確認
- **6ヶ月後**: 次期改善方針検討

---

## 関連資料

- [TSDoc公式仕様](https://tsdoc.org/)
- [TypeDoc + TSDoc設定例](https://typedoc.org/guides/doccomments/)
- [eslint-plugin-jsdoc設定](https://github.com/gajus/eslint-plugin-jsdoc)

---

**更新履歴**

- 2025-08-12: 初版作成・承認
- 次回レビュー予定: 2025-09-12
