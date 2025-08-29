# テーマ・UI再現性ガイド

MUIテーマカスタマイズとUI統一性の実現方法

## 🎨 テーマ管理戦略

### 現在のテーマ構成
```typescript
// src/theme/ (将来実装予定)
├── tokens.ts           # デザイントークン定義
├── palette.ts          # カラーパレット
├── typography.ts       # タイポグラフィ
└── index.ts           # テーマ統合
```

### MUIテーマ適用方法
```tsx
// App.tsx での統一テーマ適用
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

const theme = createTheme({
  // テーマ設定
});

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* アプリケーション */}
    </ThemeProvider>
  );
}
```

## 🔧 テーマカスタマイズ手順

### 1. カラーパレット変更
```typescript
// 将来のsrc/theme/palette.ts
export const palette = {
  primary: {
    main: '#1976d2',      // メインカラー
    light: '#42a5f5',     // ライトカラー
    dark: '#1565c0',      // ダークカラー
  },
  secondary: {
    main: '#dc004e',      // セカンダリカラー
  },
  // 家計簿アプリ専用色
  expense: '#f44336',     // 支出カラー（赤系）
  income: '#4caf50',      // 収入カラー（緑系）
  balance: '#2196f3',     // 残高カラー（青系）
};
```

### 2. タイポグラフィ調整
```typescript
// 将来のsrc/theme/typography.ts
export const typography = {
  fontFamily: [
    'Noto Sans JP',       // 日本語フォント
    'Roboto',
    'Arial',
    'sans-serif',
  ].join(','),
  
  // 金額表示専用
  currency: {
    fontSize: '1.25rem',
    fontWeight: 600,
    fontFamily: 'monospace',  // 等幅フォントで桁揃え
  },
};
```

### 3. コンポーネント固有テーマ
```typescript
// MUIコンポーネントの統一スタイル
export const components = {
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 8,       // 角丸統一
        textTransform: 'none', // 大文字変換無効
      },
    },
  },
  MuiTextField: {
    defaultProps: {
      variant: 'outlined' as const,
      size: 'small' as const,
    },
  },
};
```

## 🎯 UI統一性の実現

### sx propsパターン（推奨）
```tsx
// 統一されたスタイル適用
<Box
  sx={{
    p: 2,                    // padding: theme.spacing(2)
    borderRadius: 1,         // borderRadius: theme.shape.borderRadius
    bgcolor: 'primary.main', // backgroundColor: theme.palette.primary.main
  }}
>
  {content}
</Box>
```

### カスタムコンポーネントでのテーマ活用
```tsx
import { useTheme } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';

export const AmountText: React.FC<Props> = ({ amount, type }) => {
  const theme = useTheme();
  
  const getAmountColor = (type: 'income' | 'expense' | 'balance') => {
    switch (type) {
      case 'income': return theme.palette.success.main;
      case 'expense': return theme.palette.error.main;
      case 'balance': return theme.palette.info.main;
      default: return theme.palette.text.primary;
    }
  };
  
  return (
    <Typography
      sx={{
        color: getAmountColor(type),
        fontFamily: 'monospace',  // 金額は等幅フォント
        fontWeight: 600,
      }}
    >
      {formatAmount(amount)}
    </Typography>
  );
};
```

## 🔄 テーマ変更の影響範囲

### 変更時の確認項目
1. **Storybookでの確認**: 全コンポーネントの表示確認
2. **レスポンシブ対応**: デスクトップ・タブレット・モバイル
3. **アクセシビリティ**: コントラスト比・フォーカス表示
4. **ダークモード**: 将来対応時の準備

### テーマ適用コマンド
```bash
# Storybookでテーマ確認
make storybook-frontend

# 全体ビルド確認
npm run build

# テスト実行（UI関連）
make test-file FILE="*stories*"
```

## 🎨 デザイントークン設計（将来実装）

### 色彩設計原則
```typescript
export const tokens = {
  // 基本色
  colors: {
    primary: {
      50: '#e3f2fd',
      500: '#2196f3',
      900: '#0d47a1',
    },
    // 家計簿専用
    financial: {
      expense: '#d32f2f',    // 支出
      income: '#388e3c',     // 収入
      balance: '#1976d2',    // 残高
      neutral: '#616161',    // 中立
    },
  },
  
  // スペーシング
  spacing: {
    xs: 4,   // 4px
    sm: 8,   // 8px  
    md: 16,  // 16px
    lg: 24,  // 24px
    xl: 32,  // 32px
  },
  
  // タイポグラフィ
  typography: {
    scale: {
      xs: '0.75rem',   // 12px
      sm: '0.875rem',  // 14px
      base: '1rem',    // 16px
      lg: '1.125rem',  // 18px
      xl: '1.25rem',   // 20px
    },
  },
};
```

## 📱 レスポンシブデザイン対応

### ブレークポイント設定
```typescript
export const breakpoints = {
  values: {
    xs: 0,      // モバイル
    sm: 600,    // タブレット小
    md: 900,    // タブレット大
    lg: 1200,   // デスクトップ
    xl: 1536,   // 大型デスクトップ
  },
};
```

### レスポンシブスタイル例
```tsx
<Box
  sx={{
    // モバイルファースト
    p: 1,              // デフォルト padding: 8px
    
    // タブレット以上
    [theme.breakpoints.up('md')]: {
      p: 2,            // padding: 16px
    },
    
    // デスクトップ以上
    [theme.breakpoints.up('lg')]: {
      p: 3,            // padding: 24px
    },
  }}
>
  {content}
</Box>
```

## 🔧 テーマデバッグ・開発ツール

### ブラウザでのテーマ確認
```javascript
// ブラウザコンソールでテーマ情報確認
console.log(window.__MUI_THEME__);
```

### Storybookテーマ切り替え
```typescript
// .storybook/preview.ts でテーマ切り替え設定
export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'light',
    toolbar: {
      items: ['light', 'dark'],
    },
  },
};
```

## 🎯 ベストプラクティス

### DO（推奨）
- **sx props使用**: インラインスタイル代替
- **テーマ値参照**: ハードコード値回避
- **semantic colors**: primary/secondary/error/success使用
- **spacing統一**: theme.spacing()使用

### DON'T（非推奨）
- **直接CSSファイル**: 可能な限り避ける
- **ハードコード色値**: #ffffffなど直接指定避ける
- **!importantの乱用**: 設計で解決
- **過度なカスタマイズ**: MUIの利点活用

## 🚀 将来のテーマ拡張

### ダークモード対応準備
- **カラートークン**: light/dark両対応
- **コントラスト比**: WCAG準拠
- **切り替えUI**: ユーザー設定保存

### テーマバリエーション
- **季節テーマ**: 特定期間の限定テーマ
- **ユーザーカスタム**: 個人設定対応
- **ブランドテーマ**: 企業カラー対応