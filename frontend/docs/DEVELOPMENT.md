# 開発者ガイド

家計簿アプリのフロントエンド開発に関する詳細なガイドです。

## 🛠 セットアップ

### 前提条件
- Node.js 18以上
- Docker & Docker Compose（推奨）
- Git

### 初期セットアップ
```bash
# プロジェクトルートに移動
cd /path/to/family-budget-app

# 環境変数設定
cp .env.example .env

# Docker環境起動
make build && make up
```

### 開発環境確認
- フロントエンド: http://localhost:5173
- バックエンド: http://localhost:8080
- phpMyAdmin: http://localhost:8081

## 📝 コーディング規約

### スタイリング戦略
- MUIコンポーネントを優先使用
- sx propsで一貫したスタイリング
- Material Designガイドラインの遵守
- テーマカスタマイズでブランディングを統一

### TypeScript規約
```tsx
// ✅ 良い例
interface UserProps {
  name: string;
  age: number;
  isActive: boolean;
}

const User: React.FC<UserProps> = ({ name, age, isActive }) => {
  return <div>{name}</div>;
};

// ❌ 悪い例
const User = (props: any) => {
  return <div>{props.name}</div>;
};
```

### コンポーネント命名
- **ファイル名**: `PascalCase.tsx`
- **関数名**: `PascalCase`
- **Props型**: `ComponentNameProps`

### ディレクトリ構造規約
```
src/
├── components/common/    # 汎用コンポーネント
├── features/            # 機能別ディレクトリ
│   └── [feature]/
│       ├── components/  # 機能専用コンポーネント
│       ├── types.ts     # 型定義（将来）
│       └── README.md    # 機能ドキュメント
└── utils/              # ユーティリティ（将来）
```

## 🧪 テスト戦略

### テスト種別
1. **単体テスト**: 個別コンポーネント
2. **結合テスト**: コンポーネント間連携
3. **E2Eテスト**: エンドツーエンド（将来）

### テスト作成ガイドライン

#### 良いテストの特徴
```tsx
// ✅ 良いテスト例
describe('ExpenseForm', () => {
  test('支出入力用のテキストボックスが表示される', () => {
    render(<ExpenseForm />);
    const expenseInput = screen.getByPlaceholderText('支出金額を入力');
    expect(expenseInput).toBeInTheDocument();
  });

  test('正の数値を入力して送信できる', () => {
    const onSubmit = jest.fn();
    render(<ExpenseForm onSubmit={onSubmit} />);
    
    const input = screen.getByPlaceholderText('支出金額を入力');
    const button = screen.getByRole('button', { name: '支出を登録' });
    
    fireEvent.change(input, { target: { value: '1000' } });
    fireEvent.click(button);
    
    expect(onSubmit).toHaveBeenCalledWith(1000);
  });
});
```

#### テスト実行コマンド
```bash
# 全テスト実行
make test-frontend

# ウォッチモード
npm test -- --watch

# カバレッジ確認
npm test -- --coverage
```

## 🏗 TDD開発フロー

### Red-Green-Refactorサイクル

#### 1. Red: 失敗するテストを書く
```tsx
test('新しい機能が動作する', () => {
  // まだ実装されていない機能のテスト
  render(<NewComponent />);
  expect(screen.getByText('新機能')).toBeInTheDocument();
});
```

#### 2. Green: テストを通す最小限の実装
```tsx
function NewComponent() {
  return <div>新機能</div>;
}
```

#### 3. Refactor: コードの改善
```tsx
function NewComponent() {
  return (
    <div className="text-lg font-bold">
      新機能
    </div>
  );
}
```

### TDD実践のコツ
- 一度に一つの機能に集中
- テストは具体的で読みやすく
- 実装は最小限から開始
- リファクタリングで品質向上

## 🔧 デバッグ手法

### React Developer Tools
- コンポーネント階層の確認
- Props・Stateの監視
- パフォーマンス分析

### コンソールデバッグ
```tsx
// 開発時のデバッグログ
console.log('Debug:', { props, state });

// 条件付きデバッグ
if (process.env.NODE_ENV === 'development') {
  console.log('Development debug info');
}
```

### テストデバッグ
```tsx
// テスト時のDOM構造確認
render(<Component />);
screen.debug(); // DOM構造を出力
```

## 🚀 パフォーマンス最適化

### コンポーネント最適化
```tsx
// メモ化による再レンダリング防止
const MemoizedComponent = memo(({ data }) => {
  return <div>{data}</div>;
});

// useMemoで計算結果キャッシュ
const ExpensiveComponent = ({ items }) => {
  const total = useMemo(() => {
    return items.reduce((sum, item) => sum + item.amount, 0);
  }, [items]);

  return <div>合計: {total}</div>;
};
```

## 📦 新機能追加手順

### 1. 機能設計
- 要件の明確化
- UI/UXの検討
- データフローの設計

### 2. ディレクトリ作成
```bash
# 新機能用ディレクトリ
mkdir -p src/features/new-feature/components
```

### 3. TDD開発
```bash
# テストファイル作成
touch src/features/new-feature/components/NewComponent.test.tsx

# テスト実行（失敗確認）
make test-frontend

# コンポーネント実装
touch src/features/new-feature/components/NewComponent.tsx
```

### 4. ドキュメント更新
- コンポーネントREADME作成
- メインREADME更新
- CLAUDE.md更新

## 🔍 コードレビュー観点

### チェックポイント
- [ ] TypeScript型定義の適切性
- [ ] テストカバレッジ
- [ ] パフォーマンス考慮
- [ ] アクセシビリティ対応
- [ ] セキュリティ考慮
- [ ] ドキュメント更新

### レビューコメント例
```typescript
// Good: 型安全で再利用可能
interface ButtonProps {
  variant: 'primary' | 'secondary';
  onClick: () => void;
  children: React.ReactNode;
}

// Better: デフォルト値も含めた完全な型定義
interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}
```

## 🐛 トラブルシューティング

### よくある問題

#### 1. テストが失敗する
```bash
# キャッシュクリア
npm test -- --clearCache

# 依存関係再インストール
rm -rf node_modules package-lock.json
npm install
```

#### 2. TypeScriptエラー
```bash
# 型チェック実行
npx tsc --noEmit

# ESLint修正
npm run lint -- --fix
```

#### 3. Docker環境の問題
```bash
# コンテナ再構築
make down && make build && make up

# ログ確認
make frontend
```

## 🔗 参考リンク

- [React公式ドキュメント](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Vite](https://vitejs.dev/guide/)