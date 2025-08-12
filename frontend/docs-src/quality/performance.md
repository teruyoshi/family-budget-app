# パフォーマンス ガイド

## 🎯 パフォーマンス予算

### Core Web Vitals 目標値
- **LCP (Largest Contentful Paint)**: < 2.5秒
- **FID (First Input Delay)**: < 100ms  
- **CLS (Cumulative Layout Shift)**: < 0.1
- **TTFB (Time to First Byte)**: < 600ms
- **TTI (Time to Interactive)**: < 3.5秒

### Bundle Size 予算
| カテゴリ | 目標値 | 現在値 | 監視方法 |
|---|---|---|---|
| **Total JS** | < 300KB (gzipped) | ~180KB | size-limit |
| **Total CSS** | < 50KB (gzipped) | ~25KB | size-limit |
| **Images** | < 200KB | ~50KB | imagemin |
| **Fonts** | < 100KB | ~45KB | font-display |

### Runtime パフォーマンス
- **金額フォーマット**: < 16ms (60fps維持)
- **計算処理**: < 100ms
- **コンポーネント再レンダリング**: 必要時のみ
- **メモリ使用量**: < 50MB (長時間利用時)

## ⚡ React最適化戦略

### 1. メモ化による再レンダリング抑制

```tsx
// ✅ useMemo: 重い計算のキャッシュ
const formattedBalance = useMemo(() => {
  return formatMoneyForDisplay(totalIncome - totalExpense);
}, [totalIncome, totalExpense]);

// ✅ useCallback: 関数の安定化
const handleAmountChange = useCallback((amount: number) => {
  if (amount > MAX_SAFE_INTEGER) return;
  setAmount(amount);
}, []);

// ✅ React.memo: Props変更時のみ再レンダリング
const AmountText = React.memo<AmountTextProps>(({ amount, variant }) => {
  return <Typography variant={variant}>{formatMoney(amount)}</Typography>;
});
```

### 2. 状態管理の最適化

```tsx
// ❌ 悪い例: 過度な状態分割
const [income, setIncome] = useState(0);
const [expense, setExpense] = useState(0);
const [balance, setBalance] = useState(0); // 派生状態

// ✅ 良い例: 最小限の状態
const [transactions, setTransactions] = useState<Transaction[]>([]);
const balance = useMemo(() => 
  transactions.reduce((sum, tx) => 
    sum + (tx.type === 'INCOME' ? tx.amount : -tx.amount), 0
  ), [transactions]
);
```

### 3. バンドル分割とコード分割

```tsx
// ✅ 動的インポートによる遅延読み込み
const HistoryPage = lazy(() => import('./features/history/HistoryPage'));
const ReportsPage = lazy(() => import('./features/reports/ReportsPage'));

// ✅ Suspenseによるローディング表示
<Suspense fallback={<CircularProgress />}>
  <Routes>
    <Route path="/history" element={<HistoryPage />} />
    <Route path="/reports" element={<ReportsPage />} />
  </Routes>
</Suspense>
```

## 📦 Bundle最適化

### Webpack/Vite設定

```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          mui: ['@mui/material', '@mui/icons-material'],
          utils: ['./src/lib/format', './src/hooks']
        }
      }
    }
  },
  
  // Tree shaking最適化
  esbuild: {
    treeShaking: true,
    minifySyntax: true,
    minifyIdentifiers: true
  }
});
```

### ライブラリ選択基準

```typescript
// ✅ 良い例: 必要な機能のみインポート
import { formatMoneyForDisplay } from '@/lib/format/money';
import { TextField } from '@mui/material';

// ❌ 悪い例: 全体インポート
import * as MUI from '@mui/material'; // 500KB+
import _ from 'lodash'; // 70KB+
```

### サイズ監視

```json
// package.json
{
  "scripts": {
    "size": "size-limit",
    "size:analyze": "npx vite-bundle-analyzer"
  },
  "size-limit": [
    {
      "path": "dist/**/*.js",
      "limit": "300 KB",
      "gzip": true
    }
  ]
}
```

## 🖼️ アセット最適化

### 画像最適化
```typescript
// ✅ WebP形式の使用
const optimizedImage = {
  webp: '/assets/logo.webp',
  fallback: '/assets/logo.png'
};

// ✅ 遅延読み込み
<img
  src={optimizedImage.fallback}
  srcSet={`${optimizedImage.webp} 1x`}
  loading="lazy"
  alt="家計簿アプリ"
/>
```

### フォント最適化
```css
/* ✅ font-display: swap で描画ブロック回避 */
@font-face {
  font-family: 'Noto Sans JP';
  font-display: swap;
  src: url('/fonts/NotoSansJP-Regular.woff2') format('woff2');
}

/* ✅ 必要な文字セットのみ読み込み */
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&subset=latin');
```

