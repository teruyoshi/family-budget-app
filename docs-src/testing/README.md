# テスト戦略 & カバレッジ基準

**目的**: 品質の"線引き"（合格条件）を明確化

**適用範囲**:
- 対象: 単体/統合/E2E/契約テストの定義・実行基準
- 影響: リリース判定・品質保証・開発フロー

**更新方針**:
- 変更があったらQAエンジニア・テックリードが更新
- 最低レビュー: 2名（品質観点必須）
- Freshness: 四半期毎にテスト戦略見直し

## 🏗 テスト階層定義

### 1. 単体テスト (Unit Tests)
**対象**: コンポーネント・フック・ライブラリ関数の個別動作

```bash
# 実行コマンド
make test-frontend                    # 全単体テスト実行
make test-file FILE=AmountInput.test.tsx  # 特定ファイル実行
```

**テスト範囲**:
- **UIコンポーネント**: プロパティ・レンダリング・インタラクション
- **カスタムフック**: 状態変化・副作用・戻り値
- **ライブラリ関数**: 入力→出力・エッジケース・エラーハンドリング

**品質基準**:
- **カバレッジ**: Statements 90%以上、Branches 85%以上
- **実行時間**: 1ファイル10秒以内、全体2分以内
- **安定性**: Flaky test 0%（再実行で結果変動なし）

### 2. 統合テスト (Integration Tests)
**対象**: コンポーネント間連携・ルーティング・データフロー

```bash
# 実行コマンド（単体テストと同一）
make test-frontend
```

**テスト範囲**:
- **ルーティング**: ページ遷移・URL同期・ブラウザ履歴
- **フォーム統合**: 入力→バリデーション→送信フロー
- **状態管理**: Context・カスタムフック間連携

**品質基準**:
- **シナリオカバレッジ**: 主要ユーザーフロー100%
- **クロスコンポーネント**: 境界をまたぐ処理の正確性
- **エラーハンドリング**: 異常ケースの適切な処理

### 3. E2Eテスト (End-to-End Tests)
**対象**: ユーザー視点での実際の操作フロー

```bash
# 将来実装予定
make test-e2e                         # Playwright/Cypress
```

**テスト範囲（計画）**:
- **主要フロー**: 支出登録→履歴確認→削除
- **認証フロー**: ログイン→操作→ログアウト
- **レスポンシブ**: デスクトップ・タブレット・モバイル

### 4. 契約テスト (Contract Tests)
**対象**: Frontend↔Backend API仕様の整合性

```bash
# 将来実装予定
make contract-test                    # Pact/OpenAPI Testing
```

**テスト範囲（計画）**:
- **API仕様準拠**: リクエスト・レスポンス形式
- **エラー処理**: HTTPステータス・エラーメッセージ
- **データ型整合性**: TypeScript型↔JSON Schema

## 📊 現在の品質状況

### テスト実行状況
```
✅ 単体テスト: 240テスト、25スイート （100%通過）
✅ 統合テスト: ルーティング・データフロー （包含済み）
🔄 E2Eテスト: 未実装（将来対応）
🔄 契約テスト: 未実装（OpenAPI準備中）
```

### カバレッジメトリクス
- **Statements**: 高カバレッジ維持中
- **Branches**: 条件分岐網羅
- **Functions**: 全関数テスト済み
- **Lines**: ソースコード行カバレッジ

## ⚡ 効率的なテスト実行戦略

### 開発中のテスト実行
```bash
# 1. 変更ファイル関連テストのみ（推奨）
make test-file FILE=修正したコンポーネント.test.tsx

# 2. 特定機能グループのテスト
make test-file FILE="Money"      # 金額関連
make test-file FILE="Navigation" # ナビゲーション関連
make test-file FILE="Form"       # フォーム関連
```

### コミット前・プル前のテスト
```bash
# 全テスト実行（必須）
make test-frontend

# 品質チェック統合実行
make quality-check-frontend
```

### CI/CD でのテスト実行
```bash
# GitHub Actions で自動実行
- テスト実行（並列化）
- カバレッジレポート生成
- 品質ゲート評価
```

## 🛠 テスト最適化設定

### Jest設定最適化（済み）
```javascript
// jest.config.js の最適化内容
{
  testTimeout: 15000,           // タイムアウト延長
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  testEnvironment: 'jsdom',
  transform: { /* TypeScript対応 */ },
  moduleNameMapping: { /* パスエイリアス */ }
}
```

### パフォーマンス改善（済み）
- **act()警告解決**: React状態更新の適切なラップ
- **Ripple無効化**: MUIアニメーション無効化で高速化
- **メモリ管理**: テスト間でのクリーンアップ

### テストユーティリティ
```typescript
// src/__tests__/test-utils/ 
- routing.tsx           # ルーティングテスト用ラッパー
- optimization.setup.ts # パフォーマンス最適化設定
```

## 📋 品質ゲート基準

### リリース前必須チェック
- [ ] **全テスト通過**: 240テスト、0エラー、0警告
- [ ] **カバレッジ基準**: Statements 90%以上
- [ ] **パフォーマンス**: 全テスト2分以内完了
- [ ] **安定性**: 3回連続実行で同一結果

### コード品質統合チェック
```bash
make quality-check-frontend
```
1. **Prettier**: コードフォーマット統一
2. **ESLint**: コード品質・ベストプラクティス
3. **TypeScript**: 型チェック・strict mode
4. **Jest**: テスト実行・カバレッジ
5. **Vite Build**: プロダクションビルド確認

## 🔍 テストデバッグ・トラブルシューティング

### よくある問題と解決策

#### 1. テスト実行が遅い
```bash
# 特定ファイルのみ実行
make test-file FILE=遅いテスト.test.tsx

# キャッシュクリア
cd frontend && npm test -- --clearCache
```

#### 2. act() 警告が発生
```typescript
// 解決済みパターン（既存コード参照）
await act(async () => {
  fireEvent.click(button);
  await waitFor(() => expect(/* 条件 */).toBeTruthy());
});
```

#### 3. タイムアウトエラー
```bash
# Jest設定で15秒に延長済み
# さらに延長が必要な場合は個別にtimeout設定
test('heavy test', async () => {
  // テストコード
}, 30000); // 30秒
```

#### 4. モックが効かない
```typescript
// 適切なモック設定例
jest.mock('@/hooks/useMoney', () => ({
  useMoney: jest.fn()
}));
```

## 🚀 テスト戦略の進化

### 短期計画（次四半期）
1. **E2Eテスト導入**: Playwright環境構築
2. **ビジュアル回帰テスト**: Storybook + Chromatic
3. **契約テスト準備**: OpenAPI仕様完成→テスト自動化

### 中期計画（半年〜1年）
1. **パフォーマンステスト**: Lighthouse CI統合
2. **アクセシビリティテスト**: axe-core自動化
3. **セキュリティテスト**: 脆弱性スキャン統合

### 品質文化醸成
- **テストファースト**: TDD推進・レッドグリーンリファクター
- **品質メトリクス**: ダッシュボード化・継続監視
- **学習・改善**: 定期的なテスト戦略レビュー・技術向上