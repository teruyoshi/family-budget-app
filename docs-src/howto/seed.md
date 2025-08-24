# 開発用データ再現手順

統一された開発・テスト環境のためのデータ管理

## 🎯 データ再現性の重要性

**目的**: "同じ見た目"でのUI開発・デバッグ・テスト実現

**適用範囲**:
- 開発環境でのサンプルデータ統一
- Storybookでのコンポーネント表示統一
- テスト環境での予測可能なデータ状態

## 🔧 開発用データ管理

### データ種別
```typescript
// 開発用固定データの種類
export const developmentData = {
  users: [
    { id: 1, name: '田中太郎', email: 'tanaka@example.com' },
    { id: 2, name: '佐藤花子', email: 'sato@example.com' },
  ],
  
  expenses: [
    { id: 1, amount: 1500, category: '食費', date: '2025-08-01' },
    { id: 2, amount: 800, category: '交通費', date: '2025-08-02' },
    { id: 3, amount: 3000, category: '娯楽費', date: '2025-08-03' },
  ],
  
  income: [
    { id: 1, amount: 250000, category: '給与', date: '2025-08-25' },
    { id: 2, amount: 5000, category: '副業', date: '2025-08-15' },
  ],
  
  categories: [
    { id: 1, name: '食費', type: 'expense', color: '#f44336' },
    { id: 2, name: '交通費', type: 'expense', color: '#ff9800' },
    { id: 3, name: '給与', type: 'income', color: '#4caf50' },
  ],
};
```

## 🚀 データ操作コマンド

### 基本的なデータ操作
```bash
# 開発用データ投入（将来実装予定）
make seed-dev
# → scripts/seed.ts実行
# → 固定サンプルデータをDBに投入

# 開発環境完全リセット
make reset-dev  
# → docker compose down -v (ボリューム削除)
# → docker compose up -d (コンテナ再作成)
# → make seed-dev (サンプルデータ再投入)

# データ状態確認
make db-status
# → docker compose exec mysql mysql -u root -p家計簿DB
```

### データバックアップ・復元
```bash
# 開発用データバックアップ（将来実装）
make backup-dev
# → scripts/backup.ts実行
# → データベース内容をJSONファイルに保存

# 特定データセット復元
make restore-dev DATASET=sample-2025-08
# → scripts/restore.ts実行  
# → 指定されたデータセットを復元
```

## 📊 Storybookでのデータ統一

### モックデータ提供
```typescript
// src/__tests__/test-utils/mockData.ts
export const mockExpenseData = {
  expenses: [
    {
      id: 1,
      amount: 1500,
      category: '食費',
      date: new Date('2025-08-01'),
      description: 'ランチ代',
    },
    // ... 統一されたサンプルデータ
  ],
};

// Storybook Story での使用
export const WithExpenses: Story = {
  args: {
    expenses: mockExpenseData.expenses,
  },
};
```

### MSW (Mock Service Worker) 活用
```typescript
// 将来実装: API呼び出しのモック
// src/mocks/handlers.ts
import { rest } from 'msw';

export const handlers = [
  rest.get('/api/expenses', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(mockExpenseData.expenses)
    );
  }),
];
```

## 🔄 データ更新・同期戦略

### 開発チーム間でのデータ統一
```bash
# チーム共通データセット更新
git pull origin main
make reset-dev              # 環境リセット
make seed-dev               # 最新サンプルデータ適用
```

### データスキーマ変更時の対応
```bash
# スキーマ変更後の手順
make down                   # 既存環境停止
docker volume prune -f      # データボリューム削除
make up                     # 新スキーマでコンテナ作成
make seed-dev               # 新形式でサンプルデータ投入
```

## 📝 データセット定義

### 基本データセット
```typescript
// scripts/seeds/basic.ts (将来実装)
export const basicDataset = {
  name: 'basic-2025-08',
  description: '基本的な家計データセット',
  data: {
    // 1ヶ月分の典型的な家計データ
    expenses: generateMonthlyExpenses('2025-08'),
    income: generateMonthlyIncome('2025-08'),
    categories: standardCategories,
  },
};
```

### テスト専用データセット
```typescript
// scripts/seeds/testing.ts (将来実装)
export const testingDataset = {
  name: 'testing-edge-cases',
  description: 'エッジケース・境界値テスト用',
  data: {
    // エッジケースを含むデータ
    expenses: [
      { amount: 0, category: '調整', date: '2025-08-01' },        // 0円
      { amount: 999999, category: 'テスト', date: '2025-08-02' }, // 大金額
      { amount: 1, category: 'テスト', date: '2025-08-03' },      // 最小金額
    ],
  },
};
```

### デモ・プレゼン用データセット
```typescript
// scripts/seeds/demo.ts (将来実装)
export const demoDataset = {
  name: 'demo-presentation',
  description: 'デモ・プレゼンテーション用美しいデータ',
  data: {
    // 見栄えの良いサンプルデータ
    expenses: generateBeautifulExpenseData(),
    income: generateStableIncomeData(),
    // グラフ表示で美しい分布になるよう調整
  },
};
```

## 🛠 データ生成・管理スクリプト（将来実装）

### データ生成ユーティリティ
```typescript
// scripts/utils/dataGenerator.ts
export class DataGenerator {
  // 現実的な家計データ生成
  static generateRealisticExpenses(month: string): Expense[] {
    // 曜日・時間帯を考慮した支出パターン
    // カテゴリ別の支出傾向反映
  }
  
  // テスト用境界値データ生成
  static generateEdgeCaseData(): TestData {
    // 最小・最大値
    // 特殊文字・null値
    // 異常値パターン
  }
  
  // 時系列データ生成
  static generateTimeSeriesData(period: DateRange): TimeSeriesData {
    // 月次・週次・日次パターン
    // 季節要因・トレンド反映
  }
}
```

### データ整合性チェック
```bash
# データ整合性チェック（将来実装）
make validate-data
# → scripts/validate.ts実行
# → 外部キー制約・ビジネスルール検証
# → データ品質レポート生成
```

## 📊 データ監視・メトリクス

### データ状態の可視化
```bash
# データ統計情報表示（将来実装）
make data-stats
# → 総レコード数・カテゴリ分布
# → 期間別集計・異常値検出
# → データ品質スコア
```

### データドリフト検出
```typescript
// 開発データと本番データの差異検出
// scripts/drift-detection.ts
export class DataDriftDetector {
  // スキーマ差分検出
  static detectSchemaDrift(): DriftReport {
    // 型定義との整合性確認
    // 新規カラム・削除カラム検出
  }
  
  // データ分布差異検出  
  static detectDistributionDrift(): DistributionReport {
    // カテゴリ分布・金額分布の変化
    // 異常パターンの検出
  }
}
```

## 🎯 ベストプラクティス

### DO（推奨）
- **固定シード値使用**: ランダム生成時も再現可能に
- **リアルなデータ**: 実際の使用パターンに近い内容
- **エッジケース包含**: 境界値・異常値も含める
- **定期的なデータリフレッシュ**: 古いデータセットの更新

### DON'T（非推奨）
- **個人情報使用**: 実際の個人データ使用禁止
- **ランダム依存**: テスト結果が変動する生成方法
- **過度に複雑**: 理解・保守困難なデータ構造
- **データ不整合**: 外部キー制約違反・論理矛盾