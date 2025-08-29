# ADR 0004: Phase 2 Directory Structure Migration

## Status

**Accepted** - 2025-08-24

## Context

プロジェクトの成長に伴い、コンポーネント数が28個に増加し、従来の`components/common/`ディレクトリでは管理が困難になった。機能別分離による保守性向上と、型安全性の強化が必要となった。

### 課題
- `components/common/`に全コンポーネントが混在（UI、フォーム、ナビゲーション等）
- インポートパスが冗長で、依存関係が不明確
- 型定義がコンポーネントファイルに分散し、再利用困難
- テストとStorybookドキュメントの構造が不一致

### 目標
- 28コンポーネントの機能別分離
- 型安全性の向上（7つの型定義ファイル分離）
- バレルエクスポートによる統一インポート
- 240テスト + 25スイートの継続通過保証

## Decision

**Phase 2: Directory Structure Migration**を実施し、以下の新しいディレクトリ構造に移行する：

### 新しいディレクトリ構造

```
src/
├── components/
│   ├── ui/                      # 基本UIコンポーネント（10個）
│   │   ├── AmountInput.tsx      # 金額入力（スタイル分離対応）
│   │   ├── AmountText.tsx       # 金額表示
│   │   ├── Button.tsx           # MUI Button統合
│   │   ├── DatePicker.tsx       # MUI X DatePicker
│   │   ├── PageLoader.tsx       # ローディング表示
│   │   ├── TextInput.tsx        # テキスト入力
│   │   ├── TextLabel.tsx        # ラベル表示
│   │   ├── hooks/useAmountInput.ts # AmountInput専用フック
│   │   └── index.ts             # バレルエクスポート
│   ├── forms/                   # フォーム関連コンポーネント（6個）
│   │   ├── ControlledAmountInput.tsx    # react-hook-form連携
│   │   ├── ControlledCustomDateSwitch.tsx # ジェネリック型日付スイッチ
│   │   ├── ControlledDatePicker.tsx     # フォーム連携日付選択
│   │   ├── FormErrorMessage.tsx         # エラーメッセージ表示
│   │   ├── TransactionForm.tsx          # 統合取引フォーム
│   │   └── index.ts             # バレルエクスポート
│   ├── navigation/              # ナビゲーションコンポーネント（10個）
│   │   ├── AppBreadcrumbs.tsx   # パンくずナビ
│   │   ├── AppDrawer.tsx        # サイドドロワー
│   │   ├── AppDrawer.styles.ts  # ドロワースタイル分離
│   │   ├── AppDrawerContent.tsx # ドロワー内容
│   │   ├── AppDrawerHeader.tsx  # ドロワーヘッダー
│   │   ├── AppNavigation.tsx    # ナビゲーション統合
│   │   ├── AppTopBar.tsx        # トップバー
│   │   ├── NavigationMenu.tsx   # メニュー本体
│   │   ├── NavigationMenuItem.tsx # メニュー項目
│   │   └── index.ts             # バレルエクスポート
│   ├── layout/                  # レイアウトコンポーネント（2個）
│   │   ├── AppLayout.tsx        # メインレイアウト
│   │   └── index.ts             # バレルエクスポート
│   └── provider/                # プロバイダーコンポーネント（2個）
│       ├── DateLocalizationProvider.tsx
│       └── index.ts             # バレルエクスポート
├── types/                       # 型定義分離（7ファイル）
│   ├── api.ts                   # API関連型
│   ├── business.ts              # ビジネスロジック型
│   ├── common.ts                # 共通型
│   ├── components.ts            # コンポーネント型
│   ├── forms.ts                 # フォーム型
│   ├── routing.ts               # ルーティング型
│   └── index.ts                 # 型定義統合エクスポート
├── lib/                         # ライブラリ統合
│   ├── format/
│   │   ├── money.ts             # 金額フォーマット専用
│   │   └── __tests__/
│   ├── validation/
│   │   └── schemas.ts           # Zodスキーマ定義
│   └── index.ts                 # ライブラリ統合エクスポート
```

### 移行戦略

1. **段階的移行**
   - 既存機能を壊さずに新ディレクトリを作成
   - `*_old`ディレクトリで旧ファイルを並行保持
   - インポートパス修正後に旧ディレクトリ削除