## 🚀 レンダリング最適化

### Virtual Scrolling（大量データ対応）

```tsx
// ✅ 履歴表示での仮想化
import { FixedSizeList } from 'react-window';

const HistoryList = ({ transactions }: { transactions: Transaction[] }) => {
  const Row = ({ index, style }) => (
    <div style={style}>
      <HistoryItem transaction={transactions[index]} />
    </div>
  );

  return (
    <FixedSizeList
      height={600}
      itemCount={transactions.length}
      itemSize={80}
    >
      {Row}
    </FixedSizeList>
  );
};
```

### デバウンス・スロットリング

```tsx
// ✅ 検索入力のデバウンス
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  
  return debouncedValue;
};

// 使用例
const SearchInput = () => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);
  
  useEffect(() => {
    if (debouncedQuery) {
      // API呼び出し
      searchTransactions(debouncedQuery);
    }
  }, [debouncedQuery]);
};
```

## 📊 パフォーマンス監視

### 開発時監視

```tsx
// ✅ React DevTools Profiler
import { Profiler } from 'react';

const onRenderCallback = (id, phase, actualDuration) => {
  if (actualDuration > 16) {
    console.warn(`Slow render: ${id} took ${actualDuration}ms`);
  }
};

<Profiler id="AmountInput" onRender={onRenderCallback}>
  <AmountInput value={amount} onChange={setAmount} />
</Profiler>
```

### 本番監視

```typescript
// ✅ Web Vitals測定
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);

// ✅ 自動レポート
const sendToAnalytics = (metric) => {
  // Google Analytics 4 等に送信
  gtag('event', metric.name, {
    event_category: 'Web Vitals',
    event_label: metric.id,
    value: Math.round(metric.value),
    non_interaction: true
  });
};
```

### CI/CDでの品質ゲート

```yaml
# .github/workflows/performance.yml
- name: Lighthouse CI
  uses: treosh/lighthouse-ci-action@v9
  with:
    configPath: './lighthouserc.json'
    uploadDir: './lighthouse-reports'
    
- name: Bundle Size Check
  run: npm run size
  
- name: Performance Budget Check
  if: failure()
  run: echo "⚠️ Performance budget exceeded!"
```

## 🔧 実装チェックリスト

### コンポーネント開発時
- [ ] **React.memo** 適用検討
- [ ] **useMemo/useCallback** 重い処理に適用
- [ ] **key属性** 適切に設定（リスト項目）
- [ ] **defaultProps** より TypeScript默认值を使用
- [ ] **PropTypes** 削除（TypeScript使用時）

### 状態管理
- [ ] **派生状態** をStateにしない
- [ ] **useState初期化** に重い処理を入れない
- [ ] **useEffect** の依存配列を最小化
- [ ] **イベントハンドラー** をuseCallback化

### API・データ取得
- [ ] **SWR/TanStack Query** でキャッシュ活用
- [ ] **suspense** でローディング表示
- [ ] **error boundary** でエラーハンドリング
- [ ] **pagination** で大量データ対応

### アセット
- [ ] **画像最適化** (WebP/AVIF)
- [ ] **フォント最適化** (subset/preload)
- [ ] **SVG最適化** (SVGO)
- [ ] **Bundle分析** 定期実施

## 📈 パフォーマンス改善優先順位

### 高優先度（ユーザー体感に直結）
1. **初期読み込み速度** - LCP, TTI改善
2. **操作レスポンス** - FID改善  
3. **レイアウトシフト** - CLS改善
4. **メモリリーク** - 長時間利用対応

### 中優先度（開発効率向上）
1. **Bundle サイズ** - ビルド時間短縮
2. **Hot Reload** - 開発体験向上
3. **TypeScript** - コンパイル時間短縮

### 低優先度（将来対応）
1. **Service Worker** - オフライン対応
2. **WebAssembly** - 計算処理高速化
3. **HTTP/3** - ネットワーク最適化

## 🎯 測定・改善サイクル

### 週次
- **Lighthouse** スコア確認
- **Bundle size** トレンド確認
- **Core Web Vitals** 実値確認

### 月次  
- **パフォーマンス予算** 見直し
- **改善施策** 効果測定
- **競合サイト** ベンチマーク

### 四半期
- **技術的負債** 返済計画
- **新技術導入** 検討
- **パフォーマンス目標** 更新

---

## 📚 参考資料

- [Web Vitals](https://web.dev/vitals/)
- [React Performance](https://react.dev/learn/render-and-commit)
- [Vite Performance](https://vitejs.dev/guide/performance.html)
- [Bundle Analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)

> ⚡ **重要**: パフォーマンスは「後から対応」ではなく「設計時から考慮」すべき要件です。
> 定期的な測定と継続的な改善により、快適なユーザー体験を維持しましょう。