2. **品質保証**
   - 移行中も240テスト + 25スイート全通過維持
   - Storybook正常動作確認
   - 5段階品質チェック（Prettier+ESLint+TypeScript+Jest+Build）継続

3. **最適化対応**
   - Storybook preview.ts最適化でビルド性能向上
   - 23ファイル削除によるクリーンアップ
   - 重複排除とファイル構成簡素化

## Consequences

### 正の影響

- **保守性向上**: 機能別分離により責任範囲が明確化
- **型安全性強化**: 7つの型定義ファイルによる厳密な型管理
- **インポート簡素化**: バレルエクスポートによる統一されたインポートパス
- **ドキュメント整合**: コンポーネント構造とStorybookドキュメントの一致
- **パフォーマンス**: Storybook最適化により開発者体験向上
- **テスト継続性**: 移行中も全テスト通過を保証
- **スケーラビリティ**: 新機能追加時の拡張性確保

### 負の影響・リスク

- **移行コスト**: 28コンポーネントの移行作業量
- **学習コスト**: 新しいディレクトリ構造の習得
- **一時的複雑性**: 移行期間中の`*_old`ディレクトリ併存

### 軽減策

- **段階的実施**: 機能単位での段階的移行
- **ドキュメント更新**: README、用語集、ADRの同期更新
- **自動化**: Makefileコマンドによる品質チェック自動化
- **Claude Code対応**: 開発ガイドラインのCLAUDE.md同期更新

## Progress Tracking

### 完了済み（85%）
- ✅ types/ - 7つの型定義ファイル分離完了
- ✅ components/ui/ - 10コンポーネント + 専用フック移行完了
- ✅ components/forms/ - 6コンポーネント + ジェネリック型対応完了
- ✅ components/provider/ - 2ファイル分離完了
- ✅ components/layout/ - 2ファイル新規作成完了
- ✅ components/navigation/ - 10コンポーネント移行完了
- ✅ lib/ - format + validation + 統合エクスポート完了
- ✅ インポートパス修正 - 全ファイルの@/components/*パス修正完了
- ✅ Storybook最適化 - preview.ts最適化完了
- ✅ クリーンアップ - 23ファイル削除、重複排除完了
- ✅ テスト継続性 - 240テスト + 25スイート全通過維持
- ✅ ドキュメント更新 - CLAUDE.md、glossary.md、README.md更新完了

### 残り作業（15%）
- 🔄 旧ディレクトリ削除 - common_old, layout_old, navigation_old最終削除
- 🔄 features/配下 - components_old ディレクトリの統合と削除
- 🔄 最終検証 - 全テスト通過とビルド確認

### 成果指標

- **コンポーネント分離**: 28コンポーネントを機能別に完全分離
- **型安全性向上**: 7つの型定義ファイルによる厳密な型管理実現
- **保守性向上**: バレルエクスポートによる統一されたインポート実現
- **テスト継続**: 移行中も240テスト全通過を維持
- **ドキュメント最新化**: Storybookドキュメント + 包括的型ドキュメント完備

## Implementation Notes

### 技術的判断

1. **ジェネリック型採用**: `ControlledCustomDateSwitch<T>`で再利用性確保
2. **スタイル分離**: `AmountInput.styles.ts`, `AppDrawer.styles.ts`でスタイル分離
3. **フック分離**: `useAmountInput.ts`でロジックとUI分離
4. **バレルエクスポート**: 全ディレクトリにindex.ts配置で統一インポート

### 品質保証

- **5段階品質チェック**: Prettier → ESLint → TypeScript → Jest → Build
- **テスト最適化**: Jest timeout延長、act()警告解決、Ripple無効化
- **Storybook統合**: 全コンポーネントのストーリー + ドキュメント完備
- **型安全保証**: strict mode + 厳密な型定義で runtime error最小化

### チーム開発対応

- **Claude Code統合**: CLAUDE.mdでAI開発支援最適化
- **Makefile活用**: Docker環境での一貫した開発体験
- **プルリクエストテンプレート**: 品質チェックリスト組み込み
- **用語集管理**: Phase 2対応用語追加、v1.4.0更新

---

**Next**: Phase 3では、残り15%の旧ディレクトリ削除と、features/配下のコンポーネント統合を予定。